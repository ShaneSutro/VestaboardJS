module.exports = function () {
  return {
    files: ['src/**/*.ts'],

    tests: ['tests/**/*.test.ts'],

    env: {
      type: 'node',
    },
  };
};
