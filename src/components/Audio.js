/**
 * MusicAudio components
 */

import React, {Component} from 'react';

module.exports = React.createClass({

    componentDidMount() {
        var audio = React.findDOMNode(this.refs.audio);
        var that = this;
        audio.ontimeupdate = function () {
            var obj = {
                currentTime: audio.currentTime,
                duration: audio.duration
            }
            that.props.handleTimeUpdate(obj);
        };
        if (this.props.isPlay) {
            audio.play();
        } else {
            audio.pause();
        }
    },

    componentDidUpdate() {
        var audio = React.findDOMNode(this.refs.audio);
        if (this.props.isPlay) {
            audio.play();
        } else {
            audio.pause();
        }
    },

    render() {
        return (
            <audio ref="audio" src={this.props.audio} ></audio>
        );
    }
    
});