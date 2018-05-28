import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Empty from '../components/Empty';
import Body from '../layouts/Body';
import Api from '../api/Jobs';

const initialState = {
    list: [],
    loading: false,
    error: null,
};

class Home extends Component {
    state = initialState;

    load = () => {
        this.setState({ ...initialState, loading: true }, this.fetch);
    }

    fetch = () => {
        Api.index(true, (success, response) => {
            this.setState({
                loading: false,
                list: success ? response : [],
                error: success ? null : response.message,
            });
        });
    }

    componentDidMount() {
        this.load();
    }
    render() {
        const { loading, list, error } = this.state;

        const empty = !loading && !error && list.length === 0;
        const ready = !loading && !error && list.length === 1;
        const job = list.length === 1 ? list[0] : null;

        return (
            <Body>
                {loading && <div>Loading jobs...</div>}
                {error && <div>Error: {error}</div>}
                {empty && <Empty />}

                {ready &&
                    <div className="row">
                        <div className="col-lg-9">
                            <div className="float-right"><Link to="/jobs" className="btn btn-light mt-2">View All Jobs</Link></div>
                            <h1>Recently Watermarked <small className="text-muted">(<Link to={`/jobs/${job.id}`}>#{job.id}</Link>)</small></h1>

                            <div className="embed-responsive embed-responsive-16by9">
                                <video src={`/jobs/${list[0].id}/video?output=1`} controls className="embed-responsive-item border" />
                            </div>
                        </div>
                        <div className="col-lg-3">
                        <Link to="/jobs/create" className="btn btn-primary btn-block btn-lg">New Job</Link>
                        </div>
                    </div>
                }
            </Body>
        );
    }
}

export default Home;