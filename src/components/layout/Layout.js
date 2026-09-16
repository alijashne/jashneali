import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './Sidebar';
import Header from '../common/Header';

const Layout = ({ children }) => {
    return (
        <Container fluid>
            <Row className="g-0">
                <Col
                    style={{
                        width: "60px",
                        maxWidth: "60px",
                        flex: "0 0 50px"
                    }}
                    className="vh-100 p-0 border-end"
                >
                    <Sidebar />
                </Col>

                <Col
                    style={{ flex: "1" }}
                    className="vh-100 d-flex flex-column p-0"
                >
                    <Header />
                    <div className="flex-grow-1 overflow-auto p-3 bg-light">
                        {children}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Layout;
