import Vue from "vue"

export default{
  install(){

    //---------------------------------------------------  
    // 日期格式化  
    // 格式 YYYY/yyyy/YY/yy 表示年份  
    // MM/M 月份  
    // W/w 星期  
    // dd/DD/d/D 日期  
    // hh/HH/h/H 时间  
    // mm/m 分钟  
    // ss/SS/s/S 秒  
    //---------------------------------------------------  
    Vue.prototype.DateFormat = function(formatStr){   
      var curdate = new Date()
      var str = formatStr;   
      var Week = ['日','一','二','三','四','五','六'];  

      str=str.replace(/yyyy|YYYY/,curdate.getFullYear());   
      str=str.replace(/yy|YY/,(curdate.getYear() % 100)>9?(curdate.getYear() % 100).toString():'0' + (curdate.getYear() % 100));   
    
      str=str.replace(/MM/,curdate.getMonth()>9?curdate.getMonth().toString():'0' + curdate.getMonth());   
      str=str.replace(/M/g,curdate.getMonth());   
    
      str=str.replace(/w|W/g,Week[curdate.getDay()]);   
    
      str=str.replace(/dd|DD/,curdate.getDate()>9?curdate.getDate().toString():'0' + curdate.getDate());   
      str=str.replace(/d|D/g,curdate.getDate());   
    
      str=str.replace(/hh|HH/,curdate.getHours()>9?curdate.getHours().toString():'0' + curdate.getHours());   
      str=str.replace(/h|H/g,curdate.getHours());   
      str=str.replace(/mm/,curdate.getMinutes()>9?curdate.getMinutes().toString():'0' + curdate.getMinutes());   
      str=str.replace(/m/g,curdate.getMinutes());   
    
      str=str.replace(/ss|SS/,curdate.getSeconds()>9?curdate.getSeconds().toString():'0' + curdate.getSeconds());   
      str=str.replace(/s|S/g,curdate.getSeconds());   
    
      return str;   
    } 

    //+---------------------------------------------------  
    //| 求两个时间的天数差 日期格式为 YYYY-MM-dd   
    //+---------------------------------------------------  
    Vue.prototype.DateBetween = function(DateOne,DateTwo){   
        var OneMonth = DateOne.substring(5,DateOne.lastIndexOf ('-'));  
        var OneDay = DateOne.substring(DateOne.length,DateOne.lastIndexOf ('-')+1);  
        var OneYear = DateOne.substring(0,DateOne.indexOf ('-'));  
      
        var TwoMonth = DateTwo.substring(5,DateTwo.lastIndexOf ('-'));  
        var TwoDay = DateTwo.substring(DateTwo.length,DateTwo.lastIndexOf ('-')+1);  
        var TwoYear = DateTwo.substring(0,DateTwo.indexOf ('-'));  
      
        var cha=((Date.parse(OneMonth+'/'+OneDay+'/'+OneYear)- Date.parse(TwoMonth+'/'+TwoDay+'/'+TwoYear))/86400000);   
        return Math.abs(cha);  
    }

    //+---------------------------------------------------  
    //| 日期计算  
    //+---------------------------------------------------  
    Vue.prototype.DateAdd = function(strInterval, Number){   
      var dtTmp = new Date();  
      switch (strInterval) {   
          case 's' :return new Date(Date.parse(dtTmp) + (1000 * Number));  
          case 'n' :return new Date(Date.parse(dtTmp) + (60000 * Number));  
          case 'h' :return new Date(Date.parse(dtTmp) + (3600000 * Number));  
          case 'd' :return new Date(Date.parse(dtTmp) + (86400000 * Number));  
          case 'w' :return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number));  
          case 'q' :return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number*3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());  
          case 'm' :return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());  
          case 'y' :return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());  
      }  
    }  

    //+---------------------------------------------------  
    //| 比较日期差 dtEnd 格式为日期型或者有效日期格式字符串  
    //+---------------------------------------------------  
    Vue.prototype.DateDiff = function(strInterval, dtEnd){   
      var dtStart = new Date();  
      if (typeof dtEnd == 'string' )//如果是字符串转换为日期型  
      {   
          dtEnd = StringToDate(dtEnd);  
      }  
      switch (strInterval) {   
          case 's' :return parseInt((dtEnd - dtStart) / 1000);  
          case 'n' :return parseInt((dtEnd - dtStart) / 60000);  
          case 'h' :return parseInt((dtEnd - dtStart) / 3600000);  
          case 'd' :return parseInt((dtEnd - dtStart) / 86400000);  
          case 'w' :return parseInt((dtEnd - dtStart) / (86400000 * 7));  
          case 'm' :return (dtEnd.getMonth()+1)+((dtEnd.getFullYear()-dtStart.getFullYear())*12) - (dtStart.getMonth()+1);  
          case 'y' :return dtEnd.getFullYear() - dtStart.getFullYear();  
      }  
    } 

    //+---------------------------------------------------  
    //| 日期合法性验证  
    //| 格式为：YYYY-MM-DD或YYYY/MM/DD  
    //+---------------------------------------------------  
    Vue.prototype.DateIsValid = function(DateStr){   
        var sDate=DateStr.replace(/(^\s+|\s+$)/g,''); //去两边空格;   
        if(sDate=='') return true;   
        //如果格式满足YYYY-(/)MM-(/)DD或YYYY-(/)M-(/)DD或YYYY-(/)M-(/)D或YYYY-(/)MM-(/)D就替换为''   
        //数据库中，合法日期可以是:YYYY-MM/DD(2003-3/21),数据库会自动转换为YYYY-MM-DD格式   
        var s = sDate.replace(/[\d]{ 4,4 }[\-/]{ 1 }[\d]{ 1,2 }[\-/]{ 1 }[\d]{ 1,2 }/g,'');   
        if (s=='') //说明格式满足YYYY-MM-DD或YYYY-M-DD或YYYY-M-D或YYYY-MM-D   
        {   
            var t=new Date(sDate.replace(/\-/g,'/'));   
            var ar = sDate.split(/[-/:]/);   
            if(ar[0] != t.getYear() || ar[1] != t.getMonth()+1 || ar[2] != t.getDate())   
            {   
                //alert('错误的日期格式！格式为：YYYY-MM-DD或YYYY/MM/DD。注意闰年。');   
                return false;   
            }   
        }   
        else   
        {   
            //alert('错误的日期格式！格式为：YYYY-MM-DD或YYYY/MM/DD。注意闰年。');   
            return false;   
        }   
        return true;   
    }

    //+---------------------------------------------------  
    //| 日期时间检查  
    //| 格式为：YYYY-MM-DD HH:MM:SS  
    //+---------------------------------------------------  
    Vue.prototype.DateTimeCheck = function(str){   
        var reg = /^(\d+)-(\d{ 1,2 })-(\d{ 1,2 }) (\d{ 1,2 }):(\d{ 1,2 }):(\d{ 1,2 })$/;   
        var r = str.match(reg);   
        if(r==null)return false;   
        r[2]=r[2]-1;   
        var d= new Date(r[1],r[2],r[3],r[4],r[5],r[6]);   
        if(d.getFullYear()!=r[1])return false;   
        if(d.getMonth()!=r[2])return false;   
        if(d.getDate()!=r[3])return false;   
        if(d.getHours()!=r[4])return false;   
        if(d.getMinutes()!=r[5])return false;   
        if(d.getSeconds()!=r[6])return false;   
        return true;   
    }
    
    //+---------------------------------------------------  
    //| 把日期分割成数组  
    //+---------------------------------------------------  
    Vue.prototype.DataToArray = function(){   
        var myDate = new Date();  
        var myArray = Array();  
        myArray[0] = myDate.getFullYear();  
        myArray[1] = myDate.getMonth();  
        myArray[2] = myDate.getDate();  
        myArray[3] = myDate.getHours();  
        myArray[4] = myDate.getMinutes();  
        myArray[5] = myDate.getSeconds();  
        return myArray;  
    } 

    //+---------------------------------------------------  
    //| 取得日期数据信息  
    //| 参数 interval 表示数据类型  
    //| y 年 m月 d日 w星期 ww周 h时 n分 s秒  
    //+---------------------------------------------------  
    Vue.prototype.DatePart = function(interval){   
        var myDate = new Date();  
        var partStr='';  
        var Week = ['日','一','二','三','四','五','六'];  
        switch (interval)  
        {   
            case 'y' :partStr = myDate.getFullYear();break;  
            case 'm' :partStr = myDate.getMonth()+1;break;  
            case 'd' :partStr = myDate.getDate();break;  
            case 'w' :partStr = Week[myDate.getDay()];break;  
            case 'ww' :partStr = myDate.WeekNumOfYear();break;  
            case 'h' :partStr = myDate.getHours();break;  
            case 'n' :partStr = myDate.getMinutes();break;  
            case 's' :partStr = myDate.getSeconds();break;  
        }  
        return partStr;  
    } 

    //+---------------------------------------------------  
    //| 取得当前日期所在月的最大天数  
    //+---------------------------------------------------  
    Vue.prototype.DateMaxDay = function(){   
        var myDate = new Date();  
        var ary = myDate.toArray();  
        var date1 = (new Date(ary[0],ary[1]+1,1));  
        var date2 = date1.dateAdd(1,'m',1);  
        var result = dateDiff(date1.Format('yyyy-MM-dd'),date2.Format('yyyy-MM-dd'));  
        return result;  
    }

    //+---------------------------------------------------  
    //| 字符串转成日期类型   
    //| 格式 MM/dd/YYYY MM-dd-YYYY YYYY/MM/dd YYYY-MM-dd  
    //+---------------------------------------------------  
    Vue.prototype.DateFromString = function(DateStr){   
        var converted = Date.parse(DateStr);  
        var myDate = new Date(converted);  
        if (isNaN(myDate))  
        {   
            //var delimCahar = DateStr.indexOf('/')!=-1?'/':'-';  
            var arys= DateStr.split('-');  
            myDate = new Date(arys[0],--arys[1],arys[2]);  
        }  
        return myDate;  
    } 

  }
}