const { arePositionsNearby, arePositionsEqual } = require('./field');

const getSignalsFromEnvironment = (environment) => ({
  stink: arePositionsNearby(environment.monster.position)(environment.hero.position),
  wind: environment.entities.ghost.positions.some(arePositionsNearby(environment.hero.position)),
  shine: environment.entities.goldBag.positions.some(arePositionsEqual(environment.hero.position)),
  hitWall: environment.hero.hitWall,
});

module.exports = {
  getSignalsFromEnvironment,
};
