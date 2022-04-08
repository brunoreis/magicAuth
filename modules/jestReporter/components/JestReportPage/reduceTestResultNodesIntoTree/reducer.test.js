import reducer from './reducer';
import mapTestResultIntoNodes from '../mapTestResultIntoNodes/mapTestResultIntoNodes';
import {
  testResults,
  expectedFirstIteration,
  expectedSecondIteration,
  expectedThirdIteration,
  expectedFourthIteration,
  expectedFirstIterationForSecondTest,
  expectedSecondIterationForSecondTest,
  expectedThirdIterationForSecondTest,
  expectedFourthIterationForSecondTest
} from './testData';

describe('reducer', () => {
  describe('first test result', () => {
    const testResultNodes = mapTestResultIntoNodes(testResults[0]);
    describe('first iteration', () => {
      const nestedNodes = reducer([], testResultNodes[0]);
      it('should create one first level node', () => {
        expect(nestedNodes.length).toBe(1);
      });
      it('should create the correct node structure', () => {
        expect(nestedNodes).toStrictEqual(expectedFirstIteration);
      });
    });

    describe('second iteration', () => {
      const nestedNodes = reducer(expectedFirstIteration, testResultNodes[1]);

      it('should not alter the passed tree', () => {
        expect(expectedFirstIteration[0].nodes.length).toBe(0);
      });
      it('should create one nested second level node', () => {
        expect(nestedNodes[0].nodes.length).toBe(1);
      });
      it('create the correct node structure', () => {
        expect(nestedNodes).toStrictEqual(expectedSecondIteration);
      });
    });

    describe('third iteration', () => {
      const nestedNodes = reducer(expectedSecondIteration, testResultNodes[2]);

      it('should not alter the passed tree', () => {
        expect(expectedSecondIteration[0].nodes[0].nodes.length).toBe(0);
      });
      it('creates a nested node', () => {
        expect(nestedNodes[0].nodes[0].nodes.length).toBe(1);
      });

      it('create the correct node structure', () => {
        expect(nestedNodes).toStrictEqual(expectedThirdIteration);
      });
    });

    describe('fourth iteration', () => {
      const nestedNodes = reducer(expectedThirdIteration, testResultNodes[3]);
      it('should not alter the passed tree', () => {
        expect(expectedThirdIteration[0].nodes[0].nodes[0].nodes.length).toBe(
          0
        );
      });
      it('creates a nested node', () => {
        expect(nestedNodes[0].nodes[0].nodes[0].nodes.length).toBe(1);
      });
      it('create the correct node structure', () => {
        expect(nestedNodes).toStrictEqual(expectedFourthIteration);
      });
    });
  });
  describe.only('second test result', () => {
    const testResultNodes = mapTestResultIntoNodes(testResults[1]);
    describe('first iteration', () => {
      const nestedNodes = reducer(expectedFourthIteration, testResultNodes[0]);
      it('should keep one first level node', () => {
        expect(nestedNodes.length).toBe(1);
      });
      it('should create the correct node structure (no changes)', () => {
        expect(nestedNodes).toStrictEqual(expectedFirstIterationForSecondTest);
      });
    });

    describe('second iteration', () => {
      const nestedNodes = reducer(expectedFirstIterationForSecondTest, testResultNodes[1]);
      it('should create another second level node', () => {
        expect(nestedNodes[0].nodes.length).toBe(2);
      });
      it('should create the correct node structure', () => {
        expect(nestedNodes).toStrictEqual(expectedSecondIterationForSecondTest);
      });
    });

    describe('third iteration', () => {
      const nestedNodes = reducer(expectedSecondIterationForSecondTest, testResultNodes[2]);
      it('should create another third level node', () => {
        expect(nestedNodes[0].nodes[1].nodes.length).toBe(1);
      });
      it('should create the correct node structure', () => {
        expect(nestedNodes).toStrictEqual(expectedThirdIterationForSecondTest);
      });
    });

    describe.only('fourth iteration', () => {
      const nestedNodes = reducer(expectedThirdIterationForSecondTest, testResultNodes[3]);
     
      it('should create another fourth level node', () => {
        expect(nestedNodes[0].nodes[1].nodes[0].nodes.length).toBe(1);
      });
      it('should create the correct node structure', () => {
        expect(nestedNodes).toStrictEqual(expectedFourthIterationForSecondTest);
      });
    });

  });
});
