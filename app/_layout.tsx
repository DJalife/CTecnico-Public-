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
  <Stack.Screen name="Login" options={{title: "Iniciar Sesión", headerShown:false}} />
  <Stack.Screen name="index" options={{title: "Bienvenido", headerShown:false}} />
  <Stack.Screen name="LoginTec" options={{title: "Iniciar Sesión", headerShown:false}} />
  <Stack.Screen name="screens" options={{title: "Páginas", headerShown:false}} />
    </Stack>
    );
}
