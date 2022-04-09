import mapTestResult from './mapTestResult/mapTestResult'
import reduceTestResultNodesIntoTree from './reduceTestResultNodesIntoTree/reduceTestResultNodesIntoTree';


export default (fileData) => {
    const fileResults = fileData.results
    const rootDir = fileData.globalConfig.rootDir
    const testResults = fileResults.testResults
    const mappedTests = testResults.reduce( 
        (concateneted, testResult) => {
            const mapped = mapTestResult(testResult, rootDir) 
            return concateneted.concat(mapped)
        }, 
        []
    ) ;
    const initialNestedNodes = []
    return reduceTestResultNodesIntoTree(initialNestedNodes, mappedTests);
}