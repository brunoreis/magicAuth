import data from 'modules/jestReporter/out/jestResults'
                  
export default function JestReportPage() {
  console.log({ data })
  return JSON.stringify(data);
}
