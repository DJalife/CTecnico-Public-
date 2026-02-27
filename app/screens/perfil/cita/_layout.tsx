import { useFonts } from "expo-font";
import { Stack } from "expo-router";

export default function RootLayout() {

  const [fontsLoaded] = useFonts({
      Inter: require("@/assets/fonts/Inter_28pt-Black.ttf"),
      Inter_R: require("@/assets/fonts/Inter_28pt-Regular.ttf")
    });
  
    if (!fontsLoaded) return null;
    
  return (<Stack>
    <Stack.Screen name="agendarCita" options={{title: "Agendar Cita", headerShown:true}} />
    </Stack>
    );
}
