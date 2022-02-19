const config = require('config');
const { getRandomMatrixPositions } = require('../helper');
const { Direction, Move } = require('../enum');

const generateEnvironment = () => {
  const heroPosition = config.hero.position;

  /**
   * Start from 1 because we need extra position for "monster"
   */
  const positionsNumber = Object.entries(config.entity).reduce(
    (positionsNumber, [_, { number }]) => number ? positionsNumber + number : positionsNumber,
    1,
  );

  const environmentPositions = getRandomMatrixPositions({
    rows: config.field.rows,
    columns: config.field.columns,
    positionsNumber,
    excludePositions: [heroPosition],
  });

  const { result: entity } = Object.entries(config.entity).reduce(
    (accum, [name, { number }]) => ({
      metadata: {
        environmentPositionsOffset: accum.metadata.environmentPositionsOffset + number
      },
      result: {
        ...accum.result,
        [name]: {
          positions: environmentPositions.slice(
            accum.metadata.environmentPositionsOffset,
            accum.metadata.environmentPositionsOffset + number
          ),
        }
      }
    }),
    {
      metadata: {
        environmentPositionsOffset: 1,
      },
      result: {},
    }
  );

  return {
    entity,
    hero: {
      position: heroPosition,
      direction: Direction.RIGHT,
      spearsNumber: config.hero.data.spearsNumber,
      monstersKilledNumber: 0,
      lastMove: Move.STEP,
      hitWall: false,
    }
  }
}

const arePositionsNearby = (position1) => (position2) =>
  Math.abs(position1.row - position2.row) === 1
    && position1.column === position2.column
  || Math.abs(position1.column - position2.column) === 1
    && position1.row === position2.row;

const arePositionsEqual = (position1) => (position2) =>
  position1.row === position2.row && position1.column === position2.column;

module.exports = {
  generateEnvironment,
  arePositionsNearby,
  arePositionsEqual,
};
