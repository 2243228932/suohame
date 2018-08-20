const Koa = require('koa');
const path = require('path');
const mime = require('mime');
const fs = require('mz/fs');
const SuperAgent = require('superagent');
var gzip = require('koa-gzip');

// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();

const app = new Koa();
const url = '/';
const dir = 'src';

app.use(gzip());
// log request URL:
app.use(async (ctx, next) => {
    let rpath = ctx.request.path;
    console.log(rpath);
    if (rpath.startsWith('/img')||rpath.startsWith('/js')||rpath.startsWith('/css')||rpath==='/') {
        if (rpath === '/') {
            rpath = '/index.html';
        }
        let fp = path.join(dir, rpath.substring(url.length));
        console.log(fp);
        if (await fs.exists(fp)) {
            ctx.response.type = mime.lookup(rpath);
            console.log(ctx.response.type);
            ctx.response.body = await fs.readFile(fp);
        } else {
            // 文件不存在:
            ctx.response.status = 404;
        }
    } else {
        // 不是指定前缀的URL，继续处理下一个middleware:
        await next();
    }
});

   



// add url-route:
router.get('/:name', async (ctx, next) => {
    if(ctx.params.name == 'usdt'){
    var res = await SuperAgent.get('https://data.gateio.io/api2/1/candlestick2/eth_usdt');
        var data = res.text;
        data = JSON.parse(data);
        if(data && data.data){
            data.data[0][2]
        

            var resp = {USD:data.data[0][2]};
        }else{
        
            var resp = {USD:0};
        
        }
        console.log(resp);

        

        ctx.response.body = resp;
 
    
    }else{
    
    let rpath = '/index.html';
    let fp = path.join(dir, rpath.substring(url.length));
    console.log(fp);
    if (await fs.exists(fp)) {
        ctx.response.type = mime.lookup(rpath);
        console.log(ctx.response.type);
        ctx.response.body = await fs.readFile(fp);
    } else {
        ctx.response.status = 404;
    }
    }
});




// add router middleware:
app.use(router.routes());

app.listen(3000);
console.log('app started at port 3000...');
