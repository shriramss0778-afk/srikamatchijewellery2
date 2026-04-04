import React from 'react';
import ImageLibraryGrid from '../ImageLibraryGrid';
import PhotoUploadPanel from '../PhotoUploadPanel';

function FieldRow({ label, children }) {
  return (
    <div className="flex flex-col gap-1.5 px-1">
      <label className="text-[10px] font-cinzel tracking-[0.15em] uppercase text-yellow-700/60 font-bold">{label}</label>
      {children}
    </div>
  );
}

function SectionLabel({ label }) {
  return (
    <div className="flex items-center gap-3 px-1 mb-4">
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-yellow-900/30" />
      <span className="text-[11px] font-cinzel tracking-[0.2em] uppercase text-yellow-600/80 font-bold whitespace-nowrap">{label}</span>
      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-yellow-900/30" />
    </div>
  );
}

export default function MobileControlPanel({
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
    <div className="w-full flex flex-col gap-8 pb-32">
      {/* Today's Details Section */}
      <div className="flex flex-col gap-6">
        <SectionLabel label="Gold & Silver Rates" />
        
        <div className="grid grid-cols-1 gap-5 px-1">
          <FieldRow label="Date of Rate">
            <input 
              type="text" 
              value={date} 
              onChange={(e) => setDate(e.target.value)}
              className="input-gold w-full rounded-xl px-4 py-3.5 text-base font-bold text-yellow-300 shadow-lg shadow-black/20"
              placeholder="e.g. 4 – APRIL – 2026" 
            />
          </FieldRow>

          <div className="grid grid-cols-2 gap-4">
            <FieldRow label="1G 22K GOLD ₹">
              <input 
                type="text" 
                value={rates.gold1g} 
                onChange={(e) => handleRateChange('gold1g', e.target.value)}
                className="input-gold w-full rounded-xl px-4 py-3.5 text-base" 
                placeholder="13,620" 
              />
            </FieldRow>
            <FieldRow label="8G 22K GOLD ₹">
              <input 
                type="text" 
                value={rates.gold8g} 
                readOnly
                className="input-gold w-full rounded-xl px-4 py-3.5 text-base opacity-80 cursor-not-allowed" 
                placeholder="Auto from 1G gold" 
              />
            </FieldRow>
          </div>

          <FieldRow label="1GM SILVER ₹">
            <input 
              type="text" 
              value={rates.silver1g} 
              onChange={(e) => handleRateChange('silver1g', e.target.value)}
              className="input-gold w-full rounded-xl px-4 py-3.5 text-base" 
              placeholder="250" 
            />
          </FieldRow>

          <FieldRow label="Price Note (Tamil)">
            <textarea 
              value={priceNote} 
              onChange={(e) => setPriceNote(e.target.value)}
              className="input-gold w-full rounded-xl px-4 py-3.5 text-sm resize-none h-24"
              placeholder="தங்கத்தின் விலை கிராமுக்கு –33" 
            />
          </FieldRow>
        </div>
      </div>

      {/* Primary Actions Section */}
      <div className="flex flex-col gap-4">
        <SectionLabel label="Poster Actions" />
        
        <div className="flex flex-col gap-3 px-1">
          <button 
            onClick={onGenerate} 
            disabled={isGenerating}
            className="btn-gold w-full py-4 rounded-xl flex items-center justify-center gap-3 text-base shadow-xl shadow-yellow-900/10 active:scale-[0.98] transition-transform disabled:opacity-50"
          >
            {isGenerating
              ? <><span className="inline-block w-5 h-5 border-3 border-black/30 border-t-black rounded-full animate-spin" />Processing...</>
              : <>✨ Generate New Poster</>}
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={onDownload} 
              disabled={isDownloading}
              className="btn-ghost-gold py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm active:scale-[0.98] transition-transform disabled:opacity-50"
            >
              {isDownloading
                ? <span className="inline-block w-4 h-4 border-2 border-yellow-600/30 border-t-yellow-400 rounded-full animate-spin" />
                : <>💾 Save</>}
            </button>

            <button 
              onClick={onShare} 
              disabled={isSharing}
              className="py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm font-cinzel font-bold tracking-wider border-1.5 border-green-600/50 text-green-500 bg-green-500/5 active:scale-[0.98] transition-transform disabled:opacity-50"
            >
              {isSharing
                ? <span className="inline-block w-4 h-4 border-2 border-green-800 border-t-green-400 rounded-full animate-spin" />
                : <>📲 WhatsApp</>}
            </button>
          </div>

          <button 
            onClick={onReset}
            className="text-[10px] text-yellow-800/40 font-playfair transition-colors text-center py-4 uppercase tracking-[0.2em]"
          >
            🔄 Reset Image Selection Sequence
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <SectionLabel label="Upload Photos" />
        <p className="px-1 text-sm font-playfair text-yellow-100/55">
          Upload new photos from your phone and show them in the photo library.
        </p>
        <PhotoUploadPanel
          onUploadPhotos={onUploadPhotos}
          isUploadingPhotos={isUploadingPhotos}
        />
      </div>

      <div className="flex flex-col gap-4">
        <SectionLabel label="Photos" />
        <p className="px-1 text-sm font-playfair text-yellow-100/55">
          Tap a thumbnail to show that photo in the live preview.
        </p>
        <ImageLibraryGrid
          images={images}
          currentImage={currentImage}
          onSelectImage={onSelectImage}
          isLoading={isLoadingImages}
          error={imageError}
          columnsClassName="grid-cols-2"
        />
      </div>

      {/* Branding Footer */}
      <div className="px-4 py-8 text-center opacity-30 mt-4 border-t border-yellow-900/10">
        <p className="text-[10px] text-yellow-900 font-cinzel tracking-[0.3em] uppercase">Sri Kamatchi Jewellery</p>
        <p className="text-[9px] text-yellow-900/60 font-playfair italic mt-1">Pollachi • Coimbatore</p>
      </div>
    </div>
  );
}
