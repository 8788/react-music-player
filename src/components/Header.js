/**
 * MusicButton components
 */

import React, {Component} from 'react';

module.exports = React.createClass({

    render() {
        return (
            <div className="header">
                <span className="title">{this.props.title}</span>
            </div>
        );
    }
    
});