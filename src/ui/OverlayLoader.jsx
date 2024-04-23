import React from "react";
import { Spin } from "antd";

function LoadingOverlay() {
  const overlayStyles = {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  };

  return (
    <div style={overlayStyles}>
      <Spin size="large" />
    </div>
  );
}

export default LoadingOverlay;
