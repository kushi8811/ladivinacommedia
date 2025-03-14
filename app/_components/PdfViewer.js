"use client";
import dynamic from "next/dynamic";

// Dynamically import PdfViewer with ssr: false to disable server-side rendering
const PdfViewer = dynamic(() => import("@react-pdf-viewer/core"), {
  ssr: false, // Disable server-side rendering
});

import "@react-pdf-viewer/core/lib/styles/index.css";
import { Worker } from "@react-pdf-viewer/core";
import { Suspense } from "react";

const ViewerComponent = ({ file }) => {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <Suspense>
          <PdfViewer fileUrl={file} />
        </Suspense>
      </Worker>
    </div>
  );
};

export default ViewerComponent;
