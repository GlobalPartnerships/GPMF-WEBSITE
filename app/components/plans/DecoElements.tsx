export function DecoElements() {
  return (
    <>
      {/* Top-left cluster */}
      <div
        className="deco-line horizontal float-anim"
        style={{ top: 180, left: "3%", width: 80, color: "rgba(26,28,28,0.45)" }}
      />
      <div
        className="deco-dot float-anim-delay"
        style={{ top: 176, left: "calc(3% + 84px)", color: "rgba(26,28,28,0.55)" }}
      />
      <div
        className="deco-line vertical float-anim-slow"
        style={{ top: 120, left: "6%", height: 50, color: "rgba(26,28,28,0.40)" }}
      />

      {/* Top-right cluster */}
      <div
        className="deco-cross float-anim-delay"
        style={{ top: 140, right: "7%", color: "rgba(122,15,50,0.50)" }}
      />
      <div
        className="deco-line horizontal float-anim"
        style={{ top: 200, right: "4%", width: 60, color: "rgba(26,28,28,0.40)" }}
      />
      <div
        className="deco-rect float-anim-slow"
        style={{ top: 160, right: "12%", width: 20, height: 20, color: "rgba(26,28,28,0.38)" }}
      />

      {/* Mid-left */}
      <div
        className="deco-line vertical float-anim"
        style={{ top: 420, left: "2%", height: 120, color: "rgba(122,15,50,0.40)" }}
      />
      <div
        className="deco-dot float-anim-delay"
        style={{ top: 540, left: "2%", color: "rgba(39,39,39,0.60)" }}
      />
      <div
        className="deco-cross float-anim-slow"
        style={{ top: 500, left: "5%", color: "rgba(26,28,28,0.42)" }}
      />

      {/* Mid-right */}
      <div
        className="deco-line horizontal float-anim-delay"
        style={{ top: 480, right: "3%", width: 100, color: "rgba(39,39,39,0.40)" }}
      />
      <div
        className="deco-rect float-anim"
        style={{ top: 520, right: "6%", width: 14, height: 14, color: "rgba(122,15,50,0.45)" }}
      />
      <div
        className="deco-dot float-anim-slow"
        style={{ top: 470, right: "8%", color: "rgba(26,28,28,0.50)" }}
      />

      {/* Bottom-left */}
      <div
        className="deco-line horizontal float-anim-slow"
        style={{ bottom: 180, left: "4%", width: 70, color: "rgba(39,39,39,0.42)" }}
      />
      <div
        className="deco-cross float-anim"
        style={{ bottom: 220, left: "8%", color: "rgba(122,15,50,0.45)" }}
      />
      <div
        className="deco-line vertical float-anim-delay"
        style={{ bottom: 120, left: "3%", height: 60, color: "rgba(26,28,28,0.38)" }}
      />

      {/* Bottom-right */}
      <div
        className="deco-dot float-anim"
        style={{ bottom: 200, right: "5%", color: "rgba(39,39,39,0.60)" }}
      />
      <div
        className="deco-rect float-anim-delay"
        style={{ bottom: 160, right: "9%", width: 24, height: 24, color: "rgba(26,28,28,0.38)" }}
      />
      <div
        className="deco-line horizontal float-anim-slow"
        style={{ bottom: 140, right: "3%", width: 90, color: "rgba(122,15,50,0.40)" }}
      />
    </>
  );
}
