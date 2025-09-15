import { useEffect, useState } from "react";

export function useValidImage(urls: string[] = []) {
  const [validUrl, setValidUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!urls.length) return;

    let isMounted = true;
    let found = false;

    urls.forEach((url) => {
      if (found) return; // stop checking after first success

      const img = new Image();
      img.src = url;

      img.onload = () => {
        if (isMounted && !found) {
          found = true;
          setValidUrl(url);
        }
      };

      img.onerror = () => {
        // only set null if no urls succeed
        if (isMounted && !found) {
          // keep waiting for other URLs
        }
      };
    });

    return () => {
      isMounted = false;
    };
  }, [urls]);

  return validUrl;
}
