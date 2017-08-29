//贾晓航的工具库，封装了各种常用方法

var jxh={
//去除空格  type 1-所有空格  2-前后空格  3-前空格 4-后空格
trim:function trim(str,type){
    switch (type){
        case 1:return str.replace(/\s+/g,"");
        case 2:return str.replace(/(^\s*)|(\s*$)/g, "");
        case 3:return str.replace(/(^\s*)/g, "");
        case 4:return str.replace(/(\s*$)/g, "");
        default:return str;
    }
},

//					字母大小写切换
/*type
1:首字母大写  
2：首页母小写
3：大小写转换
4：全部大写
5：全部小写
* */
//changeCase('asdasd',1)
//Asdasd
changeCase:function changeCase(str,type){
    function ToggleCase(str) {
        var itemText = ""
        str.split("").forEach(
            function (item) {
                if (/^([a-z]+)/.test(item)) {
                    itemText += item.toUpperCase();
                }
                else if (/^([A-Z]+)/.test(item)) {
                    itemText += item.toLowerCase();
                }
                else{
                    itemText += item;
                }
            });
        return itemText;
    }
 
    switch (type) {
        case 1:
            return str.replace(/^(\w)(\w+)/, function (v, v1, v2) {
                return v1.toUpperCase() + v2.toLowerCase();
            });
        case 2:
            return str.replace(/^(\w)(\w+)/, function (v, v1, v2) {
                return v1.toLowerCase() + v2.toUpperCase();
            });
        case 3:
            return ToggleCase(str);
        case 4:
            return str.toUpperCase();
        case 5:
            return str.toLowerCase();
        default:
            return str;
    }
},

//			字符串循环复制
//repeatStr(str->字符串, count->次数)
//repeatStr('123',3)
//"123123123"
repeatStr:function repeatStr(str, count) {
    var text = '';
    for (var i = 0; i < count; i++) {
        text += str;
    }
    return text;
},

//					字符串替换
//字符串替换(字符串,要替换的字符,替换成什么)
replaceAll:function replaceAll(str,AFindText,ARepText){
　　　raRegExp = new RegExp(AFindText,"g");
　　　return str.replace(raRegExp,ARepText);
},

//					替换星号
//replaceStr(字符串,字符格式, 替换方式,替换的字符（默认*）)
replaceStr:function replaceStr(str, regArr, type,ARepText) {
    var regtext = '', Reg = null,replaceText=ARepText||'*';
    //replaceStr('18819322663',[3,5,3],0)
    //188*****663
    //repeatStr是在上面定义过的（字符串循环复制），大家注意哦
    if (regArr.length === 3 && type === 0) {
        regtext = '(\\w{' + regArr[0] + '})\\w{' + regArr[1] + '}(\\w{' + regArr[2] + '})'
        Reg = new RegExp(regtext);
        var replaceCount = repeatStr(replaceText, regArr[1]);
        return str.replace(Reg, '$1' + replaceCount + '$2')
    }
    //replaceStr('asdasdasdaa',[3,5,3],1)
    //***asdas***
    else if (regArr.length === 3 && type === 1) {
        regtext = '\\w{' + regArr[0] + '}(\\w{' + regArr[1] + '})\\w{' + regArr[2] + '}'
        Reg = new RegExp(regtext);
        var replaceCount1 = repeatSte(replaceText, regArr[0]);
        var replaceCount2 = repeatSte(replaceText, regArr[2]);
        return str.replace(Reg, replaceCount1 + '$1' + replaceCount2)
    }
    //replaceStr('1asd88465asdwqe3',[5],0)
    //*****8465asdwqe3
    else if (regArr.length === 1 && type == 0) {
        regtext = '(^\\w{' + regArr[0] +  '})'
        Reg = new RegExp(regtext);
        var replaceCount = repeatSte(replaceText, regArr[0]);
        return str.replace(Reg, replaceCount)
    }
    //replaceStr('1asd88465asdwqe3',[5],1,'+')
    //"1asd88465as+++++"
    else if (regArr.length === 1 && type == 1) {
        regtext = '(\\w{' + regArr[0] +  '}$)'
        Reg = new RegExp(regtext);
        var replaceCount = repeatSte(replaceText, regArr[0]);
        return str.replace(Reg, replaceCount)
    }
},

//					检测字符串
//checkType('165226226326','phone')
//false
//大家可以根据需要扩展
checkType:function checkType (str, type) {
    switch (type) {
        case 'email':
            return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
        case 'phone':
            return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
        case 'tel':
            return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
        case 'number':
            return /^[0-9]$/.test(str);
        case 'english':
            return /^[a-zA-Z]+$/.test(str);
        case 'chinese':
            return /^[\u4E00-\u9FA5]+$/.test(str);
        case 'lower':
            return /^[a-z]+$/.test(str);
        case 'upper':
            return /^[A-Z]+$/.test(str);
        default :
            return true;
    }
},

//					检测密码强度
//checkPwd('12asdASAD')
//3(强度等级为3)
checkPwd:function checkPwd(str) {
    var nowLv = 0;
    if (str.length < 6) {
        return nowLv
    }
    if (/[0-9]/.test(str)) {
        nowLv++
    }
    if (/[a-z]/.test(str)) {
        nowLv++
    }
    if (/[A-Z]/.test(str)) {
        nowLv++
    }
    if (/[\.|-|_]/.test(str)) {
        nowLv++
    }
    return nowLv;
},

//					随机密码
//count取值范围0-36
 
//randomNumber(10)
//"2584316588472575"
 
//randomNumber(14)
//"9b405070dd00122640c192caab84537"
 
//Math.random().toString(36).substring(2);
//"83vhdx10rmjkyb9"
randomNumber:function randomNumber(count){
   return Math.random().toString(count).substring(2);
},

//					查找某字符串出现的次数
countStr:function countStr (str,strSplit){
    return str.split(strSplit).length-1
},
//var strTest='sad44654blog5a1sd67as9dablog4s5d16zxc4sdweasjkblogwqepaskdkblogahseiuadbhjcibloguyeajzxkcabloguyiwezxc967'
//countStr(strTest,'blog')
//6

//					数组去重
//ES6新增的Set数据结构，类似于数组，但是里面的元素都是唯一的 ，其构造函数可以接受一个数组作为参数
//let arr=[1,2,1,2,6,3,5,69,66,7,2,1,4,3,6,8,9663,8]
//let set = new Set(array);
//{1,2,6,3,5,69,66,7,4,8,9663}
//ES6中Array新增了一个静态方法from，可以把类似数组的对象转换为数组
//Array.from(set)
//[1,2,6,3,5,69,66,7,4,8,9663]
removeRepeatArray:function removeRepeatArray(arr){
    return Array.from(new Set(arr))
},

//					数组顺序打乱
upsetArr:function upsetArr(arr){
    return arr.sort(function(){ return Math.random() - 0.5});
},

//					数组最大值最小值
//这一块的封装，主要是针对数字类型的数组
maxArr:function maxArr(arr){
    return Math.max.apply(null,arr);
},
minArr:function minArr(arr){
    return Math.min.apply(null,arr);
},

//					数组求和、平均值
//这一块的封装，主要是针对数字类型的数组
//求和
sumArr:function sumArr(arr){
    var sumText=0;
    for(var i=0,len=arr.length;i<len;i++){
        sumText+=arr[i];
    }
    return sumText
},
//平均值,小数点可能会有很多位，这里不做处理，处理了使用就不灵活了！
covArr:function covArr(arr){
    var sumText=sumArr(arr);
    var covText=sumText/length;
    return covText
},

//					数组中获取随机元素
//randomOne([1,2,3,6,8,5,4,2,6])
//2
//randomOne([1,2,3,6,8,5,4,2,6])
//8
//randomOne([1,2,3,6,8,5,4,2,6])
//8
//randomOne([1,2,3,6,8,5,4,2,6])
//1
randomOne:function randomOne(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
},

//					返回一个元素出现的次数
//getEleCount('asd56+asdasdwqe','a')
//3
//getEleCount([1,2,3,4,5,66,77,22,55,22],22)
//2
getEleCount:function getEleCount (obj, ele) {
    var num = 0;
    for (var i = 0, len = obj.length; i < len; i++) {
        if (ele == obj[i]) {
            num++;
        }
    }
    return num;
},

//		返回数组或字符串出现次数最多的几次元素和出现次数
//arr, rank->长度，默认为数组长度，ranktype，排序方式，默认降序
getCount:function getCount(arr, rank,ranktype){
    var obj = {}, k, arr1 = []
    //记录每一元素出现的次数
    for (var i = 0, len = arr.length; i < len; i++) {
        k = arr[i];
        if (obj[k]) {
            obj[k]++;
        }
        else {
            obj[k] = 1;
        }
    }
    //保存结果{el-'元素'，count-出现次数}
    for (var o in obj) {
        arr1.push({el: o, count: obj[o]});
    }
    //排序（降序）
    arr1.sort(function (n1, n2) {
        return n2.count - n1.count
    });
    //如果ranktype为1，则为升序，反转数组
    if(ranktype===1){
        arr1=arr1.reverse();
    }
    var rank1 = rank || arr1.length;
    return arr1.slice(0,rank1);
},

//				得到n1-n2下标的数组
//getArrayNum([0,1,2,3,4,5,6,7,8,9],5,9)
//[5, 6, 7, 8, 9]

//getArrayNum([0,1,2,3,4,5,6,7,8,9],2) 不传第二个参数,默认返回从n1到数组结束的元素
//[2, 3, 4, 5, 6, 7, 8, 9]
getArrayNum:function getArrayNum(arr,n1,n2){
    var arr1=[],len=n2||arr.length-1;
    for(var i=n1;i<=len;i++){
        arr1.push(arr[i])
    }
    return arr1;
},

//					筛选数组
//删除值为'val'的数组元素
//removeArrayForValue(['test','test1','test2','test','aaa'],'test','%')
//["aaa"]   带有'test'的都删除
    
//removeArrayForValue(['test','test1','test2','test','aaa'],'test')
//["test1", "test2", "aaa"]  //数组元素的值全等于'test'才被删除
removeArrayForValue:function removeArrayForValue(arr,val,type){
    arr.filter(function(item){return type==='%'?item.indexOf(val)!==-1:item!==val})
},

//				检测对象是否有某个类名
hasClass:function hasClass(obj,classStr){
    var arr=obj.className.split(/\s+/); //这个正则表达式是因为class可以有多个,判断是否包含
    return (arr.indexOf(classStr)==-1)?false:true;
},

//				添加类名
addClass:function addClass(obj,classStr){
    if (!this.hasClass(obj,classStr)){obj.className += " " + classStr};
},

//				删除类名
removeClass:function removeClass(obj,classStr){
    if (this.hasClass(obj,classStr)) {
        var reg = new RegExp('(\\s|^)' + classStr + '(\\s|$)');
        obj.className = obj.className.replace(reg, '');
    }
},

//				替换类名
replaceClass:function replaceClass(obj,newName,oldName) {
    removeClass(obj,oldName);
    addClass(obj,newName);
},

//				获取兄弟节点
siblings:function siblings(obj){
    var a=[];//定义一个数组，用来存o的兄弟元素
    var p=obj.previousSibling;
    while(p){//先取o的哥哥们 判断有没有上一个哥哥元素，如果有则往下执行 p表示previousSibling
        if(p.nodeType===1){
        a.push(p);
        }
        p=p.previousSibling//最后把上一个节点赋给p
    }
    a.reverse()//把顺序反转一下 这样元素的顺序就是按先后的了
    var n=obj.nextSibling;//再取o的弟弟
    while(n){//判断有没有下一个弟弟结点 n是nextSibling的意思
        if(n.nodeType===1){
            a.push(n);
        }
        n=n.nextSibling;
    }
    return a;
},

//					设置样式
css:function css(obj,json){
    for(var attr in json){
        obj.style[attr]=json[attr];
    }
},

//				设置文本内容
html:function html(obj){
    if(arguments.length==0){
        return this.innerHTML;
    }
    else if(arguments.length==1){
        this.innerHTML=arguments[0];
    }
},

//			显示隐藏
show:function show(obj){
    obj.style.display="";
},
hide:function hide(obj){
    obj.style.display="none";
},

//			cookie
//设置cookie
setCookie:function setCookie(name,value,iDay){
    var oDate=new Date();
    oDate.setDate(oDate.getDate()+iDay);
    document.cookie=name+'='+value+';expires='+oDate;
},
//获取cookie
getCookie:function getCookie(name){
    var arr=document.cookie.split('; ');
    for(var i=0;i<arr.length;i++){
        var arr2=arr[i].split('=');
        if(arr2[0]==name)
        {
            return arr2[1];
        }
    }
    return '';
},
//删除cookie
removeCookie:function removeCookie(name){
    setCookie(name,1,-1);
},

//			清除属性中为空的值
//filterParams({a:"",b:null,c:"010",d:123})
//Object {c: "010", d: 123}
filterParams:function filterParams(obj){
    let _newPar = {};
    for (let key in obj) {
        if ((obj[key] === 0 || obj[key]) && obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== '') {
            _newPar[key] = obj[key];
        }
    }
    return _newPar;
},

//				URL参数
//获取url参数
//getUrlPrmt('segmentfault.com/write?draftId=122000011938')
//Object{draftId: "122000011938"}
getUrlPrmt:function getUrlPrmt(url) {
    url = url ? url : window.location.href;
    let _pa = url.substring(url.indexOf('?') + 1), _arrS = _pa.split('&'), _rs = {};
    for (let i = 0, _len = _arrS.length; i < _len; i++) {
        let pos = _arrS[i].indexOf('=');
        if (pos == -1) {
            continue;
        }
        let name = _arrS[i].substring(0, pos), value = window.decodeURIComponent(_arrS[i].substring(pos + 1));
        _rs[name] = value;
    }
    return _rs;
},
 
//设置url参数
//setUrlPrmt({'a':1,'b':2})
//a=1&b=2
setUrlPrmt:function setUrlPrmt(obj) {
    let _rs = [];
    for (let p in obj) {
        if (obj[p] != null && obj[p] != '') {
            _rs.push(p + '=' + obj[p])
        }
    }
    return _rs.join('&');
},

//			随机返回一个范围的数字
randomNumber:function randomNumber(n1,n2){
    //randomNumber(5,10)
    //返回5-10的随机整数，包括5，10
    if(arguments.length===2){
        return Math.round(n1+Math.random()*(n2-n1));
    }
    //randomNumber(10)
    //返回0-10的随机整数，包括0，10
    else if(arguments.length===1){
        return Math.round(Math.random()*n1)
    }
    //randomNumber()
    //返回0-255的随机整数，包括0，255
    else{
        return Math.round(Math.random()*255)
    }  
},

//				随机产生颜色
randomColor:function randomColor(){
    //randomNumber是上面定义的函数
    //写法1
    return 'rgb(' + randomNumber(255) + ',' + randomNumber(255) + ',' + randomNumber(255) + ')';
    
    //写法2
    return '#'+Math.random().toString(16).substring(2).substr(0,6);
    
    //写法3
    var color='#';
    for(var i=0;i<6;i++){
        color+='0123456789abcdef'[randomNumber(15)];
    }
    return color;
},

//				倒计时
//到某一个时间的倒计时
//getEndTime('2017/7/22 16:0:0')
//"剩余时间6天 2小时 28 分钟20 秒"
getEndTime:function getEndTime(endTime){
    var startDate=new Date();  //开始时间，当前时间
    var endDate=new Date(endTime); //结束时间，需传入时间参数
    var t=endDate.getTime()-startDate.getTime();  //时间差的毫秒数
    var d=0,h=0,m=0,s=0;
    if(t>=0){
      d=Math.floor(t/1000/3600/24);
      h=Math.floor(t/1000/60/60%24);
      m=Math.floor(t/1000/60%60);
      s=Math.floor(t/1000%60);
    }
    return "剩余时间"+d+"天 "+h+"小时 "+m+" 分钟"+s+" 秒";
},

//				适配rem
getFontSize:function getFontSize(){
    var doc=document,win=window;
    var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        //如果屏幕大于750（750是根据我效果图设置的，具体数值参考效果图），就设置clientWidth=750，防止font-size会超过100px
        if(clientWidth>750){clientWidth=750}
        //设置根元素font-size大小
        docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
    };
    //屏幕大小改变，或者横竖屏切换时，触发函数
    win.addEventListener(resizeEvt, recalc, false);
    //文档加载完成时，触发函数
    doc.addEventListener('DOMContentLoaded', recalc, false);
},
//使用方式很简单，比如效果图上，有张图片。宽高都是100px;
//样式写法就是
// img{
//     width:1rem;
//     height:1rem;
// }
//这样的设置，比如在屏幕宽度大于等于750px设备上，1rem=100px；图片显示就是宽高都是100px
//比如在iphone6(屏幕宽度：375)上，375/750*100=50px;就是1rem=50px;图片显示就是宽高都是50px;

//				
}

//export {jxh};