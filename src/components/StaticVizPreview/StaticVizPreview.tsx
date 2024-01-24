import { useEffect, useState } from "react";
import { getCardFromUrl } from "../../lib/utils";

const fetchImage = async (origin: string, card: object) => {
  const response = await fetch(`${origin}/api/pulse/preview_unsaved_question`, {
    method: "POST",
    body: JSON.stringify(card),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const blob = await response.blob();
  return URL.createObjectURL(blob);
};

interface StaticVizPreviewProps {
  url: URL | null;
}

export const StaticVizPreview = ({ url }: StaticVizPreviewProps) => {
  const [imageSrc, setImageSrc] = useState<string>();

  useEffect(() => {
    const card = url != null ? getCardFromUrl(url) : null;
    if (card == null || url == null) {
      return;
    }

    let cancelled = false;

    fetchImage(url.origin, card).then((url) => {
      if (!cancelled) {
        setImageSrc(url);
      }
    });

    () => (cancelled = true);
  }, [url]);

  return (
    <div>{imageSrc && <img src={imageSrc} width="auto" height="100%" />}</div>
  );
};
