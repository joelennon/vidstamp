import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';

class VideoTabs extends Component {
    state = {
        activeTab: '1',
    };

    toggle = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        const { job } = this.props;
        const { activeTab } = this.state;

        return (
            <div>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={activeTab === '1' ? 'active' : ''}
                            onClick={() => { this.toggle('1'); }}
                        >
                            Watermarked Video
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={activeTab === '2' ? 'active' : ''}
                            onClick={() => { this.toggle('2'); }}
                        >
                            Original Video
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1" className="py-4">
                        {['Queued', 'Processing'].includes(job.status) && <div className="lead text-center">Watermark job running. Refresh to check if it's completed.</div>}
                        {job.status == 'Failed' && <div className="lead text-center text-danger">The watermark job failed.</div>}
                        {job.output_video_path &&
                            <div className="embed-responsive embed-responsive-16by9">
                                <video className="embed-responsive-item border bg-dark" src={`/jobs/${job.id}/video?output=1`} controls />
                            </div>
                        }
                    </TabPane>
                    <TabPane tabId="2" className="py-4">
                        {job.video_path &&
                            <div className="embed-responsive embed-responsive-16by9">
                                <video className="embed-responsive-item border bg-dark" src={`/jobs/${job.id}/video`} controls />
                            </div>
                        }
                    </TabPane>
                </TabContent>
            </div>
        );
    }
}

export default VideoTabs;