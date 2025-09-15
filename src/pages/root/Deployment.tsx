import { motion, type Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { messages, hints, formStages } from "./config";
import type { PutSitePayload } from "../../state/tanstack/types";
import useNewSite from "../../state/tanstack/useNewSite";

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
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const container: Variants = {
    hidden: { opacity: 0, y: animationIntensity },
    show: { opacity: 1, y: 0 },
  };

  // Kick off mutation once when deploying
  useEffect(() => {
    if (formStage < formStages.DEPLOYING || !newSiteRequest || started) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);

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
  }, [formStage, newSiteRequest, started, mutateAsync, setTitleText, setFormStage]);

  // Cycle tips every 10 seconds
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

  // Cycle deployment messages every 10s
  useEffect(() => {
    if (formStage !== formStages.DEPLOYING) return;

    let msgIndex = 0;
    setTitleText(messages[msgIndex]);

    const msgInterval = setInterval(() => {
      msgIndex = (msgIndex + 1) % messages.length;
      setTitleText(messages[msgIndex]);
    }, 10000);

    const timer = setInterval(() => {
      setElapsedTime((t) => t + 1);
    }, 1000);

    return () => {
      clearInterval(msgInterval);
      clearInterval(timer);
    };
  }, [formStage, setTitleText]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <motion.div
      className="space-y-3 flex flex-col items-center justify-center"
      variants={container}
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
