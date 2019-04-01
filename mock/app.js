const path = require('path');
const Koa = require('koa');
const Router = require('koa-router');
const static = require('koa-static');
// 有一些中间件的使用需要用到koa-convert
const convert = require('koa-convert');
// const views = require('koa-views');
// const session = require('koa-session-minimal');
const chalk = require('chalk');
const { getRequestData } = require('./utils');
const app = new Koa();
const router = new Router();
// cookie 的默认配置项
const defaulCcookieOpts = {
  domain: 'localhost',
  path: '/',
  maxAge: 10 * 60 * 1000,
  httpOnly: true,
  overwrite: false,
};
// 修改路径，当需要访问static目录下的文件时直接省略‘/static’路径
// 比如说访问static/images/3.jpg 直接使用 'http://localhost/images/3.jpg
app.use(convert(static(path.join(__dirname, '/static'))))
   .use(router.routes())
   .use(router.allowedMethods());


router.get('/api/userList', async (ctx, next) => {
  // if (ctx.get('if-none-match')) return ctx.status = 304;
  // ctx.cookies.set('id', 'shenxx123', defaulCcookieOpts);
  // ctx.set({
  //   'Cache-Control': 'no-cache',
  //   'ETag':  'shenxx123',
  // });
  // ctx.body = {
  //   code: '0',
  //   msg: 'success',
  //   resultData: [1,2,3,4,5],
  // };
  ctx.body = 'hello world';
});

router.post('/api/userInfo', async (ctx, next) => {
  const path = ctx.path;
  const reqData = await getRequestData(ctx);
  // ctx.cookies.set('id', 'shenxx123', defaulCcookieOpts);
  // ctx.status = 400;
  ctx.body = {
    code: '0',
    msg: 'success',
    resultData: {
      name: 'shenxuxiang',
      age: 200,
      sex: 'man',
    },
  };
});

app.listen(3001, () => {
  console.log(chalk.green('server start at the localhost 3001'));
})
