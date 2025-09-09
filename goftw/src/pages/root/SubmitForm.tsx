import { useState, useCallback } from "react";
import { Button } from "@radix-ui/themes";
import { motion, AnimatePresence } from "framer-motion";

type SubmitFormProps = {
  onBegin: () => void;
  onSubmit: (siteName: string, apps: string[]) => void;
  formStage: number;
  animationIntensity: number;
  availableApps: string[]; // for now you can hardcode
};

const SubmitForm = ({
  onBegin,
  onSubmit,
  formStage,
  animationIntensity,
  availableApps,
}: SubmitFormProps) => {
  const [siteName, setSiteName] = useState("");
  const [selectedApps, setSelectedApps] = useState<string[]>([]);

  const handleToggleApp = useCallback((app: string) => {
    setSelectedApps((prev) =>
      prev.includes(app) ? prev.filter((a) => a !== app) : [...prev, app]
    );
  }, []);

  const handleSubmitButton = useCallback(() => {
    if (formStage === 2) {
      onBegin(); // move to stage 1
    } else if (formStage > 2) {
      onSubmit(siteName, selectedApps);
    }
  }, [formStage, onBegin, onSubmit, siteName, selectedApps]);

  return (
    <div className="w-full max-w-md space-y-6">
      <AnimatePresence mode="wait">
        {formStage == 3 && (
          <motion.div
            key="stage1"
            initial={{ opacity: 0, y: animationIntensity }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -animationIntensity }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <label className="block text-left text-sm font-medium">
                Site Name
              </label>
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full rounded-xl border p-3 shadow-sm focus:outline-none focus:ring-2"
                placeholder="example.localhost"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-left text-sm font-medium">
                Select Apps
              </label>
              <div className="flex flex-wrap gap-2">
                {availableApps.map((app) => (
                  <button
                    key={app}
                    type="button"
                    onClick={() => handleToggleApp(app)}
                    className={`rounded-xl border px-4 py-2 transition ${
                      selectedApps.includes(app)
                        ? "bg-accent text-accent-foreground shadow-md"
                        : "hover:bg-muted"
                    }`}
                  >
                    {app}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {formStage < 4 && (
          <motion.div
            key="stage0"
            initial={{ opacity: 0, y: animationIntensity }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -animationIntensity }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
            className="space-y-4 text-center"
          >
            <Button
              onClick={handleSubmitButton}
              size="4"
              className="rounded-2xl px-8 py-6 text-lg shadow-md"
            >
              Create Site
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SubmitForm;
