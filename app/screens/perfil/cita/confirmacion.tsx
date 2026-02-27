import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Dimensions, ImageBackground, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const { height, width } = Dimensions.get('window');
const imgBackground = require('@/assets/images/brightTheme.png');


function Confirmacion() {

      const { user} = useLocalSearchParams();
  
    const regresarInicio = async () =>{
        router.navigate(
                  {
                    pathname: '../../cliente/homeCliente',
                    params: {user: user}
                  })
    }

  return (
    <SafeAreaProvider>
        <SafeAreaView  style={{flex:1}}>
          <ImageBackground
                source={imgBackground}
                resizeMode="cover"
                style={styles.image}
              >
                <View style={styles.window}>
            <Text style={{fontFamily:'Inter', alignSelf: 'center'}}>Cita Programada</Text>
            <Text/>
            <Text style={{fontFamily:'Inter_LT'}}>Espera a que el técnico confirme la visita, consulta el estado en la página de inicio, en el botón que dice "Consultar estado"</Text>
            
              </View>
            <TouchableHighlight style={styles.touchable} underlayColor="#a4a4a4ff" onPress={regresarInicio}>
                <View style={styles.button}>
                          <Text style={{alignSelf: 'center'}}>Regresar a Inicio</Text>
                        </View>
              </TouchableHighlight>
            </ImageBackground>
        </SafeAreaView>
    </SafeAreaProvider>
  )
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
  top: 10,                // or e.g. 20 for some spacing
  width: width * 0.87,
  backgroundColor: '#ffffffff',
  borderRadius: 10,
  elevation: 10,
  padding: width * 0.03,
  left: width * 0.07,
},
touchable: {
  position: 'absolute',
    borderRadius: 10,
    margin: width * 0.01,
    width: width * 0.87,left: width * 0.05,
  bottom: 10
  },
  button: {
  width: width * 0.87,
  backgroundColor: '#ffffffff',
  borderRadius: 10,
  elevation: 10,
  padding: width * 0.03,
  borderWidth: 2
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
});

export default Confirmacion