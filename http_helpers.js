// HTTP request/response helpers, proxy logic, and related functions
const http = require("http");
const https = require("https");

function bb(a) {
	return a.toLowerCase().startsWith("https://");
}
function ab(a) {
	if (bb(a)) return { request: https.request, get: https.get };
	if (a.toLowerCase().startsWith("http://"))
		return { request: http.request, get: http.get };
	throw Error(`URL ${a} uses unsupported protocol; must be HTTP or HTTPS.`);
}

function db(a) {
	const b = `Received HTTP status code ${a.statusCode}.`;
	if (a.statusCode >= 500) throw new Error(b);
	if (a.statusCode >= 400) throw new Error(b);
}

function cb(a) {
	return new Promise((resolve, reject) => {
		const { request } = ab(a);
		const req = request(a, (res) => {
			let data = [];
			res.on("data", (chunk) => data.push(chunk));
			res.on("end", () => {
				resolve({
					statusCode: res.statusCode,
					headers: res.headers,
					body: data.length === 0 ? void 0 : Buffer.concat(data).toString(),
				});
			});
		});
		req.on("error", reject);
		req.end();
	});
}

module.exports = {
	bb,
	ab,
	db,
	cb
};
