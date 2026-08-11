import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, QrCode } from "lucide-react";

import { Button } from "../ui/Button";
import { ROUTES } from "../../constants/routes";
import { ReceiptMockup } from "./ReceiptMockup";
import { FlowerBurst } from "./FlowerBurst";

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,var(--accent-bg),transparent_60%)]"
      />

      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 py-20 text-center sm:px-6 lg:py-28">
        {/* Beta Badge */}
        <motion.span
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-border)] bg-[var(--accent-bg)] px-4 py-1.5 text-sm font-medium text-[var(--accent)]"
        >
          <QrCode className="h-4 w-4" />
          Now in beta for Ganesh mandals across Maharashtra
        </motion.span>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="max-w-3xl text-4xl font-medium leading-[1.08] tracking-tight text-[var(--text-h)] sm:text-6xl"
        >
          Every donation deserves a{" "}
          <span className="text-[var(--accent)]">beautiful receipt.</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-xl text-lg leading-relaxed text-[var(--text)]"
        >
          Utsavam replaces the register-and-receipt-book with a digital flow:
          your collectors record a donation, the donor gets a shareable QR
          receipt in seconds — no app, no account, no friction.
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <Link to={ROUTES.demo}>
            <Button size="lg">
              <PlayCircle className="h-5 w-5" />
              Try for Free — no signup
            </Button>
          </Link>

          <Link to={ROUTES.organizerRegister}>
            <Button size="lg" variant="outline">
              Register your mandal
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>

        {/* Receipt Preview */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.5 }}
          className="mt-6 w-full max-w-3xl"
        >
          <ReceiptMockup />
        </motion.div>
      </div>

      {/* Decorative Flower */}
      <FlowerBurst />
    </section>
  );
};

export default Hero;
