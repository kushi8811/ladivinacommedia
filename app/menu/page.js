import ViewerComponent from "../_components/PdfViewer";
import PdfViewer from "../_components/PdfViewer";

export default function Home() {
  return (
    <main>
      <h1 className="text-center text-2xl font-bold my-4">My PDF Viewer</h1>
      <ViewerComponent fileUrl={"/menu.pdf"} />
    </main>
  );
}
