import { NextResponse } from "next/server";
import { generateTestCases } from "../helpers/generateTestCase"
import pick from "lodash/pick";


export async function POST(req: Request) {
  return NextResponse.json(await req.json())
}