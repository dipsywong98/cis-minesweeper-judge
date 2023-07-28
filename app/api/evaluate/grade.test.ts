import cloneDeep from "lodash/cloneDeep"
import { generateTestCases } from "../helpers/generateTestCase"
import { grade } from "./route"

const testCases = generateTestCases()

describe('grade', () => {
  describe('invalid response score 0', () => {
    it('response a string', () => {
      const {score} = grade('', [], [])
      expect(score).toEqual(0)
    })

    it('response an empty array', () => {
      const {score} = grade([], [], [])
      expect(score).toEqual(0)
    })

    it('incorrect number of responses', () => {
      const {score} = grade(testCases.output.slice(0, 3), testCases.output, testCases.configs)
      expect(score).toEqual(0)
    })
  })

  describe('valid response', () => {
    it('score 100 for expected output', () => {
      const {score} = grade(cloneDeep(testCases.output), testCases.output, testCases.configs)
      expect(score).toEqual(100)
    })

    it('wrong order is wrong', () => {
      const {score} = grade([[[1, 1], [0, 0]]], [[[0, 0], [1, 1]]], [testCases.configs[0]])
      expect(score).toEqual(0)
    })

    it('missing stuff is wrong', () => {
      const {score} = grade([[[0, 0]]], [[[0, 0], [1, 1]]], [testCases.configs[0]])
      expect(score).toEqual(0)
    })

    it('wrong coord is wrong', () => {
      const {score} = grade([[[0, 0], [1, 0]]], [[[0, 0], [1, 1]]], [testCases.configs[0]])
      expect(score).toEqual(0)
    })
  })
})