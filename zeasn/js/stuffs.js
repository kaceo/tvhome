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
var str = "";
if (navigator.userAgent.indexOf("aoc") > -1 || navigator.userAgent.indexOf("AOC") > -1) {
    str = "AOC_"
}
var country,lang = "en",manufacturerid,ctn,categoryId,productId;
if(fetchCookie("country")){
    country = fetchCookie("country");
}else{ //"AU"
    country = "BR";
}
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
  _str += "<a id='" + str + "SmartHome_" + (i + 1) + "_300x250' area='banner'  class='banner_list mouseSelected'"+hideStr+">" +
    "<div class ='shade banner_shade'></div>" +
    "<a name='" + str + "SmartHome_" + (i + 1) + "_300x250' class='advImgBox'></a>" +
    "</a>";
}
if(str != "AOC_"){
  _str += "<a id='" + str + "SmartHome_video" + "'area='banner'  class='banner_list mouseSelected no-focus'></a>"
}
console.log(_str);
document.getElementById('banner').innerHTML = _str;
var param = "cntry=" + country + "&lang=" + lang + "&manid=" + manufacturerid + "&ctn=" + ctn + "";
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
