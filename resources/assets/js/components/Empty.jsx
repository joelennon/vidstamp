import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Empty extends Component {
    render() {
        return (
            <div className="text-center">
                <img src="/img/empty.png" className="img-fluid" style={{ width: 300 }} />
                <p className="lead" style={{marginTop: -25, fontSize: '2em'}}>
                    Ready to watermark your first video?
                </p>
                <p>
                    <Link to="/jobs/create" className="btn btn-primary btn-lg">Let's Go!</Link>
                </p>
            </div>
        );
    }
}

export default Empty;