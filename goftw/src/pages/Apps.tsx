import { motion } from "framer-motion";
import { useInView } from "../state/useInView";
import useQueryApps from "../state/tanstack/useQueryApps";
import React, { useEffect } from "react";
import App from "./App";

const Apps = ({ setHeaderTitle }: { setHeaderTitle: (t: string) => void }) => {
  const { data: apps } = useQueryApps();
  const { ref, isInView } = useInView<HTMLDivElement>();

  useEffect(() => {
    if (isInView) setHeaderTitle("Applications");
  }, [isInView, setHeaderTitle]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -100 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-2 gap-4 place-items-center"
    >
      {apps
        ? apps.map((a, i) => (
            <React.Fragment key={i}>
              <App app={a} />
            </React.Fragment>
          ))
        : Array.from({ length: 10 }).map((_, i) => (
            <React.Fragment key={i}>
              <App />
            </React.Fragment>
          ))}
    </motion.div>
  );
};

export default Apps;
