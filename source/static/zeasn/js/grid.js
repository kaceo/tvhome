/**
 * Created by jacyeli on 2017/12/19.
 */

var str = "";
/*
if (navigator.userAgent.indexOf("aoc") > -1 ||
    navigator.userAgent.indexOf("AOC") > -1) {
    str = "AOC_"
}*/


function SmartTV(param) {
    this.data = param.data;
    this.keyMap = param.keyCode;
    this.lang = param.lang;
    this.index = 1;
    this.preIndex = 0;
    this.line = 1;
    this.preLine = 0;
    this.currentArea = str + "SmartHome";
    this.preArea = "";
    this.activeItem = "";
    this.preActiveItem = "";
    this.isScreen = false;
    this.totalLine = 0;
    this.totalApps = 0;
    this.lastAppIndex = 0;
    this.App_boxTop = 0;
    this.init();
}
SmartTV.prototype = {
    init:function () {

      console.log('Init with=', this.data)


        // this.renderBanner();
        this.renderAppList();
        this.activeItem = getID(str + "SmartHome_1_300x250");
        addClass(getID(str + "SmartHome_1_300x250"),"Active");
        this.bindEvent();

        //该两个元素的css导致页面未完成渲染，但css已加载导致的黑条和蓝点,prTF520PHIEUMTK04-5099,TF520PHIEUMTK04-5705
        if(document.querySelector('#nav'))
          document.querySelector('#nav').classList.remove('hide')

        var sqs = document.querySelectorAll('.sq');
        if(sqs.length > 0){
          for(var i = 0;i<sqs.length;i++){
            sqs[i].classList.remove('hide');
          }
        }

        this.setBottomTime(_time,this.lang);
        //this.addCssByLink("//cache.zeasn.tv/webstatic/linux_smarttv_home_web/css/lang/smartTv_"+this.lang+".css");
        //getID("error").innerHTML = "cookie = "+this.lang;
    },
    bindEvent:function () {
        var self = this;
        document.addEventListener("keydown",function (e) {
            self.eventSet(e);
        },true);
        $(document).on("mouseover",".mouseSelected",function () {
            var str = this.id;
            var arr = str.split("_");
            self.preIndex = self.index;
            self.preLine = self.line;
            self.preArea = self.currentArea;
            if (str.indexOf('AOC') > -1) {
              self.currentArea = arr[0]+'_'+arr[1];
              self.line = parseInt(arr[2]);
              self.index = arr[3];
            } else {
              self.currentArea = arr[0];
              //区别广告和app
              if(self.currentArea === "SmartHome"){
                self.line = 1;
                self.index = parseInt(arr[1]);
              }else{
                self.line = parseInt(arr[1]);
                self.index = arr[2];
              }
            }
            self.upData();
        });
        $(document).on("click",".mouseSelected",function () {
            self.enter();
        });
        $("#arrow_down").on("click",function () {
        })
        document.addEventListener("visibilitychange", function (event) {
          var videoObject = document.getElementById('SmartHome_video');
          if (videoObject != null && videoObject.childNodes.length === 0) videoObject.parentNode.removeChild(videoObject);
        });
        document.addEventListener("PlayStarted", function (e) {// 广告开始播放
          if(self.activeItem && self.activeItem.id == str+'SmartHome_5_300x250'){
            if(!getID(str+'SmartHome_video')) return
            self.preActiveItem = self.activeItem;
            self.activeItem = getID(str+'SmartHome_video');
            removeClass(self.preActiveItem,"Active");
            addClass(self.activeItem,"Active");
            self.listenKeyDown();
          }
        },false);
        document.addEventListener("PlayFinished", function (e) {// 广告结束播放
          if(self.activeItem && self.activeItem.id == str+'SmartHome_video'){
            if(!getID(str+'SmartHome_5_300x250')) return
            self.preActiveItem = self.activeItem;
            self.activeItem = getID(str+'SmartHome_5_300x250');
            removeClass(self.preActiveItem,"Active");
            addClass(self.activeItem,"Active");
            self.listenKeyDown();
          }
        }, false);
    },
    eventSet:function (e) {
        var self = this;
        if($("#SmartHome_video").hasClass('video_full')){
          e.preventDefault();
          e.stopPropagation();
          $("#SmartHome_video").removeClass('video_full');
          try{
            videoAd.setVideoNormal('SmartHome_video',function(){})
            document.getElementById('SmartHome_video') && document.getElementById('SmartHome_video').classList.add('Active')
          }catch (e) {}
          return;
        }
        if(self.keyMap[e.keyCode]){
            //console.log(self.currentArea +"-"+self.line+"-"+self.index);
            self.preIndex = self.index;
            self.preLine = self.line;
            self.preArea = self.currentArea;
            self[self.keyMap[e.keyCode]](e);

            if( self.index !== self.preIndex ||
                self.line !== self.preLine ||
                self.currentArea !== self.preArea
            ){
                self.upData(e);
            }
        }
    },

    upData:function (e) {
        this.preActiveItem = this.activeItem;
        var id = ""
        if (this.line == 1 && this.currentArea == str +  "SmartHome") {
          //特殊处理视频广告
          id = (this.index === 5  && document.getElementById("SmartHome_video") && !$("#SmartHome_video").hasClass('no-focus'))?"SmartHome_video":this.currentArea + "_" + this.index + "_300x250";
        } else {
        	id = this.currentArea + "_" + this.line + "_" + this.index;
        }
        if (this.line -1  == this.totalLine && e && e.keyCode == 40) {
        	return false;
        }
        if(this.App_boxTop === 0 ){
            this.upArrowHidden();
        }else{
            this.upArrowShow();
        }
        this.activeItem = getID(id);
        removeClass(this.preActiveItem,"Active");
        addClass(this.activeItem,"Active");
        this.listenKeyDown();
    },
    help:function (e) {
        e.preventDefault();
        try{
            GotoeDFU('SPHome')
        }catch(e){
            console.log(e.message);
        }
    },
    renderBanner:function () {
        var self = this;
        var array = [];

        //var data = self.data.datas.advertising;//广告数组
        var _str = "";
        for(var i = 0 ; i < 5; i++){
            array.push(str + "SmartHome_" + (i + 1) + "_300x250")
            _str += "<a id='" + str + "SmartHome_" + ( i +1 ) + "_300x250' area='banner'  class='banner_list mouseSelected'>" +
                        "<div class ='shade banner_shade'></div>"+
                        "<a name='" + str + "SmartHome_" + ( i + 1) + "_300x250' class='advImgBox'></a>"+
                   "</a>";
        }
        if(str != "AOC_"){
          _str += "<a id='" + str + "SmartHome_video" + "'area='banner'  class='banner_list mouseSelected'></a>"
        }
        console.log(_str);
        getID('banner').innerHTML = _str;
        //获取广告的图片
        //var param = "cntry="+getCookie("country")+"&lang=en&manid="+getCookie("manufacturerid")+"&ctn="+getCookie("profileid").split("_")[0];
        //var param = "cntry=AU&lang=en&manid=0008c6&ctn=32PHT5102/98";
        var param = "cntry="+country+"&lang="+lang+"&manid="+manufacturerid+"&ctn="+ctn+"";

        var j = 0,advTimer = null;

        if (str != "AOC_") {
          var videoAd = new SmartTV_VideoBanner("FeatureApp_VIDEOPIP", "SmartHome_video", "", param);
          videoAd.startAd();
        }
        var adv = new SmartTV_NormalBanner(array.join(","), "","",param);
        adv.startAd();

        // SmartHome_1_300x250
        // SmartHome_2_300x250
        // SmartHome_3_300x250
        // SmartHome_4_300x250
        // var myID = getID('banner').querySelectorAll('.banner_list');
        // var errorImg = "img/error_adv.png";
        // for(var m = 0; m < myID.length; m++){
        //     loadingImage(myID[m],myID[m].getAttribute("imgUrl"),errorImg);
        // }
    },
    renderAppList:function () {
        var self = this;
        var data = self.data.datas.datas;
        self.totalApps =  data.length;//app总个数self.totalLine
        self.totalLine = Math.ceil(data.length/5); //总行数

        var str = "";
        for(var i = 0; i < self.totalLine; i++){
            str += "<ul id = \"line_"+(i+1)+"\" class = \"line clearFix\">";
            var loopNum = (i+1) * 5 > data.length ? data.length - i * 5 : 5;
            var startNum = i * 5;
            for(var j = 0; j < loopNum; j++){
                str += "<li class = \"app_item_box\">" +
                         "<div id = \"app_"+(i+1)+"_"+(j+1)+"\" area = \"app\" filePath = \""+data[startNum+j].filePath+"\" imgUrl =\""+data[startNum+j].iconUrl+"\" appid =\""+data[startNum+j].appVersionId+"\" class = \"app_item mouseSelected\">" +
                              "<div class = 'shade app_shade'></div>"+
                         "</div>"+
                       "</li>";
            }
            if(i === self.totalLine-1){
                self.lastAppIndex = j;
            }
            str += "</ul>";
        }
        getID('App_box').innerHTML = str;
        console.log('App=', str)

        var myID = getID('App_box').querySelectorAll('.app_item');
        var errorImg = "#222528";
        for(var m = 0; m < myID.length; m++){
            loadingImage(myID[m],myID[m].getAttribute("imgUrl"),errorImg);
        }
        if(self.totalLine > 2){
            self.downArrowShow();
        }
    },
    left:function (e) {
        e.preventDefault();
        var next = parseInt(this.index) - 1;
        var id = ""
        if (this.line == 1 && this.currentArea == str + "SmartHome") {
        	id = this.currentArea + "_" + next + "_300x250";
        } else {
        	id = this.currentArea + "_" + this.line + "_" + next;
        }
        if (getID(id)) {
            this.index --;
        }
    },
    right: function(e) {
        e.preventDefault();
        var next = parseInt(this.index) + 1;
        var id = ""
        if (this.line == 1 && this.currentArea == str + "SmartHome") {
          //特殊处理视频广告
          id = (next === 5 && document.getElementById("SmartHome_video") && !$("#SmartHome_video").hasClass('no-focus'))?"SmartHome_video":this.currentArea + "_" + next + "_300x250";
        } else {
          id = this.currentArea + "_" + this.line + "_" + next;
        }
        console.log('right id:' + id + ',before index:' + this.index)
        if (getID(id).style.display == 'none' || $(id).hasClass('no-focus')) return
        if (getID(id)) {
          this.index++;
        }
    },
    up:function (e){
        e.preventDefault();
        var next = this.line - 1;
        var id = ""
        if (this.line == 1 && this.currentArea == str + "SmartHome") {
        	id = this.currentArea + "_" + next + "_300x250";
        } else {
        	id = this.currentArea + "_" + next + "_" + this.index;

        }
        if (getID(id)) {
            this.line-=1;
            var curActive = document.getElementsByClassName('Active')[0];
            var curArea = curActive.id.split('_')[0];
            var curLine = curActive.id.split('_')[1]
            console.log( 'up ->curArea:' + curArea + ',curLine:' + curLine)
            if ( curArea == 'app' && curLine == '2' ) {
                // if (getID('banner').style.opacity == '' || getID('banner').style.opacity == '1') {
                getID('banner').style.opacity = 1;
                getID('App_box_screen').style.top = "4.21rem";//向上走俩行的距离
                // }
            } else {
                if( Math.abs(this.App_boxTop) > 0 && this.getsecondPoint() === this.getAppLineEl()){
                    // console.log("向上翻页");
                    this.App_boxTop += this.getAppHeight();
                    getID('App_box').style.top = this.App_boxTop + 'px';
                    //判断向下的箭头是否出现 122 - 是每一列的高度
                    //滚动div的总高度 - 超出可视区的高度 - 可视区高度（4行）
                    if(this.totalLine * this.getAppHeight() - Math.abs(this.App_boxTop) - 4 * this.getAppHeight() > 0 ){
                        this.downArrowShow();
                    }
                }
            }
        }else if(this.currentArea === "app"){//app => banner
            if(this.isScreen){
                this.isScreen = false;
                getID('banner').style.opacity = 1;
                getID('App_box_screen').style.top = "4.21rem";//向下走俩行的距离
                this.upArrowHidden();
                this.downArrowShow();
            }
            this.currentArea = str + "SmartHome";
            //this.index = this.index > 3 ? this.index-1 : this.index;
        }else if(this.currentArea === str + "SmartHome"){
            this.currentArea = "header";
            this.index = 2;
        }
    },
    down:function (e) {
        e.preventDefault();
        console.log('down this.line:' + this.line)
        var next = this.line + 1;
        var id = ""


        if (this.line == 1 && this.currentArea == str + "SmartHome") {
        	id = this.currentArea + "_" + next + "_300x250";
        } else {
        	id = this.currentArea + "_" + next + "_" + this.index;
        }
        if(getID(id)) {
            this.line+=1;
            // console.log(getID(id).id)
            // var curLine = getID(id).id.split('_')[1]
            var curActive = document.getElementsByClassName('Active')[0];
            var curArea = curActive.id.split('_')[0];
            var curLine = curActive.id.split('_')[1]
            console.log( 'down ->curArea:' + curArea + ',curLine:' + curLine)
                if ( ( curArea == 'app' && curLine == '1' ) && this.totalLine > 2) {
                    this.isScreen = true;
                    getID('banner').style.opacity = 0;
                    // if (getID('banner').style.opacity == '' || getID('banner').style.opacity == '1') {
                    //     console.log(111)
                    //     getID('App_box_screen').style.top = "1.77rem";//向上走俩行的距离
                    // } else {
                    //     console.log(222)
                        getID('App_box_screen').style.top = "1.77rem";//向上走俩行的距离
                    // }
                }

            if(this.line === 3){                                //全屏显示翻页
                this.appScroll();
            } else if(this.line > 3 && this.line <= this.totalLine-1){
                // console.log("向下翻页");
                this.App_boxTop -= this.getAppHeight();
                getID('App_box').style.top = this.App_boxTop + 'px';
                //判断向下的箭头是否隐藏
                if(this.totalLine * this.getAppHeight() - Math.abs(this.App_boxTop) <=  this.getAppHeight() *4){
                    this.downArrowHidden();
                }
            } else if(this.currentArea === str + "SmartHome"){
            	this.line = 1; //banner => app
	            if(this.totalApps > 0){
	                this.currentArea = "app";
	                if(this.totalApps < 5){
	                    while (!getID(this.currentArea+"_1_"+this.index)){
	                         this.index--;
	                    }
	                }
	            }
        	}

        } else if(this.currentArea === "header"){  //header => banner
            this.currentArea = str + "SmartHome";
            this.index = 1;
            this.line = 1;
        } else {//向下超出边界
            // this.line+=1;
            var tempLine = this.line + 1;
            var nextLine = document.getElementById('line_' + tempLine);
            if (!nextLine) return;
            var tempLis = nextLine.getElementsByTagName('li');
            console.log(tempLis);
            if (!tempLis || !tempLis.length) return;
            var tempLiDom = tempLis[tempLis.length - 1];
            console.log(tempLiDom)
            if (!tempLiDom) return;
            var tempDiv = tempLiDom.getElementsByTagName('div')
            console.log(tempDiv)
            tempDiv = tempDiv.length > 0 ? tempDiv[0] : tempDiv;
            if (tempDiv) {
                this.index = parseInt(tempDiv.id.split('_')[2])
                this.line = tempLine
            }
            //超出边界时也要处理页面的滚动
            this.appScroll();
        }
    },

    enter:function () {
        if (this.currentArea === "app") {
          event.stopPropagation();
          var opUrl = this.activeItem.getAttribute("filePath");
          if (opUrl.indexOf("openinternet") >= 0) {
            try {
              GotoOpenInternet();
            } catch (e) {}
          } else if (opUrl.indexOf("netflix") > -1) {
            try {
              GotoNetflix();
            } catch (e) {}
          } else if (opUrl.indexOf("gotobbc") > -1) {
            try {
              GotoBBC(opUrl.split(":")[2] + ":" + opUrl.split(":")[3]);
            } catch (e) {}
          } else {
            // location.href = opUrl;
            var _id = this.activeItem.getAttribute("appid");
            window.open("//" + document.domain + "/BluePortServlets/app/applaunch?appid=" + _id + "&url=" + encodeURIComponent(opUrl), "_blank");
          }
        }else if(this.activeItem.id === "header_1_1"){
            event.stopPropagation();
            window.close();
        }else if(this.activeItem.id === "SmartHome_video"){
            event.stopPropagation();
            if(!document.getElementById('SmartHome_video')) return;
            document.getElementById('SmartHome_video').classList.add('video_full')
            try{
              videoAd.setVideoFullscreen('SmartHome_video',function(){})
              document.getElementById('SmartHome_video').classList.remove('Active')
            }catch (e) {}
        }else if(this.currentArea === str + "SmartHome"){
            var nodeA = this.activeItem;
            localStorage.setItem("SmartTv_home", false);
            if (!!nodeA.dataset.isGoogleAd) { //如果是谷歌广告，则由谷歌广告自己处理点击事件
              adv && adv.triggerClick(nodeA);
              return;
            }
            try{
                event.stopPropagation();
                if(nodeA.getAttribute("href") !== "null"){
                    var nettvObjectFactory = document.getElementById("nettvObjectFactory");
                    var managerObject = nettvObjectFactory.createWindowManagerObject();
                    var href = nodeA.getAttribute("href");
                    var info = href.split('?redirect=')
                    if(!info[1]) return;

                    window.setTimeout(function() {
                        if (decodeURIComponent(info[1]).indexOf("youtube") > -1) {
                            managerObject.windowOpen(decodeURIComponent(info[1]),"_blank","ADYouTube", true);
                        } else {
                            managerObject.windowOpen(decodeURIComponent(info[1]),"_blank","name", true);
                        }
                    }, 500);



                    // window.open(nodeA.getAttribute("href"));
                    //location.href = nodeA.getAttribute("href");
                }
            }catch (e){
                console.log(e.message);
            }
        }else if(this.activeItem.id === "header_1_2"){
            event.stopPropagation();
        }
    },
    back:function () {
        if(this.activeItem && this.activeItem.id === "SmartHome_video") return
        window.close();
    },
    downArrowShow:function () {
        getID('arrow_down').style.display = "block";
    },
    downArrowHidden:function () {
        getID('arrow_down').style.display = "none";
    },
    upArrowShow:function () {
        getID('arrow_up').style.display = "block";
    },
    upArrowHidden:function () {
        getID('arrow_up').style.display = "none";
    },
    listenKeyDown:function () {
        if(hasClass(getID('header_1_1'),'Active')) {
            getID('title').style.display = "none";
        }else{
            getID('title').style.display = "block";
        }
    },
    setBottomTime:function(_time,_language){
        var timeStr;
        var self = this;
        var mydate = new Date(),
            timeStr = _time[_language]?_time[_language]:_time["en"]
            MonthEnglish = timeStr.month,
            Month = MonthEnglish[mydate.getMonth()],
            Day = mydate.getDate(),
            weekDay = timeStr.week,
            Week = weekDay[mydate.getDay()],
            Hours = mydate.getHours(),
            Minutes = mydate.getMinutes();
        Hours = Hours < 10 ? "0"+ Hours : Hours;
        Minutes = Minutes < 10 ? "0"+ Minutes : Minutes;
        if (_language == "zh" || _language == "zh_TW") {
            timeStr = Hours + ":" + Minutes + "  " + Week + "  " + Month +" "+ Day + " 日";
        } else {
            timeStr = Hours + ":" + Minutes + " " + Week + "," + Day + " " + Month;
        }
        getID("timer").innerHTML = timeStr;
        setTimeout(function () {
            self.setBottomTime(_time,self.lang);
        },1000 * 60)
    },
    addCssByLink:function (url){
        var doc=document;
        var link=doc.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("type", "text/css");
        link.setAttribute("href", url);

        var heads = doc.getElementsByTagName("head");
        if(heads.length)
            heads[0].appendChild(link);
        else
            doc.documentElement.appendChild(link);
    },
    appScroll:function(){
      if(this.line === 3){
        this.isScreen = true;
        getID('banner').style.opacity = 0;
        if (getID('banner').style.opacity == '' || getID('banner').style.opacity == '1') {
            getID('App_box_screen').style.top = "1.77rem";//向上走俩行的距离
        } else {
            getID('App_box_screen').style.top = "1.77rem";//向上走俩行的距离
        }
        this.upArrowShow();
        if(this.totalLine <= 4){
            this.downArrowHidden();
        }
      }
    },
    getAppHeight:function(){
      return document.querySelector('.line').offsetHeight
    },
    //获取目前聚焦的app在哪一行
    getAppLineEl:function(){
      if(!document.querySelector('.Active')) return false
      return document.querySelector('.Active').parentElement.parentElement
    },
    getsecondPoint:function(){
      return getPointLine(100*getTimes(),370*getTimes())
    },
    getThirdPoint:function(){
      return getPointLine(100*getTimes(),450*getTimes())
    }
};

function getPointLine(x,y) {
  var points = document.elementsFromPoint(x,y);
  for (var i = 0; i < points.length; i++) {
    if (points[i].id.indexOf("line_") > -1) return points[i]
  }
}

function getTimes(){
  return document.documentElement.clientWidth/1280
}
