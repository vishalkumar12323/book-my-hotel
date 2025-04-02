import { useController } from "react-hook-form";
import { useState, useRef, useCallback } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";

const FileUpload = ({
  control,
  name,
  rules,
  ariaFeild,
  multiple = false,
  errorMessage,
  uploadButton,
}) => {
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);
  const { field, fieldState } = useController({
    control,
    name,
    rules: {
      ...rules,
      required: {
        value: true,
        message: errorMessage,
      },
    },
  });

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else setDragActive(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    processFiles(e.dataTransfer.files);
  }, []);

  const processFiles = (newFiles) => {
    const validFiles = Array.from(newFiles).filter(
      (file) =>
        file.size <= 5 * 1024 * 1024 &&
        ["image/jpeg", "image/png", "image/webp"].includes(file.type)
    );

    setFiles(validFiles);
    field.onChange(validFiles);
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        style={{
          border: `2px dashed ${
            fieldState.error ? "#dc2626" : dragActive ? "blue" : "gray"
          }`,
          padding: "1rem",
          textAlign: "center",
          background: fieldState.error && "#ffe6e6c8",
        }}
        className={`bg-gradient-to-r from-sky-400/10 to-blue-500/5 border-dashed w-full min-h-[15rem] flex flex-col justify-center items-center rounded border-2 shadow`}
        aria-describedby={ariaFeild}
      >
        <div className="w-full flex flex-col items-center gap-[10px]">
          <div className="flex justify-center flex-col items-center">
            <IoCloudUploadOutline size={50} className="text-slate-700" />
            <p> Drag & Drop files</p>
          </div>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="m-4 border shadow rounded hover:border-blue-600 px-3 py-1"
          >
            {files && files.length > 0
              ? `Change ${uploadButton}`
              : `Upload ${uploadButton}`}
          </button>
          <input
            ref={inputRef}
            type="file"
            multiple={multiple}
            hidden
            onChange={(e) => processFiles(e.target.files)}
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {files.map((file, index) => (
            <div
              key={index}
              className="text-center flex justify-center flex-col"
            >
              {file.type.startsWith("image/") && (
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  style={{ maxWidth: "100px" }}
                />
              )}
              <p className="text-[10px] font-medium text-center">
                <span>Name: {file.name}</span>
                <br />
                <span>Size: {(file.size / 1024).toFixed(2)}KB</span>
              </p>
            </div>
          ))}
        </div>
      </div>
      {fieldState.error && (
        <p
          id={ariaFeild}
          role="alert"
          className="text-[13px] flex items-center gap-1 font-semibold text-red-600"
        >
          <MdErrorOutline size={13} />
          {fieldState.error.message}
        </p>
      )}
    </div>
  );
};

export default FileUpload;
