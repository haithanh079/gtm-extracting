// Domain/suffix list logic
class wc {
	constructor() {
		this.children = new Map();
	}
}

function Ac(a, b) {
	const c = b.pop();
	a.children.get(c) || a.children.set(c, b.length ? new wc() : void 0);
	b.length && Ac(a.children.get(c), b);
}

function Dc(a, b, c = b.length - 1) {
	var d = b[c];
	if (a.children.has("!" + d)) return -1;
	d = Ec(b, c, a.children.has(d), a.children.get(d));
	a = Ec(b, c, a.children.has("*"), a.children.get("*"));
	return d < 0 && a < 0
		? Math.min(d, a)
		: d < 0
		? d
		: a < 0
		? a
		: Math.max(d, a);
}

function Ec(a, b, c, d) {
	let e = 0;
	if (c) {
		if (!b) return 1;
		e += 1;
		d && ((e = Dc(d, a, b - 1)), (e += e < 0 ? -1 : 1));
	}
	return e;
}

function xc(a, b) {
	for (const c of Object.keys(b))
		if (b[c]) {
			const d = new wc();
			xc(d, b[c]);
			a.children.set(c, d);
		} else a.children.set(c, void 0);
}

function yc(a, b) {
	if (b.startsWith(".")) return "";
	b = b.toLowerCase().split(".");
	if (b.length < 2) return "";
	a = Dc(a, b);
	if (a < 0)
		return b.splice(0, b.length + a), b.length > 1 ? b.join(".") : "";
	if (b.length === a) return "";
	a === 0 ? b.splice(0, b.length - 2) : b.splice(0, b.length - a - 1);
	return b.length > 1 ? b.join(".") : "";
}

module.exports = {
	wc,
	Ac,
	Dc,
	Ec,
	xc,
	yc
};
