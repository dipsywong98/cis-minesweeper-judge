import { randomInt } from "crypto";
import { ITestCaseConfig } from "./generateTestCase";

export const getTestCaseConfigs  = (): ITestCaseConfig[] => {
  return ([] as ITestCaseConfig[]).concat(
  Array(5).fill('').map(() => ({
    cols: 5,
    rows: 5,
    mines: 5,
    score: 2
  })),
  Array(2).fill('').map(() => ({
    cols: 9,
    rows: 9,
    mines: 10,
    score: 5
  })),
  
  Array(10).fill('').map(() => {
    const cols = randomInt(16, 61)
    const rows = randomInt(16, 33)
    const nCells = cols * rows
    const mines = Math.floor((nCells - 256) * (99-40)/(480-256) + 40)
    return {
      cols,
      rows,
      mines,
      score: 8
    }
  }))
}
