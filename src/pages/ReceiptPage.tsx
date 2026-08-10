import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toPng } from 'html-to-image';
import { Download, Sparkles } from 'lucide-react';
import { ReceiptCard } from '../components/receipt/ReceiptCard';
import { Button } from '../components/ui/Button';
import { Spinner } from '../components/ui/Spinner';
import { EmptyState } from '../components/ui/EmptyState';
import { Reveal } from '../components/ui/Reveal';
import { getReceiptById, generateReceiptQrDataUrl } from '../services/receiptService';
import { useToast } from '../contexts/ToastContext';
import { ROUTES } from '../constants/routes';
import { APP_NAME } from '../constants/app';
import type { DigitalReceipt } from '../types/receipt';

export function ReceiptPage() {
  const { receiptId } = useParams<{ receiptId: string }>();
  const [receipt, setReceipt] = useState<DigitalReceipt | null | 'loading'>('loading');
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToast();

  useEffect(() => {
    if (!receiptId) return;
    const found = getReceiptById(receiptId);
    setReceipt(found);
    if (found) {
      generateReceiptQrDataUrl(found.id).then(setQrDataUrl);
    }
  }, [receiptId]);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 2, cacheBust: true });
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `${receiptId}-receipt.png`;
      link.click();
      showToast('Receipt saved to your device.', 'success');
    } catch {
      showToast("Couldn't generate the image — please try again.", 'error');
    } finally {
      setDownloading(false);
    }
  };

  if (receipt === 'loading') {
    return <Spinner label="Loading receipt…" />;
  }

  if (!receipt) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4 text-center">
        <EmptyState
          title="Receipt not found"
          description="This link may have expired, or the receipt was created on a different device. Ask the mandal collector to re-share it."
        />
        <Link to={ROUTES.home} className="mt-6 text-sm font-medium text-[var(--accent)] hover:underline">
          Go to {APP_NAME}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col items-center gap-8 px-4 py-14 sm:px-6">
      <Reveal>
        <div className="text-center">
          <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)] text-white">
            <Sparkles className="h-5 w-5" />
          </span>
          <h1 className="mt-3 text-xl font-semibold text-[var(--text-h)]">Your donation receipt</h1>
          <p className="mt-1 text-sm text-[var(--text)]">Thank you for supporting {receipt.mandalName}.</p>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <ReceiptCard ref={cardRef} receipt={receipt} qrDataUrl={qrDataUrl} />
      </Reveal>

      <Reveal delay={0.16}>
        <Button size="lg" onClick={handleDownload} isLoading={downloading}>
          <Download className="h-4 w-4" /> Download receipt
        </Button>
      </Reveal>

      <Link to={ROUTES.home} className="text-xs text-[var(--text)] hover:text-[var(--accent)]">
        Powered by {APP_NAME} — the digital receipt platform for mandals
      </Link>
    </div>
  );
}
