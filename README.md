### install
You have to have `Node > 10.0.0` and `npm` installed on your system.
Then clone this project:
```
git clone https://github.com/xuxiaoyuspallow/lightScreenShot.git
```
install dependence:  
```
cd lightScreenShot
npm install
```

Note: If you are in china or you download chromium slowly,
you may set puppeteer_download_host to taobao mirrors before run `npm install`:
```
npm config set puppeteer_download_host "https://npm.taobao.org/mirrors"
```

### usage
`node screenShot.js -h`
```
Usage: node screenShot.js <command>
Command Lists:
-h --help: print help message
-u --url <url>: screenshot for single url
-p --port <url>: ports, multi ports: port1,port2
-f --file <filePath>: screenshot for list of urls in a file, split by "\n".If there are multi files, concat filename with comma, like "node screenShot.js -f file1,file2,file3"
-o --out <outputDirectory>, default output in current "result/" directory

```