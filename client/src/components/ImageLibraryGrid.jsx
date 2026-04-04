import React from 'react';

export default function ImageLibraryGrid({
  images,
  currentImage,
  onSelectImage,
  isLoading,
  error,
  className = '',
  columnsClassName = 'grid-cols-3',
}) {
  if (isLoading) {
    return (
      <div className={`rounded-2xl border border-yellow-900/20 bg-black/20 p-4 text-center ${className}`}>
        <p className="font-cinzel text-[11px] tracking-[0.18em] text-yellow-500/70 uppercase">Loading Photos</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`rounded-2xl border border-red-500/20 bg-red-950/20 p-4 text-center ${className}`}>
        <p className="font-playfair text-sm text-red-200/80">{error}</p>
      </div>
    );
  }

  if (!images.length) {
    return (
      <div className={`rounded-2xl border border-yellow-900/20 bg-black/20 p-4 text-center ${className}`}>
        <p className="font-playfair text-sm text-yellow-100/60">No photos found in uploads.</p>
      </div>
    );
  }

  return (
    <div className={`grid gap-3 ${columnsClassName} ${className}`}>
      {images.map((image) => {
        const isActive = currentImage === image.imageUrl;

        return (
          <button
            key={image.id || image.imageUrl}
            type="button"
            onClick={() => onSelectImage(image.imageUrl)}
            className={`group relative overflow-hidden rounded-2xl border transition-all duration-200 ${
              isActive
                ? 'border-yellow-400 shadow-[0_0_0_1px_rgba(250,204,21,0.65)]'
                : 'border-yellow-900/20 hover:border-yellow-600/40'
            }`}
            title={`Photo ${image.order}`}
          >
            <img
              src={image.imageUrl}
              alt={`Photo ${image.order}`}
              className="h-24 w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent px-2 pb-2 pt-5 text-left">
              <div className="flex items-center justify-between gap-2">
                <span className="font-cinzel text-[10px] font-bold tracking-[0.18em] text-yellow-300">
                  #{String(image.order).padStart(2, '0')}
                </span>
                {isActive && (
                  <span className="rounded-full bg-yellow-400 px-2 py-0.5 font-cinzel text-[9px] font-bold tracking-[0.12em] text-black">
                    LIVE
                  </span>
                )}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
