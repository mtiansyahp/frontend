import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css'; 


export default function Quillce() {
  const { quill, quillRef } = useQuill();
  return (
    <>
      <div style={{ width: 450, height: 300 }} className="col-span-2">
      <div ref={quillRef} />
    </div>
    </>
  )
}