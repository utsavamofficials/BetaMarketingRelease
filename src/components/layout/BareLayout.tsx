import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';

/** Used for focused flows (Demo, Collector collection screen, Receipt view)
 *  where a full marketing nav/footer would distract from the task at hand. */
export function BareLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--social-bg)]">
      <motion.main
        className="flex flex-1 flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
      >
        <Outlet />
      </motion.main>
    </div>
  );
}
