import { DraftCardEditor } from "./components/DraftCardEditor";
import { createTheme, MantineProvider } from "@mantine/core";
import { MetabaseDevTools } from "./components/MetabaseDevTools/MetabaseDevTools";
const theme = createTheme({});

function App() {
  return (
    <MantineProvider theme={theme}>
      <MetabaseDevTools />
    </MantineProvider>
  );
}

export default App;
