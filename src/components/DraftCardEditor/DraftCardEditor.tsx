import { useEffect, useState } from "react";
import { Button, Flex, Group, JsonInput } from "@mantine/core";
import { formatJson, getCardFromUrl, getCardHash } from "../../lib/utils";

interface DraftCardEditorProps {
  url: URL | null;
  updateUrl: (url: string) => void;
}

export const DraftCardEditor = ({ url, updateUrl }: DraftCardEditorProps) => {
  const [cardContent, setCardContent] = useState("");

  useEffect(() => {
    if (!url) {
      return;
    }

    const card = getCardFromUrl(url);
    try {
      setCardContent(formatJson(card));
    } catch {
      console.error("Invalid json");
    }
  }, [url]);

  const handleChange = (jsonString: string) => {
    setCardContent(jsonString);
  };

  const handleUpdate = () => {
    if (url == null) {
      return;
    }

    const newUrl = new URL(url.toString());
    newUrl.hash = getCardHash(cardContent);
    updateUrl(newUrl.toString());
  };

  return (
    <Flex direction="column" miw="40%" h="100%">
      <JsonInput
        styles={{
          input: { height: "100%" },
          wrapper: { height: "100%" },
        }}
        h="100%"
        formatOnBlur
        value={cardContent}
        onChange={handleChange}
        validationError="Invalid JSON"
      />

      <Group p={4}>
        <Button onClick={handleUpdate}>Update</Button>
      </Group>
    </Flex>
  );
};
