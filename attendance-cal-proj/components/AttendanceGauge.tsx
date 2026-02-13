import React from 'react';

interface AttendanceGaugeProps {
  percentage: number;
}

const AttendanceGauge: React.FC<AttendanceGaugeProps> = ({ percentage }) => {
  // Reduced size for side-by-side layout compatibility
  const radius = 55; 
  const strokeWidth = 5; 
  const size = 130; 
  const center = size / 2;
  
  const circumference = 2 * Math.PI * radius;
  const visualPercentage = Math.min(Math.max(percentage, 0), 100);
  const strokeDashoffset = circumference - (visualPercentage / 100) * circumference;
  
  const isSafe = percentage > 75;
  
  // Sky 500 (#0ea5e9) for Safe, Red 500 (#ef4444) for Danger
  const strokeColor = isSafe ? '#0ea5e9' : '#ef4444'; 
  const textColor = isSafe ? 'text-sky-600' : 'text-red-500';

  return (
    <div className="relative flex items-center justify-center">
      <svg className="transform -rotate-90" width={size} height={size}>
        {/* Background Track - Very subtle slate */}
        <circle
          className="text-slate-100"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={center}
          cy={center}
        />
        
        {/* Progress Arc */}
        <circle
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={center}
          cy={center}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      
      {/* Center Text */}
      <div className="absolute flex flex-col items-center">
        <span className={`text-2xl font-medium ${textColor} transition-colors duration-300 tracking-tight`}>
          {percentage.toFixed(2)}%
        </span>
        <span className="text-[10px] mt-0.5 uppercase tracking-widest font-semibold text-slate-400">
          Attendance
        </span>
      </div>
    </div>
  );
};

export default AttendanceGauge;