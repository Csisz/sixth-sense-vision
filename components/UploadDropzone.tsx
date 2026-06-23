"use client";

import Image from "next/image";
import { useRef, useState } from "react";

const acceptedTypes = ["image/jpeg", "image/png", "image/webp"];
const acceptedLabel = "JPG, PNG, or WebP";

type UploadDropzoneProps = {
  imageDataUrl: string | null;
  onImageSelected: (dataUrl: string, file: File) => void;
  onError: (message: string) => void;
};

export function UploadDropzone({
  imageDataUrl,
  onImageSelected,
  onError,
}: UploadDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  function openPicker() {
    inputRef.current?.click();
  }

  function readFile(file: File) {
    if (!acceptedTypes.includes(file.type)) {
      onError(`Choose a ${acceptedLabel} wall photo.`);
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;

      if (typeof result !== "string") {
        onError("That image could not be prepared for scanning.");
        return;
      }

      setFileName(file.name);
      onImageSelected(result, file);
    };

    reader.onerror = () => {
      onError("That image could not be opened. Try another wall photo.");
    };

    reader.readAsDataURL(file);
  }

  function handleFiles(files: FileList | null) {
    const file = files?.[0];

    if (!file) {
      return;
    }

    readFile(file);
  }

  return (
    <div className="w-full">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="sr-only"
        onChange={(event) => handleFiles(event.target.files)}
      />

      <button
        type="button"
        onClick={openPicker}
        onDragEnter={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragOver={(event) => event.preventDefault()}
        onDragLeave={(event) => {
          event.preventDefault();
          setIsDragging(false);
        }}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          handleFiles(event.dataTransfer.files);
        }}
        className={`glass-surface group relative flex min-h-[28rem] w-full overflow-hidden rounded-[1.6rem] text-left transition duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/70 sm:min-h-[34rem] ${
          isDragging
            ? "border-cyan-200/60 shadow-[0_0_86px_rgba(71,221,255,0.32)]"
            : "hover:border-cyan-100/32 hover:shadow-[0_0_72px_rgba(71,221,255,0.2)]"
        }`}
      >
        {imageDataUrl ? (
          <>
            <Image
              src={imageDataUrl}
              alt="Selected wall photo preview"
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, 58vw"
              className="object-cover transition duration-700 group-hover:scale-[1.015]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/8 to-black/24" />
            <div className="scan-lines pointer-events-none absolute inset-0 opacity-20" />
            <div className="pointer-events-none absolute left-0 right-0 top-[42%] h-px bg-cyan-100/50 shadow-[0_0_24px_rgba(71,221,255,0.8)]" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-cyan-100/70">
                  Wall photo ready
                </p>
                <p className="mt-2 max-w-[15rem] truncate text-sm text-white/72">
                  {fileName ?? "Selected image"}
                </p>
              </div>
              <span className="rounded-full border border-white/16 bg-black/32 px-3 py-1 text-[0.62rem] uppercase tracking-[0.22em] text-white/58 backdrop-blur-xl">
                Replace
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="hud-grid pointer-events-none absolute inset-0 opacity-45" />
            <div className="scan-lines pointer-events-none absolute inset-0 opacity-20" />
            <div className="absolute inset-8 rounded-[1.15rem] border border-dashed border-cyan-100/24 bg-white/[0.025]" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-100/18 bg-cyan-200/[0.04] shadow-[0_0_70px_rgba(71,221,255,0.16)]" />
            <div className="relative z-10 m-auto flex max-w-sm flex-col items-center px-8 text-center">
              <span className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-cyan-100/22 bg-white/[0.06] text-3xl text-cyan-50 shadow-[0_0_34px_rgba(71,221,255,0.18)]">
                +
              </span>
              <p className="text-2xl font-medium tracking-normal text-white">
                Add a wall photo
              </p>
              <p className="mt-3 text-sm leading-6 text-white/54">
                Tap to choose from your phone, or drag an image here.
              </p>
              <p className="mt-6 text-[0.62rem] uppercase tracking-[0.24em] text-white/36">
                {acceptedLabel}
              </p>
            </div>
          </>
        )}
      </button>
    </div>
  );
}
