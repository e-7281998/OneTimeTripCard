import React from 'react';
import { Badge, Col, Row } from 'reactstrap';

function AboutOttc(props) {
    return (
        <>
            <div className='explain'>
                <Row className="row-grid align-items-center">
                    <Col className="order-md-2" md="6">
                        <div className="satellites" style={{ width: 200 }}   >
                            <img className="satellite" src={require("assets/img/card/homecard.png")}>
                            </img>
                            <img className="satellite2" src={require("assets/img/card/homecard.png")}>
                            </img>
                            <img className="satellite3" src={require("assets/img/card/homecard2.png")}>
                            </img>
                            <img className="satellite4" src={require("assets/img/card/homecard2.png")}>
                            </img>
                        </div>
                    </Col>
                    <Col className="order-md-1" md="6">
                        <div className="pr-md-5">

                            <h3>One Time Trip card</h3>
                            <p style={{ color: 'white' }}>
                                One Time Trip Card is a prepaid card service that can be used safely and conveniently while traveling.
                            </p>
                            <ul className="list-unstyled mt-5">
                                <li className="py-2">
                                    <div className="d-flex align-items-center">
                                        <div>
                                            <Badge
                                                className="badge-circle mr-3"
                                                color="success"
                                            >
                                                <i className="ni ni-settings-gear-65" />
                                            </Badge>
                                        </div>
                                        <div>
                                            <h6 className="mb-0">
                                                Comportable Exchange
                                            </h6>
                                        </div>
                                    </div>
                                </li>
                                <li className="py-2">
                                    <div className="d-flex align-items-center">
                                        <div>
                                            <Badge
                                                className="badge-circle mr-3"
                                                color="success"
                                            >
                                                <i className="ni ni-html5" />
                                            </Badge>
                                        </div>
                                        <div>
                                            <h6 className="mb-0">Sequrity</h6>
                                        </div>
                                    </div>
                                </li>
                                <li className="py-2">
                                    <div className="d-flex align-items-center">
                                        <div>
                                            <Badge
                                                className="badge-circle mr-3"
                                                color="success"
                                            >
                                                <i className="ni ni-satisfied" />
                                            </Badge>
                                        </div>
                                        <div>
                                            <h6 className="mb-0">
                                                Enjoy Traveling
                                            </h6>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </Col>
                </Row>
                <hr></hr>

                <img
                    alt="..."
                    className="img-fluid floating"
                    src={require("assets/img/brand/explain1.png")}
                />
                <hr></hr>
                <img
                    alt="..."
                    className="img-fluid floating"
                    src={require("assets/img/brand/explain2.png")}
                />
                <hr></hr>
                <img
                    alt="..."
                    className="img-fluid floating"
                    src={require("assets/img/brand/explain3.png")}
                />
            </div>
        </>
    );
}

export default AboutOttc;