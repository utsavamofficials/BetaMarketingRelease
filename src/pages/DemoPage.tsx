import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { BarChart3, MessageSquareHeart, PlayCircle, RotateCcw, Sparkles } from 'lucide-react';
import { CollectorFlow } from '../features/collector/CollectorFlow';
import { CollectionSummary } from '../features/organizer/CollectionSummary';
import { FeedbackForm } from '../features/feedback/FeedbackForm';
import { DemoBanner } from '../features/demo/DemoBanner';
import { seedOrLoadDemo } from '../features/demo/seedDemoData';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Reveal } from '../components/ui/Reveal';
import { clearDemoData } from '../services/storageService';
import { ROUTES } from '../constants/routes';
import { APP_NAME } from '../constants/app';
import type { OrganizerProfile } from '../types/user';
import type { MandalEvent } from '../types/event';
import type { CollectorProfile } from '../types/user';

type DemoSeed = { organizer: OrganizerProfile; event: MandalEvent; collector: CollectorProfile };

export function DemoPage() {
  const [seed, setSeed] = useState<DemoSeed | null>(null);
  const [receiptIssued, setReceiptIssued] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleStart = () => {
    setSeed(seedOrLoadDemo());
  };

  const handleExit = () => {
    clearDemoData();
    setSeed(null);
    setReceiptIssued(false);
  };

  if (!seed) {
    return (
      <div className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center gap-6 px-4 py-16 text-center">
        <Reveal>
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent)] text-white">
            <Sparkles className="h-7 w-7" />
          </span>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="text-3xl font-medium tracking-tight text-[var(--text-h)]">Try {APP_NAME} for free</h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-sm text-[var(--text)]">
            Walk through the full Organizer → Collector → Receipt flow with a sample mandal. Mocked payment,
            no signup, nothing real is charged or saved.
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <Button size="lg" onClick={handleStart}>
            <PlayCircle className="h-5 w-5" /> Start the demo
          </Button>
        </Reveal>
        <Reveal delay={0.2}>
          <Link to={ROUTES.home} className="text-xs text-[var(--text)] hover:text-[var(--accent)]">
            ← Back to {APP_NAME}
          </Link>
        </Reveal>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DemoBanner />

      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col px-4 py-8 sm:px-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-[var(--text)]">Demo collector</p>
            <h1 className="text-lg font-semibold text-[var(--text-h)]">{seed.event.eventName}</h1>
          </div>
          <button onClick={handleExit} className="flex items-center gap-1.5 text-sm text-[var(--text)] hover:text-rose-600">
            <RotateCcw className="h-4 w-4" /> Restart
          </button>
        </div>

        <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg)] p-6 shadow-[var(--shadow)] sm:p-8">
          <CollectorFlow
            collector={seed.collector}
            event={seed.event}
            isDemo
            onReceiptIssued={() => setReceiptIssued(true)}
          />
        </div>

        <AnimatePresence>
          {receiptIssued && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6 flex flex-col gap-3 rounded-2xl border border-[var(--accent-border)] bg-[var(--accent-bg)] p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-sm font-semibold text-[var(--text-h)]">Nice — that's the whole flow.</p>
                <p className="text-xs text-[var(--text)]">Curious what the Organizer sees, or ready to tell us what you thought?</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <Button size="sm" variant="outline" onClick={() => setShowSummary(true)}>
                  <BarChart3 className="h-4 w-4" /> Organizer view
                </Button>
                <Button size="sm" onClick={() => setShowFeedback(true)}>
                  <MessageSquareHeart className="h-4 w-4" /> Feedback
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-10 rounded-2xl border border-dashed border-[var(--border)] p-5 text-center">
          <p className="text-sm text-[var(--text)]">Convinced? Registering takes about a minute.</p>
          <Link to={ROUTES.organizerRegister}>
            <Button size="sm" className="mt-3">
              Register your mandal
            </Button>
          </Link>
        </div>
      </div>

      <Modal open={showSummary} onClose={() => setShowSummary(false)} title="Organizer view (demo data)" size="lg">
        <CollectionSummary isDemo />
      </Modal>

      <Modal open={showFeedback} onClose={() => setShowFeedback(false)} title="How was the demo?">
        <FeedbackForm onDone={() => setShowFeedback(false)} />
      </Modal>
    </div>
  );
}
