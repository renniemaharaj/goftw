import { Card, Section } from "@radix-ui/themes";
import { motion } from "framer-motion";
import { useInView } from "../state/useInView";
import useQueryApps from "../state/tanstack/useQueryApps";

const Apps = () => {
  const { data: apps } = useQueryApps();
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <Section>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-3 gap-4"
      >
        {apps?.map((app) => (
          <Card>
            <div key={app.name} className="p-4 rounded-lg shadow-md">
              {/* <img src={app.asset} alt={app.name} className="h-12 mb-2" /> */}
              <h3 className="font-semibold">{app.name.toUpperCase()}</h3>
              <p className="text-sm text-gray-500">{app.description}</p>
            </div>
          </Card>
        ))}
      </motion.div>
    </Section>
  );
};

export default Apps;
