function getRequestData(ctx) {
  return new Promise((resolve, reject) => {
    try {
      const req = ctx.req;
      let reqData  = '';
      req.addListener('data', function(data) {
        reqData += data;
      });
      req.addListener('end', function() {
        return resolve(JSON.parse(reqData));
      });
    } catch (err) {
      resolve(err);
    }

  })
};

module.exports = {
  getRequestData,
}
