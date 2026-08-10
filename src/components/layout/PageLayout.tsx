import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function PageLayout() {
  const location = useLocation();
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <motion.main
        key={location.pathname}
        className="flex-1"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
      >
        <Outlet />
      </motion.main>
      <Footer />
    </div>
  );
}
