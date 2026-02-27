import { db } from '@/services/firebaseConfig';
import { router, useLocalSearchParams } from 'expo-router';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Dimensions, ImageBackground, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const { height, width } = Dimensions.get('window');
const imgBackground = require('@/assets/images/brightTheme.png');


function detallesDiagnostico() {

    const { citaID, nombre, user } = useLocalSearchParams();

    const [ubic, setUbic] = useState();
    const [desc, setDesc] = useState();
    const [fecha, setFecha] = useState();
    const costo = "$250.00"
    
    const ref = doc(db, "citas", citaID.toString())

    useEffect(() => {
      const getTecnicos = async () => {
      const snapshot = await getDoc(ref);
      const ubic = snapshot.get("ubicacion");
      const descr = snapshot.get("descripcion");
      const fecha = snapshot.get("fecha");

      setFecha(fecha)
      setUbic(ubic);
      setDesc(descr);
      };
    
      getTecnicos();
    }, [citaID]);

    const aceptarTrabajo = async (data) =>{
      try{
        await updateDoc(ref, data);
        router.navigate(
                  {
                    pathname: './trabajoAceptado',
                    params: { citaID: `${citaID}`, user: user }
                  })
      }
      catch (e){
        console.log(e);
      }
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
            <Text style={{fontFamily:'Inter_LT'}}>Atendiendo a:</Text>
            <Text>{nombre}</Text>
            <Text style={{fontFamily:'Inter_LT'}}>Descripción del trabajo:</Text>
            <Text>{desc}</Text>
            <Text style={{fontFamily:'Inter_LT'}}>Ubicación:</Text>
            <Text>{ubic}</Text>
            <Text style={{fontFamily:'Inter_LT'}}>Fecha y Hora del trabajo:</Text>
            <Text>{fecha}</Text>
            <Text style={{fontFamily:'Inter_LT'}}>Costo por diagnóstico:</Text>
            <Text style={{fontFamily:'Inter'}}>{costo}</Text>
              </View>
            <TouchableHighlight style={styles.touchable} underlayColor="#a4a4a4ff" onPress={() => aceptarTrabajo({
              estado: 'aceptada'})}>
                <View style={styles.button}>
                          <Text>Aceptar Trabajo</Text>
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

export default detallesDiagnostico