import { ITestCaseConfig } from "../helpers/generateTestCase"
import zip from "lodash/zip";
import isEqual from 'lodash/isEqual'

export const grade = (actuals: unknown, expecteds: number[][][], configs: ITestCaseConfig[]): {message: string, score: number} => {
  if (!Array.isArray(actuals)) {
    return {
      message: 'Invalid response, expected an array',
      score: 0,
    }
  }
  if (actuals.length !== expecteds.length) {
    return {
      message: `Invalid response, expected an array of length ${expecteds.length}`,
      score: 0,
    }
  }
  const results = zip(actuals, expecteds, configs).map(([actual, expected, config]) => {
    if (!expected || !config) {
      return {
        message: 'Some response did not have matching test case',
        score: 0,
        actual, expected, config
      }
    }
    if (isEqual(actual, expected)) {
      return {
        message: 'ok',
        score: config.score,
        actual, expected, config
      }
    } else {
      return {
        message: `expected ${JSON.stringify(actual)} to equal ${JSON.stringify(expected)}`,
        score: 0,
        actual, expected, config
      }
    }
  })
  console.log(results)
  return results.reduce(({message, score}, cur) => ({message: message + ';' + cur.message, score: score + cur.score}), {message: '', score: 0})
}
