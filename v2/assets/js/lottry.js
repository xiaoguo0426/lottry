!(function (win) {
    var msg = function () {
        this.defaults = {'confirmText': '确定'}
    };
    msg.prototype.alert = function (txt, confirmCallback) {
        var option = this.defaults;
        if (typeof(txt) === 'object') {
            option.confirmText = txt.confirmText;
            option.confirmCallback = txt.confirmCallback;
            txt = txt.msg;
        } else {
            option.confirmCallback = confirmCallback;
        }
        var div = document.createElement('div');
        div.className = 'pop_bg';
        div.innerHTML = '<div class="bg-fff f-br5 f-pb20 pop_in">' +
        '<p class="f-fs16 fc-333 f-p10 f-tc f-mt10">' + txt + '</p>' +
        '<ul class="clearfix f-mt20" >' +
        '<li class="f-w50 f-pl10 f-pr10 f-bs f-tc f-m0a"><a href="javascript:;" data-action="confirm" class="fc-fff f-pt10 f-pb10 f-fs16 f-db f-br5 btn-blue">' + option.confirmText + '</a></li>' +
        '</ul></div>';
        div.addEventListener("click", function (e) {
            var ele = e.target || e.srcElement;
            if (ele.getAttribute('data-action') == 'confirm') {
                option.confirmCallback && option.confirmCallback();
                div.parentNode.removeChild(div);
            }
        }, false);
        document.body.appendChild(div);
    };
    win.ui = {msg: new msg()};
})(window);

var turnplate = {
            url: "",                    //大转盘地址
            doLottryUrl: "",            //点击抽奖动作提交地址
            iv_angles: 0,               //转盘偏移量
            chanceCount: 0,             //抽奖机会
            restaraunts: [],			//大转盘奖品名称
            colors: [],					//大转盘奖品区块对应背景颜色
            outsideRadius: 192,			//大转盘外圆的半径
            textRadius: 155,		    //大转盘奖品位置距离圆心的距离
            insideRadius: 68,			//大转盘内圆的半径
            startAngle: -0.5 * Math.PI,	//开始角度 逆时针旋转90度，让指针指向中线
            bRotate: false,				//false:停止;ture:旋转
            getTurnPlateConfig: function () {
                if (this.url.length === 0) {
                    ui.msg.alert({
                        confirmCallback: function () {
                            location.href = 'index.html';
                        }, msg: "无法获得抽奖信息！", confirmText: '确定'
                    });
                }
                var self = this;
                $.get(this.url, '', function (res) {
                    if (res.status == 1) {
                        var items = res.data.items;
                        var htmls = '';
                        items.forEach(function (v, i, arr) {
                            self.restaraunts.push(v.name);
                            htmls += "<tr>"
                            +"  <td class='f-w30 bordb-777777 f-pl5 f-pr5 f-pt10 f-pb10 f-lh20 f-tc'>"+v.name+"</td>"
                            +"  <td class='bordb-777777 f-pl5 f-pr5 f-pt10 f-pb10 f-lh20 f-tc'>"
                            +"       "+v.remark+"("+v.total+"名)"
                            +"   </td>"
                            +"</tr>";
                        });
                        var $table = $("table#prize-list");

                        $table.append("<tbody>" + htmls + "</tbody>")

                        var $remark = $("div#remark");
                        $remark.append(res.data.remark);
                        self.drawRouletteWheel();

                    } else {
                        ui.msg.alert({
                            confirmCallback: function () {
                                location.href = 'index.html';
                            }, msg: res.msg, confirmText: '确定'
                        });
                    }
                }, 'json');
            },
            drawRouletteWheel: function () {
                var canvas = document.getElementById("wheelcanvas");
                if (canvas.getContext) {
                    //根据奖品个数计算圆周角度
                    var arc = Math.PI / (turnplate.restaraunts.length / 2);
                    var ctx = canvas.getContext("2d");
                    //在给定矩形内清空一个矩形
                    ctx.clearRect(0, 0, 422, 422);
                    //strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式
                    ctx.strokeStyle = "#FFBE04";
                    //font 属性设置或返回画布上文本内容的当前字体属性
                    ctx.font = '1.6rem Microsoft YaHei';
                    for (var i = 0; i < turnplate.restaraunts.length; i++) {
                        var angle = turnplate.startAngle + i * arc;
                        ctx.fillStyle = turnplate.colors[i];
                        ctx.beginPath();
                        //arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）
                        ctx.arc(211, 211, turnplate.outsideRadius, angle, angle + arc, false);
                        ctx.arc(211, 211, turnplate.insideRadius, angle + arc, angle, true);
                        ctx.stroke();
                        ctx.fill();
                        //锁画布(为了保存之前的画布状态)
                        ctx.save();

                        //----绘制奖品开始----
                        ctx.fillStyle = "#E5302F";
                        var text = turnplate.restaraunts[i];
                        var line_height = 26;
                        //translate方法重新映射画布上的 (0,0) 位置
                        ctx.translate(211 + Math.cos(angle + arc / 2) * turnplate.textRadius, 211 + Math.sin(angle + arc / 2) * turnplate.textRadius);

                        //rotate方法旋转当前的绘图
                        ctx.rotate(angle + arc / 2 + Math.PI / 2);

                        /** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/
                        if (text.length > 6) {//奖品名称长度超过一定范围
                            text = text.substring(0, 6) + "||" + text.substring(6);
                            ctx.font = '1.4rem Microsoft YaHei';
                            var texts = text.split("||");
                            for (var j = 0; j < texts.length; j++) {
                                ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
                            }
                        } else {
                            //在画布上绘制填色的文本。文本的默认颜色是黑色
                            //measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
                            ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
                        }

                        //添加对应图标
                        // var img = document.getElementById("shan-img");
                        // img.onload = function () {
                        //     ctx.drawImage(img, -15, 25);
                        // };
                        //把当前画布返回（调整）到上一个save()状态之前
                        ctx.restore();
                        //----绘制奖品结束----
                    }
                }
            },
            doLottry: function () {
                if (this.doLottryUrl.length === 0) {
                    ui.msg.alert({
                        confirmCallback: function () {
                            location.href = '?p=index&a=index';
                        }, msg: "无法进行抽奖！", confirmText: '确定'
                    });
                    return false;
                }
                if (this.chanceCount == 0) {
                    ui.msg.alert({
                        confirmCallback: function () {
                        }, msg: "您的抽奖机会已用完</br>可返回查看活动规则获取更多机会哟！", confirmText: '确定'
                    });
                    turnplate.bRotate = !turnplate.bRotate;
                } else {
                    var self = this;
                    $.get(this.doLottryUrl, '', function (res) {
                        if (res.status == 1) {
                            var data = res.data;
                            var text = res.msg;
                            var temp = data.angles;

                            self.rotateFn(temp, text);
                            $("#count").text(data.count);
                        } else {
                            ui.msg.alert({
                                confirmCallback: function () {
                                    turnplate.bRotate = !turnplate.bRotate;
                                }, msg: res.msg, confirmText: '确定'
                            });
                        }
                    }, 'json');
                }
            },
            rotateFn: function (angles, txt) {
                var $wheelcanvas = $('#wheelcanvas');
                $wheelcanvas.stopRotate();
                $wheelcanvas.rotate({
                    angle: -60,
                    animateTo: angles + 1800,
                    duration: 8000,
                    callback: function () {
                        ui.msg.alert({
                            confirmCallback: function () {
                            }, msg: txt, confirmText: '确定'
                        });
                        turnplate.bRotate = !turnplate.bRotate;
                    }
                });
            }
        };

        $(function () {

            turnplate.url = "getActiveLottry.php";
            turnplate.doLottryUrl = "doLottry.php";
            turnplate.getTurnPlateConfig();
            //后台可以配置每一个奖项的颜色
            turnplate.colors = ["#fbc6a9", "#ffdecc", "#FFF4D6","#fbc6a9", "#ffdecc", "#FFF4D6","#ffdecc"];

            //判断是否有大转盘抽奖机会
            !(function () {
                $.get('getLottryCount.php', '', function (res) {
                    if (res.status == 1) {
                        var $count = $("#count");
                        turnplate.chanceCount = res.data.count;
                        $count.text(turnplate.chanceCount);
                    } else {
                    }
                }, 'json');
            })();

            $('.pointer').click(function () {
                if (turnplate.bRotate)return;
                turnplate.bRotate = !turnplate.bRotate;
                turnplate.doLottry();
            });
        });