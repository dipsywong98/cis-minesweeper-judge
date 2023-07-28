import { NextResponse } from "next/server";
import { generateTestCases } from "../helpers/generateTestCase"


export async function GET() {
  return NextResponse.json(generateTestCases())
}