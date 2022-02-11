const { generateEnvironment } = require('./lib/environment/field');
const { getSignalsFromEnvironment } = require('./lib/environment/hero');

const environment = generateEnvironment();
const signals = getSignalsFromEnvironment(environment);

console.dir(environment, { depth: 4 });
console.dir(signals, { depth: 4 });
