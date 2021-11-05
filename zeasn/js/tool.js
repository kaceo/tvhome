/**
 * Created by jacyeli on 2017/11/22.
 */
function clearCookie(){
    var keys=document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i = keys.length; i--;)
            document.cookie=keys[i]+'=0;expires=' + new Date(0).toUTCString()
    }
}
//clearCookie();
function addClass(obj, cls){
    var isExit = hasClass(obj, cls); //判断是否存在这个class ，不存在就添加
    if(!isExit){
        var obj_class = obj.className,//获取 class 内容.
            blank = (obj_class != '') ? ' ' : '';//判断获取到的 class 是否为空, 如果不为空在前面加个'空格'.
        added = obj_class + blank + cls;//组合原来的 class 和需要添加的 class.
        obj.className = added;//替换原来的 class.
    }
}

function removeClass(obj, cls){
    var isExit = hasClass(obj, cls); //判断是否存在这个class ，不存在就添加
    if(isExit){
        var obj_class = ' '+obj.className+' ';//获取 class 内容, 并在首尾各加一个空格. ex) 'abc    bcd' -> ' abc    bcd '
        obj_class = obj_class.replace(/(\s+)/gi, ' '),//将多余的空字符替换成一个空格. ex) ' abc    bcd ' -> ' abc bcd '
            removed = obj_class.replace(' '+cls+' ', ' ');//在原来的 class 替换掉首尾加了空格的 class. ex) ' abc bcd ' -> 'bcd '
        removed = removed.replace(/(^\s+)|(\s+$)/g, '');//去掉首尾空格. ex) 'bcd ' -> 'bcd'
        obj.className = removed;//替换原来的 class.
    }
}

function hasClass(obj, cls){
    if(obj != null){
        var obj_class = obj.className,//获取 class 内容.
            obj_class_lst = obj_class.split(/\s+/);//通过split空字符将cls转换成数组.
        x = 0;
        for(x in obj_class_lst) {
            if(obj_class_lst[x] == cls) {//循环数组, 判断是否包含cls
                return true;
            }
        }
    }
    return false;
}
function getID(param){
    return document.getElementById(param);
}
function getStyle(obj,name){
    return obj.currentStyle ? obj.currentStyle[name] : window.getComputedStyle(obj,null)[name]; //浏览器兼容性处理，注意getComputedStyle为只读属性
}
function setBackground(id,url){
    var node = getID(id);
    node.style.background = "url("+url+") no-repeat";
    node.style.backgroundSize = "100% 100%";
}
function loadingImage(node,url,errorUrl){
    var img = new Image();
    img.src = url;
    if(errorUrl.indexOf("#") > 0){
        node.style.backgroundColor = errorUrl;
    }else{
        node.style.background = "url("+errorUrl+") no-repeat";
        node.style.backgroundSize = "100% 100%";
    }
    img.onload = function () {
        img.onload  = null;
        imgCallback(node,url);
    };
    img.onerror = function(){
        imgCallback(node,errorUrl);
    };
    function imgCallback(obj,imgURl) {
        obj.style.background = "url("+imgURl+") no-repeat";
        obj.style.backgroundSize = "100% 100%";
    }
}
/*退出launcher
 *cmd = 1 : only exit launcher
 *cmd = 2 : open App , after exit launcher
 *cmd = 3 : open Setting , after exit launcher
 *
 * */
//打开视屏 App webApp Url
var DebugLog = function(str) {
    var $error = document.querySelector("#error");
    $error.innerHTML = str;
};
function exitLauncher(cmd) {
    try{//exit_zeasn_launcher
        sraftv.setParam("exit_zeasn_launcher",cmd,function (res) {
            //DebugLog("exit_zeasn_launcher return="+JSON.stringify(res));
            consolo.log("exit_zeasn_launcher return="+JSON.stringify(res));
        })
    }catch(e){
        //DebugLog("sraftv exit_zeasn_launcher " + e.message);
        console.log("sraftv exit_zeasn_launcher " + e.message);
    }
}
function  sraf_release_focus() {
    try{//sraf_release_focus
        sraftv.setParam("sraf_release_focus",function (res) {
            //DebugLog("sraf_release_focus return= "+JSON.stringify(res));
        })
    }catch(e){
        console.log("sraftv sraf_release_focus " + e.message);
    }
}
function  sraf_request_focus() {
    try{// sraf_request_focus
        sraftv.setParam("sraf_request_focus",function (res) {
            //DebugLog("sraf_request_focus return= "+JSON.stringify(res));
        })
    }catch(e){
        console.log("sraftv sraf_request_focus " + e.message);
    }
}
function sraf_lite_client_show() {
    try{//sraf_lite_client_show
        sraftv.setParam("sraf_lite_client_show",function (res) {
            //DebugLog("sraf_lite_client_show return= "+JSON.stringify(res));
        })
    }catch(e){
        console.log("sraftv sraf_lite_client_show " + e.message);
    }
}
function sraf_lite_client_hide() {
    try{// sraf_lite_client_hide
        sraftv.setParam("sraf_lite_client_hide",function (res) {
            //DebugLog("sraf_lite_client_hide return= "+JSON.stringify(res));
        })
    }catch(e){
        console.log("sraftv sraf_lite_client_hide " + e.message);
    }
}

//获取launcher的URL
function get_launcherURL() {
    try{
        sraftv.getParam("get_launcherURL",function (res) {
            //DebugLog("get_launcherURL return="+JSON.stringify(res));
            if(res.value != 'error'){
                window.location.href = res.value;
            }
        })
    }catch(e){
        console.log("sraftv exit_launcher" + e);
    }
}

//get_SystemLanguage();
//封装ajax函数
function AjaxRequest(param) {
    var opt = {};
    opt.method = param.type.toUpperCase() || 'POST';
    opt.url = param.url || '';
//	opt.async = param.async || true;
    opt.async = true;
    opt.data = param.data || null;
    opt.beforeSend = param.method.beforeSend || function () {};
    opt.success = param.method.success || function () {};
    opt.afterSend = param.method.afterSend || function () {};
    opt.error = param.method.error || function () {};
    opt.beforeSend();
    var xmlHttp = null;
    if (XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    }else{
        xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
    }
    var params = [];
    for (var key in opt.data){
        params.push(key + '=' + opt.data[key]);
    }

    var postData = params.join('&');

    if (opt.method.toUpperCase() === 'POST') {
        xmlHttp.open(opt.method, opt.url, opt.async);
        xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        xmlHttp.send(postData);
    }else if (opt.method.toUpperCase() === 'GET') {
        xmlHttp.open(opt.method, opt.url + '?' + postData, opt.async);
        xmlHttp.send(null);
    }
    xmlHttp.onreadystatechange = function () {

        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            opt.success(JSON.parse(xmlHttp.responseText));
            opt.afterSend();
        }else{
            if(xmlHttp.readyState == 4){
                console.log(opt.url +"?"+postData+" is error httpStatus " + xmlHttp.status);
            }
        }
    };
}
//封装断网的提示
function tipNetWork() {
    var nodeTip = document.querySelector("#net_error");
    nodeTip.style.display = "block";
    setTimeout(function () {
        nodeTip.style.display = "none";
    },2000)
}
function getCookie(name)
{
    //DebugLog("Cookie= "+document.cookie);
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var reg_rewrite = new RegExp("(^|/)" + name + "/([^/]*)(/|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    var q = window.location.pathname.substr(1).match(reg_rewrite);
    if(r != null){
        return unescape(r[2]);
    }else if(q != null){
        return unescape(q[2]);
    }else{
        return null;
    }
}

function startMove(obj,json,speedinfo,timerSpeed,fnEnd){ //移动函数
    clearInterval(obj.timer);   //先清除之前的定时器
    obj.timer = setInterval(function(){
        var bStop = true;   // 假设所有的值都到了
        for( var attr in json ){    //遍历json属性
            var cur = (attr === 'opacity') ? Math.round(parseFloat(getStyle(obj,attr))*100) : parseInt(getStyle(obj,attr)); //对opacity 特殊处理
            var speed = (json[attr] - cur)/speedinfo; //缓存参数决定了执行的次数
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);    //speed 数字转化，防止不能到达目标的bug
            //console.log(cur,json[attr],speed);
            if( cur !== json[attr]) bStop = false;   //如果没有达到目标值，则bStop设为false;
            if(attr === 'opacity'){
                obj.style.filter = 'alpha(opacity='+ (cur + speed) +')';
                obj.style.opacity = (cur + speed)/100;
            }else{
                obj.style[attr] = cur + speed + 'px';
            }
        }
        if(bStop){
            clearInterval(obj.timer);
            if(fnEnd) fnEnd();   //执行回调函数
        }
    },timerSpeed);
}
function animate1(obj,data,time,fn) {
    //保存初始值和变化值
    var start = {};
    var dis = {};

    for(var name in data){
        //获取样式，根据属性名保存在json中，{width:200,height:200}
        start[name] = parseFloat( (obj.currentStyle || getComputedStyle(obj,null) )[name]);
        //变化值 = 目标值 - 初始值  ----> {width:500,height:300}
        dis[name] = data[name] - start[name];
    }
    for(var name in data){
        //对特殊属性进行判断
        if(name == "opacity"){
            obj.style.opacity = data[name];
            obj.style.filter = "alpha(opacity:"+data[name]*100+")";
        } else {
            obj.style[name] = data[name] + "px";
        }
    }
}
function animate2(obj,data,time,fn){//运动对象，运动数据，[运动时间]，[回调函数]
    //保存初始值和变化值
    var start = {};
    var dis = {};

    for(var name in data){
        //获取样式，根据属性名保存在json中，{width:200,height:200}
        start[name] = parseFloat( (obj.currentStyle || getComputedStyle(obj,null) )[name]);
        //变化值 = 目标值 - 初始值  ----> {width:500,height:300}
        dis[name] = data[name] - start[name];
    }

    //根据完成的时间获得运动次数，30为定时器频率
    var count = Math.round((time || 700)/30);

    //记录已经运动次数
    var n = 0;
    //将定时器绑定在对象身上，如果不同对象调用不会清除之前的运动
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){

        n++;
        for(var name in data){
            //位置:起点 + 距离/次数*n
            var cur = start[name] + dis[name] / count * n;

            //对特殊属性进行判断
            if(name == "opacity"){
                obj.style.opacity = cur;
                obj.style.filter = "alpha(opacity:"+cur*100+")";
            } else {
                obj.style[name] = cur + "px";
            }
        }

        //如果已经运动次数和总次数相等，则完成运动，清除定时器，执行回调函数
        if(n == count){
            clearInterval(obj.timer);
            fn && fn.call(obj);
        }

    },30);
}