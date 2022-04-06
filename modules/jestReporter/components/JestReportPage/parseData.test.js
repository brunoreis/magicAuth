import data from 'modules/jestReporter/out/jestResults'
import parseData from './parseData'

it('should nest jest results', () => {
    const result = parseData(data)
    expect(result).toBe('dude')
})