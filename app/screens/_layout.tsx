import { useFonts } from "expo-font";
import { Stack } from "expo-router";

export default function RootLayout() {

  const [fontsLoaded] = useFonts({
      Inter: require("@/assets/fonts/Inter_28pt-Black.ttf"),
      Inter_R: require("@/assets/fonts/Inter_28pt-Regular.ttf"),
      Inter_SB: require("@/assets/fonts/Inter_28pt-SemiBold.ttf"),
      Inter_LT: require("@/assets/fonts/Inter_28pt-LightItalic.ttf")
    });
  
    if (!fontsLoaded) return null;
    
  return (<Stack>
  <Stack.Screen name="cliente" options={{title: "cliente", headerShown:false}} />
  <Stack.Screen name="perfil" options={{title: "perfil", headerShown:false}} />
  <Stack.Screen name="registro" options={{title: "registro", headerShown:false}} />
  <Stack.Screen name="tecnico" options={{title: "tecnico", headerShown:false}} />
    </Stack>
    );
}
