/*
document.addEventListener("PlayStarted", function (e) {// 广告开始播放
  if (document.getElementById('SmartHome_video') != null) {
    document.getElementById('SmartHome_video').classList.remove("no-focus")
    document.getElementById('SmartHome_video').style.background = "#000"
  }
},false);
document.addEventListener("PlayFinished", function (e) {// 广告结束播放
  var videoObject = document.getElementById('SmartHome_video');
  if (videoObject != null && videoObject.childNodes.length === 0) videoObject.parentNode.removeChild(videoObject);
  if (videoObject != null) videoObject.remove();
  document.getElementById('SmartHome_5_300x250').style.display = 'block'
}, false);
*/


var str = "";
if (navigator.userAgent.indexOf("aoc") > -1 || navigator.userAgent.indexOf("AOC") > -1) {
    str = "AOC_"
}

var country,lang = "en",manufacturerid,ctn,categoryId,productId;
if(fetchCookie("country")){
    country = fetchCookie("country");
}else{ //"AU"
    country = "BR";}
if(fetchCookie("manufacturerid")){
    manufacturerid = fetchCookie("manufacturerid");
}else{
    manufacturerid = "0008c6";
}
if(fetchCookie("profileid")){
    ctn = fetchCookie("profileid").split("_")[0];
}else{
    ctn = "32PHT5102/98";
}



var array = [];
var _str = "";
for (var i = 0; i < 5; i++) {
  array.push(str + "SmartHome_" + (i + 1) + "_300x250")
  var hideStr = (i==4 && str != "AOC_")?'style=display:none':''
  _str += "<a id='" + str + "SmartHome_" + (i + 1) +
    "_300x250' area='banner'  class='banner_list mouseSelected'"+hideStr+">" +
    "<div class ='shade banner_shade'></div>" +
    "<a name='" + str + "SmartHome_" + (i + 1) +
    "_300x250' class='advImgBox'></a>" +
    "</a>";
}
if(str != "AOC_"){
  _str += "<a id='" + str + "SmartHome_video" +
    "'area='banner'  class='banner_list mouseSelected no-focus'></a>"
}

console.log(_str);
document.getElementById('banner').innerHTML = _str;

var param =
  "cntry=" + country +
  "&lang=" + lang +
  "&manid=" + manufacturerid +
  "&ctn=" + ctn + "";

var j = 0,
  advTimer = null;
if (str != "AOC_") {
  var videoAd = new SmartTV_VideoBanner("FeatureApp_VIDEOPIP", "SmartHome_video", "", param);
  videoAd.startAd();
}
var adv = new SmartTV_NormalBanner(array.join(","), "", "", param);
adv.startAd();

function fetchCookie(name){
  var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  if(arr=document.cookie.match(reg))
  return unescape(arr[2]);
  else
  return null;
}

////////////

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

