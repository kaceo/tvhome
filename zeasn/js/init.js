var environment = "https://smarttv.zeasn.tv/BluePortServlets/";
var keyCode = {
    406:"help",
    8:"back",
    37:"left",
    38:"up",
    39:"right",
    40:"down",
    13:"enter"
};
if(getCookie("categoryid")){
    categoryId = getCookie("categoryid");
}else{//    591d470af6b02be25ce40001
    categoryId = "591d470af6b02be25ce40001";
}
var dataSuccess = function (data) {
    new SmartTV({
        "data":data,
        "lang":data.datas.lang,
        "keyCode":keyCode
    })
};
if(getQueryString("productId")){
    productId = getQueryString("productId");
    addClass(getID("smartTv"),"smartTvA");
    addClass(getID("smartTv_f"),"smartTv_fA");
    getID("title").innerHTML = "Smart Tv"
}else{
    addClass(getID("smartTv"),"smartTv");
    addClass(getID("smartTv_f"),"smartTv_f");
    getPhilips();
}

var netConnectNum  = 0;
function netTimeout(state) {
    if(netConnectNum >= 2) return;
    setTimeout(function () {
        if(state == 0){
            getPhilips();
            netConnectNum++
        }
    },3000);
}
//getID("error").innerHTML = "usragent = "+navigator.userAgent;
if(navigator.userAgent.indexOf("Philips") >= 0 ){
    addClass(getID("smartTv"),"smartTv");
    addClass(getID("smartTv_f"),"smartTv_f");
    addClass(getID("exitBtn"),"exitBtn");
    addClass(getID("exitBtn_f"),"exitBtn_f");
}else{
    addClass(getID("smartTv"),"smartTvA");
    addClass(getID("smartTv_f"),"smartTv_fA");
    addClass(getID("exitBtn"),"exitBtnA");
    addClass(getID("exitBtn_f"),"exitBtn_fA");
}
//var environment = "https://acc-smarttv.zeasn.tv/BluePortServlets/";
//var environment = "https://smarttv.zeasn.tv/BluePortServlets/";

//https://dev-smarttv.zeasn.tv/BluePortServlets/linux/app/recommendApp?
// productId=106
// &categoryId=87946a9ec5eb11e7936b06bc92f2b7c5
// &iconId=1
// &screenShotResolution=
// &areaCode=LT&langCode=en
function getPhilips() {
    AjaxRequest({
//        "url" : "json/tsconfig.json",
//        "type":"GET",
        "url":""+environment+"linux/app/recommendApp?",
        "type":"post",
        "data":{
            "productId":67,
            "categoryId":categoryId,//45d0134b7e6211e79b6506bc92f2b7c5
            "iconId":"6",
            "screenShotResolution":"",
            "areaCode":country,
            "langCode":lang
        },
        "method":{
            "success":dataSuccess
        }
    });
}
