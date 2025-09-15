import type { CustomRoute, IndexRoute } from "../../routing";
import Index from "./root";
import Missing from "./404";
import Layout from "./Layout";

export const protectedRoutes: CustomRoute[] = [];

export const publicRoutes: (CustomRoute | IndexRoute)[] = [
  { path: "*", element: <Missing /> },
  {
    index: true,
    element: (
      <Layout>
        <Index />
      </Layout>
    ),
  },
];
