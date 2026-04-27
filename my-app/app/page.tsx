'use client';
import React, { useState } from 'react';
import { HiSparkles, HiShieldCheck, HiChartPie, HiArrowRight, HiChevronLeft } from 'react-icons/hi';
import PortfolioForm from './components/PortfolioForm';
import PortfolioResults from './components/PortfolioResults';

export default function HomePage() {
  const [showDashboard, setShowDashboard] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const allocations = result?.optimized_allocations || { AAPL: 38, GOOGL: 28, TSLA: 22, BND: 12 };
  const explanation =
    result?.explanation ||
    'We allocate capital across a diversified basket of growth and stability to maximize long-term returns while keeping your risk profile balanced.';

  const handleResult = (res: any) => {
    setResult(res);
    setError(res?.explanation?.startsWith('[GPT-4 unavailable') ? res.explanation : '');
  };

  const handleLoading = (isLoading: boolean) => setLoading(isLoading);
  const handleError = (err: string) => setError(err);
  const handleReoptimize = () => setResult(null);
  const handleGoToDashboard = () => setShowDashboard(true);
  const handleBackToLanding = () => {
    setShowDashboard(false);
    setResult(null);
    setError('');
    setLoading(false);
  };

  if (!showDashboard) {
    return (
      <main className="min-h-screen relative overflow-hidden px-6 py-10 lg:px-12">
        <div className="hero-blob w-72 h-72 bg-cyan-500/20 left-4 top-12" />
        <div className="hero-blob w-96 h-96 bg-fuchsia-500/18 right-8 top-24" />
        <div className="hero-blob w-80 h-80 bg-sky-500/20 left-1/2 top-64" />

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-10">
          <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-800/80 px-4 py-2 text-sm text-cyan-200 shadow-sm ring-1 ring-cyan-300/20">
                <HiSparkles className="h-5 w-5 text-cyan-300" />
                Pure investment clarity
              </div>
              <div className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                Plan your portfolio with AI insights and modern motion.
              </div>
            </div>

            <button
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-xl shadow-cyan-500/20 transition hover:-translate-y-0.5 hover:shadow-cyan-500/40"
              onClick={handleGoToDashboard}
            >
              Launch Studio
              <HiArrowRight className="h-5 w-5" />
            </button>
          </header>

          <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="glass-card border-slate-200/10 p-8 shadow-2xl shadow-slate-950/40">
              <p className="text-lg text-slate-300">
                Bring clarity to your investments with a dashboard that feels alive. Smooth motion, vivid color palettes, and AI guidance make every decision feel powerful.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  { title: 'Smart Allocation', value: '94%', description: 'AI-backed recommendations.' },
                  { title: 'Fast Insights', value: 'Instant', description: 'Immediate performance signals.' },
                  { title: 'Design Ready', value: '3x', description: 'Styled tripled with custom visuals.' },
                ].map((item) => (
                  <div key={item.title} className="feature-card rounded-3xl p-5 shadow-lg shadow-slate-950/20 transition hover:-translate-y-1 hover:bg-slate-900/90">
                    <div className="text-sm uppercase tracking-[0.24em] text-cyan-200">{item.title}</div>
                    <div className="mt-3 text-3xl font-semibold text-white">{item.value}</div>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-[2rem] p-8 shadow-2xl shadow-slate-950/30 border border-white/10">
              <div className="flex items-center gap-3 text-slate-200">
                <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 to-fuchsia-500 text-slate-950 shadow-lg shadow-cyan-500/20">
                  <HiChartPie className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Your first look</p>
                  <h3 className="text-2xl font-semibold text-white">Interactive portfolio preview</h3>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                <div className="rounded-3xl bg-slate-950/70 p-4">
                  <div className="flex items-center justify-between text-sm text-slate-400">
                    <span>Projected growth</span>
                    <span>+18.4%</span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
                    <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500" style={{ width: '72%' }} />
                  </div>
                </div>
                <div className="rounded-3xl bg-slate-950/70 p-4">
                  <div className="flex items-center justify-between text-sm text-slate-400">
                    <span>Risk balance</span>
                    <span>Medium</span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
                    <div className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400" style={{ width: '54%' }} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'AI Portfolio Lab',
                copy: 'Adjust goals and risk with beautifully designed input flows.',
              },
              {
                title: 'Dynamic Visuals',
                copy: 'Track allocations with charts, bars, and shimmer motion.',
              },
              {
                title: 'Goal-Driven Strategy',
                copy: 'Align every recommendation with your plan and timeline.',
              },
            ].map((item) => (
              <article key={item.title} className="feature-card rounded-3xl p-6 shadow-xl shadow-slate-950/25 transition hover:-translate-y-1">
                <h4 className="text-lg font-semibold text-white">{item.title}</h4>
                <p className="mt-3 text-slate-400">{item.copy}</p>
              </article>
            ))}
          </section>

          <section className="glass-card rounded-[2rem] p-8 shadow-2xl shadow-slate-950/30 border border-white/10">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">More than a screen</p>
                <h3 className="mt-3 text-3xl font-bold text-white">An immersive investment experience for modern goals.</h3>
              </div>
              <button
                className="inline-flex items-center gap-2 rounded-full bg-slate-900/90 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/20 ring-1 ring-white/10 transition hover:bg-slate-800"
                onClick={handleGoToDashboard}
              >
                Start building
                <HiArrowRight className="h-5 w-5" />
              </button>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen relative overflow-hidden px-6 py-10 lg:px-12">
      <div className="hero-blob w-80 h-80 bg-cyan-500/18 left-10 top-24" />
      <div className="hero-blob w-96 h-96 bg-fuchsia-500/18 right-16 top-8" />
      <div className="hero-blob w-72 h-72 bg-sky-500/18 left-1/2 top-72" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-8">
        <header className="flex flex-col gap-5 rounded-[2rem] bg-slate-950/75 p-6 shadow-2xl shadow-slate-950/40 ring-1 ring-white/10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <button
              className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/90 px-4 py-2 text-sm text-slate-200 shadow-sm transition hover:bg-slate-800"
              onClick={handleBackToLanding}
            >
              <HiChevronLeft className="h-4 w-4" /> Back to Landing
            </button>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
              Portfolio Allocation Dashboard
            </h1>
            <p className="mt-3 max-w-2xl text-slate-400">
              Create, refine, and visualize your portfolio with glowing charts, smart recommendations, and a design system built for modern investing.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="rounded-3xl bg-slate-900/85 px-5 py-4 text-center shadow-lg shadow-slate-950/20">
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Projected</p>
              <p className="mt-2 text-2xl font-semibold text-white">18.4%</p>
            </div>
            <div className="rounded-3xl bg-slate-900/85 px-5 py-4 text-center shadow-lg shadow-slate-950/20">
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Confidence</p>
              <p className="mt-2 text-2xl font-semibold text-white">94%</p>
            </div>
          </div>
        </header>

        <section className="grid gap-8 xl:grid-cols-[1.3fr_0.7fr]">
          <div className="glass-card rounded-[2rem] border border-white/10 p-8 shadow-2xl shadow-slate-950/30">
            <div className="grid gap-5 md:grid-cols-2">
              {[
                { label: 'Projected growth', value: '+18.4%', accent: 'from-cyan-400 to-sky-400' },
                { label: 'AI confidence', value: '94%', accent: 'from-fuchsia-400 to-cyan-400' },
                { label: 'Risk balance', value: 'Medium', accent: 'from-slate-500 to-slate-400' },
                { label: 'Diversified', value: '4 assets', accent: 'from-purple-500 to-indigo-500' },
              ].map((item) => (
                <div key={item.label} className="rounded-3xl bg-slate-950/80 p-6 shadow-inner shadow-slate-950/10">
                  <p className="text-sm uppercase tracking-[0.22em] text-slate-400">{item.label}</p>
                  <p className="mt-4 text-3xl font-semibold text-white">{item.value}</p>
                  <div className={`mt-5 h-2 overflow-hidden rounded-full bg-slate-900`}>
                    <div className={`h-full rounded-full bg-gradient-to-r ${item.accent}`} style={{ width: '76%' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="glass-card rounded-[2rem] border border-white/10 p-8 shadow-2xl shadow-slate-950/30">
            <div className="flex items-center gap-3 text-white">
              <HiShieldCheck className="h-7 w-7 text-cyan-300" />
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-cyan-200">Stability first</p>
                <h2 className="mt-2 text-2xl font-semibold">Goal-safe allocations</h2>
              </div>
            </div>
            <p className="mt-5 text-slate-400">
              Monitor your portfolio health, keep your target in sight, and keep your plan aligned with your timeline.
            </p>
            <div className="mt-8 space-y-4">
              {['Adaptive risk modeling', 'Live optimization preview', 'Friendly investment insights'].map((item) => (
                <div key={item} className="rounded-3xl bg-slate-950/60 p-4 text-slate-300">
                  {item}
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="glass-card rounded-[2rem] border border-white/10 p-8 shadow-2xl shadow-slate-950/30">
            {!result && (
              <PortfolioForm onResult={handleResult} setLoading={handleLoading} setError={handleError} />
            )}
            {loading && (
              <div className="flex flex-col items-center justify-center gap-4 py-16 text-slate-200">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-cyan-400" />
                <span className="text-lg">Optimizing your portfolio...</span>
              </div>
            )}
            {result && !loading && (
              <div className="space-y-8">
                <PortfolioResults allocations={allocations} explanation={explanation} error={error} />
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="rounded-3xl bg-slate-950/80 p-5 text-slate-300">
                    <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Next step</p>
                    <p className="mt-2 text-base text-white">Refine your target and run another optimization to compare scenarios.</p>
                  </div>
                  <button
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-xl shadow-cyan-500/20 transition hover:-translate-y-0.5"
                    onClick={handleReoptimize}
                  >
                    Re-optimize portfolio
                    <HiArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}
            {error && !loading && (
              <div className="rounded-3xl bg-rose-500/10 border border-rose-500/20 p-4 text-rose-200">
                {error}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <div className="glass-card rounded-[2rem] border border-white/10 p-8 shadow-2xl shadow-slate-950/30">
              <h3 className="text-xl font-semibold text-white">Why Nebula Invest?</h3>
              <ul className="mt-5 space-y-4 text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-300">✓</span>
                  <span>Modern UI with animated panels and charts.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-fuchsia-500/15 text-fuchsia-300">✓</span>
                  <span>Clear recommendations and rich portfolio insights.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-sky-500/15 text-sky-300">✓</span>
                  <span>Design-forward experience with clean modern visuals.</span>
                </li>
              </ul>
            </div>

            <div className="glass-card rounded-[2rem] border border-white/10 p-8 shadow-2xl shadow-slate-950/30">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-3xl bg-gradient-to-br from-cyan-400 to-fuchsia-500 flex items-center justify-center text-slate-950 shadow-lg shadow-cyan-500/20">
                  <HiSparkles className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-cyan-200">Design Focus</p>
                  <h4 className="mt-2 text-xl font-semibold text-white">Visual storytelling for finance.</h4>
                </div>
              </div>
              <p className="mt-5 text-slate-400">
                Smooth gradients, soft glass layers, and subtle motion give your investing workflow an elegant, professional appearance.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
