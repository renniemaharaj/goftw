import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
import SubmitForm from "./SubmitForm";
import Deployment from "./Deployment";

const Index = () => {
  const [animationIntensity] = useState(20);
  const [formStage, setFormStage] = useState(0);
  const [titleText, setTitleText] = useState("Frappe Deployment");

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
    setTimeout(() => {
      setTitleText("Ready?");
      setFormStage(1);
      setTimeout(() => {
        setTitleText("Ready? Set.");
        setFormStage(2);
      }, 500);
    }, 1000);
  }, []);


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

        {formStage < 4 && (
          <>
            <motion.p
              className="text-lg max-w-[600px] text-muted-foreground leading-relaxed"
              variants={item}
              transition={{ type: "spring", stiffness: 80, damping: 18 }}
            >
              Quickly set up a new site on our fully managed Frappe cloud.
              Everything is automated, you just need say go!
            </motion.p>

            <motion.div
              variants={item}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 90, damping: 15 }}
            >
              <SubmitForm
                animationIntensity={animationIntensity}
                onBegin={() => setFormStage(3)}
                formStage={formStage}
                availableApps={["app1", "app2", "app3", "app4"]}
                onSubmit={() => setFormStage(4)}
              />
            </motion.div>
          </>
        )}

        {formStage >= 4 && (
          <Deployment
            animationIntensity={animationIntensity}
            setTitleText={setTitleText}
            formStage={formStage}
          />
        )}
      </motion.div>
    </main>
  );
};

export default Index;
