const { arePositionsNearby, arePositionsEqual } = require('./field');

const getSignalsFromEnvironment = (environment) => ({
  stink: environment.entity.monster.positions.some(arePositionsNearby(environment.hero.position)),
  wind: environment.entity.ghost.positions.some(arePositionsNearby(environment.hero.position)),
  shine: environment.entity.goldBag.positions.some(arePositionsEqual(environment.hero.position)),
  hitWall: environment.hero.hitWall,
});

module.exports = {
  getSignalsFromEnvironment,
};
