import { useEffect, useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { Copy, Download, PlusCircle, Share2 } from 'lucide-react';
import { ReceiptCard } from '../../components/receipt/ReceiptCard';
import { Button } from '../../components/ui/Button';
import { generateReceiptQrDataUrl, receiptUrl } from '../../services/receiptService';
import { downloadDataUrl } from '../../utils/download';
import { useToast } from '../../contexts/ToastContext';
import type { DigitalReceipt } from '../../types/receipt';

export function ReceiptResult({ receipt, onRecordAnother }: { receipt: DigitalReceipt; onRecordAnother: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    let active = true;
    generateReceiptQrDataUrl(receipt.id).then((url) => {
      if (active) setQrDataUrl(url);
    });
    return () => {
      active = false;
    };
  }, [receipt.id]);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 2, cacheBust: true });
      downloadDataUrl(`${receipt.id}-receipt.png`, dataUrl);
      showToast('Receipt image downloaded.', 'success');
    } catch {
      showToast("Couldn't generate the image — please try again.", 'error');
    } finally {
      setDownloading(false);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(receiptUrl(receipt.id));
      showToast('Receipt link copied.', 'success');
    } catch {
      showToast('Could not copy the link automatically.', 'error');
    }
  };

  const handleShare = async () => {
    const url = receiptUrl(receipt.id);
    if (navigator.share) {
      try {
        await navigator.share({ title: `${receipt.mandalName} — Donation Receipt`, url });
        return;
      } catch {
        /* user cancelled share sheet — fall through to copy */
      }
    }
    handleCopyLink();
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <ReceiptCard ref={cardRef} receipt={receipt} qrDataUrl={qrDataUrl} />

      <div className="grid w-full max-w-md grid-cols-2 gap-3">
        <Button variant="outline" onClick={handleDownload} isLoading={downloading}>
          <Download className="h-4 w-4" /> Download
        </Button>
        <Button variant="outline" onClick={handleShare}>
          <Share2 className="h-4 w-4" /> Share
        </Button>
      </div>

      <button onClick={handleCopyLink} className="flex items-center gap-1.5 text-xs text-[var(--text)] hover:text-[var(--accent)]">
        <Copy className="h-3.5 w-3.5" /> Copy donor self-download link
      </button>

      <Button onClick={onRecordAnother} size="lg" fullWidth className="max-w-md">
        <PlusCircle className="h-4 w-4" /> Record another donation
      </Button>
    </div>
  );
}
