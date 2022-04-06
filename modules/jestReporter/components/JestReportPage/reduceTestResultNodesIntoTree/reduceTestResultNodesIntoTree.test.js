import mapTestResultIntoNodes from '../mapTestResultIntoNodes/mapTestResultIntoNodes';
import reduceTestResultNodesIntoTree from './reduceTestResultNodesIntoTree';
import { testResult,  expectedFourthIteration } from './testData';

describe('reducer', () => {
    it('should reduce the test result nodes into a node tree', () => {
      const testResultNodes = mapTestResultIntoNodes(testResult);
      const nestedNodes = []
      const newNestedNodes = reduceTestResultNodesIntoTree(nestedNodes, testResultNodes);
      expect(newNestedNodes).toStrictEqual(expectedFourthIteration)
  })
});

