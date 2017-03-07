/*
 * author: wx
 * param: endTime               倒数到的时间
 * param: dayID                 天 id
 * param: hourID                小时 id
 * param: minuteID              分钟 id
 * param: secondID              秒钟 id
 *
 * */

;(function(window, $, undefined){
    "use strict";
    $.fn.countDown = function(options){
        // 配置
        let w = {
                endTime: '2017/3/6 18:0:0',
                dayID: '#dayID',
                hourID: '#hourID',
                minuteID: '#minuteID',
                secondID: '#secondID',

                dateDivision: "/",                              // 日期的分隔符   如：2017-12-12  ->  "-"
                timeDivision: ":",                              // 时间的分隔符   如：18:00:00    ->  ":"
                successDateDivision: "/",                       // 成功之后的日期的分隔符   如：2017-12-12  ->  "-"
                successTimeDivision: ":",                       // 成功之后的时间的分隔符   如：18:00:00    ->  ":"

                division: " ",                                  // 日期和时间的分隔符 如：2017-12-12 18:00:00    ->  " "

                noMonth: false,                                 // 显示月份否
                noDate: false,                                  // 显示月份否

                timeEndTip: '倒数结束!'
            },
            tc = {
                d: 86400000,
                h: 3600000,
                m: 60000,
                s: 1000
            };

        $.extend(w, options);
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
                clearInterval(dynamic);
                console.log(w.timeEndTip);
                return;
            }
            let lists = {
                day: Math.floor(t/tc.d),                                    // 天
                hour: Math.floor((t%tc.d)/tc.h),                            // 时,
                minute: Math.floor(((t%tc.d)%tc.h)/tc.m),                   // 分
                seconds: Math.floor((((t%tc.d)%tc.h)%tc.m)/tc.s)            // 分
            };

            writeIn(lists);

            timeStamp -= 1000;
            if(timeStamp<0){
                console.log(w.timeEndTip);
                clearInterval(dynamic);
            }
        }

        function writeIn(t){
            "use strict";
            $(w.dayID).html(t.day+'天');
            $(w.hourID).html(t.hour+'时');
            $(w.minuteID).html(t.minute+'分');
            $(w.secondID).html(t.seconds+'秒');
        }
    }
})(window, jQuery);
