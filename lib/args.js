const path = require('path');
const fs = require('fs');

const uuid = require('uuid');

const common = require('./common');
const screenShot = require('./screenshot');



class Args {
    constructor(argsArray){
        this.argsObj = Args.parseRawProcessArgs(argsArray);
        this.necessaryCommands = ['f','file','u','url','out','o','p','port']
    }

    static help(){
        const text = [
            'Usage: node screenShot.js <command>',
            'Command Lists:',
            '-h --help: print help message',
            '-u --url <url>: screenshot for single url',
            '-p --port <url>: ports, multi ports: port1,port2',
            '-f --file <filePath>: screenshot for list of urls in a file, split by "\\n".If there are multi files, concat filename ' +
            'with comma, like "node screenShot.js -f file1,file2,file3"',
            '-o --out <outputDirectory>, default output in current "result/" directory'
        ].join('\n');
        console.log(text)
    }

    static parseRawProcessArgs(argsArray){
        if(argsArray.length <= 2 || (argsArray.length === 3 && (argsArray[2] === '-h' || argsArray[2] === '--help'))){
            Args.help();
            process.exit(0)
        }
        let argObj = {};
        for(let i=0; i<argsArray.length;i++){
            if(i === 0 || i === 1 || i%2)continue;
            if(i <= argsArray.length - 2){
                argObj[argsArray[i].replace('-','')] = argsArray[i+1]
            }
        }
        return argObj
    }

    async main(){
        const startTime = Date.now();
        let singleUrl = '';
        let filePaths = [];
        let ports = [80,443];
        let outputDirectory = path.resolve(__dirname,'../result/');
        let tasks = [];
        for(let key in this.argsObj){
            if(this.necessaryCommands.indexOf(key) === -1)continue;
            if(key === 'u' || key === 'url'){
                singleUrl = this.argsObj[key]
            }else if(key === 'f' || key === 'file'){
                filePaths = this.argsObj[key].split(',')
            }else if(key === 'p' || key === 'port'){
                ports = this.argsObj[key].split(',')
            }else if(key === 'o' || key === 'out'){
                outputDirectory = this.argsObj[key]
            }
        }
        outputDirectory = path.join(outputDirectory,uuid.v1());
        if (! fs.existsSync(outputDirectory)){
            fs.mkdirSync(outputDirectory, { recursive: true })
        }
        if(singleUrl){
            tasks = [...common.formatUrl(singleUrl,ports),...tasks]
        }
        if(filePaths){
            tasks = [...common.getTaskUrls(filePaths,ports),...tasks]
        }
        tasks = common.taskSplit(tasks,200);
        let screenShots = new screenShot();
        await screenShots.init();
        for(let task of tasks){
            await Promise.all(task.map(async url =>{
                await screenShots.screenShot(url,outputDirectory)
            }));
        }
        console.log(`task completed`);
        const endTime = Date.now();
        const taskTime = (endTime- startTime)/1000;
        console.log(`task time: ${taskTime} seconds`);
        process.exit(0)
    }
}

async function main(argsArray){
    let args= new Args(argsArray);
    await args.main();
}


module.exports = main;