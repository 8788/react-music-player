/**
 * music LyricList components
 */

import React, {Component} from 'react';

module.exports = React.createClass({
    
    parseTime(s) {
        var arr = s.match(/[\d\.]+/g);
        return (arr[0] * 60 + parseFloat(arr[1])).toFixed(0);
    },

    parseLyric(lyric) {
        var lyricArr = [];  // [{time: '123', text: 'xxxx'}]
        var reg = /\[\d{2}:\d{2}\.\d{2}\]/g;
        // var tmpArr = lyric.match(/(\[\d{2}:\d{2}\.\d{2}\])+[^\[]+/g);
        var tmpArr = lyric.split('\n');
        var that = this;
        tmpArr.forEach(function (item) {
            item = item.trim();
            if (!reg.test(item)) {return;}
            var text = item.replace(reg, '').trim();
            if (!text) {return}
            var timeArr = item.match(reg);
            timeArr.forEach(function (time) {   // 适配[01:20.15][02:10.45]xxxxx类
                lyricArr.push({time: that.parseTime(time), text: text});
            });
        });
        lyricArr.sort(function (a, b) {
            return a.time - b.time;
        });
        return lyricArr;
    },

    render() {
        var that = this;
        var line = 0;
        var lyricArr = this.parseLyric(this.props.lyric);
        lyricArr.forEach(function (item, index) {
            if (item.time <= that.props.currentTime) {
                line = index;
            }
        });
        var list = lyricArr.map(function (item, index) {
            var strClass = line === index ? ('active line-' + index) : ('line-' + index);
            return (
                <li key={'li-' + index} className={strClass}>{item.text}</li>
            );
        });

        var styleObj = {
            transform: 'translate3d(0, ' + (- line * 36) + 'px ,0)'
        };
        return (
            <div className="lyric">
                <ul style={styleObj} className="lyric-list">{list}</ul>
            </div>
        );
    }

});