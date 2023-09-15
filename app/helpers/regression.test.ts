import { TestCase, generateTestCase, getHardcodedTestCase } from "./generateTestCase"
import { deserialize, deserializeBinaryString, serialize } from "./serialize"
import { getTestCaseConfigs } from "./testCaseConfigs"

const verifyTestCase = (testCase: TestCase) => {
  it(`test case id - ${testCase.id} ${JSON.stringify(testCase.config)}`, () => {
    expect(testCase.mineString).toHaveLength(testCase.config.cols * testCase.config.rows)
    expect(testCase.mineString.split('').filter(char => char === '1')).toHaveLength(testCase.config.mines)
    const deserialized = deserialize(testCase.id)[2]
    expect(deserialized).toHaveLength(testCase.config.cols * testCase.config.rows)
    expect(deserialized).toEqual(testCase.mineString)
  })
}

describe('regression test', () => {
  Array(10).fill('').flatMap(getTestCaseConfigs).flatMap(generateTestCase).forEach(verifyTestCase)
  verifyTestCase(getHardcodedTestCase(0))

  it('charCode 10100000', () => {
    const b64 = Buffer.from(String.fromCharCode(0b10100000)).toString('base64')
    expect(deserializeBinaryString(b64)).toEqual('10100000')
  })

  it('test example', () => {
    expect(serialize(5, 5, '1000000010000000110100000')).toEqual('NSw1LHdvRENnTU9RQUE9PQ==')
    expect(deserialize('NSw1LHdvRENnTU9RQUE9PQ==')).toEqual([5, 5, '1000000010000000110100000'])
  })
})