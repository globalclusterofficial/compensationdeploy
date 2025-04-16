import React, { useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { useFetchUserPaymentProofQuery } from "../features/user/userApiSlice";
import PropTypes from "prop-types";
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//     'pdfjs-dist/build/pdf.worker.min.mjs',
//     import.meta.url,
//   ).toString();

const maxWidth = 800;

export default function ShowPaymentProof({
  payment_proof_url,
  fileType = undefined,
}) {
  // const [numPages, setNumPages] = React.useState();
  const [containerWidth, setContainerWidth] = useState(400);

  // const pdf = useFetchUserPaymentProofQuery(22);

  // function onDocumentLoadSuccess({ numPages: nextNumPages }) {
  //     setNumPages(nextNumPages);
  // }
  // if (!pdf) {
  //     return <h1>Is Loading...</h1>
  // }
  console.log(payment_proof_url);
  if (!payment_proof_url) {
    return (
      <div>
        <h2>No uploaded file yet</h2>
      </div>
    );
  }
  if (
    payment_proof_url.slice(-4).toLowerCase() != ".pdf" &&
    fileType !== "application/pdf"
  ) {
    return (
      <img
        className="max-h-[70vh] w-full object-contain"
        src={payment_proof_url}
        alt="payment proof"
      />
    );
  }
  return (
    <div>
      <Document
        file={payment_proof_url}
        // onLoadSuccess={onDocumentLoadSuccess}
        loading={<PDFSkeleton />}
      >
        <Page
          pageNumber={1}
          // className={"ring"}
          width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
        />
      </Document>
    </div>
  );
}

ShowPaymentProof.propTypes = {
  payment_proof_url: PropTypes.string,
  fileType: PropTypes.string,
  //   setShowDetail: PropTypes.func,
  // type: PropTypes.string,
  // banksData: PropTypes.array,
};

export function PDFSkeleton() {
  return (
    <div className="h-full w-full max-w-[800px] p-8 bg-white">
      <h1>Is Loading...</h1>
    </div>
  );
}
