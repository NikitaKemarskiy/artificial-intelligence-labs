const _ = require('lodash');

const getRandomMatrixPositions = ({
  rows,
  columns,
  positionsNumber,
}) => _
  .times(positionsNumber, _.constant(null))
  .reduce(
    (positions) => [...positions, getUniqueRandomMatrixPosition({
      rows,
      columns,
      positions,
    })],
    []
  );

const getUniqueRandomMatrixPosition = ({
  rows,
  columns,
  positions,
}) => {
  const position = {
    row: getRandomNumber({
      from: 0,
      to: rows
    }),
    column: getRandomNumber({
      from: 0,
      to: columns
    }),
  };

  return positions.some(({ row, column }) => row === position.row && column === position.column)
    ? getUniqueRandomMatrixPosition({
      rows,
      columns,
      positions
    })
    : position;
}

/**
 * Returns random number between "from" and "to" (not including "to")
 */
const getRandomNumber = ({
  from,
  to,
}) => Math.floor(Math.random() * (to - from) + from);

module.exports = {
  getRandomMatrixPositions,
};
