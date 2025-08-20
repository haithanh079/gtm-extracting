// Handles configuration, flags, and environment variables
"use strict";
var C = require("flags");
var wa = (typeof require === "function" ? require : function () { return {}; })("console");
var E = (typeof require === "function" ? require : function () { return {}; })("process");

var xa = class {
	constructor(a, b, c) {
		this.flag = a;
		this.H = b;
		this.s = c;
	}
	isSet() {
		return C.isSet(this.H) || !!(this.s && this.s in E.env);
	}
	get() {
		if (this.s && this.s in E.env)
			if (C.isSet(this.H))
				wa.warn(
					`Ignored environment variable ${this.s}=${E.env[this.s]} because command-line flag --${this.H}=${this.flag.get()} was given.`
				);
			else return this.flag.parseInput(E.env[this.s]);
		return this.flag.get();
	}
	setSecret(a) {
		this.flag.setSecret(a);
	}
};

function ya(a, b) {
	a.endsWith(".") || (a += ".");
	return b ? `${a} May also be set by ${b} environment variable.` : a;
}
function F(a, b, c, d) {
	b = ya(b, d);
	return new xa(C.defineString(a, c, b), a, d);
}
function H(a, b, c) {
	b = ya(b, c);
	return new xa(C.defineBoolean(a, !1, b), a, c);
}
function I(a, b, c, d) {
	b = ya(b, d);
	return new xa(C.defineInteger(a, c, b), a, d);
}
var za = C.parse;

module.exports = {
	F,
	H,
	I,
	za,
	xa,
	wa,
	E,
	C
};
