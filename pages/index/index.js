//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        imgUrls: [
            '../../images/products/1.jpg',
            '../../images/products/2.jpg',
            '../../images/products/3.jpg',
            '../../images/products/4.jpg',
            '../../images/products/5.jpg',
            '../../images/products/6.jpg',
            '../../images/products/7.jpg',
            '../../images/products/8.jpg',
            '../../images/products/9.jpg',
            '../../images/products/10.jpg',
        ],
        indicatorDots: true,
        autoplay: true,
        interval: 1500,
        duration: 1000,

        hideCount: true, //角标初始是隐藏的
        count: 0, //角标数
        hide_good_box: true,
        feiBox: ""
    },
    onLoad: function() {
        var that = this;
        //可视窗口x,y坐标
        this.busPos = {};
        this.busPos['x'] = app.globalData.ww * .85;
        this.busPos['y'] = app.globalData.hh * .85;
    },

    //点击商品触发的事件
    touchOnGoods: function(e) {
        //把点击每一项的对应的商品图保存下来，就是飞向购物车的图片
        this.setData({
            feiBox: this.data.imgUrls[e.currentTarget.dataset.idx]
        })
        // 如果good_box正在运动
        if (!this.data.hide_good_box) return;
        //当前点击位置的x，y坐标
        this.finger = {};
        var topPoint = {};
        this.finger['x'] = e.touches["0"].clientX;
        this.finger['y'] = e.touches["0"].clientY - 20;
        if (this.finger['y'] < this.busPos['y']) {
            topPoint['y'] = this.finger['y'] - 150;
        } else {
            topPoint['y'] = this.busPos['y'] - 150;
        }

        if (this.finger['x'] < this.busPos['x']) {
            topPoint['x'] = Math.abs(this.finger['x'] - this.busPos['x']) / 2 + this.finger['x'];
        } else {
            topPoint['x'] = this.busPos['x'];
            this.finger['x'] = this.busPos['x']
        }


        this.linePos = app.bezier([this.finger, topPoint, this.busPos], 30);
        this.startAnimation();

    },
    //开始动画
    startAnimation: function() {
        var index = 0,
            that = this,
            bezier_points = that.linePos['bezier_points'];
        this.setData({
            hide_good_box: false,
            bus_x: that.finger['x'],
            bus_y: that.finger['y']
        })
        this.timer = setInterval(function() {
            index++;
            that.setData({
                bus_x: bezier_points[index]['x'],
                bus_y: bezier_points[index]['y']
            })
            if (index >= 28) {
                clearInterval(that.timer);
                that.setData({
                    hide_good_box: true,
                    hideCount: false,
                    count: that.data.count += 1
                })
            }
        }, 33);
    }
})