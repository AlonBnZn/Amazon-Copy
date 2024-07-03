import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
export default function error({ errorMessage }) {
  useEffect(() => {
    if (errorMessage) {
      toast.dismiss(); // Discard previous toasts
      toast.error(errorMessage); // Show new error message
    }
  }, [errorMessage]);
  return (
    <div>
      <ToastContainer />
    </div>
  );
}
