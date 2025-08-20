// Cache implementation and related logic
class S {
	constructor() {
		this.i = {};
		this.h = [];
		this.D = this.size = 0;
	}
	get(a, b) {
		return Object.prototype.hasOwnProperty.call(this.i, a) ? this.i[a] : b;
	}
	set(a, b) {
		if (!Object.prototype.hasOwnProperty.call(this.i, a)) {
			this.size += 1;
			this.h.push(a);
			this.D++;
		}
		this.i[a] = b;
	}
	remove(a) {
		if (Object.prototype.hasOwnProperty.call(this.i, a)) {
			delete this.i[a];
			--this.size;
			this.D++;
			this.h.length > 2 * this.size && this._mb();
			return true;
		}
		return false;
	}
	A() {
		return this.size;
	}
	_mb() {
		// Internal method to clean up keys
		let b = 0, c = 0;
		while (b < this.h.length) {
			const d = this.h[b];
			if (Object.prototype.hasOwnProperty.call(this.i, d)) this.h[c++] = d;
			b++;
		}
		this.h.length = c;
	}
}

class pb {
	constructor(a) {
		this.S = a || null;
		this.F = true;
		this.i = new S();
		this.g = { next: null, j: null };
		this.g.next = this.g.j = this.g;
	}
	get(a) {
		const b = this.i.get(a);
		if (b) {
			if (b.expires > Date.now()) return b.data;
			this.i.remove(a);
		}
	}
	set(a, b, c) {
		b = { data: b, expires: Date.now() + c * 1e3 };
		this.i.set(a, b);
	}
	count() {
		return this.i.A();
	}
}

class ub {
	constructor(a) {
		this.options = a;
		this.cache = new pb(this.options.X);
	}
	get(a) {
		return this.cache.get(a);
	}
	set(a, b, c) {
		this.cache.set(a, b, c);
	}
	count() {
		return this.cache.count();
	}
}

module.exports = {
	S,
	pb,
	ub
};
