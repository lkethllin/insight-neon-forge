
import React, { useState, useEffect } from 'react';
import { Brain, Zap, CheckCircle } from 'lucide-react';

interface DataUnit {
  id: string;
  type: 'code' | 'log' | 'signal' | 'token';
  content: string;
  x: number;
  y: number;
  targetCategory?: 'critical' | 'moderate' | 'okay';
  isProcessing: boolean;
  isScored: boolean;
}

const DataSortingAnimation = () => {
  const [dataUnits, setDataUnits] = useState<DataUnit[]>([]);
  const [processedCounts, setProcessedCounts] = useState({
    critical: 0,
    moderate: 0,
    okay: 0
  });
  const [isActive, setIsActive] = useState(true);

  const dataTypes = [
    { type: 'code', content: 'func()', color: 'text-cyan-400' },
    { type: 'log', content: '[ERR]', color: 'text-red-400' },
    { type: 'signal', content: '∆x', color: 'text-orange-400' },
    { type: 'token', content: 'AUTH', color: 'text-green-400' },
    { type: 'code', content: 'SQL>', color: 'text-purple-400' },
    { type: 'log', content: '[WARN]', color: 'text-yellow-400' },
    { type: 'signal', content: '⚡', color: 'text-blue-400' },
    { type: 'token', content: 'API', color: 'text-cyan-300' },
  ];

  const generateDataUnit = (): DataUnit => {
    const template = dataTypes[Math.floor(Math.random() * dataTypes.length)];
    return {
      id: Math.random().toString(36).substr(2, 9),
      type: template.type as 'code' | 'log' | 'signal' | 'token',
      content: template.content,
      x: Math.random() * 200 - 100,
      y: Math.random() * 100 + 50,
      isProcessing: false,
      isScored: false
    };
  };

  const assignCategory = (): 'critical' | 'moderate' | 'okay' => {
    const rand = Math.random();
    if (rand < 0.3) return 'critical';
    if (rand < 0.6) return 'moderate';
    return 'okay';
  };

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      const newUnit = generateDataUnit();
      setDataUnits(prev => [...prev, newUnit]);

      // Process the unit after a delay
      setTimeout(() => {
        setDataUnits(prev => prev.map(unit => 
          unit.id === newUnit.id 
            ? { ...unit, isProcessing: true }
            : unit
        ));

        // Score and categorize after processing
        setTimeout(() => {
          const category = assignCategory();
          setDataUnits(prev => prev.map(unit => 
            unit.id === newUnit.id 
              ? { ...unit, isProcessing: false, isScored: true, targetCategory: category }
              : unit
          ));

          setProcessedCounts(prev => ({
            ...prev,
            [category]: prev[category] + 1
          }));

          // Remove unit after sorting animation
          setTimeout(() => {
            setDataUnits(prev => prev.filter(unit => unit.id !== newUnit.id));
          }, 2000);

        }, 800);
      }, 300);

    }, 150);

    // Stop after 10 seconds
    setTimeout(() => {
      setIsActive(false);
      clearInterval(interval);
    }, 10000);

    return () => clearInterval(interval);
  }, [isActive]);

  const getCategoryConfig = (category: string) => {
    switch (category) {
      case 'critical':
        return { color: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500', emoji: '🔴' };
      case 'moderate':
        return { color: 'text-orange-400', bg: 'bg-orange-500/20', border: 'border-orange-500', emoji: '🟠' };
      default:
        return { color: 'text-cyan-400', bg: 'bg-cyan-500/20', border: 'border-cyan-500', emoji: '🔵' };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-6 overflow-hidden">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Brain className="w-8 h-8 text-cyan-400 animate-pulse" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            AI Analysis Engine
          </h1>
          <Zap className="w-6 h-6 text-yellow-400 animate-pulse" />
        </div>
        <p className="text-gray-400">
          Processing data streams and categorizing by priority level...
        </p>
      </div>

      {/* Main Processing Area */}
      <div className="relative">
        {/* Central AI Processing Hub */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-32 h-32 border-2 border-cyan-500 rounded-full bg-cyan-500/10 flex items-center justify-center backdrop-blur-sm">
              <Brain className="w-16 h-16 text-cyan-400 animate-pulse" />
              <div className="absolute inset-0 border-2 border-cyan-300 rounded-full animate-ping opacity-30"></div>
            </div>
            
            {/* Scanning Lines */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-40 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-ping"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center rotate-45">
              <div className="w-40 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-ping" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>
        </div>

        {/* Floating Data Units */}
        <div className="absolute inset-0 pointer-events-none">
          {dataUnits.map((unit) => (
            <div
              key={unit.id}
              className={`absolute transition-all duration-1000 ${
                unit.isProcessing 
                  ? 'scale-110 animate-pulse' 
                  : unit.isScored 
                    ? `translate-x-${unit.targetCategory === 'critical' ? '-96' : unit.targetCategory === 'moderate' ? '0' : '96'} translate-y-96 scale-75 opacity-50`
                    : ''
              }`}
              style={{
                left: `calc(50% + ${unit.x}px)`,
                top: `calc(40% + ${unit.y}px)`,
                transform: unit.isScored 
                  ? `translateX(${unit.targetCategory === 'critical' ? '-300px' : unit.targetCategory === 'moderate' ? '0px' : '300px'}) translateY(200px) scale(0.5)`
                  : `translateX(${unit.x}px) translateY(${unit.y}px)`
              }}
            >
              <div className={`
                px-3 py-1 rounded-lg border backdrop-blur-sm text-sm font-mono
                ${unit.isProcessing 
                  ? 'bg-yellow-500/30 border-yellow-400 text-yellow-300' 
                  : unit.isScored && unit.targetCategory
                    ? `${getCategoryConfig(unit.targetCategory).bg} ${getCategoryConfig(unit.targetCategory).border} ${getCategoryConfig(unit.targetCategory).color}`
                    : 'bg-gray-800/50 border-gray-600 text-gray-300'
                }
              `}>
                {unit.isProcessing && <Zap className="w-3 h-3 inline mr-1" />}
                {unit.isScored && <CheckCircle className="w-3 h-3 inline mr-1" />}
                {unit.content}
              </div>
            </div>
          ))}
        </div>

        {/* Category Columns */}
        <div className="grid grid-cols-3 gap-8 mt-16">
          {[
            { key: 'critical', label: 'Critical Issues', emoji: '🔴' },
            { key: 'moderate', label: 'Moderate Issues', emoji: '🟠' },
            { key: 'okay', label: 'Low Priority', emoji: '🔵' }
          ].map((category) => {
            const config = getCategoryConfig(category.key);
            const count = processedCounts[category.key as keyof typeof processedCounts];
            
            return (
              <div key={category.key} className={`${config.bg} ${config.border} border rounded-lg p-6 backdrop-blur-sm`}>
                <div className="text-center">
                  <div className="text-3xl mb-2">{category.emoji}</div>
                  <h3 className={`${config.color} font-semibold mb-2`}>{category.label}</h3>
                  <div className={`text-4xl font-bold ${config.color} mb-2 transition-all duration-300`}>
                    {count}
                  </div>
                  <div className="text-gray-400 text-sm">Processed</div>
                  
                  {/* Progress Bar */}
                  <div className="mt-4 bg-gray-800 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${
                        category.key === 'critical' ? 'from-red-600 to-red-400' :
                        category.key === 'moderate' ? 'from-orange-600 to-orange-400' :
                        'from-cyan-600 to-cyan-400'
                      } transition-all duration-500`}
                      style={{ width: `${Math.min(count * 10, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Status Indicator */}
        <div className="text-center mt-8">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${
            isActive 
              ? 'bg-green-500/20 border border-green-500/50 text-green-400' 
              : 'bg-gray-500/20 border border-gray-500/50 text-gray-400'
          }`}>
            <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
            <span className="text-sm font-mono">
              {isActive ? 'PROCESSING DATA STREAMS' : 'ANALYSIS COMPLETE'}
            </span>
          </div>
        </div>

        {/* Restart Button */}
        {!isActive && (
          <div className="text-center mt-4">
            <button
              onClick={() => {
                setIsActive(true);
                setProcessedCounts({ critical: 0, moderate: 0, okay: 0 });
                setDataUnits([]);
              }}
              className="px-6 py-2 bg-cyan-500/20 border border-cyan-500 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors"
            >
              Restart Analysis
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataSortingAnimation;
