const path = require('path');

module.exports = {
    verbose: true,
    browser: true,
    rootDir: path.resolve(__dirname, '..'),
    testMatch: ['<rootDir>/src/**/*.test.(j|t)s?(x)'],
    setupFiles: [path.join(__dirname, 'setup.js')],
    transform: {
        '^.+\\.(j|t)sx?$': 'babel-jest',
    },
};
