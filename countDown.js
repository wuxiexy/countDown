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
                    "use strict";
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
            "use strict";
            let $a = $(w.address),
                n = t,
                recSec = setInterval(function(){
                    $a.html(--n +w.typeSecondTip);
                    if(n==-1){
                        $a.html(w.endTime +w.typeSecondTip);
                        w.endTimeCallBack();
                        clearInterval(recSec);
                    }
                }, 1000);
        }

        // 倒计时某一天具体时刻
        function countdownOneDay(){
            "use strict";
            let timeStamp = new Date(w.endTime).getTime()-(new Date().getTime());

            // 倒数
            let dynamic = setInterval(function(){
                "use strict";
                HandleTime(timeStamp);
            }, 1000);


            HandleTime(timeStamp);
            // 处理倒数
            function HandleTime(t){
                "use strict";
                if(t<0){
                    w.endTimeCallBack();
                    clearInterval(dynamic);
                    return;
                }
                let lists = {
                    day: Math.floor(t/tc.d),
                    hour: Math.floor((t%tc.d)/tc.h),
                    minute: Math.floor(((t%tc.d)%tc.h)/tc.m),
                    seconds: Math.floor((((t%tc.d)%tc.h)%tc.m)/tc.s)
                };

                writeIn(lists);

                timeStamp -= 1000;
                if(timeStamp<0){
                    w.endTimeCallBack();
                    clearInterval(dynamic);
                }
            }

            function writeIn(t){
                "use strict";
                $(w.dayID).html(t.day+w.dayTip);
                $(w.hourID).html(t.hour+w.hourTip);
                $(w.minuteID).html(t.minute+w.minuteTip);
                $(w.secondID).html(t.seconds+w.secondTip);
            }
        }
    };
})(window, jQuery);