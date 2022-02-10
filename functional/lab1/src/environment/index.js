const config = require('config');
const { getRandomMatrixPositions } = require('../helper');

const getSignals = () => ({
  stink: true,
  wind: true,
  shine: true,
  kick: true,
  cry: true,
});

const generateEnvironment = () => {
  /**
   * Start from 1 because we need extra position for "monster"
   */
  const positionsNumber = Object.entries(config.entity).reduce(
    (positionsNumber, [_, { number }]) => number ? positionsNumber + number : positionsNumber,
    1,
  );

  const matrixPositions = getRandomMatrixPositions({
    rows: config.field.rows,
    columns: config.field.columns,
    positionsNumber,
  });

  console.dir(matrixPositions);

  const [monsterPosition] = matrixPositions;

  const { result: entity } = Object.entries(config.entity).reduce(
    (accum, [name, { number }]) => ({
      metadata: {
        matrixPositionsOffset: accum.metadata.matrixPositionsOffset + number
      },
      result: {
        ...accum.result,
        [name]: {
          positions: matrixPositions.slice(
            accum.metadata.matrixPositionsOffset,
            accum.metadata.matrixPositionsOffset + number
          )
        }
      }
    }),
    {
      metadata: {
        matrixPositionsOffset: 1,
      },
      result: {},
    }
  );

  return {
    entity,
    monster: {
      position: monsterPosition,
    },
  }
}

module.exports = {
  generateEnvironment,
};
