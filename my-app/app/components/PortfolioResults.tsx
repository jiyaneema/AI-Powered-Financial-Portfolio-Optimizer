import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { HiChevronRight } from 'react-icons/hi2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import ExplanationModal from './ExplanationModal';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PortfolioResultsProps {
  allocations: { [ticker: string]: number };
  explanation: string;
  error?: string;
}

const PortfolioResults: React.FC<PortfolioResultsProps> = ({ allocations, explanation, error }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const data = {
    labels: Object.keys(allocations),
    datasets: [
      {
        label: 'Allocation %',
        data: Object.values(allocations),
        backgroundColor: [
          '#38bdf8', '#a78bfa', '#f472b6', '#facc15', '#10b981', '#2563eb', '#ef4444', '#8b5cf6',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className="glass-card rounded-[2rem] border border-white/10 p-6 shadow-2xl shadow-slate-950/30 mt-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          <div className="lg:w-1/2">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Portfolio Allocation</p>
                <h3 className="mt-3 text-2xl font-semibold text-white">Visual breakdown</h3>
              </div>
              <div className="rounded-3xl bg-slate-900/80 px-4 py-2 text-sm text-slate-300">Total distribution</div>
            </div>
            <div className="mt-6 rounded-[2rem] bg-slate-950/80 p-5 shadow-inner shadow-slate-950/20">
              <Pie data={data} />
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="rounded-[2rem] bg-slate-950/80 p-6 shadow-inner shadow-slate-950/20">
              <h4 className="text-lg font-semibold text-white">Allocation Breakdown</h4>
              <ul className="mt-6 space-y-4">
                {Object.entries(allocations).map(([ticker, percent]) => (
                  <li key={ticker} className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-slate-300">
                      <span>{ticker}</span>
                      <span className="font-semibold text-white">{percent}%</span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-slate-900">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 transition-all duration-700"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-8 w-full inline-flex items-center justify-between rounded-full bg-gradient-to-r from-slate-800 to-slate-700 px-6 py-4 border border-slate-600/50 text-white font-semibold shadow-lg shadow-slate-950/20 transition hover:from-slate-700 hover:to-slate-600 hover:-translate-y-0.5"
              >
                <span className="flex items-center gap-2">
                  <span>✨</span> Read AI Explanation
                </span>
                <HiChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <ExplanationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        explanation={explanation}
        error={error}
      />
    </>
  );
};

export default PortfolioResults; 