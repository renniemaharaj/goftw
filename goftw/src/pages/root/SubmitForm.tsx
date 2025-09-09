import { useState, useCallback, useEffect } from "react";
import { Button, TextField } from "@radix-ui/themes";
import { motion, AnimatePresence } from "framer-motion";
import useQueryApps from "../../state/tanstack/useQueryApps";
import { formStages } from "./config";

type SubmitFormProps = {
  setFormStage: (stage: number) => void;
  onSubmit: (siteName: string, apps: string[]) => void;
  formStage: number;
  animationIntensity: number;
};

const SubmitForm = ({
  setFormStage,
  onSubmit,
  formStage,
  animationIntensity,
}: SubmitFormProps) => {
  const [siteName, setSiteName] = useState("");
  const [selectedApps, setSelectedApps] = useState<string[]>([]);
  const [availableApps, setAvailableApps] = useState<string[]>();

  const { data, error, isLoading } = useQueryApps();

  const handleToggleApp = useCallback((app: string) => {
    setSelectedApps((prev) =>
      prev.includes(app) ? prev.filter((a) => a !== app) : [...prev, app]
    );
  }, []);

  const handleSubmitButton = useCallback(() => {
    if (formStage === formStages.HOME) {
      setFormStage(formStages.APPS);
    } else if (formStage === formStages.APPS) {
      setFormStage(formStages.SITE_NAME);
    } else if (formStage === formStages.SITE_NAME) {
      onSubmit(siteName, selectedApps);
    }
  }, [formStage, setFormStage, onSubmit, siteName, selectedApps]);

  useEffect(() => {
    if (data) {
      try {
        setAvailableApps(data as string[]);
      } catch {
        console.warn("Malformed app data from API");
      }
    }
  }, [data]);

  return (
    <div className="flex flex-col justify-center items-center w-full max-w-md mx-auto space-y-6">
      <AnimatePresence mode="wait">
        {formStage > formStages.HOME && formStage < formStages.DEPLOYING && (
          <>
            {formStage === formStages.SITE_NAME && (
              <motion.div
                key="site-name"
                initial={{ opacity: 0, y: animationIntensity }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -animationIntensity }}
                transition={{ type: "spring", stiffness: 80, damping: 20 }}
                className="w-full max-w-lg space-y-6"
              >
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-medium">Site Name</label>
                  <TextField.Root
                    variant="soft"
                    size="3"
                    type="text"
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                    className="w-full rounded-xl border p-3 shadow-sm focus:outline-none focus:ring-2"
                    placeholder="example.localhost"
                  />
                </div>
              </motion.div>
            )}

            {formStage === formStages.APPS && (
              <motion.div
                key="apps"
                initial={{ opacity: 0, y: animationIntensity }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -animationIntensity }}
                transition={{ type: "spring", stiffness: 80, damping: 20 }}
                className="w-full max-w-lg space-y-6"
              >
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Apps</label>

                  {isLoading && (
                    <p className="text-sm text-muted-foreground">
                      Fetching apps...
                    </p>
                  )}

                  {error && (
                    <p className="text-sm text-red-500">
                      Could not fetch available apps. Please try again.
                    </p>
                  )}

                  {!isLoading && !error && availableApps?.length ? (
                    <div className="grid grid-cols-2 p-2 gap-2 max-h-40 overflow-y-auto">
                      {availableApps.map((app) => (
                        <Button
                          key={app}
                          size="3"
                          onClick={() => handleToggleApp(app)}
                          variant={
                            selectedApps.includes(app) ? "soft" : "outline"
                          }
                        >
                          {app}
                        </Button>
                      ))}
                    </div>
                  ) : null}

                  {!isLoading && !error && availableApps?.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                      No apps available
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </>
        )}

        {formStage < formStages.DEPLOYING && (
          <motion.div
            key="submit"
            initial={{ opacity: 0, y: animationIntensity }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -animationIntensity }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
            className="flex justify-center w-full"
          >
            <Button
              onClick={handleSubmitButton}
              disabled={formStage === formStages.SITE_NAME && !siteName}
              className="px-6 shadow-md rounded-xl"
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
