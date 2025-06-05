
import React from 'react';
import { Circle } from 'lucide-react';

interface IssueCardProps {
  issue: {
    id: string;
    title: string;
    description: string;
    priority: 'critical' | 'moderate' | 'low';
    score: number;
    category: string;
    source: string;
  };
  delay: number;
}

const IssueCard: React.FC<IssueCardProps> = ({ issue, delay }) => {
  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case 'critical':
        return {
          emoji: '🔴',
          color: 'text-red-400',
          bg: 'bg-red-500/20',
          border: 'border-red-500/50',
          glow: 'shadow-red-500/20'
        };
      case 'moderate':
        return {
          emoji: '🟠',
          color: 'text-orange-400',
          bg: 'bg-orange-500/20',
          border: 'border-orange-500/50',
          glow: 'shadow-orange-500/20'
        };
      default:
        return {
          emoji: '🟢',
          color: 'text-cyan-400',
          bg: 'bg-cyan-500/20',
          border: 'border-cyan-500/50',
          glow: 'shadow-cyan-500/20'
        };
    }
  };

  const config = getPriorityConfig(issue.priority);

  return (
    <div 
      className={`
        border rounded-lg p-3 mb-2 backdrop-blur-sm transition-all duration-500
        ${config.bg} ${config.border} ${config.glow} shadow-lg
        opacity-0 animate-fade-in transform translate-y-4
        hover:scale-[1.02] hover:shadow-xl
      `}
      style={{ 
        animationDelay: `${delay}ms`,
        animationFillMode: 'forwards'
      }}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">{config.emoji}</span>
          <span className={`text-xs uppercase tracking-wider font-bold ${config.color}`}>
            {issue.priority}
          </span>
          <div className={`px-2 py-1 rounded text-xs bg-gray-800 border border-gray-600`}>
            {issue.category}
          </div>
        </div>
        <div className={`text-sm font-mono ${config.color}`}>
          {issue.score}/100
        </div>
      </div>
      
      <h4 className="text-white font-medium mb-1 text-sm">{issue.title}</h4>
      <p className="text-gray-300 text-xs mb-2 leading-relaxed">{issue.description}</p>
      
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-400 font-mono">{issue.source}</span>
        <div className="flex items-center gap-1">
          <Circle className={`w-2 h-2 ${config.color}`} fill="currentColor" />
          <span className="text-gray-400">Analyzed</span>
        </div>
      </div>
    </div>
  );
};

export default IssueCard;
