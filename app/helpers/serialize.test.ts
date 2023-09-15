import { deserialize, serialize } from "./serialize"

describe('serialize', () => {
  it('sample1', () => {
    expect(serialize(2, 2, '1001')).toEqual('MiwyLHdwQT0=')
  })

  it('sample2', () => {
    expect(serialize(3, 4, '101001000000')).toEqual('Myw0LHdxUUE=')
  })
})

describe('deserialize', () => {
  it('sample1', () => {
    expect(deserialize('MiwyLHdwQT0=')).toEqual([2,2,'1001'])
  })

  it('sample2', () => {
    expect(deserialize('Myw0LHdxUUE=')).toEqual([3,4,'101001000000'])
  })
})