/**
 * react music player
 */

import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link } from 'react-router';
import Header from './components/Header.js';
import Lyric from './components/Lyric.js';
import Audio from './components/Audio.js';
import Buttons from './components/Buttons.js';
import Progress from './components/Progress.js';
import data from './data.js';

// import sass
require('./sass/style.scss');

const App = React.createClass({

    getInitialState() {
        return {
            isPlay: false,
            loop: 'loop',
            length: data.length,
            index: 0,
            currentTime: 0,
            duration: 0
        };
    },

    render() {
        var that = this;
        return (
            <div id="app">
                <div className="bg"></div>
                {
                    React.Children.map(this.props.children, function (child) {
                        return React.cloneElement(child, that.state);
                    })
                }
            </div>
        );
    }

});

const Player = React.createClass({

    getInitialState() {
        return {
            currentTime: this.props.currentTime,
            duration: this.props.duration,
            loop: this.props.loop,
            length: this.props.length,
            index: this.props.index,
            isPlay: this.props.isPlay
        };
    },

    handleChange(type) {
        var n = this.state.index;
        if (this.state.loop === 'random') {
            n = parseInt(Math.random() * this.state.length, 10);
        } else {
            switch (type) {
                case 'next': 
                    n++;
                    n >= this.state.length && (n = 0);
                    break;
                case 'prev':
                    n--;
                    n < 0 && (n = this.state.length - 1); 
                    break;
                case 'switch':
                    this.setState({isPlay: !this.state.isPlay});
                    break;
            }        
        }
        this.state.index !== n && this.setState({index: n, isPlay: true});
    },

    handleTimeUpdate(obj) {
        var list = React.findDOMNode(this.refs.list);
        this.setState({
            currentTime: obj.currentTime,
            duration: obj.duration
        });
        if (parseInt(obj.currentTime, 10) === parseInt(obj.duration, 10)) {
            this.handleChange('next');
        }
    },

    render() {
        var cls = this.state.isPlay ? 'pause' : 'play';
        var music = data[this.state.index];
        return (
            <div className="player">
                <Lyric 
                    ref="list" 
                    currentTime={this.state.currentTime}
                    lyric={music.lyric} />
                <Progress
                    currentTime={this.state.currentTime} 
                    duration={this.state.duration} />
                <Audio 
                    audio={music.audio} 
                    isPlay={this.state.isPlay}
                    handleTimeUpdate={this.handleTimeUpdate} />
                <Buttons 
                    isPlay={this.state.isPlay} 
                    handleChange={this.handleChange} />
            </div>
        );    
    }

});

const List = React.createClass({

    getInitialState() {
        return {
            currentTime: this.props.currentTime,
            duration: this.props.duration,
            loop: this.props.loop,
            length: this.props.length,
            index: this.props.index,
            isPlay: this.props.isPlay
        };
    },

    render() {
        var list = data.map(function (item) {
            return <li>{item.title} &nbsp; - &nbsp;<span className="author">{item.author}</span></li>
        });
        list = list.concat(list, list);
        return (
            <div className="list">
                <ul className="song-list">{list}</ul>
                <Buttons 
                    isPlay={this.state.isPlay} 
                    handleChange={this.handleChange} />
            </div>
        );
    }
    
});

render((
    <Router>
        <Route path="/" component={App}>
            <IndexRoute component={Player}/>
            <Route path="player" component={Player} />
            <Route path="list" component={List} />
        </Route>
    </Router>
), document.body);