import { NextResponse } from "next/server";
import { generateTestCases } from "../helpers/generateTestCase"
import pick from "lodash/pick";


export async function GET() {
  return NextResponse.json(pick(generateTestCases(), 'input', 'output'))
}