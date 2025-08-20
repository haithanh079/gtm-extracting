// Policy script loading and evaluation
const vm = require("vm");

function Fc(a) {
	const b = {};
	if (!a) return b;
	const c = {}, d = console;
	for (const e of "debug error info log warn trace".split(" "))
		c[e] = (...g) => void d[e](...g);
	vm.runInNewContext(
		`(function(){\n${a}\n})();`,
		{
			console: c,
			gtag: (e, g, f) => {
				if (e !== "policy" || typeof g !== "string" || typeof f !== "function")
					return !1;
				b[g] || (b[g] = []);
				b[g].push(f);
				return !0;
			},
		},
		{ timeout: 100 }
	);
	return b;
}

module.exports = {
	Fc
};
