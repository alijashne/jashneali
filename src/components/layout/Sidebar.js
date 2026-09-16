import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { FaHome, FaFolderOpen } from "react-icons/fa";
import { MdEditDocument, MdLogout } from "react-icons/md";
import Logout from '../common/Logout';

const Sidebar = () => {
    const router = useRouter();
    const [show, setShow] = useState(false)

    const handleClose = () => {
        setShow(false)
    }

    return (
        <Nav
            className="flex-column text-center pt-3 h-100"
            style={{ minHeight: "100vh" }}
        >
            <Nav.Item className="mb-4">
                Logo
            </Nav.Item>

            <Nav.Link onClick={() => router.push("/home")}>
                <FaHome style={{ fontSize: "25px", color: "#1795ac" }} />
            </Nav.Link>

            <Nav.Link onClick={() => router.push("/edit")}>
                <FaFolderOpen style={{ fontSize: "25px", color: "#1795ac" }} />
            </Nav.Link>

            <Nav.Link>
                <MdEditDocument style={{ fontSize: "25px", color: "#1795ac" }} />
            </Nav.Link>

            <div className="flex-grow-1"></div>
            <Nav.Link className="mt-auto mb-4"
                onClick={() => setShow(true)}
            >
                <MdLogout style={{ fontSize: "25px", color: "#ac1717" }} />
            </Nav.Link>
            <Logout show={show} handleClose={handleClose} />
        </Nav>
    );
};

export default Sidebar;
