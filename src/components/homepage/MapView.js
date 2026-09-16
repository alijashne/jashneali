// src/components/homepage/MapViewLeaflet.js
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

export default function MapView() {
    const router = useRouter();
    const { lat, lng, tags } = router.query;
    const containerRef = useRef(null);
    const mapRef = useRef(null);
    const [parsedTags, setParsedTags] = useState([]);

    useEffect(() => {
        if (!router.isReady) return; // wait for query params

        // parse tags safely
        let pTags = [];
        try {
            pTags = tags ? JSON.parse(tags) : [];
        } catch (e) {
            pTags = [];
        }
        setParsedTags(pTags);

        if (!lat || !lng) return;

        // inject Leaflet CSS via CDN so we don't import global CSS from a component
        if (!document.getElementById("leaflet-css")) {
            const link = document.createElement("link");
            link.id = "leaflet-css";
            link.rel = "stylesheet";
            link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
            link.crossOrigin = "";
            document.head.appendChild(link);
        }

        let cancelled = false;
        (async () => {
            // dynamic import of leaflet (client-side)
            const leafletModule = await import("leaflet");
            const L = leafletModule.default ? leafletModule.default : leafletModule;

            // cleanup any previous map
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }

            const position = [parseFloat(lat), parseFloat(lng)];

            // create map
            mapRef.current = L.map(containerRef.current, {
                center: position,
                zoom: 15,
                scrollWheelZoom: true,
            });

            // tiles
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: "&copy; OpenStreetMap contributors",
            }).addTo(mapRef.current);

            // ensure marker icons load (use CDN images)
            const icon = L.icon({
                iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
                iconRetinaUrl:
                    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
                shadowUrl:
                    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41],
            });

            // marker + popup listing tags
            const marker = L.marker(position, { icon }).addTo(mapRef.current);

            let popupHtml = "<div><strong>Tags:</strong>";
            if (pTags.length > 0) {
                popupHtml += '<ul style="margin:6px 0 6px 18px;padding:0">';
                pTags.forEach((t) => {
                    const text = t?.text ?? t?.title ?? "No text";
                    popupHtml += `<li>${text}</li>`;
                });
                popupHtml += "</ul>";
            } else {
                popupHtml += "<div>No tags</div>";
            }
            popupHtml += "</div>";

            marker.bindPopup(popupHtml).openPopup();

            // ensure full cleanup on unmount
            return () => {
                if (!cancelled && mapRef.current) {
                    mapRef.current.remove();
                    mapRef.current = null;
                }
                cancelled = true;
            };
        })();

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [router.isReady, lat, lng, tags]);

    return (
        <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
            <header
                style={{
                    padding: 12,
                    borderBottom: "1px solid #eee",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <div>
                    <strong>Location:</strong> {lat ?? "—"}, {lng ?? "—"}
                </div>
                <div>
                    <button
                        onClick={() => router.back()}
                        style={{ padding: "6px 12px", cursor: "pointer" }}
                    >
                        Back
                    </button>
                </div>
            </header>

            <div style={{ flex: 1, display: "flex" }}>
                <div
                    ref={containerRef}
                    style={{ flex: 1, minHeight: 200 }} /* map container */
                />
                <aside
                    style={{
                        width: 320,
                        borderLeft: "1px solid #eee",
                        padding: 16,
                        overflowY: "auto",
                        background: "#fafafa",
                    }}
                >
                    <h4 style={{ marginTop: 0 }}>Tags</h4>
                    {parsedTags.length > 0 ? (
                        <ul style={{ paddingLeft: 18 }}>
                            {parsedTags.map((t, i) => (
                                <li key={i}>{t?.text ?? t?.title ?? "No text"}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No tags for this location.</p>
                    )}
                </aside>
            </div>
        </div>
    );
}
