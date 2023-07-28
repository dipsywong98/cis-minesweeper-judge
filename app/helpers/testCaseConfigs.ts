import { randomInt } from "crypto";
import { ITestCaseConfig } from "./generateTestCase";

export const getTestCaseConfigs  = (): ITestCaseConfig[] => {
  return ([] as ITestCaseConfig[]).concat(
  Array(5).fill('').map(() => ({
    columns: 5,
    rows: 5,
    mines: 5,
    score: 2
  })),
  Array(2).fill('').map(() => ({
    columns: 9,
    rows: 9,
    mines: 10,
    score: 5
  })),
  
  Array(8).fill('').map(() => ({
    columns: randomInt(16, 61),
    rows: randomInt(16, 33),
    mines: 10,
    score: 10
  })))
}
