import { useState } from "react";
import { Modal, Button, Form, Row, Col, Image } from "react-bootstrap";
import { useRouter } from "next/router";
import exifr from "exifr"; // ✅ Added
import styles from "../../stylesheets/homepage.module.scss";

function UploadModal({ show, handleClose }) {
    const router = useRouter();

    const [preview, setPreview] = useState(null);
    const [lat, setLat] = useState("");
    console.log("lat", lat);

    const [lng, setLng] = useState("");
    console.log("lng", lng);


    const convertInspToJpg = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = function (event) {
                const arrayBuffer = event.target.result;
                const blob = new Blob([arrayBuffer], { type: "image/jpeg" });
                const blobUrl = URL.createObjectURL(blob);
                resolve(blobUrl);
            };
            reader.onerror = reject;
            reader.readAsArrayBuffer(file);
        });
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const ext = file.name.split(".").pop().toLowerCase();

        let fileForExif = file;

        if (ext === "insp") {
            // Convert .insp to jpg
            const convertedUrl = await convertInspToJpg(file);
            setPreview(convertedUrl);

            // Unfortunately, converting .insp to jpg in browser will usually strip EXIF,
            // so GPS extraction may not work for .insp unless done on backend.
            fileForExif = file; // Still try reading EXIF from original file
        } else if (["jpg", "jpeg", "png"].includes(ext)) {
            setPreview(URL.createObjectURL(file));
        } else {
            alert("Please select an .insp, .jpg or .png file");
            return;
        }

        // ✅ Try to read GPS metadata
        try {
            const gpsData = await exifr.gps(fileForExif);
            if (gpsData?.latitude && gpsData?.longitude) {
                setLat(gpsData.latitude.toFixed(4));
                setLng(gpsData.longitude?.toFixed(4));
            } else {
                console.warn("No GPS data found in image");
            }
        } catch (err) {
            console.error("Error reading EXIF:", err);
        }
    };

    const handleUpload = () => {
        if (!preview || !lat || !lng) {
            alert("Please fill all fields.");
            return;
        }
        localStorage.setItem("uploadData", JSON.stringify({
            imagePath: preview,
            latitude: lat,
            longitude: lng
        }));

        router.push("/edit");
    };

    return (
        <Modal show={show} onHide={handleClose} size="md" centered>
            <Modal.Body className={`${styles.uploadModalBody} py-4`}>
                <h4 className="text-center mb-4">Upload Image with Location</h4>

                <Form>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Select Image (.insp, .jpg, .png)</Form.Label>
                        <Form.Control type="file" accept=".insp,.jpg,.jpeg,.png" onChange={handleFileChange} />
                    </Form.Group>

                    {preview && (
                        <div className="text-center mb-3">
                            <Image src={preview} alt="preview" thumbnail className={styles.previewImage} />
                        </div>
                    )}

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Latitude</Form.Label>
                                <Form.Control
                                    type="number"
                                    step="any"
                                    placeholder="Enter latitude"
                                    value={lat}
                                    onChange={(e) => setLat(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Longitude</Form.Label>
                                <Form.Control
                                    type="number"
                                    step="any"
                                    placeholder="Enter longitude"
                                    value={lng}
                                    onChange={(e) => setLng(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <div className="text-center mt-4">
                        <Button variant="secondary" onClick={handleClose} className="me-2">Cancel</Button>
                        <Button variant="primary" onClick={handleUpload}>Upload & Continue</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default UploadModal;
