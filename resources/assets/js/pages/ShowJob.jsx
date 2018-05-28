import React, { Component } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import VideoTabs from './Show/VideoTabs';
import Body from '../layouts/Body';
import Api from '../api/Jobs';

const initialState = {
    id: null,
    loading: false,
    data: null,
    error: null,
    dropdownOpen: false,
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

    toggle = () => {
        this.setState({ dropdownOpen: !this.state.dropdownOpen });
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
                {data && <span className="mt-2 badge badge-success float-right"><div className="px-2 py-1" style={{ fontSize: '1.5em' }}>{data.status}</div></span>}
                <h1 className="border-bottom border-light pb-3">
                    <button className="btn btn-light mr-4 align-text-bottom" onClick={this.back}>&lt;</button>
                    {data && data.video_filename} <small className="text-muted">(Job #{id})</small>
                </h1>

                {loading && <div>Loading job...</div>}
                {error && <div>Error: {error}</div>}
                {ready &&
                    <div className="row">
                        <div className="col-lg-9">
                            <VideoTabs job={data} />
                        </div>
                        <div className="col-lg-3">
                            <div className="mb-4">
                                <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className="btn-block">
                                    <DropdownToggle caret color="primary" className="btn-block">
                                        Download
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem header>Video Files</DropdownItem>
                                        {data.output_video_path &&
                                            <DropdownItem href={`/jobs/${data.id}/video?output=1&dl=1`}>Download Watermarked Video</DropdownItem>
                                        }
                                        {data.video_path &&
                                            <DropdownItem href={`/jobs/${data.id}/video?dl=1`}>Download Original Video</DropdownItem>
                                        }
                                        <DropdownItem divider />
                                        <DropdownItem header>Image Files</DropdownItem>
                                        <DropdownItem href={`/jobs/${data.id}/watermarks?dl=1`}>Download Watermark Image</DropdownItem>
                                    </DropdownMenu>
                                </ButtonDropdown>
                            </div>
                            <div className="card">
                                <h5 className="card-header">Job Properties</h5>
                                <div className="card-body">
                                    <dl>
                                        <dt>Watermark Image:</dt>
                                        <dd><img src={`/jobs/${data.id}/watermarks`} className="img-fluid" /></dd>
                                        
                                        <dt>Job ID:</dt>
                                        <dd>{data.id}</dd>

                                        {data.job_duration &&
                                            <div>
                                                <dt>Job Duration:</dt>
                                                <dd>{data.job_duration}</dd>
                                            </div>
                                        }

                                        <dt>Watermark Opacity:</dt>
                                        <dd>{data.formatted_opacity}</dd>

                                        <dt>Watermark Position:</dt>
                                        <dd>{data.formatted_position}</dd>

                                        <dt>Filename:</dt>
                                        <dd>{data.video_filename}</dd>

                                        <dt>File Size:</dt>
                                        <dd>{data.human_video_size}</dd>

                                        <dt>MIME Type:</dt>
                                        <dd>{data.video_mime}</dd>

                                        <dt>Created:</dt>
                                        <dd>{data.created_at}</dd>

                                        <dt>Updated:</dt>
                                        <dd>{data.updated_at}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </Body>
        );
    }
}

export default ShowJob;