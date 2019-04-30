const fs = require("fs");

module.exports = (dataFile) => {

    function getJson() {
        return new Promise( (resolve,reject) => {
            fs.readFile(dataFile,'utf-8',(err,data) => {
                if(err) {
                    reject('Missing file');
                }
                else {
                    try {
                        let d = JSON.parse(data);
                        resolve(d);
                    }
                    catch(e) {
                        reject('Inavlid JSON');
                    }
                }
            });
        });
    }

    function storeJson(data) {
        return new Promise( (resolve,reject) => {
            fs.writeFile(dataFile,JSON.stringify(data), (err) => {
                if(err) {
                    reject('can not write file');
                }
                else {
                    resolve(data);
                }
            });
        });
    }

    return {
        get: getJson,
        set: storeJson
    }

}