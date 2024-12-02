import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-4 text-center relative z-10">
        <h1 className="text-7xl font-extrabold text-red-500">404</h1>
        <p className="text-2xl font-semibold mt-4">Oops! Page Not Found</p>
        <p className="text-gray-600 mt-2">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center px-6 py-3 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600 transition-colors duration-300"
        >
          <FaHome className="mr-2" />
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default Error;
