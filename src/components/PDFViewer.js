'use client';

import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import '../styles/pdfviewerstyles.css';

// worker path (good for Vercel)
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

export default function PDFViewer() {
  const [numPages, setNumPages] = useState(null);
  const [pdfWidth, setPdfWidth] = useState(820);

  // If the file is in /public, use a relative path — avoids SSR/window issues
  const pdfPath = '/Aditya_Kunte_current.pdf';

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  useEffect(() => {
    const handleResize = () => {
      const body = document.querySelector('.resumeModalBody');
      const bodyWidth = body?.clientWidth || Math.min(window.innerWidth, 820);
      setPdfWidth(Math.min(bodyWidth, 950));
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
        onLoadError={(e) => console.error('PDF load error:', e)}
        loading={<div className="pdfLoading">Loading PDF...</div>}
        error={<div className="pdfError">Error loading PDF.</div>}
        options={{
          cMapUrl: '/cmaps/',
          cMapPacked: true,
          standardFontDataUrl: '/standard_fonts/',
        }}
      >
        {Array.from({ length: numPages || 0 }, (_, i) => (
          <Page
            key={i + 1}
            pageNumber={i + 1}
            width={pdfWidth}
            renderMode="svg"           // <-- vector text = crisp
            renderAnnotationLayer={false}
            renderTextLayer={true}
          />
        ))}
      </Document>
    </div>
  );
}
