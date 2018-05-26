import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
                <div className="mb-4">
                    <Link to="/jobs/create" className="btn btn-primary">New Job</Link>
                </div>
                {loading && <div>Loading jobs...</div>}
                {error && <div>Error: {error}</div>}
                {empty && <div>No jobs to display.</div>}
                {ready &&
                    <table className="table">
                        <colgroup>
                            <col />
                            <col style={{ width: '210px' }} />
                            <col style={{ width: '210px' }} />
                            <col style={{ width: '100px' }} />
                        </colgroup>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Created</th>
                                <th>Updated</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((job, index) => (
                                <tr key={index}>
                                    <td>{job.id}</td>
                                    <td>{job.created_at}</td>
                                    <td>{job.updated_at}</td>
                                    <td className="text-right">
                                        <a href="#" className="btn btn-sm btn-light">View</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </Body>
        );
    }
}

export default Jobs;