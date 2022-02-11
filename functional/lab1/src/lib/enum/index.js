const Direction = Object.freeze({
  UP: 1,
  RIGHT: 2,
  DOWN: 3,
  LEFT: 4,
});

const Move = Object.freeze({
  STEP: 1,
  CHANGE_DIRECTION: 2,
});

module.exports = {
  Direction,
  Move,
};
