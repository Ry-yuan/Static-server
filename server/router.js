const router = function(app){
  // jsonp测试接口
  app.get('/api/jsonp',function(req,res){
    let data = {
      author:'ryuan',
      msg:'welcome'
    };
    let callback = req.query.callback;
    let dataStr = JSON.stringify(data);
    let str = callback+"("+dataStr+")";
    res.send(str);
  });

  app.get('/api/test',function(req,res){
    let data = req.query;
    data.code = 0;
    data.msg = 'success';
    res.json(data);
  });
}

module.exports = router;