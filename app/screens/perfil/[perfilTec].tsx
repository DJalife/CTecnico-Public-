import { db } from '@/services/firebaseConfig';
import { router, useLocalSearchParams } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Dimensions, ImageBackground, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const { height, width } = Dimensions.get('window');
const imgBackground = require('@/assets/images/brightTheme.png');

function perfilTec() { 
  const { perfilTec, profesion, user } = useLocalSearchParams();
  const [identifier, setId] = useState("")
  const [name, setName] = useState()
  const [rating, setRating] = useState()
  const [desc, setDesc] = useState()

  useEffect(() => {
    try{
      const connect = async () => {
      const ref = await doc(db, "Tecnicos", perfilTec.toString())
      const snapshot = await getDoc(ref);
      const nombre = snapshot.get("nombre");
      const score = snapshot.get("calificacion");
      const descr = snapshot.get("descripcion");
      const id = snapshot.id
      setId(id);
      setName(nombre);
      setRating(score);
      setDesc(descr);
    }
      connect();
    }
    catch(e){
      console.log(e)
    }
  }, [])

  const onPress = () => router.navigate(
        {
          pathname: '../perfil/cita/agendarCita',
          params: { Tec: `${identifier}`,
        nombre: `${name}`,
      user: user }
        })
  return (
  <SafeAreaProvider>
    <SafeAreaView style={{flex:1}}>
      <ImageBackground
                source={imgBackground}
                resizeMode="cover"
                style={styles.image}
              >
      <View style={styles.window}>
        <Text style={{fontFamily:'Inter'}}>{name}</Text>
        <Text>Calificación: {rating} de 5 ⭐</Text>
        <Text style={{fontFamily:'Inter_LT'}}>{profesion}</Text>
        <Text style={{fontFamily:'Inter_LT'}}>Sobre mí: </Text>
        <Text>{desc}</Text>
      </View>
      <TouchableHighlight style={styles.touchable} underlayColor="#a4a4a4ff" onPress={onPress}>
        <View style={styles.button}>
          <Text style={{alignSelf: 'center'}}>Agendar Cita</Text>
        </View>
      </TouchableHighlight>
      </ImageBackground>
    </SafeAreaView>
  </SafeAreaProvider>
  )
}

export default perfilTec

const styles = StyleSheet.create({
  image: {
    flex:1,
    justifyContent: 'center',
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
  text: {
    fontFamily: 'Inter_SB'
  }
})