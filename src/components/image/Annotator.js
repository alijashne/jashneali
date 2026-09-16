import React, { useEffect, useRef, useState } from "react";
import * as PANOLENS from "panolens";
import * as THREE from "three";
import { Button, Container, Row, Col, Image } from "react-bootstrap";
import styles from "../../stylesheets/homepage.module.scss";
import tagIcon from "../../../public/images/tagIcon.svg";
import { useRouter } from "next/router";

const Annotator = () => {
  const containerRef = useRef(null);
  const viewerRef = useRef(null);
  const panoramaRef = useRef(null);
  const infospotMapRef = useRef(new Map());
  const annotationsRef = useRef([]);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const router = useRouter()

  const [imagePath, setImagePath] = useState(null);
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [annotations, setAnnotations] = useState([]);

  const undoStackRef = useRef([]);
  const redoStackRef = useRef([]);

  const [editorVisible, setEditorVisible] = useState(false);
  const [editorScreenPos, setEditorScreenPos] = useState({ left: 0, top: 0 });
  const [editingAnnotation, setEditingAnnotation] = useState(null);


  const tooltipRef = useRef(null);

  useEffect(() => {
    const storedData = localStorage.getItem("uploadData");
    if (storedData) {
      try {
        const { imagePath: ip, latitude, longitude } = JSON.parse(storedData);
        setImagePath(ip);
        setLat(latitude);
        setLng(longitude);
      } catch (e) {
        console.error("invalid uploadData", e);
      }
    }
  }, []);

  useEffect(() => {
    annotationsRef.current = annotations;
  }, [annotations]);

  useEffect(() => {
    if (!imagePath || !containerRef.current) return;

    const panorama = new PANOLENS.ImagePanorama(imagePath);
    panoramaRef.current = panorama;

    const viewer = new PANOLENS.Viewer({
      container: containerRef.current,
      autoHideInfospot: true,
      controlBar: true,

      // autoHideControlBar: true,              // Auto hide control bar
      // autoHideInfospot: false,                 // Auto hide infospots
      // horizontalView: false,                  // Allow only horizontal camera control
      // cameraFov: 60,                          // Camera field of view in degrees
      // reverseDragging: false,                 // Reverse orbit control direction
      // enableReticle: false,                   // Enable reticle (for mouseless interaction)
      // dwellTime: 1500,                        // Dwell time for reticle selection in milliseconds
      // autoReticleSelect: true,                // Auto select after dwellTime
      viewIndicator: false,                   // Add an angle view indicator in upper left
      indicatorSize: 3000,                      // Size of view indicator
      // output: 'console',                      // Infospot position output ('console' or 'overlay')
      // autoRotate: false,                      // Auto rotate camera
      // autoRotateSpeed: 2,                     // Speed of auto rotation
      // clickTolerance: 4,

    });
    viewerRef.current = viewer;
    viewer.add(panorama);

    const tip = document.createElement("div");
    tip.style.position = "fixed";
    tip.style.padding = "6px 10px";
    tip.style.background = "rgba(0,0,0,0.85)";
    tip.style.color = "white";
    tip.style.borderRadius = "4px";
    tip.style.fontSize = "13px";
    tip.style.pointerEvents = "none";
    tip.style.zIndex = 99999;
    tip.style.display = "none";
    document.body.appendChild(tip);
    tooltipRef.current = tip;

    const onMouseMove = (ev) => {
      lastMousePos.current = { x: ev.clientX + 12, y: ev.clientY + 12 };
      if (tooltipRef.current && tooltipRef.current.style.display === "block") {
        tooltipRef.current.style.left = `${lastMousePos.current.x}px`;
        tooltipRef.current.style.top = `${lastMousePos.current.y}px`;
      }
    };
    window.addEventListener("mousemove", onMouseMove);

    const onPanoramaClick = () => {
      const intersects = viewer.raycaster.intersectObject(panorama, true);
      if (intersects && intersects.length > 0) {
        const point = intersects[0].point.clone();
        openEditorAtPosition(point);
      }
    };

    panorama.addEventListener("click", onPanoramaClick);

    refreshInfospots(annotations);

    return () => {
      panorama.removeEventListener("click", onPanoramaClick);
      window.removeEventListener("mousemove", onMouseMove);
      viewer.dispose();
      panoramaRef.current = null;
      viewerRef.current = null;
      tooltipRef.current?.remove();
      infospotMapRef.current.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagePath]);

  useEffect(() => {
    refreshInfospots(annotations);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [annotations]);

  const projectToScreen = (vec3) => {
    const viewer = viewerRef.current;
    if (!viewer) return { left: 0, top: 0 };

    const camera = viewer.camera;
    const renderer = viewer.renderer;
    const size = renderer.getSize(new THREE.Vector2());
    const width = size.x;
    const height = size.y;

    const vector = new THREE.Vector3(vec3.x, vec3.y, vec3.z).project(camera);
    const x = (vector.x * 0.5 + 0.5) * width;
    const y = (-vector.y * 0.5 + 0.5) * height;
    const rect = viewer.container.getBoundingClientRect();
    return { left: rect.left + x, top: rect.top + y };
  };

  const openEditorAtPosition = (threePos) => {
    const panorama = panoramaRef.current;
    if (!panorama) return;

    // Convert to local coordinates for storing
    const localPos = panorama.worldToLocal(threePos.clone());

    // Project *world position* for screen popup location
    const screen = projectToScreen(threePos);

    console.log("📍 Clicked World Position:", threePos);
    console.log("📍 Local Position Saved:", localPos);

    setEditorScreenPos({ left: screen.left + 10, top: screen.top + 10 });

    const newAnno = {
      id: Date.now(),
      position: { x: localPos.x, y: localPos.y, z: localPos.z }, // save local
      text: "",
      createdAt: Date.now(),
    };

    setEditingAnnotation(newAnno);
    setEditorVisible(true);
  };


  const createInfospotForAnno = (anno) => {
    const panorama = panoramaRef.current;
    if (!panorama) return;
    const mapRef = infospotMapRef.current;

    if (mapRef.has(anno.id)) {
      panorama.remove(mapRef.get(anno.id));
      mapRef.delete(anno.id);
    }

    const infospot = new PANOLENS.Infospot(400, PANOLENS.DataImage.Info);
    infospot.position.set(anno.position.x, anno.position.y, anno.position.z);

    infospot.addHoverText(anno.text?.trim() || "No comment", 30);

    infospot.addEventListener("click", () => {
      // Convert infospot's local position back to world position for screen projection
      const worldPos = panorama.localToWorld(infospot.position.clone());
      const screen = projectToScreen(worldPos);

      setEditorScreenPos({ left: screen.left + 10, top: screen.top + 10 });
      setEditingAnnotation({ ...anno });
      setEditorVisible(true);
    });

    panorama.add(infospot);
    mapRef.set(anno.id, infospot);
  };



  const refreshInfospots = (annoList) => {
    const panorama = panoramaRef.current;
    if (!panorama) return;
    const mapRef = infospotMapRef.current;
    mapRef.forEach((infospot) => panorama.remove(infospot));
    mapRef.clear();
    annoList.forEach((a) => createInfospotForAnno(a));
  };

  const handleEditorSubmit = () => {
    if (!editingAnnotation) return;
    const { id, position, text } = editingAnnotation;

    undoStackRef.current.push(JSON.parse(JSON.stringify(annotations)));
    redoStackRef.current = [];

    setAnnotations((prev) => {
      const exists = prev.find((p) => p.id === id);
      return exists
        ? prev.map((p) => (p.id === id ? { ...p, text } : p))
        : [...prev, { id, position, text, createdAt: Date.now() }];
    });

    setEditorVisible(false);
    setEditingAnnotation(null);
  };

  const handleEditorChangeText = (val) => {
    setEditingAnnotation((prev) => (prev ? { ...prev, text: val } : prev));
  };

  const handleUndo = () => {
    if (undoStackRef.current.length > 0) {
      const prev = undoStackRef.current.pop();
      redoStackRef.current.push(JSON.parse(JSON.stringify(annotations)));
      setAnnotations(prev);
    }
  };

  const handleRedo = () => {
    if (redoStackRef.current.length > 0) {
      const next = redoStackRef.current.pop();
      undoStackRef.current.push(JSON.parse(JSON.stringify(annotations)));
      setAnnotations(next);
    }
  };

  const handleSave = () => {
    if (!imagePath) return alert("No panorama loaded!");
    const saveObject = {
      image: imagePath,
      lat,
      lng,
      annotations,
      savedAt: new Date().toISOString(),
    };
    const existing = JSON.parse(localStorage.getItem("savedAnnotationsList")) || [];
    existing.push(saveObject);
    localStorage.setItem("savedAnnotationsList", JSON.stringify(existing));
    alert("Panorama annotations saved!");
    router.push("/home")
  };

  const removeAnnotation = (id) => {
    undoStackRef.current.push(JSON.parse(JSON.stringify(annotations)));
    redoStackRef.current = [];
    setAnnotations((prev) => prev.filter((p) => p.id !== id));
  };

  if (!imagePath) {
    return (
      <Container className="text-center py-5">
        <h5>No panorama uploaded yet. Please upload a converted equirectangular JPG/PNG from your .insp file.</h5>
      </Container>
    );
  }

  return (
    <Container fluid className="p-3">
      <h4 className="text-center mb-2">360° Preview</h4>
      <p className="text-center text-muted">
        Latitude: <strong>{lat}</strong> | Longitude: <strong>{lng}</strong>
      </p>

      <Row className="justify-content-center mb-2">
        <Col xs="auto">
          <Button variant="secondary" onClick={handleUndo} className="me-2">Undo</Button>
          <Button variant="secondary" onClick={handleRedo}>Redo</Button>
        </Col>
      </Row>

      <div ref={containerRef} style={{ width: "100%", height: "70vh", border: "1px solid #ddd", borderRadius: 6 }} />

      <Row className="justify-content-center mt-3">
        <Col xs="auto" className="text-center">
          <Image src={imagePath} thumbnail style={{ maxHeight: "80px" }} />
        </Col>
      </Row>

      <Row className="justify-content-center mt-3">
        <Col xs="auto">
          <Button variant="success" onClick={handleSave}>Save to List</Button>
        </Col>
      </Row>

      {editorVisible && editingAnnotation && (
        <div
          className={styles.editorBox}
          style={{
            position: "fixed",
            left: editorScreenPos.left,
            top: editorScreenPos.top,
            zIndex: 9999,
            background: "white",
            padding: 8,
            borderRadius: 4,
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          }}
        >
          <input
            value={editingAnnotation.text}
            onChange={(e) => handleEditorChangeText(e.target.value)}
            placeholder="Write a description"
            className={styles.inputBox}
          />
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <Button size="sm" variant="primary" onClick={handleEditorSubmit}>Comment</Button>
            <Button
              size="sm"
              variant="danger"
              onClick={() => {
                if (annotations.find((a) => a.id === editingAnnotation.id)) {
                  removeAnnotation(editingAnnotation.id);
                }
                setEditorVisible(false);
                setEditingAnnotation(null);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div style={{ marginTop: 18 }}>
        <h6>Annotations ({annotations.length})</h6>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {annotations.map((a) => (
            <div key={a.id} style={{ padding: 8, border: "1px solid #eee", borderRadius: 6, minWidth: 200 }}>
              <div style={{ fontWeight: "600" }}>{a.text || "—"}</div>
              <div style={{ fontSize: 12, color: "#666" }}>
                pos: {a.position.x.toFixed(2)}, {a.position.y.toFixed(2)}, {a.position.z.toFixed(2)}
              </div>
              <div style={{ marginTop: 6 }}>
                <Button size="sm" variant="outline-primary" onClick={() => {
                  const screen = projectToScreen(a.position);
                  setEditorScreenPos({ left: screen.left + 10, top: screen.top + 10 });
                  setEditingAnnotation({ ...a });
                  setEditorVisible(true);
                }}>Edit</Button>{" "}
                <Button size="sm" variant="outline-danger" onClick={() => removeAnnotation(a.id)}>Delete</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Annotator;