import { useEffect, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Apps from "./Apps";
import Services from "./Services";
import Footer from "./root/FooterSection";
import { useInView } from "../state/useInView";
import Header from "./Header";
import { Section } from "@radix-ui/themes";

const Layout = ({ children }: { children: ReactNode }) => {
  const [headerTitle, setHeaderTitle] = useState("Frappe Deployments");
  const { ref, isInView } = useInView<HTMLDivElement>();

  useEffect(() => {
    if (isInView) setHeaderTitle("Frappe Deployments");
  }, [isInView]);

  return (
    <>
      {/** Header */}
       <Header show={!isInView} title={headerTitle ?? "Frappe Deployments"} />

      {/* Animated children */}
      <AnimatePresence>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -100 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
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

      {/* Apps sections */}
      <Section>
        <Apps setHeaderTitle={setHeaderTitle} />
      </Section>

      {/* Services sections */}
      <Section>
        <Services setHeaderTitle={setHeaderTitle} />
      </Section>

      <Section>
        <Footer />
      </Section>
    </>
  );
};

export default Layout;
