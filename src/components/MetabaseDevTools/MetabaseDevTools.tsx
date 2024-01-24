import { Box, Flex, Group } from "@mantine/core";
import { DraftCardEditor } from "../DraftCardEditor";
import { StaticVizPreview } from "../StaticVizPreview";
import { useTabUrl } from "../../hooks/use-tab-url";

export const MetabaseDevTools = () => {
  const { url, updateUrl } = useTabUrl();

  return (
    <Box w="100vw" h="100vh">
      <Flex h="100%" direction="row">
        <DraftCardEditor url={url} updateUrl={updateUrl} />
        <StaticVizPreview url={url} />
      </Flex>
    </Box>
  );
};
