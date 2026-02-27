import BotonProfesion from "@/components/botonProfesion";
import { useGlobalSearchParams } from "expo-router";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const imgBackground = require('@/assets/images/brightTheme.png');
const plomeroImg = require('@/assets/images/buttonIcons/Plomero.png');
const carpinteroImg = require('@/assets/images/buttonIcons/Carpintero.png');
const albanilImg = require('@/assets/images/buttonIcons/Albanil.png');
const electricistaImg = require('@/assets/images/buttonIcons/Electricista.png');
const herreroImg = require('@/assets/images/buttonIcons/Herrero.png');

export default function Home() {
  const { user } = useGlobalSearchParams();
  
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['left', 'right']}>
        <ImageBackground
          source={imgBackground}
          resizeMode="cover"
          style={styles.image}
        >
          <Text style={styles.text}>ContrataTecnico</Text>
          <Text style={styles.subText}>Servicios</Text>
        <View style={styles.buttonsContainer}>
          <View style={styles.row}>
            <BotonProfesion profesion="Plomero" fuente={plomeroImg} />
            <BotonProfesion profesion="Electricista" fuente={electricistaImg} />
          </View>

          <View style={styles.row}>
            <BotonProfesion profesion="Carpintero" fuente={carpinteroImg} />
            <BotonProfesion profesion="Herrero" fuente={herreroImg} />
          </View>

          <View style={styles.row}>
            <BotonProfesion profesion="Albañil" fuente={albanilImg} />
          </View>
        </View>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex:1,
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    fontSize: width * 0.080,
    fontFamily: "Inter",
    textAlign: 'center',
    paddingTop: height * 0.080
  },
  subText: {
    color: 'black',
    fontSize: width * 0.045,
    fontFamily: "Inter_R",
    textAlign: 'center',
    paddingTop: height * 0.080
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 12,
  },
});
