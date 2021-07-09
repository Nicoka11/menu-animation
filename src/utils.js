export default class Utils {
  static lerp(a, b, n) {
    return (1 - n) * a + n * b;
  }

  static rangeMap(value, in_min, in_max, out_min, out_max) {
    return (
      ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
    );
  }
}
