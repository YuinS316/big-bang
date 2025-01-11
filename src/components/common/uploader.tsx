"use client";

import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";
import { OurFileRouter } from "~/app/api/uploadthing/core";

// 生成基础的上传组件
const BaseUploadButton = generateUploadButton<OurFileRouter>();
const BaseUploadDropzone = generateUploadDropzone<OurFileRouter>();

// 包装 UploadButton 组件，支持所有属性
export const UploadButton: typeof BaseUploadButton = ({ ...props }) => {
  return (
    <BaseUploadButton
      {...props}
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        // Do something with the response
        console.log("Files: ", res);
        alert("Upload Completed");
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`);
      }}
    />
  );
};

// 包装 UploadDropzone 组件，支持所有属性
export const UploadDropzone: typeof BaseUploadDropzone = ({ ...props }) => {
  return <BaseUploadDropzone {...props} endpoint="imageUploader" />;
};
