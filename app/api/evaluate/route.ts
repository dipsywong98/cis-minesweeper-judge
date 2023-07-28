import { NextResponse } from "next/server";
import { generateTestCases } from "../helpers/generateTestCase";
import axios from "axios";
import config from "../helpers/systemConfig";
import { grade } from "./grade";

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
    const payload: ICallbackRequest = {message, score, runId}
    await axios.post(callbackUrl, payload, {headers: {Authorization: config.COORDINATOR_TOKEN}})
  } catch (e) {
    console.error(e)
    const payload: ICallbackRequest = {message: `Error occured - ${e}`, score: 0, runId}
    await axios.post(callbackUrl, payload, {headers: {Authorization: config.COORDINATOR_TOKEN}})
  }
  return NextResponse.json({ result: 'ok' })
}