import React, { Component } from 'react';

class Boxx extends Component {
    render() {
        return (
            <div className="Box">
                <div style={{
                    height: `${this.props.height}em`,
                    width: `${this.props.width}em`,
                    backgroundColor: this.props.color
                }}>
                </div>
                <button onClick={this.props.removeBox}>X</button>
            </div>      
        );
    }
}

export default Boxx;