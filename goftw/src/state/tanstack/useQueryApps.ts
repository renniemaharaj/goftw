import { useQuery } from "@tanstack/react-query";
import { queryDomains } from "./config";

// useQueryProjects queries domain api for projects using pagination
const useQueryApps = () => {
  const query = useQuery<string[]>({
    queryKey: ["apps"],
    queryFn: async () => {
      const res = await fetch(`${queryDomains.base}/apps`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        // body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to fetch projects");
      return res.json() as Promise<string[]>;
    },
  });

  return { data: query.data, error: query.error, isLoading: query.isLoading };
};

export default useQueryApps;
