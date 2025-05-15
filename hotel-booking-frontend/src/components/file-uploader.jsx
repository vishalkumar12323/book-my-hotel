import { useController } from "react-hook-form";
import { useState, useRef, useCallback, useEffect } from "react";
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
  const [filePreview, setFilePreview] = useState([]);
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

  const processFiles = useCallback(
    (newFiles) => {
      const validFiles = Array.from(newFiles).filter(
        (file) =>
          file.size <= 5 * 1024 * 1024 &&
          ["image/jpeg", "image/png", "image/webp"].includes(file.type)
      );

      setFiles(validFiles);
      field.onChange(validFiles);

      const filesPrev = validFiles.map((file) => {
        const fileUrl = URL.createObjectURL(file);
        return {
          name: file.name,
          size: file.size,
          type: file.type,
          url: fileUrl,
        };
      });
      setFilePreview((prev) => [...prev, ...filesPrev]);
    },
    [field]
  );
  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      processFiles(e.dataTransfer.files);
    },
    [processFiles]
  );

  useEffect(() => {
    return () => {
      filePreview.forEach((file) => URL.revokeObjectURL(file.url));
    };
  }, [filePreview]);
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
        className={`bg-gradient-to-r from-sky-400/10 to-blue-500/5 border-dashed w-full min-h-[15rem] flex flex-col justify-center items-center rounded border-2 shadow hover:bg-blue-200/50 transition-colors`}
        aria-describedby={ariaFeild}
      >
        <div className="w-full flex flex-col items-center gap-[10px] ">
          <div className="flex justify-center flex-col items-center">
            <IoCloudUploadOutline size={50} className="text-slate-700" />
            <p> Drag & Drop Images</p>
          </div>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className={`m-4 border shadow rounded ${
              fieldState.error
                ? "hover:border-red-600"
                : "hover:border-blue-600"
            }  px-3 py-1`}
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
          {filePreview.map((file) => {
            return (
              <div
                key={file.name}
                className="text-center flex justify-center flex-col"
              >
                {file.type?.startsWith("image/") && (
                  <div className="img-container">
                    <img
                      src={file.url}
                      alt={`${file.name}-preview`}
                      style={{ maxWidth: "120px" }}
                    />
                  </div>
                )}
                <p className="text-[10px] font-medium text-center flex flex-col gap-[1px] mt-1">
                  <span>Name: {file.name}</span>
                  <span>Size: {(file.size / 1024).toFixed(2)}KB</span>
                </p>
              </div>
            );
          })}
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
