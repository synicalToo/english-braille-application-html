import MainCanvasComponent from "@/components/main-canvas";
import MainSidebarComponent from "@/components/main-sidebar";

export default function ENBraille() {
  return (
    <div className="flex flex-row m-1 space-x-10">
      <MainSidebarComponent />
      <MainCanvasComponent />
    </div>
  );
}
