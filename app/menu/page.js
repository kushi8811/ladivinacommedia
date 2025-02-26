import PdfViewer from "../_components/PdfViewer";

export default function Home() {
  return (
    <main>
      <h1 className="text-center text-2xl font-bold my-4">My PDF Viewer</h1>
      <PdfViewer fileUrl="/menu.pdf" />
    </main>
  );
}
