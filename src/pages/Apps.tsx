import { motion } from "framer-motion";
// import { useInView } from "../state/useInView";
import useQueryApps from "../state/tanstack/useQueryApps";
import React from "react";
import App from "./App";
import { Separator } from "@radix-ui/themes";

// eslint-disable-next-line no-empty-pattern
const Apps = ({}: { setHeaderTitle?: (t: string) => void }) => {
  const { data: apps } = useQueryApps();

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="!flex flex-row justify-center flex-wrap gap-4"
    >
      {apps
        ? apps.map((a, i) => (
            <React.Fragment key={i}>
              <App app={a} />
              {i > 0 && i % 3 === 0 && i + 1 < apps.length && (
                <Separator className="basis-[100%]" />
              )}
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
