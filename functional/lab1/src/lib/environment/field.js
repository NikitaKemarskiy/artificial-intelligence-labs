const config = require('config');
const { getRandomMatrixPositions } = require('../helper');
const { Direction, Move } = require('../enum');

const MONSTERS_NUMBER = 1;

const generateEnvironment = () => {
  const heroPosition = config.hero.position;

  const [monsterPosition] = getRandomMatrixPositions({
    rows: config.field.rows,
    columns: config.field.columns,
    positionsNumber: MONSTERS_NUMBER,
    excludePositions: [heroPosition],
  });

  const goldBagPositions = getRandomMatrixPositions({
    rows: config.field.rows,
    columns: config.field.columns,
    positionsNumber: MONSTERS_NUMBER,
    excludePositions: [heroPosition, monsterPosition],
  });

  const ghostPositions = getRandomMatrixPositions({
    rows: config.field.rows,
    columns: config.field.columns,
    positionsNumber: MONSTERS_NUMBER,
    excludePositions: [heroPosition, monsterPosition, ...goldBagPositions],
  });

  return {
    entities: {
      goldBag: {
        positions: goldBagPositions,
      },
      ghost: {
        positions: ghostPositions,
      },
    },
    monster: {
      position: monsterPosition,
      isAlive: true,
    },
    hero: {
      position: heroPosition,
      direction: Direction.RIGHT,
      spearsNumber: config.hero.data.spearsNumber,
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
