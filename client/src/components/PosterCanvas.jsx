import React, { forwardRef } from 'react';
import logoImg from '../assets/logo_transparent.png';
import goddessImg from '../assets/LOGO-removebg-preview.png';

const CINZEL_STACK = "'Cinzel', serif";
const PLAYFAIR_STACK = "'Playfair Display', serif";
const TAMIL_STACK = "'Noto Serif Tamil', serif";

const rateColumns = [
  { tamil: '1 கிராம் தங்கம்', sub: '1 GRAM GOLD', badge: '22K', key: 'gold1g' },
  { tamil: '8 கிராம் தங்கம்', sub: '8 GRAM GOLD', badge: '22K', key: 'gold8g' },
  { tamil: '1 கிராம் வெள்ளி', sub: '1 GRAM SILVER', badge: '999', key: 'silver1g' },
];

const PosterCanvas = forwardRef(function PosterCanvas({ rates, imageUrl, date, isExporting }, ref) {
  const displayDate = date || (() => {
    const d = new Date();
    return `${d.getDate()} - ${d.toLocaleString('en-US', { month: 'long' }).toUpperCase()} - ${d.getFullYear()}`;
  })();

  return (
    <div
      ref={ref}
      id="poster-canvas-area"
      style={{
        width: '405px',
        height: '720px',
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
        fontFamily: PLAYFAIR_STACK,
        borderRadius: isExporting ? '0' : '12px',
        background: '#1a0a00',
      }}
      className="gold-border-glow"
    >
      {/* === FULL BACKGROUND PRODUCT IMAGE === */}
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Jewellery product"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 42%',
            display: 'block',
          }}
        />
      ) : (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: '8px',
          background: 'linear-gradient(175deg, #1a0a00 0%, #2a1200 50%, #1a0a00 100%)',
        }}>
          <div style={{ fontSize: '48px', opacity: 0.2 }}>💎</div>
          <p style={{
            fontFamily: CINZEL_STACK, fontSize: '10px', fontWeight: '700',
            color: '#B8962E', letterSpacing: '0.15em',
            textTransform: 'uppercase', opacity: 0.5,
          }}>Click Generate to load image</p>
        </div>
      )}

      {/* Dark gradient overlay — top & bottom for text readability */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(10,5,0,0.65) 0%, rgba(10,5,0,0.1) 25%, rgba(10,5,0,0) 50%, rgba(10,5,0,0.1) 75%, rgba(10,5,0,0.85) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Outer gold border frame */}
      <div style={{
        position: 'absolute', inset: '8px',
        border: '1.5px solid #D4AF37',
        borderRadius: '8px',
        pointerEvents: 'none',
        boxShadow: 'inset 0 0 30px rgba(0,0,0,0.2)',
      }} />
      <div style={{
        position: 'absolute', inset: '12px',
        border: '0.5px solid rgba(212,175,55,0.3)',
        borderRadius: '6px',
        pointerEvents: 'none',
      }} />

      {/* === TOP SECTION: Goddess + Logo === */}
      <div style={{
        position: 'absolute', top: '10px', left: 0, right: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px',
      }}>
        <img src={goddessImg} alt="Goddess"
          style={{ width: '68px', height: 'auto', objectFit: 'contain' }} />
        <img src={logoImg} alt="Sri Kamatchi Jewellery"
          style={{ width: '225px', height: 'auto', objectFit: 'contain' }} />
      </div>

      {/* Gold divider below logo */}
      <div style={{
        position: 'absolute', top: '160px', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', width: '310px',
      }}>
        <div style={{ flex: 1, height: '1.3px', background: 'linear-gradient(to right, transparent, #D4AF37 50%, #D4AF37 100%)' }} />
        <span style={{ color: '#D4AF37', fontSize: '10px', margin: '0 10px', display: 'flex', alignItems: 'center' }}>◆</span>
        <div style={{ flex: 1, height: '1.3px', background: 'linear-gradient(to left, transparent, #D4AF37 50%, #D4AF37 100%)' }} />
      </div>

      {/* === BOTTOM SECTION === */}
      {/* DATE */}
      <div style={{
        position: 'absolute', bottom: '200px', left: '50%', transform: 'translateX(-50%)',
        fontFamily: CINZEL_STACK, fontSize: '15px', fontWeight: '800',
        color: '#D4AF37', letterSpacing: '0.25em', whiteSpace: 'nowrap',
        textShadow: '0 2px 12px rgba(0,0,0,1), 0 0 30px rgba(0,0,0,0.9)',
        background: 'rgba(10,5,0,0.75)',
        padding: '5px 20px',
        borderRadius: '20px',
        border: '1.2px solid rgba(212,175,55,0.25)',
      }}>
        {displayDate}
      </div>

      <div style={{
        position: 'absolute', bottom: '65px', left: '25px', right: '25px',
        border: '1.2px solid rgba(212,175,55,0.5)',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 8px 30px rgba(0,0,0,0.8)',
        background: 'rgba(0,0,0,0.65)',
      }}>
        <div style={{
          background: 'rgba(212,175,55,0.12)',
          borderBottom: '1px solid rgba(212,175,55,0.3)',
          textAlign: 'center', padding: '5px 0',
          fontFamily: CINZEL_STACK, fontSize: '10.5px', fontWeight: '800',
          color: '#FBD71E', letterSpacing: '0.3em',
          textShadow: '0 1px 3px rgba(0,0,0,0.9)',
        }}>TODAY&apos;S RATE</div>

        <div style={{ display: 'flex', alignItems: 'stretch', padding: '8px 0', minHeight: '92px' }}>
          {rateColumns.map(({ tamil, sub, badge, key }) => (
            <RateCol
              key={key}
              tamil={tamil}
              sub={sub}
              badge={badge}
              value={rates[key]}
              prefix="₹"
            />
          ))}
        </div>
      </div>

      {/* BOTTOM INFO */}
      <div style={{
        position: 'absolute', bottom: '18px', left: '28px', right: '28px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
      }}>
        <div style={{
          fontFamily: PLAYFAIR_STACK, fontSize: '10px', color: '#f5e6c8', lineHeight: 1.6,
          textShadow: '0 2px 6px rgba(0,0,0,1), 0 1px 2px rgba(0,0,0,1)',
        }}>
          <div style={{ color: '#FBD71E', fontSize: '11.5px', fontWeight: '700', marginBottom: '2px', letterSpacing: '0.02em' }}>916 KDM 22CT Gold &amp; Silver</div>
          <div style={{ opacity: 1, fontWeight: '700', fontFamily: TAMIL_STACK }}>நகைகள் வாங்கிட....</div>
        </div>
        <div style={{
          textAlign: 'right', fontFamily: PLAYFAIR_STACK, fontSize: '10px', color: '#f5e6c8', lineHeight: 1.6,
          textShadow: '0 2px 6px rgba(0,0,0,1), 0 1px 2px rgba(0,0,0,1)',
        }}>
          <div style={{ color: '#FBD71E', fontSize: '11.5px', fontWeight: '700', marginBottom: '2px', letterSpacing: '0.02em' }}>+91 9443565847</div>
          <div style={{ opacity: 1, fontWeight: '700' }}>156/1 S.S Kovil Street, Pollachi</div>
        </div>
      </div>
    </div>
  );
});

function RateCol({ tamil, sub, badge, value, prefix }) {
  // Enhanced metallic gold badge pill
  const badgeStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 12px',
    height: '18px',
    borderRadius: '9px',
    background: 'linear-gradient(to bottom, #FBD71E 0%, #D4AF37 50%, #B8962E 100%)',
    boxShadow: '0 2px 4px rgba(0,0,0,0.6)',
    margin: '3px 0',
  };

  const formattedValue = value ? Number(value.toString().replace(/,/g, '')).toLocaleString('en-IN') : null;

  return (
    <div style={{
      flex: 1, textAlign: 'center',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      minWidth: 0,
    }}>
      <div style={{
        fontFamily: TAMIL_STACK, fontSize: '10.5px',
        color: '#FFFFFF', fontWeight: '800', marginBottom: '1px',
        textShadow: '0 1px 2px rgba(0,0,0,1)'
      }}>{tamil}</div>
      <div style={{
        fontFamily: CINZEL_STACK, fontSize: '6.8px', fontWeight: '700',
        color: '#D4AF37', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '5px',
        opacity: 0.95, whiteSpace: 'nowrap'
      }}>{sub}</div>
      
      <div style={badgeStyle}>
        <span style={{
          fontFamily: CINZEL_STACK,
          fontSize: '8.5px',
          fontWeight: '900',
          color: '#000000',
          lineHeight: 1,
          letterSpacing: '0.08em',
        }}>{badge}</span>
      </div>

      <div style={{
        fontFamily: CINZEL_STACK, fontSize: '20px', fontWeight: '700',
        color: '#FFFFFF', lineHeight: 1, marginTop: '6px',
        letterSpacing: '0.03em',
        textShadow: '0 2px 6px rgba(0,0,0,1)'
      }}>
        {formattedValue ? (
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: '2px' }}>
            <span style={{ fontSize: '10px', marginTop: '3px' }}>{prefix}</span>
            <span>{formattedValue}</span>
          </div>
        ) : '—'}
      </div>
    </div>
  );
}

export default PosterCanvas;
