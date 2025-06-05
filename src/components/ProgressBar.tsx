
import React, { useEffect, useState } from 'react';

interface ProgressBarProps {
  label: string;
  value: number;
  maxValue: number;
  color: string;
  delay: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ label, value, maxValue, color, delay }) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const percentage = (value / maxValue) * 100;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-300">{label}</span>
        <span className="text-sm text-gray-400 font-mono">
          {animatedValue}/{maxValue}
        </span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
        <div 
          className={`h-full bg-gradient-to-r from-${color}-600 to-${color}-400 transition-all duration-1000 ease-out shadow-lg`}
          style={{ 
            width: `${(animatedValue / maxValue) * 100}%`,
            boxShadow: `0 0 10px ${color === 'red' ? '#ef4444' : color === 'orange' ? '#f97316' : '#06b6d4'}40`
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
