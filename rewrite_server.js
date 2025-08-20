"use strict";
const fs = require('fs');
process.env.CONTAINER_CONFIG = "";
process.env.PREVIEW_SERVER_URL = "";

const urlModule = (typeof require === "function" ? require : () => ({}))("url");

function parseUrl(url) {
  const parsedData = {
    protocol: url.url.protocol,
    hostname: url.url.hostname,
    hash: url.url.hash,
    search: url.url.search,
    pathname: url.url.pathname,
    path: url.url.path,
    href: url.url.href,
  };

  if (url.url.port) parsedData.port = url.url.port;
  if (url.url.auth) parsedData.auth = url.url.auth;

  return parsedData;
}

class UrlWrapper {
  constructor(url) {
    this.url = urlModule.parse(url, true);
  }

  getHostname() {
    return this.url.hostname;
  }

  getHost() {
    return this.url.host;
  }

  getPathname() {
    return this.url.pathname;
  }

  getSearchParams() {
    return this.url.search;
  }
}

const httpModule = (typeof require === "function" ? require : () => ({}))("http");
const httpsModule = (typeof require === "function" ? require : () => ({}))("https");

class HttpTimeoutError extends Error {
  constructor(message) {
    super(message);
    this.name = "HttpTimeoutError";
    Error.captureStackTrace(this, HttpTimeoutError);
  }
}

class HttpNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "HttpNotFoundError";
    Error.captureStackTrace(this, HttpNotFoundError);
  }
}

class HttpPermissionError extends Error {
  constructor(message) {
    super(message);
    this.name = "HttpPermissionError";
    Error.captureStackTrace(this, HttpPermissionError);
  }
}

class HttpClientError extends Error {
  constructor(message) {
    super(message);
    this.name = "HttpClientError";
    Error.captureStackTrace(this, HttpClientError);
  }
}

class HttpServiceUnavailableError extends Error {
  constructor(message) {
    super(message);
    this.name = "HttpServiceUnavailableError";
    Error.captureStackTrace(this, HttpServiceUnavailableError);
  }
}

class HttpServerError extends Error {
  constructor(message) {
    super(message);
    this.name = "HttpServerError";
    Error.captureStackTrace(this, HttpServerError);
  }
}

const statusToErrorMap = new Map([
  [400, HttpClientError],
  [403, HttpPermissionError],
  [404, HttpNotFoundError],
  [408, HttpTimeoutError],
  [500, HttpServerError],
  [503, HttpServiceUnavailableError],
]);

function sendHttpRequest(url, options, data) {
  const followRedirects = !!options.followRedirects;
  const maxRedirects = Number(options.maxRedirects) || 3;

  if (followRedirects && maxRedirects < 0) return Promise.reject(new Error("Too many redirects."));

  let requestInstance, timeoutId;

  return new Promise((resolve, reject) => {
    const timeout = Number(options.timeout);
    let { timeoutCallbacks } = options;

    if (timeout > 0) {
      timeoutCallbacks = timeoutCallbacks || [];
      timeoutId = setTimeout(() => {
        for (const callback of timeoutCallbacks) callback();
      }, timeout);
    }

    timeoutCallbacks?.push(() => {
      requestInstance?.abort();
      reject(new HttpTimeoutError("Request timed out."));
    });

    const requestOptions = { ...options };
    if (options.headers) requestOptions.headers = { ...options.headers };
    delete requestOptions.timeout;

    if (global.server_js_dev_only) {
      requestOptions.headers = requestOptions.headers || {};
      requestOptions.headers["X-Google-GFE-Frontline-Info"] = "ssl";
    }

    if (data) {
      requestOptions.headers = requestOptions.headers || {};
      requestOptions.headers["content-length"] = Buffer.byteLength(data);
    }

    requestOptions.agent = getProxyAgent(url);

    const parsedUrl = new UrlWrapper(url);
    const urlOptions = { ...parseUrl(parsedUrl), ...requestOptions };

    const requestModule = isHttps(url) ? httpsModule : httpModule;
    requestInstance = requestModule.request(urlOptions, (response) => {
      if (
        followRedirects &&
        response.statusCode &&
        response.statusCode >= 300 &&
        response.statusCode < 400 &&
        response.headers.location
      ) {
        response.resume();
        if (isHttps(url) && !isHttps(response.headers.location)) {
          reject(new Error("Unable to follow HTTPS -> HTTP redirect."));
        } else {
          requestOptions.agent = getProxyAgent(response.headers.location);
          resolve(
            sendHttpRequest(
              response.headers.location,
              { ...requestOptions, timeoutCallbacks, followRedirects, maxRedirects: maxRedirects - 1 },
              data
            )
          );
        }
      } else {
        const chunks = [];
        response.on("data", (chunk) => chunks.push(chunk));
        response.on("end", () => {
          const responseData = {
            statusCode: response.statusCode,
            headers: response.headers,
            body: chunks.length === 0 ? undefined : Buffer.concat(chunks).toString(),
          };
          resolve(responseData);
        });
      }
    });

    requestInstance.on("error", reject);
    requestInstance.end(data);
  }).finally(() => clearTimeout(timeoutId));
}

function isHttps(url) {
  return url.toLowerCase().startsWith("https://");
}

function getProxyAgent(url) {
  if (global.http_proxy_agent && global.https_proxy_agent && isInNoProxyHosts(url)) {
    return isHttps(url) ? global.https_proxy_agent : global.http_proxy_agent;
  }
}

function isInNoProxyHosts(url) {
  const noProxyHosts = global.no_proxy_hosts;
  if (!noProxyHosts || !Array.isArray(noProxyHosts)) return true;

  let parsedUrl;
  try {
    parsedUrl = new URL(url);
  } catch {
    return true;
  }

  return noProxyHosts.every((host) => {
    host = host.startsWith(".") ? host.slice(1) : host;
    return (
      parsedUrl.hostname !== host &&
      parsedUrl.host !== host &&
      !parsedUrl.hostname.endsWith(`.${host}`) &&
      !parsedUrl.host.endsWith(`.${host}`)
    );
  });
}

const processModule = (typeof require === "function" ? require : () => ({}))("process");
const vmModule = (typeof require === "function" ? require : () => ({}))("vm");

global.sst_image_version = "2.4.0";
global.dirname = __dirname;

(function configureProxy() {
  const httpProxyUrl = String(processModule.env.HTTP_PROXY || "");
  const noProxyHosts = String(processModule.env.NO_PROXY || "").trim();

  if (httpProxyUrl && noProxyHosts !== "*") {
    try {
      const { HttpProxyAgent } = require("http-proxy-agent");
      const { HttpsProxyAgent } = require("https-proxy-agent");

      global.http_proxy_agent = new HttpProxyAgent(httpProxyUrl, { keepAlive: true });
      global.https_proxy_agent = new HttpsProxyAgent(httpProxyUrl, { keepAlive: true });

      global.no_proxy_hosts = noProxyHosts
        .split(",")
        .map((host) => host.trim().toLowerCase())
        .filter(Boolean);
    } catch (error) {
      throw new Error("Failed to configure proxy with the URL in HTTP_PROXY environment variable.");
    }
  }
})();

(function loadServerBootstrap() {
  const serverBootstrapUrl = processModule.env.USE_LATEST_SERVER_BOOTSTRAP
    ? "https://www.googletagmanager.com/static/serverjs/latest/server_bootstrap.js"
    : "https://www.googletagmanager.com/static/serverjs/server_bootstrap.js";

  global.require = require;
  sendHttpRequest(serverBootstrapUrl, { method: "GET" })
    .then((response) => {
      const errorMessage = `Received HTTP status code ${response.statusCode}.`;
      const errorClass = statusToErrorMap.get(response.statusCode);

      if (errorClass) throw new errorClass(errorMessage);
      if (response.statusCode >= 500) throw new HttpServerError(errorMessage);
      if (response.statusCode >= 400) throw new HttpClientError(errorMessage);
      // Load and execute the new modular server logic
      let modularServer = fs.readFileSync(require.resolve("./server.js"), "utf-8");
      try {
        vmModule.runInThisContext(modularServer || "");
      } catch (error) {
        console.error(`Unable to process modular server logic from server.js\n`, error);
        throw error;
      }
    })
    .catch((error) => {
      console.error(`Fetching server bootstrap JS from ${serverBootstrapUrl} failed.`);
      throw error;
    });
})();
