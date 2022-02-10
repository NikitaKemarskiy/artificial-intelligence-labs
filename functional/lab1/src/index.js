const { generateEnvironment } = require('./environment');

const environment = generateEnvironment();

console.dir(environment, { depth: 4 });
