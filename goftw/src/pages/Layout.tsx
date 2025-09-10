import type { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Apps from "./Apps";
import Services from "./Services";
import FooterSection from "./root/FooterSection";
import { useInView } from "../state/useInView";
import Header from "./Header";

const Layout = ({ children }: { children: ReactNode }) => {
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <>
    {/** Header */}
    <Header/>

      {/* Animated children */}
      <AnimatePresence>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -100 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          // animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 15,
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* Animated sections */}
      <Apps />
      <Services />
      <FooterSection />
    </>
  );
};

export default Layout;
