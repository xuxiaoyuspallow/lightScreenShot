const fs = require('fs');


class Common {
    static formatUrl(url,ports=[80]){
        let results = [];
        if(!url.startsWith('http')){
            let temp_url = url;
            for(let port of ports){
                if(port == 443){
                    temp_url = `https://${url}`
                }else if(port && port != 80){
                    temp_url = `http://${url}:${port}`
                }else {
                    temp_url = `http://${url}`
                }
                results.push(temp_url)
            }
        }
        return results
    }

    static getTaskUrls(taskFiles,ports=[80,443]){
        let result = [];
        for(let fileName of taskFiles){
            const content = fs.readFileSync(fileName,'utf-8');
            const contentSplit = content.split('\n');
            for(let url of contentSplit){
                if(url){
                    url = url.trim();
                    result = [...Common.formatUrl(url,ports),...result]
                }
            }
        }
        return result
    }

    /**
     *  to avoid too many promise start at once
     * @param tasks
     * @param limitNum
     */
    static taskSplit(tasks,limitNum=10){
        let result = [];
        let temp = [];
        for (let i = 0; i < tasks.length; i++){
            temp.push(tasks[i]);
            if((i+1) % limitNum === 0 || i === tasks.length - 1){
                result.push(temp);
                temp = []
            }
        }
        return result
    }


    static randomString(length){
        let result = '';
        const characters = 'abcdefghijklmnopqrstuvwxyz';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}

module.exports = Common;