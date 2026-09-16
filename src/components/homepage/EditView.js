import React, { useState } from "react";

export default function ImageTagger() {
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState(null);
    const [comment, setComment] = useState("");

    const handleImageClick = (e) => {
        const rect = e.target.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setNewTag({ x, y });
        setComment("");
    };

    const handleSaveTag = () => {
        if (comment.trim() === "") return;
        setTags([...tags, { ...newTag, comment }]);
        setNewTag(null);
        setComment("");
    };

    return (
        <div style={{ position: "relative", display: "inline-block" }}>
            <img
                src="../images/dummyImg.jpg"
                alt="Taggable"
                style={{ width: "600px", height: "400px", cursor: "crosshair" }}
                onClick={handleImageClick}
            />

            {/* Existing Tags */}
            {tags.map((tag, index) => (
                <div
                    key={index}
                    style={{
                        position: "absolute",
                        top: `${tag.y}%`,
                        left: `${tag.x}%`,
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    <div
                        style={{
                            width: "12px",
                            height: "12px",
                            background: "red",
                            borderRadius: "50%",
                            position: "relative",
                        }}
                        title={tag.comment} // Tooltip with comment
                    ></div>
                </div>
            ))}

            {/* New Tag Input */}
            {newTag && (
                <div
                    style={{
                        position: "absolute",
                        top: `${newTag.y}%`,
                        left: `${newTag.x}%`,
                        transform: "translate(-50%, -50%)",
                        background: "#fff",
                        padding: "6px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        zIndex: 10,
                    }}
                >
                    <input
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Enter comment"
                        style={{ marginRight: "5px" }}
                        onKeyDown={(e) => e.key === "Enter" && handleSaveTag()}
                    />
                    <button onClick={handleSaveTag}>Save</button>
                </div>
            )}
        </div>
    );
}
