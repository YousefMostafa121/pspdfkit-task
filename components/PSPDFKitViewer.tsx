"use client";
import { useEffect, useRef } from "react";
import PSPDFKit from "pspdfkit";

interface PSPDFKitViewerProps {
  documentPath: string; // Pass the document path as a prop
}

const PSPDFKitViewer: React.FC<PSPDFKitViewerProps> = ({ documentPath }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (container && typeof window !== "undefined") {
      // Unload any previously loaded PSPDFKit instance if it exists
      try {
        PSPDFKit.unload(container);
      } catch (error) {
        console.warn("PSPDFKit unload error:", error);
      }

      // Load PSPDFKit with the specified options
      PSPDFKit.load({
        container,
        document: documentPath, // Use the documentPath prop here
        baseUrl: `${window.location.protocol}//${window.location.host}/`,
      }).catch((error) => {
        console.error("Error loading PSPDFKit:", error);
      });
    }

    // Unload PSPDFKit when the component unmounts
    return () => {
      if (container) {
        try {
          PSPDFKit.unload(container);
        } catch (error) {
          console.warn("PSPDFKit unload error on unmount:", error);
        }
      }
    };
  }, [documentPath]); // Depend on the documentPath prop

  return <div ref={containerRef} style={{ height: "100vh" }} />;
};

export default PSPDFKitViewer;
