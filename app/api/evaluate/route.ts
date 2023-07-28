import { NextRequest, NextResponse } from "next/server";
import { getTestCaseConfigs } from "../helpers/testCaseConfigs";
import { ITestCaseConfig, generateTestCase, generateTestCases } from "../helpers/generateTestCase";
import axios from "axios";
import zip from "lodash/zip";
import isEqual from 'lodash/isEqual'
import { every } from "lodash";
import config from "../helpers/systemConfig";

interface IEvaluateRequest {
  callbackUrl: string
  runId: string
  teamUrl: string
}

interface ICallbackRequest {
  runId: string
  score: number
  message: string
}

function isEvaluateRequest(payload: unknown | IEvaluateRequest): payload is IEvaluateRequest {
  return typeof payload === 'object'
    && payload !== null
    && 'teamUrl' in payload
    && 'callbackUrl' in payload
    && 'runId' in payload
}

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

export async function POST(req: Request) {
  const body = await req.json()
  if (!isEvaluateRequest(body)) {
    return 
  }
  const {callbackUrl, runId, teamUrl} = body
  const {input, output: expecteds, configs} = generateTestCases()
  try {
    const {data: actuals} = await axios.post(`${teamUrl.replace(/\/$/, '')}/minesweeper`, input)
    const {message, score} = grade(actuals, expecteds, configs)
    await axios.post(callbackUrl, {message, score, runId}, {headers: {Authorization: config.COORDINATOR_TOKEN}})
  } catch (e) {
    console.error(e)
    await axios.post(callbackUrl, {message: `Error occured - ${e}`, score: 0, runId}, {headers: {Authorization: config.COORDINATOR_TOKEN}})
  }
  return NextResponse.json({ result: 'ok' })
}