export interface ITestCaseConfig {
  rows: number
  columns: number
  mines: number
  score: number
}

export interface TestCase {
  id: string
  mineString: string
  positions: number[][]
  config: ITestCaseConfig
}

import sampleSize from 'lodash/sampleSize'
import { serialize } from './serialize'

export const generateTestCase = (config: ITestCaseConfig): TestCase => {
  const {rows, columns, mines} = config
  const indexArray = Array(rows * columns).fill('').map((_, k) => k)
  const mineIndices = sampleSize(indexArray, mines)
  const mineIndicesSet = new Set(mineIndices)
  const mineString = Array(rows * columns).fill('0').map((_, k) => mineIndicesSet.has(k) ? '1' : '0').join('')
  const minePositions = mineIndices.map((k) => [Math.floor(k / columns), k % columns]).sort((a, b) => a[1] - b[1]).sort((a, b) => a[0] - b[0])

  return {
    id: serialize(rows, columns, mineString),
    mineString,
    positions: minePositions,
    config
  }
}

import { getTestCaseConfigs } from "./testCaseConfigs"
import config from "./systemConfig";


export function generateTestCases() {
  const configs = getTestCaseConfigs()
  const testCases = configs.map(generateTestCase)
  const json = {
    input: testCases.map((testCase) => `${config.MINESWEEPER_UI_URL}/#${testCase.id}`),
    mineString: testCases.map(testCase => testCase.mineString),
    output: testCases.map((testCase) => testCase.positions),
    configs,
  }
  return json
}