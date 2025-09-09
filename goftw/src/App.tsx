import { Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
// import { AuthRouter } from "./pkg/firebase/auth/AuthRouter";
import { protectedRoutesFunc, publicRoutesFunc } from "../routing";

import EBoundary from "./pages/404";
import { useState } from "react";

import { Theme as RadixTheme } from "@radix-ui/themes";

// import { ThemeProvider as LocalThemeProvider } from "./hooks/theme/ThemeProvider";
// import useThemeContext from "./hooks/theme/useThemeContext";

function App() {
  return (
    // <LocalThemeProvider>
    <ErrorBoundary FallbackComponent={EBoundary}>
      <AppShell />
    </ErrorBoundary>
    // </LocalThemeProvider>
  );
}

function AppShell() {
  // const { theme } = useThemeContext();
  const [theme] = useState<"dark" | "inherit" | "light">("dark");
  return (
    <RadixTheme
      appearance={theme}
      accentColor="gold"
      radius="full"
      panelBackground="translucent"
      scaling="110%"
      grayColor="sage"
    >
      <AppRoutes />
    </RadixTheme>
  );
}

function AppRoutes() {
  return (
    <Routes>
      {publicRoutesFunc()}
      <Route element={<></>}>{protectedRoutesFunc()}</Route>
    </Routes>
  );
}

export default App;
