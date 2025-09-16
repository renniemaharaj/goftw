import { Card } from "@radix-ui/themes";
import type { App as AppType } from "../state/tanstack/types";
import { useCallback } from "react";
import { useValidImage } from "../state/useValidImage";
import useThemeContext from "../state/theme/useThemeContext";

const App = ({ app }: { app?: AppType }) => {
  const {theme} = useThemeContext();
  const getImageUrls = useCallback(
    (name: string) => [
      `https://raw.githubusercontent.com/frappe/${name}/develop/${name}/public/images/${name}-logo.png`,
      `https://raw.githubusercontent.com/frappe/${name}/refs/heads/develop/${name}/public/images/logo.png`,
      `https://raw.githubusercontent.com/frappe/${name}/refs/heads/develop/${name}/public/images/desk.png`,
      `https://raw.githubusercontent.com/frappe/${name}/refs/heads/develop/${name}/public/images/frappe-hr-logo.png`,
      `https://raw.githubusercontent.com/frappe/${name}/58930270bdf023553f79966ac35bcb275c997f52/${name}/public/images/frappe-${name}-logo.svg`,
      `https://raw.githubusercontent.com/frappe/${name}/develop/.github/hd-logo.svg`,
      `https://raw.githubusercontent.com/frappe/${name}/develop/.github/new-logo.svg`,
      `https://raw.githubusercontent.com/frappe/${name}/e0dd69f183d8975e566930d54e109d6809054ba6/${name}/public/${name}.svg`,
    ],
    []
  );

  const validUrl = useValidImage(getImageUrls(app?.name ?? ""));

  return (
    <Card className="w-full md:!w-[25rem] h-[18rem] flex flex-col">
      {app ? (
        <div className={`flex ${theme === "light" && "bg-blue-50"}  p-4 rounded-lg shadow-md flex-col w-full h-full`}>
          {/* Top: logo centered */}
          {validUrl && (
            <div className="flex justify-center items-center flex-1">
              <img
                src={validUrl}
                alt={app.name}
                className="h-20 object-contain"
              />
            </div>
          )}

          {/* Divider */}
          <div className="border-t border-gray-300 my-2" />

          {/* Bottom: text */}
          <div className="p-4 flex flex-col justify-end flex-none">
            <h3 className="font-semibold">{app.name.toUpperCase()}</h3>
            <p className="text-sm pt-1 text-gray-500 line-clamp-3">
              {app.description}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full h-full">
          {/* Top: skeleton logo placeholder */}
          <div className="flex justify-center items-center flex-1">
            <div className="h-20 w-20 bg-gray-300 rounded animate-pulse" />
          </div>

          {/* Divider */}
          <div className="border-t border-gray-300 my-2" />

          {/* Bottom: skeleton text */}
          <div className="p-4 flex flex-col justify-end space-y-2">
            <div className="h-4 w-2/3 bg-gray-300 rounded animate-pulse" />
            <div className="h-3 w-1/2 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      )}
    </Card>
  );
};

export default App;
