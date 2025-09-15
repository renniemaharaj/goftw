import { Card } from "@radix-ui/themes";
import type { App as AppType } from "../state/tanstack/types";
import { useCallback } from "react";
import { useValidImage } from "../state/useValidImage";

const App = ({ app }: { app?: AppType }) => {
  const getImageUrls = useCallback(
    (name: string) => [
      `https://raw.githubusercontent.com/frappe/${name}/develop/${name}/public/images/${name}-logo.png`,
      `https://raw.githubusercontent.com/frappe/${name}/refs/heads/develop/${name}/public/images/logo.png`,
    `https://raw.githubusercontent.com/frappe/${name}/refs/heads/develop/${name}/public/images/desk.png`,
    `https://raw.githubusercontent.com/frappe/${name}/refs/heads/develop/${name}/public/images/frappe-hr-logo.png`,
    `https://raw.githubusercontent.com/frappe/${name}/58930270bdf023553f79966ac35bcb275c997f52/${name}/public/images/frappe-${name}-logo.svg`,
    `https://raw.githubusercontent.com/frappe/${name}/develop/.github/hd-logo.svg`,
    `https://raw.githubusercontent.com/frappe/${name}/develop/.github/new-logo.svg`,
    `https://raw.githubusercontent.com/frappe/${name}/e0dd69f183d8975e566930d54e109d6809054ba6/${name}/public/${name}.svg`
    ],
    []
  );

  const validUrl = useValidImage(getImageUrls(app?.name ?? ""));

  return (
    <Card className="!max-w-[30rem]">
      {app ? (
        <div className="p-4 rounded-lg shadow-md">
          {validUrl && (
            <img src={validUrl} alt={app.name} className="h-12 mb-2" />
          )}
          <h3 className="font-semibold">{app.name.toUpperCase()}</h3>
          <p className="text-sm pt-1 text-gray-500">{app.description}</p>
        </div>
      ) : (
        <div className="p-4 rounded-lg animate-pulse shadow-md space-y-2">
          <div className="h-4 w-2/3 bg-gray-300 rounded" />
          <div className="h-3 w-1/2 bg-gray-200 rounded" />
        </div>
      )}
    </Card>
  );
};

export default App;
