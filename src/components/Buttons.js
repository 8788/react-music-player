/**
 * MusicButton components
 */

import React, {Component} from 'react';

module.exports = React.createClass({

    render() {
        var cls = this.props.isPlay ? 'pause' : 'play';
        return (
            <div className="buttons">
                <span className="prev" onClick={this.props.handleChange.bind(null, 'prev')}></span>
                <span className={'switch ' + cls} onClick={this.props.handleChange.bind(null, 'switch')}></span>
                <span className="next" onClick={this.props.handleChange.bind(null, 'next')}></span>
            </div>
        );
    }
    
});