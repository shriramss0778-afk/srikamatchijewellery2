import React, { useState, useRef, useEffect } from 'react';
import logoImg from '../assets/logo_transparent.png';
import ControlPanel from '../components/ControlPanel';
import PosterCanvas from '../components/PosterCanvasClone';
import MobileEditor from './mobile/MobileEditor';

export default function Editor() {
  const [currentImage, setCurrentImage] = useState(() => {
    return localStorage.getItem('sri_kamatchi_current_image') || null;
  });
  const [images, setImages] = useState([]);
  const [isLoadingImages, setIsLoadingImages] = useState(true);
  const [imageError, setImageError] = useState('');
  const [isUploadingPhotos, setIsUploadingPhotos] = useState(false);
  const [rates, setRates] = useState({ gold1g: '', gold8g: '', silver1g: '' });
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [notification, setNotification] = useState(null);
  const [priceNote, setPriceNote] = useState('');
  const [metalMode, setMetalMode] = useState('gold');
  const [date, setDate] = useState(() => {
    const d = new Date();
    return `${d.getDate()} – ${d.toLocaleString('en-US', { month: 'long' }).toUpperCase()} – ${d.getFullYear()}`;
  });


  const posterRef = useRef(null);

  // Mobile detection
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (currentImage) {
      localStorage.setItem('sri_kamatchi_current_image', currentImage);
    } else {
      localStorage.removeItem('sri_kamatchi_current_image');
    }
  }, [currentImage]);

  const loadImageLibrary = async () => {
    setIsLoadingImages(true);
    setImageError('');
    try {
      const res = await fetch('/api/image-library');
      if (!res.ok) throw new Error('Failed to load photos');
      const data = await res.json();
      setImages(data.images || []);
    } catch (err) {
      setImageError(err.message || 'Failed to load photos');
    } finally {
      setIsLoadingImages(false);
    }
  };

  useEffect(() => {
    loadImageLibrary();
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3500);
  };

  const handleSelectImage = (imageUrl) => {
    setCurrentImage(imageUrl);
    showNotification('Photo loaded into live preview!', 'success');
  };

  const handleUploadPhotos = async (files) => {
    if (!files.length) return false;

    setIsUploadingPhotos(true);
    try {
      const formData = new FormData();
      files.forEach((file) => formData.append('photos', file));

      const res = await fetch('/api/upload-images', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || data.details || 'Upload failed');

      await loadImageLibrary();
      if (data.files?.length) {
        setCurrentImage(data.files[0].imageUrl);
      }
      showNotification(data.message || 'Photos uploaded successfully!', 'success');
      return true;
    } catch (err) {
      showNotification(`Upload failed: ${err.message}`, 'error');
      return false;
    } finally {
      setIsUploadingPhotos(false);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/next-image');
      if (!res.ok) {
        let msg = 'Failed to load image';
        try { const err = await res.json(); msg = err.error || msg; } catch {}
        throw new Error(msg);
      }
      const data = await res.json();
      setCurrentImage(data.imageUrl);
      loadImageLibrary();
      showNotification('✨ Poster generated successfully!', 'success');
    } catch (err) {
      showNotification(`❌ ${err.message}`, 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = async () => {
    try {
      const res = await fetch('/api/reset-images', { method: 'POST' });
      if (!res.ok) throw new Error('Reset failed');
      const data = await res.json();
      setCurrentImage(null);
      localStorage.removeItem('sri_kamatchi_current_image');
      loadImageLibrary();
      showNotification(`🔄 ${data.message}`, 'success');
    } catch (err) {
      showNotification(`❌ ${err.message}`, 'error');
    }
  };


  // Wait for all images inside the poster to fully load before capturing
  const waitForImages = (el) => {
    const imgs = Array.from(el.querySelectorAll('img'));
    return Promise.all(
      imgs.map(
        (img) =>
          img.complete
            ? Promise.resolve()
            : new Promise((resolve) => {
                img.onload = resolve;
                img.onerror = resolve;
              })
      )
    );
  };

  const captureCanvas = async (format = 'png') => {
    const { toPng, toBlob } = await import('html-to-image');
    // Ensure all images are loaded properly before capturing
    await waitForImages(posterRef.current);
    // Explicit settling delay
    await new Promise(r => setTimeout(r, 500));
    
    const options = {
      pixelRatio: 3,
      width: 405,
      height: 720,
      cacheBust: true,
      style: {
        transform: 'none',
        margin: '0',
        padding: '0',
        left: '0',
        top: '0',
      }
    };

    if (format === 'blob') return await toBlob(posterRef.current, options);
    return await toPng(posterRef.current, options);
  };

  const handleDownload = async () => {
    if (!posterRef.current || !currentImage) {
      showNotification('⚠️ Generate a poster first!', 'warning');
      return;
    }
    setIsDownloading(true);
    try {
      const dataUrl = await captureCanvas('png');
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `Sri-Kamatchi-Jewellery-${timestamp}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      showNotification('💾 Poster downloaded!', 'success');
    } catch (err) {
      showNotification(`❌ Download failed: ${err.message}`, 'error');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    if (!posterRef.current) return;
    if (!currentImage) { showNotification('⚠️ Generate a poster first!', 'warning'); return; }
    setIsSharing(true);
    const whatsappText = encodeURIComponent(
      `✨ Sri Kamatchi Jewellery 💎\n💍 Premium Gold & Silver Collections\n📍 Pollachi\n📞 +91 9443565847`
    );
    try {
      const blob = await captureCanvas('blob');
      const file = new File([blob], 'Sri-Kamatchi-Jewellery.png', { type: 'image/png' });
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({
            title: 'Sri Kamatchi Jewellery',
            text: '✨ Sri Kamatchi Jewellery 💎\n💍 Premium Gold & Silver Collections\n📍 Pollachi\n📞 +91 9443565847',
            files: [file],
          });
          showNotification('📤 Shared successfully!', 'success');
        } catch (e) {
          if (e.name !== 'AbortError') fallbackShare(blob, whatsappText);
        }
      } else {
        fallbackShare(blob, whatsappText);
      }
    } catch (err) {
      showNotification(`❌ Share failed: ${err.message}`, 'error');
    } finally {
      setIsSharing(false);
    }
  };

  const fallbackShare = (blob, whatsappText) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'Sri-Kamatchi-Jewellery.png';
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);
    setTimeout(() => window.open(`https://wa.me/?text=${whatsappText}`, '_blank'), 500);
    showNotification('📲 Image saved & WhatsApp opened!', 'success');
  };


  if (isMobile) {
    return (
      <MobileEditor 
        currentImage={currentImage}
        rates={rates}
        setRates={setRates}
        isGenerating={isGenerating}
        isDownloading={isDownloading}
        isSharing={isSharing}
        notification={notification}
        priceNote={priceNote}
        setPriceNote={setPriceNote}
        metalMode={metalMode}
        setMetalMode={setMetalMode}
        date={date}
        setDate={setDate}
        posterRef={posterRef}
        handleGenerate={handleGenerate}
        handleDownload={handleDownload}
        handleShare={handleShare}
        handleReset={handleReset}
        images={images}
        onSelectImage={handleSelectImage}
        isLoadingImages={isLoadingImages}
        imageError={imageError}
        onUploadPhotos={handleUploadPhotos}
        isUploadingPhotos={isUploadingPhotos}
      />
    );
  }

  return (
    <div className="w-full h-screen flex flex-col" style={{ background: '#0A0A0A' }}>
      {/* Header */}
      <header
        className="flex-shrink-0 relative flex items-center px-4 py-3 border-b border-yellow-600/30"
        style={{ background: 'linear-gradient(to right, #0A0A0A, #1a0f05, #0A0A0A)' }}
      >
        {/* Logo centered */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <img src={logoImg} alt="Sri Kamatchi Jewellery" className="h-10 w-auto object-contain" />
        </div>

        {/* Metal mode toggle pushed to right */}
        <div className="ml-auto w-36 lg:w-44 flex-shrink-0">
          <div
            className="relative flex items-center rounded-full px-1 py-1 gap-1"
            style={{ background: '#111', border: '1px solid #3a2e10' }}
          >
            <div
              className="absolute top-1 bottom-1 rounded-full transition-all duration-300"
              style={{
                width: 'calc(50% - 6px)',
                left: metalMode === 'gold' ? 4 : 'calc(50% + 2px)',
                background: metalMode === 'gold'
                  ? 'linear-gradient(135deg, #2a2000, #3d2e00)'
                  : 'linear-gradient(135deg, #1a1a1a, #2a2a2a)',
                border: '1px solid #4a3a10',
              }}
            />
            <button
              onClick={() => setMetalMode('gold')}
              className="relative z-10 flex-1 py-1 text-[10px] lg:text-xs font-cinzel tracking-widest transition-colors duration-200"
              style={{ color: metalMode === 'gold' ? '#D4AF37' : '#4a3a10' }}
            >GOLD</button>
            <button
              onClick={() => setMetalMode('silver')}
              className="relative z-10 flex-1 py-1 text-[10px] lg:text-xs font-cinzel tracking-widest transition-colors duration-200"
              style={{ color: metalMode === 'silver' ? '#d1d5db' : '#4a4a4a' }}
            >SILVER</button>
          </div>
        </div>
      </header>

      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-8 right-8 z-50 animate-in slide-in-from-right-10 duration-300 shadow-2xl">
          <div className={`px-6 py-3 rounded-lg flex items-center gap-3 backdrop-blur-md border ${
            notification.type === 'error'
              ? 'bg-red-950/80 border-red-500/50 text-red-200'
              : notification.type === 'warning'
              ? 'bg-yellow-950/80 border-yellow-500/50 text-yellow-200'
              : 'bg-[#1a1008]/90 border-[#D4AF37]/50 text-[#D4AF37]'
          }`}>
            <div className={`w-2 h-2 rounded-full ${notification.type === 'success' ? 'bg-[#D4AF37]' : 'bg-current'} animate-pulse`} />
            <span className="font-cinzel text-sm tracking-widest">{notification.message}</span>
          </div>
        </div>
      )}

      {/* Main — stacked on mobile, side-by-side on lg+ */}
      <main className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden">
        {/* Control Panel — Second on mobile, First on desktop */}
        <div className="order-2 lg:order-1 w-full lg:w-72 flex-none lg:flex-shrink-0 border-t lg:border-t-0 overflow-y-auto lg:overflow-y-auto">
          <ControlPanel
            rates={rates} setRates={setRates}
            priceNote={priceNote} setPriceNote={setPriceNote}
            date={date} setDate={setDate}
            onGenerate={handleGenerate} onDownload={handleDownload}
            onShare={handleShare} onReset={handleReset}
            isGenerating={isGenerating} isDownloading={isDownloading}
            isSharing={isSharing}
            images={images}
            currentImage={currentImage}
            onSelectImage={handleSelectImage}
            isLoadingImages={isLoadingImages}
            imageError={imageError}
            onUploadPhotos={handleUploadPhotos}
            isUploadingPhotos={isUploadingPhotos}
          />
        </div>

        {/* Poster preview — First on mobile, Second on desktop */}
        <div
          className="order-1 lg:order-2 w-full lg:flex-1 h-full overflow-y-auto bg-black/40 border-b lg:border-b-0 border-yellow-900/10"
          style={{ 
            background: 'radial-gradient(ellipse at center, #1a0f05 0%, #0A0A0A 70%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start'
          }}
        >
          <div className="py-8 lg:py-12 flex flex-col items-center">
            <div className="transform scale-[0.8] sm:scale-[0.9] md:scale-100 origin-top">
            <PosterCanvas
              ref={posterRef}
              rates={rates}
              imageUrl={currentImage}
              metalMode={metalMode}
              date={date}
              isExporting={isDownloading || isSharing}
            />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
