import * as LZUTF8 from 'lzutf8'
import { NextResponse } from 'next/server';
import config from '../helpers/systemConfig';
import { notFound } from 'next/navigation';

const getPad = (binLen: number) => {
  return Array(Math.ceil(binLen / 8) * 8 - binLen).fill('0').join('');
}

const deserializeBinaryString = (b64: string) => {
  const bin = Buffer.from(b64, 'base64').toString()
    .split('')
    .map(function (x) {
      return ('0000000' + x.charCodeAt(0).toString(2)).slice(-8);
    })
    .join('');
  return bin
}

export const deserialize = (packed: string) => {
  const [rowsS, colsS, flagsS] = LZUTF8.decompress(packed, { inputEncoding: 'Base64' }).split(',')
  const rows = Number.parseInt(rowsS)
  const cols = Number.parseInt(colsS)
  const pad = getPad(rows * cols)
  const flags = deserializeBinaryString(flagsS)
  return flags.replace(RegExp(`${pad}$`), '').split('').map((char, k) => char === '1' ? [Math.floor(k / cols), k % cols] : null).filter(p => !!p)
}

export async function POST (req: Request) {
  if (!config.ENABLE_FAKE_STUDENT) {
    return notFound()
  }
  const body = await req.json()
  const positions = body.map((link: string) => {
    const [,id] = link.split('#')
    return deserialize(id)
  })
  return NextResponse.json(positions)
}
