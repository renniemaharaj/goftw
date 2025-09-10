import { Card, Section } from "@radix-ui/themes";
import { motion } from "framer-motion";
import { useInView } from "../state/useInView";

const services = [
  {
    title: "Automatic Maintenance",
    desc: "Your instances are monitored and kept healthy 24/7.",
  },
  {
    title: "Automatic Updates",
    desc: "Stay up-to-date with the latest features and security patches.",
  },
  {
    title: "Custom Integration",
    desc: "We support integrations tailored to your business needs.",
  },
  { title: "Automatic Backups", desc: "Scheduled backups with safe storage." },
  {
    title: "Reliable Service",
    desc: "Enterprise-grade uptime and scalability.",
  },
];

const Services = () => {
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <Section>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="grid md:grid-cols-3 gap-6"
      >
        {services.map((s) => (
          <Card>
            <div key={s.title} className="p-4 rounded-lg shadow-md">
              <h3 className="font-semibold">{s.title}</h3>
              <p className="text-sm text-gray-500">{s.desc}</p>
            </div>
          </Card>
        ))}
      </motion.div>
    </Section>
  );
};

export default Services;
