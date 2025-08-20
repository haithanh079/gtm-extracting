// Custom error classes for HTTP errors
class HttpTimeoutError extends Error {
	constructor(a) {
		super(a);
		this.name = "HttpTimeoutError";
		Error.captureStackTrace(this, HttpTimeoutError);
	}
}
class HttpNotFoundError extends Error {
	constructor(a) {
		super(a);
		this.name = "HttpNotFoundError";
		Error.captureStackTrace(this, HttpNotFoundError);
	}
}
class HttpPermissionError extends Error {
	constructor(a) {
		super(a);
		this.name = "HttpPermissionError";
		Error.captureStackTrace(this, HttpPermissionError);
	}
}
class HttpClientSideError extends Error {
	constructor(a) {
		super(a);
		this.name = "HttpClientSideError";
		Error.captureStackTrace(this, HttpClientSideError);
	}
}
class HttpServiceUnavailableError extends Error {
	constructor(a) {
		super(a);
		this.name = "HttpServiceUnavailableError";
		Error.captureStackTrace(this, HttpServiceUnavailableError);
	}
}
class HttpServerSideError extends Error {
	constructor(a) {
		super(a);
		this.name = "HttpServerSideError";
		Error.captureStackTrace(this, HttpServerSideError);
	}
}
module.exports = {
	HttpTimeoutError,
	HttpNotFoundError,
	HttpPermissionError,
	HttpClientSideError,
	HttpServiceUnavailableError,
	HttpServerSideError
};
