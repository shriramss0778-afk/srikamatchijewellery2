import React from 'react';
import ImageLibraryGrid from './ImageLibraryGrid';
import PhotoUploadPanel from './PhotoUploadPanel';

function FieldRow({ label, children }) {
  return (
    <div>
      <label className="text-xs font-cinzel tracking-widest uppercase text-yellow-700/50 block mb-1">{label}</label>
      {children}
    </div>
  );
}

function SectionLabel({ label }) {
  return <span className="text-xs font-cinzel tracking-widest uppercase text-yellow-600/70">{label}</span>;
}

export default function ControlPanel({
  rates, setRates, date, setDate, priceNote, setPriceNote,
  onGenerate, onDownload, onShare, onReset,
  isGenerating, isDownloading, isSharing,
  images, currentImage, onSelectImage, isLoadingImages, imageError,
  onUploadPhotos, isUploadingPhotos,
}) {
  const handleRateChange = (key, value) =>
    setRates((prev) => {
      if (key === 'gold1g') {
        const numeric = Number(String(value).replace(/,/g, ''));
        return {
          ...prev,
          gold1g: value,
          gold8g: Number.isFinite(numeric) && String(value).trim() !== '' ? String(numeric * 8) : '',
        };
      }

      return { ...prev, [key]: value };
    });

  return (
    <aside
      className="w-full lg:w-72 flex-shrink-0 flex flex-col overflow-hidden lg:overflow-auto panel-glass border-b lg:border-b-0 lg:border-r border-yellow-900/20"
      style={{ height: 'auto', maxHeight: 'none' }}
    >
      <div className="hidden lg:block lg:h-full lg:absolute lg:inset-0" style={{ height: 'calc(100vh - 56px)' }} />
      <div className="relative flex flex-col lg:h-[calc(100vh-56px)]">
      <div className="px-4 py-4 border-b border-yellow-900/20 flex-1 overflow-y-auto">
      {/* Today's Details */}
      <div>
        <SectionLabel label="Today's Details" />
        <div className="mt-3 space-y-2.5">
          <FieldRow label="Date">
            <input type="text" value={date} onChange={(e) => setDate(e.target.value)}
              className="input-gold w-full rounded-md px-3 py-1.5 text-sm font-bold text-yellow-300"
              placeholder="e.g. 4 – APRIL – 2026" />
          </FieldRow>
          <FieldRow label="1 GM 22K GOLD ₹">
            <input type="text" value={rates.gold1g} onChange={(e) => handleRateChange('gold1g', e.target.value)}
              className="input-gold w-full rounded-md px-3 py-1.5 text-sm" placeholder="e.g. 13620" />
          </FieldRow>
          <FieldRow label="8 GM 22K GOLD ₹">
            <input type="text" value={rates.gold8g} readOnly
              className="input-gold w-full rounded-md px-3 py-1.5 text-sm opacity-80 cursor-not-allowed" placeholder="Auto from 1 GM gold" />
          </FieldRow>
          <FieldRow label="1 GM SILVER ₹">
            <input type="text" value={rates.silver1g} onChange={(e) => handleRateChange('silver1g', e.target.value)}
              className="input-gold w-full rounded-md px-3 py-1.5 text-sm" placeholder="e.g. 250" />
          </FieldRow>
          <FieldRow label="Price Drop Note (Tamil)">
            <textarea value={priceNote} onChange={(e) => setPriceNote(e.target.value)}
              className="input-gold w-full rounded-md px-3 py-1.5 text-sm resize-none" rows={2}
              placeholder="தங்கத்தின் விலை கிராமுக்கு –33" />
          </FieldRow>
        </div>
      </div>

      <div className="mt-6">
        <SectionLabel label="Upload Photos" />
        <p className="mt-2 mb-3 text-[11px] font-playfair text-yellow-100/55">
          Add new images from the app and load them into the photo library.
        </p>
        <PhotoUploadPanel
          onUploadPhotos={onUploadPhotos}
          isUploadingPhotos={isUploadingPhotos}
        />
      </div>

      <div className="mt-6">
        <SectionLabel label="Photos" />
        <p className="mt-2 mb-3 text-[11px] font-playfair text-yellow-100/55">
          Click any photo to load it into the live preview.
        </p>
        <ImageLibraryGrid
          images={images}
          currentImage={currentImage}
          onSelectImage={onSelectImage}
          isLoading={isLoadingImages}
          error={imageError}
        />
      </div>
      </div>

      {/* Actions */}
      <div className="px-4 py-4 flex flex-col gap-2">
        <SectionLabel label="Actions" />

        <button onClick={onGenerate} disabled={isGenerating}
          className="btn-gold w-full py-2.5 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
          {isGenerating
            ? <><span className="inline-block w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />Generating...</>
            : <>✨ Generate Poster</>}
        </button>

        <button onClick={onDownload} disabled={isDownloading}
          className="btn-ghost-gold w-full py-2 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
          {isDownloading
            ? <><span className="inline-block w-4 h-4 border-2 border-yellow-600/30 border-t-yellow-400 rounded-full animate-spin" />Downloading...</>
            : <>💾 Download Poster</>}
        </button>

        <button onClick={onShare} disabled={isSharing}
          className="btn-ghost-gold w-full py-2 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ borderColor: '#25D366', color: '#25D366' }}>
          {isSharing
            ? <><span className="inline-block w-4 h-4 border-2 border-green-800 border-t-green-400 rounded-full animate-spin" />Sharing...</>
            : <>📲 Share to WhatsApp</>}
        </button>

        <hr className="gold-divider my-0.5" />

        <button onClick={onReset}
          className="text-xs text-yellow-800/50 hover:text-yellow-600/70 font-playfair transition-colors text-center py-0.5">
          🔄 Reset image cycle
        </button>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 text-center border-t border-yellow-900/20">
        <p className="text-xs text-yellow-900/50 font-playfair italic">Sri Kamatchi Jewellery · Pollachi</p>
      </div>
      </div>
    </aside>
  );
}
