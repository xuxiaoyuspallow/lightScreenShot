const fs = require('fs');

class Common {

    static getTaskUrls(taskFiles){
        const result = [];
        for(let fileName of taskFiles){
            const content = fs.readFileSync(fileName);
            const contentSplit = content.split('\n');
            for(let url of contentSplit){
                if(url){
                    result
                }
            }
        }
    }
}