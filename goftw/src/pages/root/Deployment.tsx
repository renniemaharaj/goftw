import { motion, type Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { messages, hints, formStages } from "./config";
import useNewSite, {
  type PutSitePayload,
} from "../../state/tanstack/useNewSite";

interface DeploymentProps {
  animationIntensity: number;
  setTitleText: (text: string) => void;
  newSiteRequest?: PutSitePayload;
  formStage: number;
  setFormStage: (stage: number) => void;
}

const Deployment = ({
  animationIntensity,
  setTitleText,
  newSiteRequest,
  formStage,
  setFormStage,
}: DeploymentProps) => {
  const [currentTip, setCurrentTip] = useState("");
  const [elapsedTime, setElapsedTime] = useState(0);
  const [started, setStarted] = useState(false);
  const { mutateAsync } = useNewSite();

  const item: Variants = {
    hidden: { opacity: 0, y: animationIntensity },
    show: { opacity: 1, y: 0 },
  };

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (formStage < formStages.DEPLOYING || !newSiteRequest || started) return;

    // Clear any pending debounce
    if (debounceRef.current) clearTimeout(debounceRef.current);

    // Debounce trigger (500ms for example)
    debounceRef.current = setTimeout(() => {
      setStarted(true);

      mutateAsync(newSiteRequest)
        .then((resp) => {
          console.log("Deployment success:", resp);
          setFormStage(formStages.SUCCESS);
          setTimeout(() => {
            setTitleText(`✅ ${resp.site} ready!`);
            setCurrentTip(
              "You're on your way now, we'll take you to your deployment."
            );
            setTimeout(() => {
              location.href = resp.url ?? "/";
            }, 5000);
          }, 500);
        })
        .catch((err) => {
          console.error("Deployment error:", err);
          setFormStage(formStages.FAILURE);
          setTimeout(() => {
            setTitleText("❌ Deployment failed");
            setTimeout(() => {
              location.href = "/";
            }, 5000);
          }, 500);
        });
    }, 500);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [
    formStage,
    newSiteRequest,
    started,
    mutateAsync,
    setTitleText,
    setFormStage,
  ]);

  // tips cycle every 10s
  useEffect(() => {
    if (formStage < formStages.DEPLOYING) return;

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

  // rolling deployment messages when formStage >= 4
  useEffect(() => {
    let msgIndex = 0;
    let charIndex = 0;
    let typingInterval: ReturnType<typeof setInterval>;

    const typeMessage = () => {
      if (formStage !== formStages.DEPLOYING) {
        if (typingInterval) clearInterval(typingInterval);
      }

      const current = messages[msgIndex];
      if (charIndex <= current.length && formStage === formStages.DEPLOYING) {
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
        }, 10000);
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
