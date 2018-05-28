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

class Jobs extends Component {
    state = initialState;

    load = () => {
        this.setState({ ...initialState, loading: true }, this.fetch);
    }

    fetch = () => {
        Api.index(false, (success, response) => {
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

    getStatusClassName = (status) => {
        if(status === 'Complete') {
            return 'success';
        } else if (status === 'Failed') {
            return 'danger';
        } else if(status === 'Processing') {
            return 'info';
        }

        return 'dark';
    }

    render() {
        const { loading, list, error } = this.state;

        const empty = !loading && !error && list.length === 0;
        const ready = !loading && !error && list.length > 0;

        return (
            <Body>
                <div className="mb-4">
                    <div className="float-right">
                        <button type="button" className="btn btn-light" onClick={this.load}>Refresh</button>
                    </div>
                    <Link to="/jobs/create" className="btn btn-primary">New Job</Link>
                </div>
                {loading && <div>Loading jobs...</div>}
                {error && <div>Error: {error}</div>}
                {empty && <Empty />}
                {ready &&
                    <table className="table">
                        <colgroup>
                            <col style={{ width: '100px' }} />
                            <col />
                            <col style={{ width: '130px' }} />
                            <col style={{ width: '130px' }} />
                            <col style={{ width: '130px' }} />
                            <col style={{ width: '180px' }} />
                            <col style={{ width: '80px' }} />
                        </colgroup>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Filename</th>
                                <th>Status</th>
                                <th>Size</th>
                                <th>Type</th>
                                <th>Created</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((job, index) => {                                
                                return (
                                    <tr key={index}>
                                        <td className="align-middle">{job.id}</td>
                                        <td className="align-middle">{job.video_filename}</td>
                                        <td className="align-middle">
                                            <span className={`badge badge-${this.getStatusClassName(job.status)}`}>{job.status}</span>
                                        </td>
                                        <td className="align-middle">{job.human_video_size}</td>
                                        <td className="align-middle">{job.video_mime}</td>
                                        <td className="align-middle">{job.created_at}</td>
                                        <td className="text-right">
                                            <Link to={`/jobs/${job.id}`} className="btn btn-sm btn-light">View</Link>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                }
            </Body>
        );
    }
}

export default Jobs;