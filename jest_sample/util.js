function Util(value) { this.value = value; }

// プロトタイプ
Util.prototype.add = (a, b) => {
  return a + b;
}

Util.prototype.mul = (a, b) => {
  return a * b;
}

module.exports = Util;
