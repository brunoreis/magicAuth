import fileData from 'modules/jestReporter/out/jestResults'
import parseResultsFileData from './parseResultsFileData/parseResultsFileData'
import TestNodeList from './TestNodeList'

export default function JestReportPage() {
  // console.log(fileData)
  const result = parseResultsFileData(fileData)
  // console.log(result)
  // return <pre>{JSON.stringify(result,null,4)}</pre>
  return <TestNodeList nodes={result}/>;
}
