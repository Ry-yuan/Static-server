/**
 * author:Ry-yuan
 * description:This A Jsonp Module 
 */

(function(window,undefined){
  function paramsFormat(paramsObj){
    var paramsArr = [];
    for(key in paramsObj){
      var paramsitem = key+'='+paramsObj[key];
      paramsArr.push(paramsitem);
    }
    return paramsArr.join('&');
  }

  // 合并参数对象
  function mergeOption(newOptions , defaultOptions){
    for(key in defaultOptions){
      if(!newOptions[key]){
        newOptions[key] = defaultOptions[key];
      }
    }
  }

  //生成随机callback名
  function randomCallbackName(){
    return ('jsonp_' + Math.random()).replace('.', '');
  }

  /**
   *
   *
   * @param {String} url 请求地址
   * @param {Object} options 参数对象
   * options{
   *  @param {number} timeout 设置超时时间
   *  @param {String} callback 设置callback字段名
   *  @param {Object} params 参数对象
   *  @param {Function} success 成功回调函数  
   *  @param {Function} error 失败回调函数  
   * }
   */
  function ryJsonp(url, options) {
    var defaultOptions = {
      timeout: 5000,
      callback: 'callback',
      params:{},
      success:function(){},
      error:function(){}
    }
    
    // 合并参数对象
    mergeOption(options,defaultOptions);

    //无url，抛出异常
    if (!url) {
      throw new Error('url参数错误');
    }

    // 回调函数名随机生成，并动态生成script，发送请求
    var callbackName = randomCallbackName();
    var headElem = document.getElementsByTagName('head')[0];
    options.params[options.callback] = callbackName;
    var params = paramsFormat(options.params);
    var scriptElem = document.createElement('script');
    headElem.appendChild(scriptElem);
    scriptElem.src = url + '?' + params;

    // 设置定时器，请求超时报错
    var timer = setTimeout(function () {
      headElem.removeChild(scriptElem);
      clearTimeout(timer);
      window[callbackName] = null;
      var errMsg = 'Request Timeout';
      options.error && options.error(errMsg);
    }, options.timeout)

    // 全局回调函数
    window[callbackName] = function (json) {
      headElem.removeChild(scriptElem);
      clearTimeout(timer);
      window[callbackName] = null;
      options.success && options.success(json);
    }
  }

  //暴露到全局
  window.ryJsonp = ryJsonp;
}(window,undefined));