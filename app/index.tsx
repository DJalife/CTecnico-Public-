import { useRouter } from "expo-router";
import { Dimensions, ImageBackground, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";


const { height, width } = Dimensions.get('window');
const imgBackground = require('@/assets/images/brightTheme.png');



export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaProvider>
    <SafeAreaView  style={{flex:1}}>
      <ImageBackground
                source={imgBackground}
                resizeMode="cover"
                style={styles.image}
              >
    <View style={{justifyContent: "center", alignItems: "center" }}>
      <Text style={styles.title}>Github repo demo</Text>
      <TouchableHighlight style={styles.touchable} 
      underlayColor="#a4a4a4ff" 
      onPress={() => router.navigate("/screens/cliente/homeCliente")}>
        <View style={styles.button}>
          <Text style={{alignSelf: 'center'}}>
            See Customer Menu
          </Text>
        </View>
      </TouchableHighlight>
    </View>
    </ImageBackground>
  </SafeAreaView>
  </SafeAreaProvider>
  );
}


const styles = StyleSheet.create({
  image: {
    flex:1,
    justifyContent: 'center',
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  window: {
  position: 'absolute',
  top: 10,               
  width: width * 0.87,
  backgroundColor: '#ffffffff',
  borderRadius: 10,
  elevation: 10,
  padding: width * 0.03,
  left: width * 0.07,
},
touchable: {
    borderRadius: 10,
    margin: width * 0.01,
    width: width * 0.87,
  },
  button: {
  width: width * 0.87,
  backgroundColor: '#ffffffff',
  borderRadius: 10,
  elevation: 10,
  padding: width * 0.03,
  borderWidth:2
},
  touchable2: {
    margin: width * 0.01,
    width: width * 0.7,
    left: width * 0.045,
  bottom: 10
  },
  button2: {
  width: width * 0.7,
  backgroundColor: '#ffffffff',
  borderRadius: 10,
  elevation: 10,
  padding: width * 0.03,
},
title: {
  fontFamily: 'Inter',
  fontSize: 36,
  textAlign: 'center'
}
});