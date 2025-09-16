import { motion } from "framer-motion";
import { useInView } from "../state/useInView";
import { services } from "./config";
import ServiceComp from "./root/Service";
import React, { useEffect } from "react";

const Services = ({
  setHeaderTitle,
}: {
  setHeaderTitle: (t: string) => void;
}) => {
  const { ref, isInView } = useInView<HTMLDivElement>();

  useEffect(() => {
    if (isInView) setHeaderTitle("Services");
  }, [isInView, setHeaderTitle]);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="grid md:grid-cols-3 gap-6"
    >
      {services.length > 0
        ? services.map((s, i) => (
            <React.Fragment key={i}>
              <ServiceComp service={s} />
            </React.Fragment>
          ))
        : Array.from({ length: 10 }).map((_, i) => (
            <React.Fragment key={i}>
              <ServiceComp />
            </React.Fragment>
          ))}
    </motion.div>
  );
};

export default Services;
