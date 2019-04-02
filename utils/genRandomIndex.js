const makeRandomIndex = (max, min = 0) => Math.floor(Math.random() * (max - min + 1) + min);

module.exports = makeRandomIndex;
