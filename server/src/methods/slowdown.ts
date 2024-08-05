import SlowDown from "express-slow-down";

class Limiter {
  static quarter = SlowDown({
    delayAfter: 1,
    delayMs: 250,
  });

  static room = SlowDown({
    delayAfter: 1,
    delayMs: 150,
  });
}

export default Limiter;
