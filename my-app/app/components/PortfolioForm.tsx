import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

interface PortfolioFormProps {
  onResult: (result: any) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (err: string) => void;
}

const riskOptions = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

const PortfolioForm: React.FC<PortfolioFormProps> = ({ onResult, setLoading, setError }) => {
  const [amount, setAmount] = useState('');
  const [years, setYears] = useState('');
  const [risk, setRisk] = useState('medium');
  const [goal, setGoal] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const validate = () => {
    const errors: { [key: string]: string } = {};
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      errors.amount = 'Please enter a valid investment amount.';
    }
    if (!years || isNaN(Number(years)) || Number(years) <= 0) {
      errors.years = 'Please enter a valid time horizon in years.';
    }
    if (!goal.trim()) {
      errors.goal = 'Please enter your investment goal.';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validate();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ amount: true, years: true, goal: true });
    if (!validate()) return;
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/optimize', {
        amount: Number(amount),
        time_horizon: Number(years),
        risk_tolerance: risk,
        goal,
      });
      onResult(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto glass-card rounded-[2rem] border border-white/10 p-8 shadow-2xl shadow-slate-950/30 animate-fade-in"
    >
      <div className="mb-6 text-center">
        <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-400 to-fuchsia-500 text-slate-950 shadow-xl shadow-cyan-500/20">
          📈
        </div>
        <h2 className="mt-5 text-3xl font-bold text-white">Portfolio Optimizer</h2>
        <p className="mt-3 text-slate-400">Let AI shape your allocation with stunning visuals and actionable insight.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">Investment Amount ($)</label>
          <input
            type="number"
            className={`w-full rounded-3xl border border-slate-700/80 bg-slate-950/80 px-4 py-3 text-lg text-white shadow-inner shadow-slate-950/20 transition focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 ${
              fieldErrors.amount && touched.amount ? 'border-rose-500/80 focus:ring-rose-400/25' : ''
            }`}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="1"
            placeholder="e.g. 10,000"
            onBlur={() => handleBlur('amount')}
          />
          {fieldErrors.amount && touched.amount && <p className="mt-2 text-sm text-rose-400">{fieldErrors.amount}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">Time Horizon (years)</label>
          <input
            type="number"
            className={`w-full rounded-3xl border border-slate-700/80 bg-slate-950/80 px-4 py-3 text-lg text-white shadow-inner shadow-slate-950/20 transition focus:border-fuchsia-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/30 ${
              fieldErrors.years && touched.years ? 'border-rose-500/80 focus:ring-rose-400/25' : ''
            }`}
            value={years}
            onChange={(e) => setYears(e.target.value)}
            min="1"
            placeholder="e.g. 5"
            onBlur={() => handleBlur('years')}
          />
          {fieldErrors.years && touched.years && <p className="mt-2 text-sm text-rose-400">{fieldErrors.years}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-300 mb-2">Risk Tolerance</label>
        <div className="flex flex-wrap gap-3">
          {riskOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setRisk(opt.value)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                risk === opt.value
                  ? 'border-cyan-400 bg-cyan-400/15 text-cyan-100'
                  : 'border-slate-700/70 text-slate-300 hover:border-slate-500/90 hover:bg-slate-900/80'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-300 mb-2">Investment Goal</label>
        <textarea
          className={`w-full min-h-[120px] rounded-3xl border border-slate-700/80 bg-slate-950/80 px-4 py-3 text-lg text-white shadow-inner shadow-slate-950/20 transition focus:border-fuchsia-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/30 ${
            fieldErrors.goal && touched.goal ? 'border-rose-500/80 focus:ring-rose-400/25' : ''
          }`}
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          rows={4}
          placeholder="e.g. Save for a house, retire comfortably, or build wealth."
          onBlur={() => handleBlur('goal')}
        />
        {fieldErrors.goal && touched.goal && <p className="mt-2 text-sm text-rose-400">{fieldErrors.goal}</p>}
      </div>

      <button
        type="submit"
        className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 px-6 py-4 text-lg font-bold text-slate-950 shadow-xl shadow-cyan-500/25 transition hover:-translate-y-0.5"
      >
        Optimize portfolio
      </button>
    </form>
  );
};

export default PortfolioForm;


