import React from "react";

interface BrailleBoxProps {
  children: React.ReactNode;
}

export default function BrailleBox({ children }: BrailleBoxProps) {
  return (
    <div
      style={{
        padding: "0px", // Increase padding
        margin: "0px",
        backgroundColor: "#FFFFFF",
        border: "1px solid #777",
        borderRadius: "2px",
        boxShadow: "1px 2px 2px #ddd",
        fontFamily: "sixbraille20",
        fontSize: "150%", // Increase font size
        display: "flex", // Flexbox for centering text
        alignItems: "center", // Center vertically
        justifyContent: "center", // Center horizontally
      }}
    >
      {children}
    </div>
  );
}
