import { useMutation } from "@tanstack/react-query";
import { queryDomains } from "./config";

export interface PutSitePayload {
  site: string;
  apps: string[];
}

interface PutSiteResponse {
  site: string;
  apps: string[];
  url: string;

}

const useNewSite = () => {
  const mutation = useMutation<PutSiteResponse, Error, PutSitePayload>({
    mutationFn: async (payload: PutSitePayload) => {
      const res = await fetch(`${queryDomains.base}/site/${payload.site}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to update site: ${errorText}`);
      }

      return res.json() as Promise<PutSiteResponse>;
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync, // optional if you want to await
    data: mutation.data,
    error: mutation.error,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
  };
};

export default useNewSite