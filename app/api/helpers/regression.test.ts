import { generateTestCase } from "./generateTestCase"
import { deserialize, deserializeBinaryString, serialize } from "./serialize"
import { getTestCaseConfigs } from "./testCaseConfigs"

describe('regression test', () => {
  Array(10).fill('').flatMap(getTestCaseConfigs).flatMap(generateTestCase).forEach((testCase, id) => {
    it(`test case id - ${testCase.id} ${JSON.stringify(testCase.config)}`, () => {
      expect(testCase.mineString).toHaveLength(testCase.config.columns * testCase.config.rows)
      expect(testCase.mineString.split('').filter(char => char === '1')).toHaveLength(testCase.config.mines)
      const deserialized = deserialize(testCase.id)
      expect(deserialized).toHaveLength(testCase.config.columns * testCase.config.rows)
      expect(deserialized).toEqual(testCase.mineString)
    })
  })

  it('charCode 10100000', () => {
    const b64 = Buffer.from(String.fromCharCode(0b10100000)).toString('base64')
    expect(deserializeBinaryString(b64)).toEqual('10100000')
  })

  it('test example', () => {
    expect(serialize(5, 5, '1000000010000000110100000')).toEqual('NSw1LHdvRENnTU9RQUE9PQ==')
    expect(deserialize('NSw1LHdvRENnTU9RQUE9PQ==')).toEqual('1000000010000000110100000')
  })
})