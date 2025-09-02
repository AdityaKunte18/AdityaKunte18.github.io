import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import '../styles/pdfviewerstyles.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

export default function PDFViewer() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfWidth, setPdfWidth] = useState(null);

  const pdfPath = `${window.location.origin}/Aditya_Kunte_current.pdf`;

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  useEffect(() => {
    const handleResize = () => {
      const modalWidth = document.querySelector('.resumeModalContent')?.clientWidth || window.innerWidth * 0.6;
      setPdfWidth(Math.min(modalWidth, 700));
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="pdfContainer">
      <Document
        file={pdfPath}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={(error) => console.error("PDF load error:", error)}
        loading={<div className="pdfLoading">Loading PDF...</div>}
        error={<div className="pdfError">Error loading PDF. Check the console for details.</div>}
      >
        {numPages &&
          Array.from({ length: numPages }, (_, i) => (
            <Page key={i + 1} pageNumber={i + 1} width={pdfWidth} />
          ))
        }
      </Document>

    </div>
  );

}
