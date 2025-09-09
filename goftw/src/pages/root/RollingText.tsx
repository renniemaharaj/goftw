import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

const RollingText = ({ textContent }: { textContent: string }) => {
  const [animationIntensity] = useState(20);
  const [writtenText, setWrittenText] = useState("Welcome");

  const container: Variants = {
    hidden: { opacity: 0, y: 2 * animationIntensity },
    show: { opacity: 1, y: 0 },
  };

  // Typing effect
  const rollTextContent = useCallback(() => {
    let charIndex = 0;
    setWrittenText(""); // reset when starting a new text
    const typingInterval = setInterval(() => {
      if (charIndex <= textContent.length) {
        setWrittenText(textContent.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [textContent]);

  // Run typing animation when textContent changes
  useEffect(() => {
    const cleanup = rollTextContent();
    return cleanup;
  }, [rollTextContent]);

  return (
    <motion.div
      className="flex flex-col !w-full space-y-6 items-center justify-center"
      variants={container}
      initial="hidden"
      animate="show"
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.2,
      }}
    >
      <AnimatePresence mode="wait">
        <motion.h1
          key={writtenText}
          className="font-semibold tracking-tight !text-3xl"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {writtenText}
        </motion.h1>
      </AnimatePresence>
    </motion.div>
  );
};

export default RollingText;
