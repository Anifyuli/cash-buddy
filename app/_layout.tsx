import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./home";

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: "Cash Buddy",
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
}
