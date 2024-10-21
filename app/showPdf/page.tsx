"use client";
import { useEffect, useRef } from "react";
import PSPDFKit from "pspdfkit";

const Page: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (container && typeof window !== "undefined") {
      // Unload any previously loaded PSPDFKit instance if it exists
      try {
        PSPDFKit.unload(container);
      } catch (error) {
        // Handle any potential errors (e.g., if no previous instance exists)
        console.warn("PSPDFKit unload error:", error);
      }

      // Load PSPDFKit with the specified options
      PSPDFKit.load({
        container,
        document: "/sample.pdf", // Path to the PDF document
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
  }, []);

  return <div ref={containerRef} style={{ height: "100vh" }} />;
};

export default Page;
