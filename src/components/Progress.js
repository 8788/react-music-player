/**
 * music ProgressBar components
 */

import React, {Component} from 'react';

module.exports = React.createClass({

    stringifyTime(n) {
        n = parseInt(n, 10);
        if (isNaN(n)) {
            return '00:00';
        } else {
            var min = '' + parseInt(n / 60, 10);
            var sec = '' + parseInt(n % 60, 10);
            min.length < 2 && (min = '0' + min);
            sec.length < 2 && (sec = '0' + sec);
            return min + ':' + sec;
        }
    },

    render() {
        var percent = (this.props.currentTime / this.props.duration).toFixed(2) * 100;
        var ticker = this.stringifyTime(this.props.currentTime);
        var duration = this.stringifyTime(this.props.duration);
        return (
            <div className="progress">
                <span className="ticker">{ticker}</span>
                <div className="progressbar clearfix">
                    <span style={{width: percent + '%'}} className="percent"></span>
                    <i className="range"></i>
                </div>
                <span className="duration">{duration}</span>
            </div>
        );
    }
    
});