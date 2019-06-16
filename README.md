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
```
node screenshot.js -f  example.com.txt
```