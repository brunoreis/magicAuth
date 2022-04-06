export default (data) => {
    const rootDir = data.globalConfig.rootDir//?
    data.results.testResults.map(
        (fileTestResult) => {
            const filePath = fileTestResult.testFilePath
            console.log(filePath)
            fileTestResult.testResults.map(
                (testResult) => {
                    const fullName = testResult.fullName 
                    console.log(filePath + ' ' + fullName)
                    console.log(testResult)
                }
            )
        }
    )
    return "bola"

}