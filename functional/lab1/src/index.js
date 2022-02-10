const { generateEnvironment, getSignals } = require('./environment');

const environment = generateEnvironment();
const signals = getSignals({
  environment,
  arrowHit: false,
});

console.dir(environment, { depth: 4 });
console.dir(signals, { depth: 4 });
