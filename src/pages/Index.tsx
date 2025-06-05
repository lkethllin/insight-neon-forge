import React, { useState, useEffect } from 'react';
import IssueCard from '../components/IssueCard';
import ScoreCard from '../components/ScoreCard';
import ProgressBar from '../components/ProgressBar';

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [displayedIssues, setDisplayedIssues] = useState<any[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  const mockIssues = [
    { id: '1', title: 'SQL Injection Vulnerability', description: 'Unsanitized user input in database query', priority: 'critical', score: 95, category: 'Security', source: '/api/users.js:42' },
    { id: '2', title: 'Memory Leak Detected', description: 'Unreleased event listeners in component lifecycle', priority: 'critical', score: 88, category: 'Performance', source: '/components/Chart.tsx:156' },
    { id: '3', title: 'Cross-Site Scripting (XSS)', description: 'Unescaped user content in template rendering', priority: 'critical', score: 92, category: 'Security', source: '/views/profile.html:28' },
    { id: '4', title: 'Deprecated API Usage', description: 'Using obsolete authentication method', priority: 'moderate', score: 65, category: 'Compatibility', source: '/auth/legacy.js:89' },
    { id: '5', title: 'Unused CSS Rules', description: 'Dead styles increasing bundle size', priority: 'low', score: 35, category: 'Optimization', source: '/styles/components.css:245' },
    { id: '6', title: 'Missing Error Handling', description: 'Unhandled promise rejection in async function', priority: 'moderate', score: 72, category: 'Reliability', source: '/utils/api.js:67' },
    { id: '7', title: 'Hardcoded Credentials', description: 'API keys found in source code', priority: 'critical', score: 98, category: 'Security', source: '/config/database.js:12' },
    { id: '8', title: 'Slow Database Query', description: 'Missing index causing performance degradation', priority: 'moderate', score: 58, category: 'Performance', source: '/models/User.js:134' },
    { id: '9', title: 'Accessibility Issue', description: 'Missing alt text for images', priority: 'low', score: 28, category: 'Accessibility', source: '/components/Gallery.tsx:45' },
    { id: '10', title: 'Large Bundle Size', description: 'Unnecessary library imports detected', priority: 'moderate', score: 63, category: 'Performance', source: 'webpack.config.js:78' },
    { id: '11', title: 'Code Duplication', description: 'Identical logic found in multiple files', priority: 'low', score: 42, category: 'Maintainability', source: '/utils/validation.js:23' },
    { id: '12', title: 'Insecure HTTP Headers', description: 'Missing security headers in response', priority: 'moderate', score: 75, category: 'Security', source: '/server/middleware.js:34' }
  ];

  const criticalCount = mockIssues.filter(issue => issue.priority === 'critical').length;
  const moderateCount = mockIssues.filter(issue => issue.priority === 'moderate').length;
  const lowCount = mockIssues.filter(issue => issue.priority === 'low').length;

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentStep < mockIssues.length) {
        setDisplayedIssues(prev => [...prev, mockIssues[currentStep]]);
        setCurrentStep(prev => prev + 1);
      } else {
        setIsAnalyzing(false);
        clearInterval(interval);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [currentStep, mockIssues.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-6">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            AI Security Analyzer
          </h1>
          <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
        </div>
        <p className="text-gray-400 text-lg">
          {isAnalyzing ? 'Scanning codebase and analyzing security vulnerabilities...' : 'Analysis Complete'}
        </p>
      </div>

      {/* Terminal Header */}
      <div className="bg-gray-900/50 border border-gray-700 rounded-t-lg p-3 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="ml-4 text-gray-400 text-sm font-mono">
            AI-Analyzer v2.1.3 - Real-time Issue Detection
          </span>
          {isAnalyzing && (
            <div className="ml-auto flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="text-cyan-400 text-xs">ANALYZING</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Issues Panel */}
        <div className="lg:col-span-2">
          <div className="bg-gray-900/30 border-x border-b border-gray-700 rounded-b-lg p-6 backdrop-blur-sm min-h-[600px]">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-cyan-400 mb-2">Detected Issues</h2>
              <div className="h-px bg-gradient-to-r from-cyan-500/50 via-blue-500/50 to-transparent"></div>
            </div>
            
            <div className="space-y-2 max-h-[500px] overflow-y-auto custom-scrollbar">
              {displayedIssues.map((issue, index) => (
                <IssueCard 
                  key={issue.id} 
                  issue={issue} 
                  delay={index * 100}
                />
              ))}
              
              {isAnalyzing && (
                <div className="flex items-center gap-3 p-4 text-gray-400">
                  <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                  <span className="font-mono text-sm">Scanning additional sources...</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Analytics Panel */}
        <div className="space-y-6">
          {/* Score Cards */}
          <div className="grid grid-cols-1 gap-4">
            <ScoreCard 
              title="Critical Issues" 
              value={criticalCount} 
              total={mockIssues.length}
              color="red"
              delay={1000}
            />
            <ScoreCard 
              title="Moderate Issues" 
              value={moderateCount} 
              total={mockIssues.length}
              color="orange"
              delay={1200}
            />
            <ScoreCard 
              title="Low Priority" 
              value={lowCount} 
              total={mockIssues.length}
              color="cyan"
              delay={1400}
            />
          </div>

          {/* Progress Analysis */}
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-cyan-400 mb-4">Analysis Progress</h3>
            
            <ProgressBar 
              label="Security Scan"
              value={criticalCount + moderateCount}
              maxValue={10}
              color="red"
              delay={1600}
            />
            
            <ProgressBar 
              label="Performance Check"
              value={8}
              maxValue={10}
              color="orange"
              delay={1800}
            />
            
            <ProgressBar 
              label="Code Quality"
              value={7}
              maxValue={10}
              color="cyan"
              delay={2000}
            />

            {!isAnalyzing && (
              <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-cyan-400 font-semibold text-sm">Analysis Complete</span>
                </div>
                <p className="text-gray-300 text-xs">
                  Ready for review and remediation planning
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Index;
