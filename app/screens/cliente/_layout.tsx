import { useFonts } from "expo-font";
import { Tabs, useLocalSearchParams } from "expo-router";

import Entypo from '@expo/vector-icons/Entypo';
import Fontisto from '@expo/vector-icons/Fontisto';

export default function RootLayout() {

  const [fontsLoaded] = useFonts({
      Inter: require("@/assets/fonts/Inter_28pt-Black.ttf"),
      Inter_R: require("@/assets/fonts/Inter_28pt-Regular.ttf"),
      Inter_SB: require("@/assets/fonts/Inter_28pt-SemiBold.ttf")
    });
  
    if (!fontsLoaded) return null;

    const { user } = useLocalSearchParams();
    
  return (
  <Tabs
  screenOptions={{
    tabBarStyle: {
      height: 60,
      paddingBottom: 6,
      paddingTop: 6,
    },
    tabBarLabelStyle: {
      fontSize: 8,
      marginBottom: 2,
    },
    tabBarIconStyle: {
      marginTop: 0,
    },
  }}
>
  <Tabs.Screen name="homeCliente" options={{
    tabBarIcon:() => (<Entypo name="home" size={24} color="black" />),
    title: "Inicio", 
    headerShown:false}} />
  <Tabs.Screen name="misCitas" options={
    {tabBarIcon:() => (<Fontisto name="date" size={24} color="black" />),
    title: "Citas", headerShown:false,
  }
    } />
  <Tabs.Screen name="detallesCita" options={{href:null, title: "detallesCita", headerShown:false}} />
    </Tabs>
    );
}
