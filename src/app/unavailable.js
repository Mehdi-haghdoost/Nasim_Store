import React from 'react'
import styles from '@/styles/unavailable.module.css';
function unavailable() {
    return (
        <div className="container">
            <div className="error">
                <h1>503</h1>
                <h2>خطای</h2>
                <p>
                    به نظر میاد مشکلی پیش اومده لطفا چند لحظه دیگه دویاره امتحان کن!
                </p>
                <p className="subtitle">ERR_INTERNAL_SERVER_ERROR</p>
            </div>
            <div className="stack-container">
                <div className="card-container">
                    <div className="perspec" style="--spreaddist: 125px; --scaledist: .75; --vertdist: -25px;">
                        <div className="card">
                            <div className="writing">
                                <div className="topbar">
                                    <div className="red"></div>
                                    <div className="yellow"></div>
                                    <div className="green"></div>
                                </div>
                                <div className="code">
                                    <ul>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-container">
                    <div className="perspec" style="--spreaddist: 100px; --scaledist: .8; --vertdist: -20px;">
                        <div className="card">
                            <div className="writing">
                                <div className="topbar">
                                    <div className="red"></div>
                                    <div className="yellow"></div>
                                    <div className="green"></div>
                                </div>
                                <div className="code">
                                    <ul>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-container">
                    <div className="perspec" style="--spreaddist:75px; --scaledist: .85; --vertdist: -15px;">
                        <div className="card">
                            <div className="writing">
                                <div className="topbar">
                                    <div className="red"></div>
                                    <div className="yellow"></div>
                                    <div className="green"></div>
                                </div>
                                <div className="code">
                                    <ul>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-container">
                    <div className="perspec" style="--spreaddist: 50px; --scaledist: .9; --vertdist: -10px;">
                        <div className="card">
                            <div className="writing">
                                <div className="topbar">
                                    <div className="red"></div>
                                    <div className="yellow"></div>
                                    <div className="green"></div>
                                </div>
                                <div className="code">
                                    <ul>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-container">
                    <div className="perspec" style="--spreaddist: 25px; --scaledist: .95; --vertdist: -5px;">
                        <div className="card">
                            <div className="writing">
                                <div className="topbar">
                                    <div className="red"></div>
                                    <div className="yellow"></div>
                                    <div className="green"></div>
                                </div>
                                <div className="code">
                                    <ul>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-container">
                    <div className="perspec" style="--spreaddist: 0px; --scaledist: 1; --vertdist: 0px;">
                        <div className="card">
                            <div className="writing">
                                <div className="topbar">
                                    <div className="red"></div>
                                    <div className="yellow"></div>
                                    <div className="green"></div>
                                </div>
                                <div className="code">
                                    <ul>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default unavailable;