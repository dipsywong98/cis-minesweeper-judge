import { NextResponse } from "next/server";
import { generateTestCases } from "../helpers/generateTestCase";
import axios, { AxiosError } from "axios";
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
  console.log('recieved evaluation request', body)
  if (!isEvaluateRequest(body)) {
    return NextResponse.json({ result: 'ok' })
  }
  const {callbackUrl, runId, teamUrl} = body
  const {input, output: expecteds, configs} = generateTestCases()
  
  const payload = await axios.post(`${teamUrl.replace(/\/$/, '')}/minesweeper`, input, {timeout: config.GRADE_TIMEOUT_SECOND * 1000})
  .then(({data: actuals}) => {
    const {message, score} = grade(actuals, expecteds, configs)
    const payload: ICallbackRequest = {message, score, runId}
    console.log('responding evaluation request', payload)
    return payload
  })
  .catch((e: AxiosError) => {
    console.error(e)
    const payload: ICallbackRequest = {message: `Error occured - ${e}`.replace('AxiosError', 'Error in participant server'), score: 0, runId}
    return payload
  })
  console.log('responding evaluation request', payload)
  await axios.post(callbackUrl, payload, {headers: {Authorization: config.COORDINATOR_TOKEN}})
  return NextResponse.json({ result: 'ok' })
}