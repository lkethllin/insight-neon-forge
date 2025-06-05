
import React from 'react';

interface ScoreCardProps {
  title: string;
  value: number;
  total: number;
  color: string;
  delay: number;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ title, value, total, color, delay }) => {
  return (
    <div 
      className={`
        bg-gray-900/80 border border-gray-700 rounded-lg p-4 backdrop-blur-sm
        opacity-0 animate-fade-in transform translate-y-4
        hover:border-${color}-500/50 transition-all duration-300
      `}
      style={{ 
        animationDelay: `${delay}ms`,
        animationFillMode: 'forwards'
      }}
    >
      <div className="text-center">
        <div className={`text-2xl font-bold text-${color}-400 mb-1`}>
          {value}
        </div>
        <div className="text-gray-400 text-xs uppercase tracking-wider mb-2">
          {title}
        </div>
        <div className="text-gray-500 text-xs">
          of {total} total
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;
