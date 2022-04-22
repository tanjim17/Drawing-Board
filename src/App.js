import React from "react";
import './App.css';
import Canvas from './Canvas';
import { Col, Container, Row, Nav, Navbar } from "react-bootstrap";
import background from './assets/background.jpg';

function App() {
  return (
    <div style={{ backgroundImage: `url(${background})` }}>
      <Navbar style={{ color: 'white', position: 'sticky' }} bg="dark" expand="lg" fixed="top">
        <Nav.Item className="title-font">Drawing Board</Nav.Item>
      </Navbar>
      <Container fluid style={{ marginTop: 5 }}>
        <Row>
          <Col><Canvas /></Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
