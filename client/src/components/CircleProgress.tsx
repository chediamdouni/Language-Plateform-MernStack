import React from 'react';

interface CircleProgressProps {
  percentage: number;
  strokeWidth: number;
  primaryColor: string | string[];
  secondaryColor: string;
  size: number;
}

export const CircleProgress: React.FC<CircleProgressProps> = ({
  percentage,
  strokeWidth,
  primaryColor,
  secondaryColor,
  size,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={secondaryColor}
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={typeof primaryColor === 'string' ? primaryColor : `url(#gradient)`}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      {typeof primaryColor !== 'string' && (
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={primaryColor[0]} />
            <stop offset="100%" stopColor={primaryColor[1]} />
          </linearGradient>
        </defs>
      )}
    </svg>
  );
};
