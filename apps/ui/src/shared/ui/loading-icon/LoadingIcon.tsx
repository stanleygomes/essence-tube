import React from "react";

const bars = 12;
const duration = 1.2;

const LoadingIcon: React.FC<{ className?: string }> = ({ className }) => (
  <>
    <svg className={className} width="40" height="40" viewBox="0 0 40 40">
      {[...Array(bars)].map((_, i) => (
        <rect
          key={i}
          x="18"
          y="2"
          width="4"
          height="8"
          rx="2"
          fill="currentColor"
          style={{
            opacity: 0.2,
            animation: `spinner-fade ${duration}s linear infinite`,
            animationDelay: `${(duration / bars) * i}s`,
          }}
          transform={`rotate(${i * (360 / bars)} 20 20)`}
        />
      ))}
    </svg>
    <style>
      {`
        @keyframes spinner-fade {
          0% { opacity: 1; }
          39% { opacity: 0.2; }
          40% { opacity: 0.2; }
          100% { opacity: 1; }
        }
      `}
    </style>
  </>
);

export default LoadingIcon;
