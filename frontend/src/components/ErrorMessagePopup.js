import React from "react";
import Popup from "./Popup";

export default function ErrorMessagePopup({ errorMessage }) {
  return (
    <Popup name="error-message" isOpen={errorMessage} title={errorMessage} />
  );
}
