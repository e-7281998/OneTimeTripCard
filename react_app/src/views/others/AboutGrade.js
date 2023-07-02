import SimpleFooter from 'components/Footers/SimpleFooter';
import React from 'react';
import { Col, Container, Row, UncontrolledTooltip } from 'reactstrap';
function AboutGrade(props) {
    return (
        <>
            <section className="section section-lg">
                <Container>
                    <Row className="row-grid justify-content-center">
                        <Col >
                            <img
                                alt="..."
                                className="img-fluid floating"
                                src={require("assets/img/brand/grade.png")}
                            />
                            <hr></hr>
                            <h2 className="text-center">
                                Do you want various benefits while traveling?

                            </h2>
                            <h1 className="text-center">
                                Start OTTC!
                            </h1>
                            <p className="text-center">
                                If you use OTTC, you can choose and use the benefits you want by level while traveling.
                                You can receive various benefits for each level.
                            </p>


                        </Col>
                    </Row>
                </Container>
            </section>
            <SimpleFooter />
        </>
    );
}

export default AboutGrade;