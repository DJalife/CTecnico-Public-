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
    
  return (
  <Stack>
  <Stack.Screen name="[tecnico]" options={{title: "Seleccionar Tecnico", headerShown:true, headerTitleStyle: {fontSize:14}}} />
  <Stack.Screen name="homeTec" options={{title: "Diagnósticos Disponibles", headerShown:true}} />
  <Stack.Screen name="detallesDiagnostico" options={{title: "Detalles", headerShown:true}} />
  <Stack.Screen name="trabajoAceptado" options={{title: "Aceptando Trabajo", headerShown:false}} />
    </Stack>
    );
}
