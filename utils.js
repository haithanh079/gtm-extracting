// General utility functions (cookie parsing, base64, etc.)
function ka(a) {
	const b = Buffer.from(a, "base64");
	if (b.toString("base64") === a) return b.toString();
}
function la(a, b, c = !1) {
	a = (a || "")
		.split(";")
		.map((d) => d.replace(/^\s+/, ""))
		.filter((d) => d.startsWith(b + "="))
		.map((d) => d.substring(b.length + 1));
	return c ? a : a.map(decodeURIComponent);
}
function z(a, b, c = !1) {
	return la(a.headers.cookie || "", b, c)[0] || "";
}
function na(a) {
	Array.isArray(a) && (a = a[0]);
	return a || "";
}
function B(a, b) {
	const c = `${b}=`;
	a = a.split(":").find((d) => !d.indexOf(c));
	if (a !== void 0) return a.substring(c.length);
}
function oa(a, b, c) {
	const d = `${b}=`;
	a = a.split(":").filter((e) => e.length && e.indexOf(d));
	c && a.push(`${d}${c}`);
	return a.join(":");
}
module.exports = {
	ka,
	la,
	z,
	na,
	B,
	oa
};
