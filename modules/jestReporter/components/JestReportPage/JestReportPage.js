import data from 'modules/jestReporter/out/jestResults'
                  
export default function JestReportPage() {
  console.log({ data })
  return JSON.stringify(data);
}

// let testNode = [
//     {
//         fullNodeName: "modules app components AppWithModulesHocs.test.js",
//         nodeName: "modules app components AppWithModulesHocs.test.js",
//         testFilePath: 'modules/app/components/AppWithModulesHocs.test.js',
//         type: "file",
//         fullName: null,
//         title: null,
//         name: "modules",
//         fileTestResult: null,
//         testResult: null,
//         nodes: [
//             {
//                 fullNodeName: "modules app components AppWithModulesHocs.test.js AppWithModulesHocs",
//                 nodeName: "AppWithModulesHocs",
//                 testFilePath: 'modules/app/components/AppWithModulesHocs.test.js',
//                 type: "path",
//                 fullName: "",
//                 title: "",
//                 fileTestResult: null,
//                 testResult: null,
//                 nodes: [
//                     {
//                         fullNodeName: "modules app components AppWithModulesHocs.test.js AppWithModulesHocs renders successfully (this adds the modules hocs)",
//                         nodeName: "renders successfully (this adds the modules hocs)",
//                         testFilePath: 'modules/app/components/AppWithModulesHocs.test.js',
//                         type: "result",
//                         title: "renders successfully (this adds the modules hocs)",
//                         fullName: "AppWithModulesHocs renders successfully (this adds the modules hocs)",
//                         name: "login",
//                         nodes: null,
//                         fileTestResult: {},
//                         testResult: null,
//                     }
//                 ],
//             }
//         ],
//     },
// ]