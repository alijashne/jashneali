import React from 'react';
import { Navbar, Form, FormControl } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar className="px-3 themeColor shadow-sm">
      <Navbar.Brand className="fw-semibold">NAME</Navbar.Brand>
      <Form className="ms-auto d-flex align-items-center">
        <FormControl
          type="search"
          placeholder="Search"
          className="me-3"
          size="sm"
        />
        <div className="bg-secondary text-white rounded-circle text-center" style={{ width: 32, height: 32, lineHeight: '32px' }}>
          J
        </div>
      </Form>
    </Navbar>
  );
};

export default Header;
