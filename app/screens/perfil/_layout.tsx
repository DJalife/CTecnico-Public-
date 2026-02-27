import { useFonts } from "expo-font";
import { Stack } from "expo-router";

export default function RootLayout() {

  const [fontsLoaded] = useFonts({
      Inter: require("@/assets/fonts/Inter_28pt-Black.ttf"),
      Inter_R: require("@/assets/fonts/Inter_28pt-Regular.ttf"),
      Inter_LT: require("@/assets/fonts/Inter_28pt-LightItalic.ttf")
    });
  
    if (!fontsLoaded) return null;
    
  return (<Stack>
  <Stack.Screen name="[perfilTec]" options={{title: "Perfil del Técnico", headerShown:true}} />
  <Stack.Screen name="cita" options={{title: "Agendar Cita", headerShown:false}} />
    </Stack>
    );
}
