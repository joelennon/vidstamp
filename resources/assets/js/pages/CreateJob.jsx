import React, { Component } from 'react';

import Body from '../layouts/Body';
import Api from '../api/Jobs';

class CreateJob extends Component {
    state = {
        video: null,
    }

    back = () => {
        const { history } = this.props;

        history.push('/jobs');
    }

    save = (event) => {
        const { video } = this.state;

        event.preventDefault();

        Api.store({ video }, (success, response) => {
            alert(success ? `Job #${response.id} created successfully.` : response.message);
        });
    }

    onSelectVideo = (event) => {
        const { files } = event.target;

        if(files.length === 1) {
            this.setState({ video: files[0] });
        }
    }

    render() {
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
                    </div>

                    <div className="mt-4 py-3 border-top border-light">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </Body>
        );
    }
}

export default CreateJob;