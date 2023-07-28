import { getTestCaseConfigs } from "./testCaseConfigs"

describe('test case config', () => {
  it('score add up to 100', () => {
    const configs = getTestCaseConfigs()
    expect(configs.map(c => c.score).reduce((a, b) => a + b)).toEqual(100)
  })
})