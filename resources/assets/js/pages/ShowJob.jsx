import React, { Component } from 'react';

import Body from '../layouts/Body';
import Api from '../api/Jobs';

const initialState = {
    id: null,
    loading: false,
    data: null,
    error: null,
}

class ShowJob extends Component {
    state = initialState;

    load = () => {
        const { id } = this.state;

        this.setState({ ...initialState, id, loading: true }, this.fetch);
    }

    fetch = () => {
        const { id } = this.state;

        Api.show(id, (success, response) => {
            this.setState({
                ...initialState,
                id,
                data: success ? response : null,
                error: success ? null : response.message,
            });
        });
    }

    back = () => {
        const { history } = this.props;

        history.push('/jobs');
    }

    componentDidMount() {
        const { id } = this.props.match.params;

        this.setState({ id }, this.load);
    }

    render() {
        const { id, loading, data, error } = this.state;
        const ready = !loading && !error && data;

        return (
            <Body>
                <h1 className="border-bottom border-light pb-3">
                    <button className="btn btn-light mr-4 align-text-bottom" onClick={this.back}>&lt;</button>
                    Job #{id}
                </h1>

                {loading && <div>Loading job...</div>}
                {error && <div>Error: {error}</div>}
                {ready &&
                    <dl>
                        <dt>ID:</dt>
                        <dd>{data.id}</dd>

                        <dt>Created:</dt>
                        <dd>{data.created_at}</dd>

                        <dt>Updated:</dt>
                        <dd>{data.updated_at}</dd>

                        <dt>File Size:</dt>
                        <dd>{data.human_video_size}</dd>

                        <dt>MIME Type:</dt>
                        <dd>{data.video_mime}</dd>

                        {data.video_path &&
                            <div>
                                <dt>Original Video:</dt>
                                <dd>
                                    <div className="embed-responsive embed-responsive-16by9 bg-dark border">
                                        <video className="embed-responsive-item" src={`/jobs/${data.id}/video`} controls />
                                    </div>
                                </dd>
                            </div>
                        }
                    </dl>
                }
            </Body>
        );
    }
}

export default ShowJob;