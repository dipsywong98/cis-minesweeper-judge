import * as LZUTF8 from 'lzutf8'


const getPad = (binLen: number): string => {
  return Array(Math.ceil(binLen / 8) * 8 - binLen).fill('0').join('');
}


const serializeBinaryString = (bin: string) => {
  const pad = getPad(bin.length)
  const padded = bin+pad
  if (padded.length % 8 !== 0) {
    throw new Error('failed at padding to length 8')
  }
  return Buffer.from(
      padded
        .match(/(.{8})/g)
        ?.map(function (x) {
          return String.fromCharCode(parseInt(x, 2));
        })
        .join('') ?? ''
    ).toString('base64');
}

export const serialize = (rows: number, cols: number, mineBinaryString: string) => {
  // return [rows, cols, serializeBinaryString(mineBinaryString)].join(',')
  return LZUTF8.compress([rows, cols, serializeBinaryString(mineBinaryString)].join(','), {outputEncoding: 'Base64'})
}


export const deserializeBinaryString = (b64: string) => {
  const bin = Buffer.from(b64, 'base64').toString()
    .split('')
    .map(function (x) {
      return ('0000000' + x.charCodeAt(0).toString(2)).slice(-8);
    })
    .join('');
  return bin
}

export const deserialize = (packed: string): [number, number, string] => {
  const [rowsS, colsS, flagsS] = LZUTF8.decompress(packed, { inputEncoding: 'Base64' }).split(',')
  // const [rowsS, colsS, flagsS] = packed.split(',')
  const rows = Number.parseInt(rowsS)
  const cols = Number.parseInt(colsS)
  const pad = getPad(rows * cols)
  const flags = deserializeBinaryString(flagsS)
  return [rows, cols, flags.replace(RegExp(`${pad}$`), '')]
}
