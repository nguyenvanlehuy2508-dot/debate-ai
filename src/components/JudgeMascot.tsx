"use client";

type Mood = "idle" | "thinking" | "happy" | "confused";

interface JudgeMascotProps {
  mood?: Mood;
  size?: number;
  className?: string;
}

export function JudgeMascot({ mood = "idle", size = 180, className = "" }: JudgeMascotProps) {
  const wiggleClass = mood === "thinking" ? "animate-pulse" : "";

  return (
    <div className={`relative inline-block ${className}`} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 200 220"
        className={`w-full h-full ${wiggleClass}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="bodyGrad" cx="0.5" cy="0.4">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="100%" stopColor="#fde68a" />
          </radialGradient>
          <linearGradient id="capGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1f2937" />
            <stop offset="100%" stopColor="#111827" />
          </linearGradient>
          <linearGradient id="gavelGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a16207" />
            <stop offset="100%" stopColor="#92400e" />
          </linearGradient>
        </defs>

        {mood === "thinking" && (
          <g className="animate-pulse">
            <circle cx="155" cy="45" r="3" fill="#94a3b8" opacity="0.7" />
            <circle cx="170" cy="35" r="4" fill="#94a3b8" opacity="0.7" />
            <circle cx="188" cy="22" r="6" fill="#94a3b8" opacity="0.7" />
          </g>
        )}

        {mood === "happy" && (
          <>
            <path
              d="M 30 30 L 35 45 M 27 38 L 42 35"
              stroke="#fbbf24"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M 170 30 L 165 45 M 173 38 L 158 35"
              stroke="#fbbf24"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </>
        )}

        <ellipse cx="100" cy="195" rx="55" ry="6" fill="#1f2937" opacity="0.12" />

        <path
          d="M 50 120 Q 50 180 100 185 Q 150 180 150 120 Z"
          fill="url(#bodyGrad)"
          stroke="#92400e"
          strokeWidth="2.5"
        />

        <path
          d="M 70 130 Q 100 145 130 130 L 130 175 Q 100 180 70 175 Z"
          fill="#1f2937"
        />
        <line x1="100" y1="140" x2="100" y2="178" stroke="#fbbf24" strokeWidth="1.5" />

        <circle
          cx="100"
          cy="90"
          r="48"
          fill="url(#bodyGrad)"
          stroke="#92400e"
          strokeWidth="2.5"
        />

        <polygon points="45,68 155,68 100,52" fill="url(#capGrad)" />
        <rect x="50" y="65" width="100" height="8" fill="url(#capGrad)" rx="1" />
        <circle cx="148" cy="69" r="3" fill="#fbbf24" />
        <line x1="148" y1="69" x2="160" y2="82" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
        <circle cx="161" cy="83" r="2.5" fill="#fbbf24" />

        {mood === "thinking" ? (
          <>
            <path d="M 75 92 Q 82 92 88 92" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M 112 92 Q 119 92 125 92" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </>
        ) : (
          <>
            <circle cx="82" cy="92" r="6" fill="#1f2937" />
            <circle cx="118" cy="92" r="6" fill="#1f2937" />
            {mood === "happy" ? (
              <>
                <circle cx="83.5" cy="90" r="2.5" fill="white" />
                <circle cx="119.5" cy="90" r="2.5" fill="white" />
                <circle cx="80" cy="93" r="1" fill="white" opacity="0.6" />
                <circle cx="116" cy="93" r="1" fill="white" opacity="0.6" />
              </>
            ) : (
              <>
                <circle cx="83.5" cy="90" r="2" fill="white" />
                <circle cx="119.5" cy="90" r="2" fill="white" />
              </>
            )}
          </>
        )}

        <circle cx="68" cy="105" r="5" fill="#fca5a5" opacity="0.55" />
        <circle cx="132" cy="105" r="5" fill="#fca5a5" opacity="0.55" />

        {mood === "happy" ? (
          <path
            d="M 80 110 Q 100 128 120 110"
            stroke="#1f2937"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="#fca5a5"
            fillOpacity="0.3"
          />
        ) : mood === "confused" ? (
          <path
            d="M 82 115 Q 92 110 100 115 Q 108 120 118 115"
            stroke="#1f2937"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        ) : mood === "thinking" ? (
          <line
            x1="90"
            y1="115"
            x2="110"
            y2="115"
            stroke="#1f2937"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        ) : (
          <path
            d="M 85 113 Q 100 122 115 113"
            stroke="#1f2937"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        )}

        {mood !== "thinking" && (
          <g transform={mood === "happy" ? "rotate(-25 165 155)" : "rotate(0 165 155)"}>
            <rect x="142" y="148" width="35" height="9" fill="url(#gavelGrad)" rx="2" />
            <rect x="158" y="138" width="13" height="28" fill="url(#gavelGrad)" rx="2" />
            <rect x="160" y="140" width="3" height="24" fill="#fef3c7" opacity="0.3" />
          </g>
        )}
      </svg>
    </div>
  );
}
