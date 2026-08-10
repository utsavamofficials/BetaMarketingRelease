import type { PaymentMode } from '../types/donation';
import { generateId } from '../utils/ids';

export interface PaymentRequest {
  amount: number;
  mode: PaymentMode;
  isDemo: boolean;
}

export interface PaymentResult {
  success: boolean;
  paymentRef: string | null;
  message: string;
}

/**
 * Payment gateway adapter.
 *
 * This beta ships only the mocked/sandboxed path required by Demo Mode
 * (Section 6). The Collector "live" flow (Section 4.2, 11) is wired through
 * this same interface so a real gateway (Razorpay/Cashfree, etc.) can be
 * dropped in later behind `runPayment` without touching UI code — that
 * integration needs backend order-creation + webhook verification and is
 * out of scope for a static frontend beta.
 */
export async function runPayment({ amount, mode, isDemo }: PaymentRequest): Promise<PaymentResult> {
  // Simulate realistic gateway latency so the UI's loading state is meaningful.
  await new Promise((resolve) => setTimeout(resolve, 1400 + Math.random() * 600));

  if (amount <= 0) {
    return { success: false, paymentRef: null, message: 'Invalid amount.' };
  }

  // Demo mode never fails, by design (Section 6: zero-friction walkthrough).
  const success = isDemo ? true : Math.random() > 0.06;

  if (!success) {
    return {
      success: false,
      paymentRef: null,
      message: 'Payment could not be confirmed. Please try again.',
    };
  }

  return {
    success: true,
    paymentRef: generateId(isDemo ? 'DEMO-PAY' : `PAY-${mode.toUpperCase()}`),
    message: 'Payment confirmed.',
  };
}
