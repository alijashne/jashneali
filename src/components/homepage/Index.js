import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import styles from "../../stylesheets/homepage.module.scss";
import { useRouter } from "next/router";
import UploadModal from "./UploadModal";

export default function Index() {
    const router = useRouter();
    const [show, setShow] = useState(false);
    const [savedData, setSavedData] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem("savedAnnotationsList");
        if (stored) {
            setSavedData(JSON.parse(stored));
        }
    }, []);

    const handleClose = () => {
        setShow(false);
        const stored = localStorage.getItem("savedAnnotationsList");
        if (stored) {
            setSavedData(JSON.parse(stored));
        }
    };

    // New function: mimic handleUpload but with saved data
    const handleEditUpload = (item) => {
        if (!item.image || !item.lat || !item.lng) {
            alert("Missing required fields in saved data.");
            return;
        }
        localStorage.setItem(
            "uploadData",
            JSON.stringify({
                imagePath: item.image,
                latitude: item.lat,
                longitude: item.lng,
                annotations: item.annotations || []
            })
        );
        router.push("/edit");
    };

    return (
        <div>
            <Button className="mb-3 px-4" onClick={() => setShow(true)}>
                Upload
            </Button>
            <Row className="g-4">
                {savedData.length > 0 ? (
                    savedData.map((item, index) => (
                        <Col md={3} sm={6} key={index}>
                            <div className={styles.cardBox}>
                                <div className={styles.imgWrapper}>
                                    <img
                                        src={item.image}
                                        alt={`Image ${index + 1}`}
                                        style={{
                                            width: "100%",
                                            height: "200px",
                                            objectFit: "cover",
                                        }}
                                    />
                                    <Button
                                        className={styles.editBtn}
                                        onClick={() => handleEditUpload(item)}
                                    >
                                        Edit
                                    </Button>
                                    <span className={styles.badge}
                                        onClick={() => {
                                            router.push({
                                                pathname: "/map-view",
                                                query: {
                                                    lat: item.lat,
                                                    lng: item.lng,
                                                    tags: JSON.stringify(item.annotations || [])
                                                }
                                            });
                                        }}

                                    >
                                        Lat: {item.lat}, Lng: {item.lng}
                                    </span>
                                </div>
                                <div className={styles.cardInfo}>
                                    <h6>
                                        Tags:{" "}
                                        {item.annotations?.map((a) => a?.text).join(", ") ||
                                            "No tags"}
                                    </h6>
                                    <small>
                                        Saved on:{" "}
                                        {new Date(item.savedAt).toLocaleString()}
                                    </small>
                                </div>
                            </div>
                        </Col>
                    ))
                ) : (
                    <p>No saved images found.</p>
                )}
            </Row>

            <UploadModal show={show} handleClose={handleClose} />
        </div>
    );
}
