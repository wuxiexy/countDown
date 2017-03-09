/*
 * author: wuxiexy
 * param: endTime               倒数到的时间
 * param: dayID                 天 id
 * param: hourID                小时 id
 * param: minuteID              分钟 id
 * param: secondID              秒钟 id
 *
 * param: type                  倒数的类型
 * 1为倒数多少秒，给一个秒数 如60秒； 2为倒数到未来的某一天，如2020-1-1
 *
 * param: address               类型1的id (倒数秒的id)
 * param: typeSecondTip         类型1的说明 如：60s、60秒、60秒后重试 等等 (倒数秒的id)
 * param: dateDivision          日期的分隔符   如：2017-12-12  ->  "-"
 * param: timeDivision          时间的分隔符   如：18:00:00    ->  ":"
 * param: successDateDivision   成功之后的日期的分隔符   如：2017-12-12  ->  "-"
 * param: successTimeDivision   成功之后的时间的分隔符   如：18:00:00    ->  ":"
 * param: division              日期和时间的分隔符 如：2017-12-12 18:00:00    ->  " "
 * param: noDate                显示月份否
 * param:timeEndTip             倒数完成之后的提示语
 * param:endTimeCallBack        倒数结束之后的回调函数
 *
 * */
;(function (window, $, undefined){

    $.fn.countDown = function (options){
        // 配置
        let w = {
                // 倒计时的类型,
                type: 1,

                address: '#countDown',
                typeSecondTip: 's',

                endTime: '2017/3/6 18:0:0',
                dayID: '#dayID',
                hourID: '#hourID',
                minuteID: '#minuteID',
                secondID: '#secondID',
                dayTip: '天',
                hourTip: '时',
                minuteTip: '分',
                secondTip: '秒',

                dateDivision: "/",                              // 日期的分隔符   如：2017-12-12  ->  "-"
                timeDivision: ":",                              // 时间的分隔符   如：18:00:00    ->  ":"
                successDateDivision: "/",                       // 成功之后的日期的分隔符   如：2017-12-12  ->  "-"
                successTimeDivision: ":",                       // 成功之后的时间的分隔符   如：18:00:00    ->  ":"

                division: " ",
                timeEndTip: '倒数结束!',

                endTimeCallBack: function(){
                    alert(w.timeEndTip);
                }
            },
            tc = {
                d: 86400000,
                h: 3600000,
                m: 60000,
                s: 1000
            };

        $.extend(w, options);

        let timeStamp = 0,
            startTimeStamp = new Date().getTime(),                      // 开始的时间戳
            endTimeStamp = 0;                                           // 结束的时间戳


        switch (w.type){
            case 1:
                reciprocalSecond(Number(w.endTime));
                break;
            case 2:
                countdownOneDay(w.endTimeCallBack);
                break;
        }


        // 倒计时多少秒
        function reciprocalSecond(t){
            endTimeStamp = localStorage.getItem('endTimeStamp', endTimeStamp);
            if(endTimeStamp>startTimeStamp){
                timeStamp = endTimeStamp - startTimeStamp
            }else{
                endTimeStamp = startTimeStamp+t*1000;
                 localStorage.setItem('endTimeStamp', endTimeStamp);
                timeStamp = t*1000;
            }
            let recSec = setInterval(function(){ HandleTime(timeStamp, secondsIn, recSec); }, 1000);
            HandleTime(timeStamp, secondsIn, recSec);
        }


        // 倒计时某一天具体时刻
        function countdownOneDay(){
            timeStamp = new Date(w.endTime).getTime()-startTimeStamp;
            let dynamic = setInterval(function(){
                HandleTime(timeStamp, writeIn, dynamic);                                // 倒数
            }, 1000);
            HandleTime(timeStamp, writeIn, dynamic);
        }



        // 处理倒数, t 剩余倒数的时间戳, fn 每次倒数要执行的方法，timer 执行该方法的定时器
        function HandleTime(t, fn, timer){
            "use strict";
            if(t<0){
                w.endTimeCallBack();
                clearInterval(timer);
                return;
            }
            let lists = {
                day: Math.floor(t/tc.d),
                hour: Math.floor((t%tc.d)/tc.h),
                minute: Math.floor(((t%tc.d)%tc.h)/tc.m),
                seconds: Math.floor((((t%tc.d)%tc.h)%tc.m)/tc.s)
            };
            fn(lists);
            timeStamp -= 1000;
            if(timeStamp<0){
                w.endTimeCallBack();
                clearInterval(timer);
            }
        }



        function writeIn(t){
            $(w.dayID).html(t.day+w.dayTip);
            $(w.hourID).html(t.hour+w.hourTip);
            $(w.minuteID).html(t.minute+w.minuteTip);
            $(w.secondID).html(t.seconds+w.secondTip);
        }


        function secondsIn(t){
            let s = t.seconds,
                $a = $(w.address);
            $a.html(s+w.typeSecondTip);
            if(s==0){
                $a.html(w.endTime +w.typeSecondTip);
            }
        }

    };
})(window, jQuery);
