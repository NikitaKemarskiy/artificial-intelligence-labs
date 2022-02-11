const config = require('config');
const { getRandomMatrixPositions } = require('../helper');
const { Direction } = require('../enum');

const getSignals = ({
  environment,
  arrowHit,
}) => ({
  stink: arePositionsNearby([environment.monster.position, environment.hero.position]),
  wind: environment.entity.ghost.positions.some(
    (position) => arePositionsNearby([position, environment.hero.position])
  ),
  kick:
    environment.hero.position.row === (config.field.rows - 1)
    && environment.hero.position.column === (config.field.columns - 1),
  cry: arrowHit,
});

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

  const [monsterPosition] = environmentPositions;

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
          )
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
    monster: {
      position: monsterPosition,
    },
    hero: {
      position: heroPosition,
      direction: Direction.FORWARD,
    }
  }
}

const arePositionsNearby = (positions) => {
  const [position1, position2] = positions;

  return (
    Math.abs(position1.row - position2.row) === 1
    && position1.column === position2.column
  ) || (
    Math.abs(position1.column - position2.column) === 1
    && position1.row === position2.row
  )
}

module.exports = {
  getSignals,
  generateEnvironment,
};
