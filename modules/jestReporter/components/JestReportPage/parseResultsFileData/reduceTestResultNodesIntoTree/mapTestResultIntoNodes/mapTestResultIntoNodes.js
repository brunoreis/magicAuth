import nodesFromName from "./nodesFromName"

export default (testResult) => { 
    const name = testResult.cleanFilePath + ' ' + testResult.fullName
    const nodeNames = nodesFromName(name)
    const fileNameIndex = testResult.cleanFilePath.split(' ').length - 1
    const testIndex = nodeNames.length - 1
    const nodes = nodeNames.map(
        (name, index) => {
            const node = { fullName : name }
            if(index < fileNameIndex) {
                node.type = 'folderPath'
            }
            else if(index === fileNameIndex) {
                node.type = 'file'
            }
            else if(index > fileNameIndex && index < testIndex) {
                node.type = 'namePath'
            }
            else if( index === testIndex) {
                node.type = 'testResult'
                node.testResult = testResult
            }
            return node
        }
    )
    return nodes
}
