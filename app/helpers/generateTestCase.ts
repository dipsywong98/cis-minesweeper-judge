export interface ITestCaseConfig {
  rows: number
  cols: number
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
import { deserialize, serialize } from './serialize'

export const generateTestCase = (config: ITestCaseConfig): TestCase => {
  const {rows, cols, mines} = config
  const indexArray = Array(rows * cols).fill('').map((_, k) => k)
  const mineIndices = sampleSize(indexArray, mines)
  const mineIndicesSet = new Set(mineIndices)
  const mineString = Array(rows * cols).fill('0').map((_, k) => mineIndicesSet.has(k) ? '1' : '0').join('')
  const minePositions = mineIndices.map((k) => [Math.floor(k / cols), k % cols]).sort((a, b) => a[1] - b[1]).sort((a, b) => a[0] - b[0])

  return {
    id: serialize(rows, cols, mineString),
    mineString,
    positions: minePositions,
    config
  }
}

export const getHardcodedTestCase = (score: number): TestCase => {
  const id = 'MzAsMzIsQcQBQjg4dzczQ21COSvFCEFObU1jS1lBMll4dzVnRFpqSETGFE/GFDfFFEN1xig0TcQUcmd6xBRtRMdEQjTGVMVhxgFERy9EaDhPxQhyOE9nREd4c1lBeHNiQUFNYkd3xRhqxyBwxiBnxCBZR8QgQscwxTx2dzZBSHc0xlDGAT09'
  const [rows, cols, mineString] = deserialize(id)
  const positions: number[][] = mineString.split('').flatMap((char, k) => char === '1' ? [[Math.floor(k / cols), k % cols]] : []).filter(p => !!p)
  return {
    id,
    positions,
    mineString,
    config: {
      rows,
      cols,
      mines: positions.length,
      score
    }
  }
}

import { getTestCaseConfigs } from "./testCaseConfigs"
import config from "./systemConfig";


export function generateTestCases() {
  const testCases = getTestCaseConfigs().map(generateTestCase)
  testCases[testCases.length - 1] = getHardcodedTestCase(testCases[testCases.length - 1].config.score)
  const json = {
    input: testCases.map((testCase) => `${config.MINESWEEPER_UI_URL}/#${testCase.id}`),
    output: testCases.map((testCase) => testCase.positions),
    configs: testCases.map((testCase) => testCase.config),
  }
  return json
}