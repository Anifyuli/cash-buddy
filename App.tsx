import { getTheme } from "@/themes/colorscheme";
import HomeView from "@/views/HomeView";
import { useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";

export default function App() {
  const colorScheme = useColorScheme();
  const theme = getTheme(colorScheme);
  
  return (
    <PaperProvider theme={theme}>
      <HomeView />
    </PaperProvider>
  );
}
