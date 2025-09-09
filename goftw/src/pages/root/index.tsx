import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
import SubmitForm from "./SubmitForm";
import Deployment from "./Deployment";
import type { PutSitePayload } from "../../state/tanstack/useNewSite";
import { formStages } from "./config";

const Index = () => {
  const [animationIntensity] = useState(20);
  const [formStage, setFormStage] = useState(formStages.HOME);
  const [titleText, setTitleText] = useState("Frappe Deployment");
  const [newSiteRequest, setNewSiteRequest] = useState<PutSitePayload>();
  const container: Variants = {
    hidden: { opacity: 0, y: 2 * animationIntensity },
    show: { opacity: 1, y: 0 },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: animationIntensity },
    show: { opacity: 1, y: 0 },
  };

  // staged intro
  useEffect(() => {
    if (formStage > formStages.HOME && formStage < formStages.DEPLOYING) {
      const timers: ReturnType<typeof setTimeout>[] = [];

      timers.push(
        setTimeout(() => {
          setTitleText("Ready? Set.");
          timers.push(
            setTimeout(() => {
              if (formStage === formStages.APPS) {
                setTitleText("Select your apps.");
              } else if (formStage === formStages.SITE_NAME) {
                setTitleText("Set a name.");
              } else {
                setTitleText("Ready? Set.");
              }
            }, 500)
          );
        }, 1000)
      );

      return () => {
        timers.forEach(clearTimeout);
      };
    }
  }, [formStage, setTitleText]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-center p-6">
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
            key={titleText}
            className="font-semibold tracking-tight text-3xl"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {titleText}
          </motion.h1>
        </AnimatePresence>

        {formStage === formStages.HOME && (
          <motion.p
            className="text-lg max-w-[600px] text-muted-foreground leading-relaxed"
            variants={item}
            transition={{ type: "spring", stiffness: 80, damping: 18 }}
          >
            Set up a new site effortlessly on our fully managed frappe
            deployment, where everything is automated and all you need to do is
            say go.
          </motion.p>
        )}

        {formStage < formStages.DEPLOYING && (
          <>
            <motion.div
              variants={item}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 90, damping: 15 }}
            >
              <SubmitForm
                animationIntensity={animationIntensity}
                setFormStage={setFormStage}
                formStage={formStage}
                onSubmit={(siteName: string, apps: string[]) => {
                  setNewSiteRequest({ site: siteName, apps });
                  setFormStage(formStages.DEPLOYING);
                }}
              />
            </motion.div>
          </>
        )}

        {formStage >= formStages.DEPLOYING && (
          <Deployment
            animationIntensity={animationIntensity}
            setTitleText={setTitleText}
            setFormStage={setFormStage}
            newSiteRequest={newSiteRequest}
            formStage={formStage}
          />
        )}
      </motion.div>
    </main>
  );
};

export default Index;
