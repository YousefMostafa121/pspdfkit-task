"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";

const Home: React.FC = () => {
  return (
    <div className=" w-screen h-screen flex justify-center items-center gap-5">
      <Link
        href="/showPdf"
        className="px-7 py-3 bg-red-400 text-white rounded-full shadow-lg"
      >
        Show PDF
      </Link>
      <Link
        href="/showExcel"
        className="px-7 py-3 bg-green-400 text-white rounded-full shadow-lg"
      >
        Show Excel
      </Link>
    </div>
  );
};

export default Home;
