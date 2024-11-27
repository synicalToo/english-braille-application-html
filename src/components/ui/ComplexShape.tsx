interface ComplexShapeProps {
  color?: string;
  scale?: number;
}

export function ComplexShape({ color = "#000000", scale = 1 }: ComplexShapeProps) {
  const baseStyle: React.CSSProperties = {
    position: "absolute",
    backgroundColor: color,
    borderRadius: "10px",
    transform: `scale(${scale})`,
    zIndex: 0, // Add this line
  };

  return (
    <div className="relative" style={{ width: "800px", height: "600px", transform: "scale(1)", zIndex: 0 }}>
      {/* Center vertical bar */}
      <div style={{ ...baseStyle, left: "80px", top: "130px", width: "100px", height: "170px" }} />

      {/* Bottom horizontal bar */}
      <div style={{ ...baseStyle, left: "10px", top: "280px", width: "240px", height: "270px" }} />

      {/* Middle section */}
      <div style={{ ...baseStyle, left: "280px", top: "130px", width: "240px", height: "420px" }} />

      {/* Right section */}
      <div style={{ ...baseStyle, left: "550px", top: "130px", width: "240px", height: "270px" }} />

      {/* Right vertical bar */}
      <div style={{ ...baseStyle, left: "620px", top: "350px", width: "100px", height: "200px" }} />

      {/* Small top right block */}
      <div style={{ ...baseStyle, left: "510px", top: "130px", width: "60px", height: "50px" }} />

      {/* Small bottom rectangles */}
      <div style={{ ...baseStyle, left: "230px", top: "500px", width: "20px", height: "50px" }} />
      <div style={{ ...baseStyle, left: "280px", top: "500px", width: "10px", height: "50px" }} />
      <div style={{ ...baseStyle, left: "500px", top: "130px", width: "20px", height: "50px" }} />
    </div>
  );
}
