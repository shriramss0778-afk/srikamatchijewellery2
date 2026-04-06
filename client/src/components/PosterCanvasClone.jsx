import React, { forwardRef } from 'react';
import logoImg from '../assets/logo_transparent.png';
import goddessImg from '../assets/LOGO-removebg-preview.png';

const CINZEL_STACK = "'Cinzel', serif";
const PLAYFAIR_STACK = "'Playfair Display', serif";
const TAMIL_STACK = "'Noto Serif Tamil', serif";
const RATE_STACK = "'Cormorant Garamond','Noto Serif Tamil',serif";
const TIMES_STACK = "'Times New Roman', Times, serif";

const GOLD = '#d1ad52';
const PALE_GOLD = '#f2dfb0';
const LINE_GOLD = 'rgba(180, 133, 48, 0.58)';
const PANEL_BG = 'linear-gradient(180deg, rgba(17,10,6,0.98) 0%, rgba(11,6,4,0.98) 100%)';

const rateColumns = [
  { tamil: '1 கிராம் தங்கம்', sub: '1 GRAM GOLD', badge: '22K', key: 'gold1g' },
  { tamil: '8 கிராம் தங்கம்', sub: '8 GRAM GOLD', badge: '22K', key: 'gold8g' },
  { tamil: '1 கிராம் வெள்ளி', sub: '1 GRAM SILVER', badge: '999', key: 'silver1g' },
];

const formatDefaultDate = () => {
  const d = new Date();
  return `${d.getDate()} - ${d
    .toLocaleString('en-US', { month: 'long' })
    .toUpperCase()} - ${d.getFullYear()}`;
};

const formatCurrency = (value) => {
  if (!value) return null;
  const parsed = Number(value.toString().replace(/,/g, ''));
  return Number.isFinite(parsed) ? parsed.toLocaleString('en-IN') : null;
};

const lineStyle = (direction, width = '132px') => ({
  width,
  height: '1px',
  background:
    direction === 'left'
      ? 'linear-gradient(to right, rgba(0,0,0,0), rgba(151,103,35,0.18) 18%, rgba(151,103,35,0.62) 100%)'
      : 'linear-gradient(to left, rgba(0,0,0,0), rgba(151,103,35,0.18) 18%, rgba(151,103,35,0.62) 100%)',
});

const PosterCanvasClone = forwardRef(function PosterCanvasClone(
  { rates, imageUrl, date, isExporting },
  ref
) {
  const displayDate = date || formatDefaultDate();

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
        background:
          'radial-gradient(circle at 50% 24%, rgba(89,37,14,0.52) 0%, rgba(42,14,3,0.22) 18%, rgba(18,7,2,0) 39%), linear-gradient(180deg, #1f0902 0%, #250d02 100%)',
      }}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 42%',
            display: 'block',
          }}
        />
      ) : (
        <UploadPlaceholder />
      )}

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'repeating-linear-gradient(135deg, rgba(255,255,255,0.015) 0, rgba(255,255,255,0.015) 2px, transparent 2px, transparent 11px)',
          opacity: 0.36,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(15,7,3,0.72) 0%, rgba(15,7,3,0.14) 20%, rgba(15,7,3,0) 44%, rgba(15,7,3,0.1) 73%, rgba(10,4,2,0.88) 100%)',
          pointerEvents: 'none',
        }}
      />

      <FrameDecor isExporting={isExporting} />

      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <img
          src={goddessImg}
          alt="Goddess"
          style={{
            width: '66px',
            height: '82px',
            objectFit: 'contain',
            marginBottom: '10px',
            filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.55))',
          }}
        />
        <img
          src={logoImg}
          alt="Sri Kamatchi Jewellery"
          style={{
            width: '316px',
            height: '83px',
            objectFit: 'contain',
            filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.7))',
          }}
        />

        <div
          style={{
            marginTop: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '14px',
          }}
        >
          <div style={lineStyle('left')} />
          <div
            style={{
              position: 'relative',
              width: '23px',
              height: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: 'rgba(194,148,57,0.46)',
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            />
            <span
              style={{
                width: '11px',
                height: '11px',
                transform: 'rotate(45deg)',
                background: 'linear-gradient(180deg, #cfb05b 0%, #7f5a1d 100%)',
                boxShadow: '0 0 8px rgba(182,130,43,0.28)',
              }}
            />
            <span
              style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: 'rgba(194,148,57,0.46)',
                position: 'absolute',
                right: 0,
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            />
          </div>
          <div style={lineStyle('right')} />
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: '202px',
          transform: 'translateX(-50%)',
          width: '314px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '14px',
        }}
      >
        <div style={lineStyle('left', '90px')} />
        <div
          style={{
            padding: '6px 18px',
            borderRadius: '999px',
            background: 'linear-gradient(180deg, rgba(19,10,6,0.96) 0%, rgba(10,5,3,0.94) 100%)',
            border: '1px solid rgba(175,130,49,0.7)',
            boxShadow: '0 10px 18px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,232,165,0.08)',
            fontFamily: CINZEL_STACK,
            fontSize: '14px',
            fontWeight: 700,
            letterSpacing: '0.22em',
            color: '#d8b56b',
            whiteSpace: 'nowrap',
            textShadow: '0 2px 10px rgba(0,0,0,0.82)',
          }}
        >
          {displayDate}
        </div>
        <div style={lineStyle('right', '90px')} />
      </div>

      <RatesPanel rates={rates} />

      <div
        style={{
          position: 'absolute',
          left: '26px',
          right: '26px',
          bottom: '22px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '8px',
            minWidth: 0,
          }}
        >
          <div
            style={{
              fontFamily: TIMES_STACK,
              textAlign: 'left',
              fontSize: '11.2px',
              fontWeight: 700,
              lineHeight: 0.94,
              letterSpacing: '0.012em',
              color: PALE_GOLD,
              textShadow: '0 2px 6px rgba(0,0,0,0.92)',
              whiteSpace: 'nowrap',
            }}
          >
            916 KDM 22CT GOLD &amp; SILVER
          </div>
          <div
            style={{
              fontFamily: TAMIL_STACK,
              textAlign: 'left',
              fontSize: '9.8px',
              fontWeight: 700,
              lineHeight: 1,
              color: GOLD,
              letterSpacing: '0.002em',
              textShadow: '0 2px 6px rgba(0,0,0,0.92)',
            }}
          >
            நகைகள் வாங்கிட...
          </div>
        </div>


        <div
          style={{
            display: 'none',
            fontFamily: RATE_STACK,
            textAlign: 'left',
            color: GOLD,
            textShadow: '0 2px 6px rgba(0,0,0,0.92)',
            alignSelf: 'start',
          }}
        >
          <div
            style={{
              fontSize: '9.2px',
              fontWeight: 700,
              lineHeight: 1,
              color: GOLD,
              letterSpacing: '0.004em',
            }}
          >
            நகைகள் வாங்கிட...
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '8px',
            minWidth: 0,
          }}
        >
          <div
            style={{
              fontFamily: TIMES_STACK,
              textAlign: 'right',
              fontSize: '12.8px',
              fontWeight: 700,
              lineHeight: 0.94,
              letterSpacing: '0.012em',
              color: PALE_GOLD,
              textShadow: '0 2px 6px rgba(0,0,0,0.92)',
              whiteSpace: 'nowrap',
            }}
          >
            +91 9443565847
          </div>
          <div
            style={{
              fontFamily: TIMES_STACK,
              textAlign: 'right',
              fontSize: '9.2px',
              fontWeight: 700,
              lineHeight: 1,
              opacity: 0.88,
              color: GOLD,
              letterSpacing: '0.006em',
              textShadow: '0 2px 6px rgba(0,0,0,0.92)',
              whiteSpace: 'nowrap',
            }}
          >
            156/1 S.S Kovil Street, Pollachi
          </div>
        </div>
      </div>
    </div>
  );
});

function FrameDecor({ isExporting }) {
  const radius = isExporting ? '0' : '12px';

  return (
    <>
      <div
        style={{
          position: 'absolute',
          inset: '4px',
          borderRadius: radius,
          border: '1px solid rgba(214,173,83,0.98)',
          boxShadow: '0 0 0 1px rgba(97,58,14,0.82), inset 0 0 18px rgba(0,0,0,0.22)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: '11px',
          borderRadius: radius,
          border: '1px solid rgba(93,59,19,0.95)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: '16px',
          borderRadius: '6px',
          border: '1px solid rgba(148,103,33,0.7)',
          pointerEvents: 'none',
        }}
      />

      <Corner top="8px" left="8px" rotate="0deg" />
      <Corner top="8px" right="8px" rotate="90deg" />
      <Corner bottom="8px" right="8px" rotate="180deg" />
      <Corner bottom="8px" left="8px" rotate="270deg" />

      <EdgeAccent top="9px" left="50%" transform="translateX(-50%)" width="74px" />
      <EdgeAccent bottom="9px" left="50%" transform="translateX(-50%)" width="34px" />
      <EdgeAccent top="9px" left="18px" width="48px" />
      <EdgeAccent top="9px" right="18px" width="48px" />
      <EdgeAccent bottom="9px" left="18px" width="48px" />
      <EdgeAccent bottom="9px" right="18px" width="48px" />
    </>
  );
}

function Corner({ top, right, bottom, left, rotate }) {
  return (
    <div
      style={{
        position: 'absolute',
        top,
        right,
        bottom,
        left,
        width: '36px',
        height: '36px',
        transform: `rotate(${rotate})`,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '30px',
          height: '2px',
          background: 'linear-gradient(90deg, rgba(212,175,82,0.98), rgba(212,175,82,0.12))',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '2px',
          height: '30px',
          background: 'linear-gradient(180deg, rgba(212,175,82,0.98), rgba(212,175,82,0.12))',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '1px',
          left: '1px',
          width: '12px',
          height: '12px',
          borderTop: '1px solid rgba(212,175,82,0.6)',
          borderLeft: '1px solid rgba(212,175,82,0.6)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '-2px',
          left: '-2px',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          border: '2px solid rgba(212,175,82,0.9)',
          boxSizing: 'border-box',
        }}
      />
    </div>
  );
}

function EdgeAccent({ top, right, bottom, left, width, transform }) {
  return (
    <div
      style={{
        position: 'absolute',
        top,
        right,
        bottom,
        left,
        width,
        height: '3px',
        background: 'linear-gradient(90deg, rgba(110,76,25,0), rgba(212,175,82,0.95), rgba(110,76,25,0))',
        transform,
        pointerEvents: 'none',
      }}
    />
  );
}

function UploadPlaceholder() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '288px',
          width: '156px',
          height: '118px',
          borderRadius: '18px',
          border: '1px solid rgba(165,118,41,0.58)',
          background: 'linear-gradient(180deg, rgba(20,9,4,0.6) 0%, rgba(13,6,3,0.36) 100%)',
          boxShadow: 'inset 0 0 0 1px rgba(255,224,154,0.06), 0 12px 20px rgba(0,0,0,0.18)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '74px',
            height: '88px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.34,
            filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.45))',
          }}
        >
          <div
            style={{
              width: '74px',
              height: '88px',
              background: 'linear-gradient(180deg, rgba(104,111,120,0.42) 0%, rgba(50,58,68,0.32) 60%, rgba(25,30,38,0.2) 100%)',
              clipPath: 'polygon(50% 0%, 78% 10%, 100% 46%, 50% 100%, 0% 46%, 22% 10%)',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(140deg, rgba(255,255,255,0.12) 0%, transparent 33%), linear-gradient(220deg, rgba(255,255,255,0.08) 0%, transparent 30%)',
                clipPath: 'polygon(50% 0%, 78% 10%, 100% 46%, 50% 100%, 0% 46%, 22% 10%)',
              }}
            />
          </div>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          top: '415px',
          fontFamily: CINZEL_STACK,
          fontSize: '7.9px',
          letterSpacing: '0.19em',
          color: 'rgba(168,133,66,0.42)',
          textTransform: 'uppercase',
        }}
      >
        Upload Jewellery Photo
      </div>
    </div>
  );
}

function RatesPanel({ rates }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: '28px',
        right: '28px',
        bottom: '60px',
        height: '138px',
        borderRadius: '17px',
        background: PANEL_BG,
        border: '1px solid rgba(152,113,37,0.88)',
        boxShadow: '0 0 0 2px rgba(206,175,88,0.72), 0 14px 28px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,232,165,0.14)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          height: '39px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '18px',
          borderBottom: `1px solid ${LINE_GOLD}`,
          color: '#e4c471',
        }}
      >
        <span style={{ fontSize: '14px', opacity: 0.7 }}>✷</span>
        <span
          style={{
            fontFamily: CINZEL_STACK,
            fontSize: '14px',
            fontWeight: 700,
            letterSpacing: '0.22em',
            color: '#f1d495',
          }}
        >
          TODAY&apos;S RATE
        </span>
        <span style={{ fontSize: '14px', opacity: 0.7 }}>✷</span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          height: 'calc(100% - 39px)',
        }}
      >
        {rateColumns.map((column, index) => (
          <RateCol
            key={column.key}
            {...column}
            value={rates[column.key]}
            showDivider={index < rateColumns.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

function RateCol({ tamil, sub, badge, value, showDivider }) {
  const formattedValue = formatCurrency(value);

  return (
    <div
      style={{
        position: 'relative',
        padding: '10px 8px 10px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {showDivider && (
        <div
          style={{
            position: 'absolute',
            top: '10px',
            right: 0,
            bottom: '12px',
            width: '1px',
            background:
              'linear-gradient(180deg, rgba(166,124,50,0), rgba(166,124,50,0.6) 20%, rgba(166,124,50,0.6) 80%, rgba(166,124,50,0))',
          }}
        />
      )}

      <div
        style={{
          fontFamily: TAMIL_STACK,
          fontSize: '11.2px',
          fontWeight: 800,
          color: '#dfc069',
          marginBottom: '4px',
          lineHeight: 1.1,
          whiteSpace: 'nowrap',
        }}
      >
        {tamil}
      </div>

      <div
        style={{
          fontFamily: CINZEL_STACK,
          fontSize: '7.3px',
          fontWeight: 700,
          letterSpacing: '0.04em',
          color: 'rgba(204,171,99,0.82)',
          marginBottom: '7px',
          whiteSpace: 'nowrap',
        }}
      >
        {sub}
      </div>

      <div
        style={{
          minWidth: '47px',
          height: '17px',
          borderRadius: '999px',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #c19b32 0%, #fff2bf 44%, #b5881f 100%)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6), 0 2px 7px rgba(0,0,0,0.3)',
          color: '#2e1c07',
          fontFamily: CINZEL_STACK,
          fontWeight: 800,
          fontSize: '5.5px',
          letterSpacing: '0.04em',
          marginBottom: '6px',
        }}
      >
        {badge}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: '4px',
          marginTop: '2px',
          color: '#efe0bc',
          fontFamily: RATE_STACK,
          fontWeight: 700,
          letterSpacing: '0',
          lineHeight: 1,
          fontKerning: 'normal',
          fontFeatureSettings: "'kern' 1, 'liga' 1, 'lnum' 1",
          textShadow: '0 2px 8px rgba(0,0,0,0.88)',
        }}
      >
        <span
          style={{
            fontSize: '10.5px',
            lineHeight: 1,
            transform: 'translateY(-7px)',
            opacity: 0.95,
          }}
        >
          ₹
        </span>
        <span style={{ fontSize: '18.5px', lineHeight: 1 }}>{formattedValue || '—'}</span>
      </div>
    </div>
  );
}

export default PosterCanvasClone;
