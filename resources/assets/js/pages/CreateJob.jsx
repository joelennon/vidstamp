import React, { Component } from 'react';
import { toast } from 'react-toastify';

import Body from '../layouts/Body';
import Api from '../api/Jobs';

class CreateJob extends Component {
    state = {
        video: null,
        watermark: null,
        opacity: 0.5,
        position: 'bottom-right',
        valid: false,
        saving: false,
    }

    back = () => {
        const { history } = this.props;

        history.push('/jobs');
    }

    save = (event) => {
        const { video, watermark, opacity, position } = this.state;
        const { history } = this.props;

        event.preventDefault();

        this.setState({ saving: true }, () => {
            Api.store({ video, watermark, opacity, position }, (success, response) => {
                history.push(`/jobs`);
                toast.success('Job submitted successfully.');
            });
        });
    }

    onSelectVideo = (event) => {
        const { files } = event.target;

        if (files.length === 1) {
            this.setState({ video: files[0] }, this.validate);
        }
    }

    onSelectWatermark = (event) => {
        const { files } = event.target;

        if (files.length === 1) {
            this.setState({ watermark: files[0] }, this.validate);
        }
    }

    onSelectOpacity = (event) => {
        const { value } = event.target;

        this.setState({ opacity: value });
    }

    onSelectChange = (event) => {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    }

    validate = () => {
        const { video, watermark } = this.state;
        const valid = video && watermark;

        this.setState({ valid });
    }

    render() {
        const { opacity, position, valid, saving } = this.state;

        return (
            <Body>
                <form onSubmit={this.save}>
                    <h1 className="border-bottom border-light pb-3">
                        <button className="btn btn-light mr-4 align-text-bottom" onClick={this.back}>&lt;</button>
                        New Job
                    </h1>

                    <div className="py-4">
                        <p className="lead">Use this form to start a new watermarking job.</p>

                        <div className="form-group">
                            <label htmlFor="video">Video</label>
                            <input type="file" name="video" id="video" className="form-control-file" accept="video/*" onChange={this.onSelectVideo} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="watermark">Watermark Image</label>
                            <input type="file" name="watermark" id="watermark" className="form-control-file" accept="image/*" onChange={this.onSelectWatermark} />
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="opacity">Watermark Opacity:</label>
                                    <select name="opacity" id="opacity" className="form-control" onChange={this.onSelectChange} value={opacity}>
                                        <option value={0.25}>25%</option>
                                        <option value={0.5}>50%</option>
                                        <option value={0.75}>75%</option>
                                        <option value={1}>100%</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="position">Watermark Position:</label>
                                    <select name="position" id="position" className="form-control" onChange={this.onSelectChange} value={position}>
                                        <option value="bottom-right">Bottom Right</option>
                                        <option value="top-right">Top Right</option>
                                        <option value="bottom-left">Bottom Left</option>
                                        <option value="top-left">Top Left</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="py-3 border-top border-light">
                        <button type="submit" className="btn btn-primary" disabled={!valid || saving}>{saving ? 'Uploading...' : 'Submit'}</button>
                    </div>
                </form>
            </Body>
        );
    }
}

export default CreateJob;