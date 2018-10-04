class Util2 {
  constructor(value) { this.value = value; }

  add(a, b) {
    return a + b;
  }

  mul(a, b) {
    return a * b;
  }

  get getValue() { return this.value; }

  set setValue(value) { this.value = value; }
}

module.exports = Util2;
