import { motion } from "framer-motion";
import { useInView } from "../../state/useInView";

const Footer = () => {
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center text-gray-500 py-10"
      >
        <p>© {new Date().getFullYear()} Don't Sue Us. All rights reserved.</p>
      </motion.div>
  );
};

export default Footer;
