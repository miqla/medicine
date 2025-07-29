import { useEffect, useRef } from "react";

const UploadWidget = ({ setImage }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dsngzdxk1",
        uploadPreset: "fern-gc2",
      },
      function (error, result) {
        if (!error && result && result.event === "success") {
          //   console.log("Upload successful:", result.info);
          setImage(result.info.secure_url);
        }
      }
    );
  }, []);

  return (
    <button
      className="btn btn-soft"
      onClick={(e) => {
        e.preventDefault();
        widgetRef.current.open();
      }}
    >
      Upload
    </button>
  );
};

export default UploadWidget;
