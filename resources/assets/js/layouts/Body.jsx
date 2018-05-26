import React, { Component } from 'react';

class Body extends Component {
    render() {
        const { children } = this.props;
        
        return (
            <div className="container my-4">
                {children}
            </div>
        );
    }
}

export default Body;