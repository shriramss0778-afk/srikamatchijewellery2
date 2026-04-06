import React, { useState } from 'react';
import logoImg from '../../assets/logo_transparent.png';
import MobileControlPanel from '../../components/mobile/MobileControlPanel';
import PosterCanvas from '../../components/PosterCanvasClone';

export default function MobileEditor({
  currentImage, rates, setRates,
  isGenerating, isDownloading, isSharing,
  notification, priceNote, setPriceNote,
  metalMode, setMetalMode, date, setDate,
  posterRef, handleGenerate, handleDownload,
  handleShare, handleReset,
  images, onSelectImage, isLoadingImages, imageError,
  onUploadPhotos, isUploadingPhotos,
}) {
  const [activeTab, setActiveTab] = useState('edit'); // 'edit', 'preview'

  return (
    <div className="fixed inset-0 flex flex-col pt-safe bg-[#0A0A0A] overflow-hidden">
      {/* Mobile Header */}
      <header className="flex-shrink-0 flex items-center justify-between px-4 h-16 border-b border-yellow-900/30 bg-black/40 backdrop-blur-md z-30">
        <div className="flex-1">
          <img src={logoImg} alt="Logo" className="h-8 w-auto object-contain" />
        </div>

        {/* Metal Mode Miniature Toggle */}
        <div className="flex-shrink-0 h-10 w-28 p-1 rounded-full bg-black/60 border border-yellow-900/20 relative flex items-center">
            <div 
              className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full transition-transform duration-300 shadow-lg shadow-black/80"
              style={{ 
                left: metalMode === 'gold' ? 4 : 'calc(50% + 1px)',
                background: metalMode === 'gold' ? 'linear-gradient(135deg, #3d2e00, #2a2000)' : '#222',
                border: '1px solid rgba(212,175,55,0.4)'
              }}
            />
            <button 
              onClick={() => setMetalMode('gold')}
              className={`relative z-10 flex-1 h-full text-[9px] font-cinzel font-bold tracking-widest ${metalMode === 'gold' ? 'text-yellow-400' : 'text-yellow-900/40'}`}
            >GOLD</button>
            <button 
              onClick={() => setMetalMode('silver')}
              className={`relative z-10 flex-1 h-full text-[9px] font-cinzel font-bold tracking-widest ${metalMode === 'silver' ? 'text-gray-200' : 'text-yellow-900/40'}`}
            >SILVER</button>
        </div>
      </header>

      {/* Dynamic Content Area */}
      <main className="flex-1 w-full relative overflow-y-auto overflow-x-hidden pt-4 pb-24 px-4 custom-scrollbar">
        {activeTab === 'preview' ? (
          /* Preview View */
          <div className="flex flex-col items-center animate-fade-in py-2">
            <div className="transform origin-top scale-[0.85] sm:scale-[0.95] xs:scale-[0.75] transition-transform duration-500">
               <PosterCanvas
                ref={posterRef}
                rates={rates}
                imageUrl={currentImage}
                metalMode={metalMode}
                date={date}
                isExporting={isDownloading || isSharing}
              />
            </div>

            <button
              type="button"
              onClick={() => setActiveTab('edit')}
              className="mt-4 text-[11px] font-cinzel font-bold tracking-[0.2em] uppercase text-yellow-500/80 border border-yellow-700/30 bg-black/30 px-4 py-2 rounded-full active:scale-95 transition-transform"
            >
              Edit Rates & Photos
            </button>

            {/* Quick Actions overlay when in preview */}
            <div className="mt-8 grid grid-cols-2 gap-3 w-full max-w-[405px]">
               <button 
                  onClick={handleDownload} 
                  disabled={isDownloading}
                  className="btn-gold py-4 rounded-xl flex items-center justify-center gap-2 text-sm shadow-xl shadow-yellow-900/10 active:scale-95 transition-transform"
                >
                  {isDownloading ? 'SAVING...' : '💾 SAVE TO GALLERY'}
                </button>
                <button 
                  onClick={handleShare} 
                  disabled={isSharing}
                  className="bg-green-600/10 border border-green-600/50 text-green-500 font-cinzel font-bold py-4 rounded-xl flex items-center justify-center gap-2 text-sm active:scale-95 transition-transform"
                >
                  {isSharing ? 'SENDING...' : '📲 WHATSAPP'}
                </button>
            </div>
            
            <p className="mt-6 text-[11px] font-playfair italic text-yellow-900/40 text-center uppercase tracking-[0.2em]">Full HD 9:16 Status Aspect Ratio</p>
          </div>
        ) : (
          /* Editor View */
          <div className="animate-fade-in max-w-lg mx-auto">
            <MobileControlPanel 
              rates={rates} setRates={setRates}
              date={date} setDate={setDate}
              priceNote={priceNote} setPriceNote={setPriceNote}
              onGenerate={handleGenerate} onDownload={handleDownload}
              onShare={handleShare} onReset={handleReset}
              isGenerating={isGenerating} isDownloading={isDownloading}
              isSharing={isSharing}
              images={images}
              currentImage={currentImage}
              onSelectImage={onSelectImage}
              isLoadingImages={isLoadingImages}
              imageError={imageError}
              onUploadPhotos={onUploadPhotos}
              isUploadingPhotos={isUploadingPhotos}
            />
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 h-20 bg-black/90 backdrop-blur-xl border-t border-yellow-900/30 px-6 flex items-center justify-around z-50">
        <button 
          onClick={() => setActiveTab('edit')}
          className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${activeTab === 'edit' ? 'text-yellow-400 scale-110' : 'text-yellow-700/60'}`}
        >
          <div className={`p-2 rounded-xl border transition-colors ${activeTab === 'edit' ? 'bg-yellow-400/10 border-yellow-400/50' : 'bg-transparent border-transparent'}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <span className="text-[10px] font-cinzel font-bold tracking-widest">EDIT</span>
        </button>

        <button 
          onClick={() => setActiveTab('preview')}
          className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${activeTab === 'preview' ? 'text-yellow-400 scale-110' : 'text-yellow-700/60'}`}
        >
          <div className={`p-2 rounded-xl border transition-colors ${activeTab === 'preview' ? 'bg-yellow-400/10 border-yellow-400/50' : 'bg-transparent border-transparent'}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <span className="text-[10px] font-cinzel font-bold tracking-widest">PREVIEW</span>
        </button>

        {/* Generate Shortcut on navigation */}
        <button 
          onClick={handleGenerate}
          disabled={isGenerating}
          className={`flex flex-col items-center gap-1.5 transition-all active:scale-90 ${isGenerating ? 'opacity-50' : 'text-yellow-400'}`}
        >
          <div className="p-2 rounded-xl bg-gradient-to-tr from-yellow-700 to-yellow-400 shadow-lg shadow-yellow-900/30 text-black">
            {isGenerating ? (
               <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : (
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            )}
          </div>
          <span className="text-[10px] font-cinzel font-bold tracking-widest uppercase">New</span>
        </button>
      </nav>

      {/* Mobile Toast Notification Overlay */}
      {notification && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[60] w-[90%] animate-in fade-in slide-in-from-top-4 duration-300">
           <div className={`px-5 py-3.5 rounded-2xl flex items-center gap-3 backdrop-blur-xl border shadow-2xl ${
            notification.type === 'error'
              ? 'bg-red-950/90 border-red-500/40 text-red-100'
              : notification.type === 'warning'
              ? 'bg-yellow-950/90 border-yellow-500/40 text-yellow-100'
              : 'bg-[#1a1008]/95 border-yellow-500/40 text-yellow-400'
          }`}>
            <span className="font-cinzel text-xs font-bold tracking-widest">{notification.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}
