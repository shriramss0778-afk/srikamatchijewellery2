import React, { useRef, useState } from 'react';

export default function PhotoUploadPanel({ onUploadPhotos, isUploadingPhotos }) {
  const inputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(files);
  };

  const handleUpload = async () => {
    if (!selectedFiles.length || isUploadingPhotos) return;
    const uploaded = await onUploadPhotos(selectedFiles);
    if (uploaded) {
      setSelectedFiles([]);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div className="rounded-2xl border border-yellow-900/20 bg-black/15 p-3">
      <div className="flex flex-col gap-3">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="btn-ghost-gold w-full rounded-xl py-2.5"
        >
          Select Photos
        </button>

        <div className="min-h-[32px] rounded-xl border border-yellow-900/20 bg-black/20 px-3 py-2 text-[11px] font-playfair text-yellow-100/60">
          {selectedFiles.length
            ? `${selectedFiles.length} photo${selectedFiles.length > 1 ? 's' : ''} selected`
            : 'Choose one or more images from your device'}
        </div>

        <button
          type="button"
          onClick={handleUpload}
          disabled={!selectedFiles.length || isUploadingPhotos}
          className="btn-gold w-full rounded-xl py-2.5 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isUploadingPhotos ? 'Uploading Photos...' : 'Upload To Photos'}
        </button>
      </div>
    </div>
  );
}
