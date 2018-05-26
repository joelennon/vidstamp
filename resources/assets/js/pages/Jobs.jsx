import React, { Component } from 'react';

import Body from '../layouts/Body';
import Api from '../api/Jobs';

const initialState = {
    list: [],
    loading: false,
    error: null,
};

class Jobs extends Component {
    state = initialState;

    load = () => {
        this.setState({ ...initialState, loading: true }, this.fetch);
    }

    fetch = () => {
        Api.index((success, response) => {            
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
        const ready = !loading && !error && list.length > 0;

        return (
            <Body>
                {loading && <div>Loading jobs...</div>}
                {error && <div>Error: {error}</div>}
                {empty && <div>No jobs to display.</div>}
                {ready &&
                    <div>
                        {list.map((job, index) => (
                            <div>Job ID: {job.id}</div>
                        ))}
                    </div>
                }
            </Body>
        );
    }
}

export default Jobs;