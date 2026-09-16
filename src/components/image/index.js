import React, { useState } from 'react';
import Annotator from "./Annotator";

function index() {
  const [imageFiles, setImageFiles] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  return (
    <div className="App">
      <Annotator
        imageFiles={imageFiles}
        setImageFiles={setImageFiles}
        imagesPreview={imagesPreview}
        setImagesPreview={setImagesPreview}
      />
    </div>
  );
}

export default index;
