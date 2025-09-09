import { motion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { messages, hints } from "./config";

interface DeploymentProps {
  animationIntensity: number;
  setTitleText: (text: string)=>void
  formStage: number;
}

const Deployment = ({
  animationIntensity,
  setTitleText,
  formStage,
}: DeploymentProps) => {
  const [currentTip, setCurrentTip] = useState("");
  const [elapsedTime, setElapsedTime] = useState(0);

  const item: Variants = {
    hidden: { opacity: 0, y: animationIntensity },
    show: { opacity: 1, y: 0 },
  };

  // tips cycle every 10s
  useEffect(() => {
    if (formStage !== 4) return;

    let tipIndex = 0;
    setCurrentTip(hints[tipIndex]);

    const tipInterval = setInterval(() => {
      tipIndex = (tipIndex + 1) % hints.length;
      setCurrentTip(hints[tipIndex]);
    }, 10000);

    return () => clearInterval(tipInterval);
  }, [formStage]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

    // rolling deployment messages when formStage >=4
  useEffect(() => {
    if (formStage !== 4) return;

    let msgIndex = 0;
    let charIndex = 0;
    let typingInterval: ReturnType<typeof setInterval>;

    const typeMessage = () => {
      const current = messages[msgIndex];
      if (charIndex <= current.length) {
        setTitleText(current.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          msgIndex++;
          if (msgIndex < messages.length) {
            charIndex = 0;
            typingInterval = setInterval(typeMessage, 80);
          }
        }, 5000);
      }
    };

    typingInterval = setInterval(typeMessage, 80);

    // timer
    const timer = setInterval(() => {
      setElapsedTime((t) => t + 1);
    }, 1000);

    return () => {
      clearInterval(typingInterval);
      clearInterval(timer);
    };
  }, [formStage, setTitleText]);

  return (
    <motion.div
      className="space-y-3 flex flex-col items-center justify-center"
      variants={item}
      initial="hidden"
      animate="show"
      transition={{ type: "spring", stiffness: 80, damping: 18 }}
    >
      <p className="text-lg text-muted-foreground">{currentTip}</p>
      <p className="text-sm font-mono text-muted-foreground">
        Elapsed time: {formatTime(elapsedTime)}
      </p>
    </motion.div>
  );
};

export default Deployment;
