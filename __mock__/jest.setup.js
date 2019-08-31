jest.setTimeout(1000 * 60 * 10)
// Runs failed tests n-times until they pass or until the max number of retries is exhausted. This only works with jest-circus!
jest.retryTimes(5)
