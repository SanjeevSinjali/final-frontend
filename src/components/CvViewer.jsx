import { Page, Document } from "react-pdf";
import { useState } from "react";

import { pdfjs } from "react-pdf";
import { Card, CardContent } from "./ui/card";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();



const CvViewer = ({ url }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1); // Start from page 1

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const goToNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const goToPreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  return (
    <Card>
      <Document
        file={`http://127.0.0.1:8000${url}`}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      {/* <p>
          Page {pageNumber} of {numPages}
          </p>
          <div>
          <button onClick={goToPreviousPage} disabled={pageNumber <= 1}>
          Previous
          </button>
          <button onClick={goToNextPage} disabled={pageNumber >= numPages}>
          Next
          </button>
          </div> */}
    </Card>
  );
};

export default CvViewer;
