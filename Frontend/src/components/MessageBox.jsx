import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect } from "react";

export default function MessageBox(message) {
  useEffect(() => {
    if (message) {
      toast(message);
    }
  }, [message]);
  console.log("error box");
  return (
    <div>
      <ToastContainer />
    </div>
  );
}
