fs = require('fs');

class MyCustomReporter {
    constructor(globalConfig, options) {
      this._globalConfig = globalConfig;
      this._options = options;
    }
  
    onRunComplete(contexts, results) {
      const result = {
        globalConfig: this._globalConfig,
        options: this._options,
        contexts,
        results
      }
      fs.writeFile(
        './modules/jestReporter/out/jestResults.js', 
        `export default ${JSON.stringify(result)}`, 
        null, 
        () => {
          console.log("file saved")
        }
      )
    }
}


module.exports = MyCustomReporter;