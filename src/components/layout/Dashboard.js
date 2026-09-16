import React from 'react';
// import Layout from '../components/Layout';
import { Card, Row, Col } from 'react-bootstrap';

const Dashboard = () => {
    return (
        // <Layout>
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {[...Array(8)].map((_, idx) => (
                <Col key={idx}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Project {idx + 1}</Card.Title>
                            <Card.Text>
                                Status: Public
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
        // </Layout>
    );
};

export default Dashboard;
