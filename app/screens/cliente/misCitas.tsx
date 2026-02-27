import { db } from '@/services/firebaseConfig';
import { router, useGlobalSearchParams } from 'expo-router';
import { collectionGroup, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, ImageBackground, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const imgBackground = require('@/assets/images/brightTheme.png');

function misCitas() {

  const { user } = useGlobalSearchParams();
  const usuario = user?.toString();
  console.log("the id is: ", typeof(usuario))
  const [data, setData] = useState([])

  const citasRef = collectionGroup(db, "citas")

  useEffect(() => {
  const getCitas = async () => {
    const q = query(citasRef, where("cliente", "==", usuario));
    const snapshot = await getDocs(q);

    setData(snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })));
  };

  getCitas();
}, [usuario]);

    const onPress = (id) => router.navigate(
          {
            pathname: './detallesCita',
            params: { citaID: `${id}` }
          })

type ItemProps = {id: string, estado: string, descripcion: string, ubicacion: string};

const Item = ({id, estado, ubicacion, descripcion}: ItemProps) => (
  <TouchableHighlight 
  underlayColor="#a4a4a4ff" 
  style={styles.touchable}
  onPress={() => onPress(id)}>
    <View style={styles.button}>
      <Text style={{fontFamily:'Inter'}}>Cita {estado}</Text>
      <Text>Ubicación: {ubicacion}</Text>
      <Text style={{fontFamily:'Inter_LT'}}>Toca para saber más</Text>
    </View>
  </TouchableHighlight>
);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex:1}}>
        <ImageBackground
          source={imgBackground}
          resizeMode="cover"
          style={styles.image}
        >
          <FlatList
        data={data}
        renderItem={({item}) => <Item id={item.id} estado={item.estado} descripcion={item.descripcion} ubicacion={item.ubicacion}/>}
        keyExtractor={item => item.id}
      />
        </ImageBackground>
      </SafeAreaView>
    </ SafeAreaProvider>
  )
}

export default misCitas

const styles = StyleSheet.create({
  image: {
    flex:1,
    justifyContent: 'center',
  },
  touchable: {
    borderRadius: 14,
    margin: width * 0.015,
  },
  button: {
    width: width * 0.97,      
    backgroundColor: '#ffffffff',
    borderRadius: 10,
    justifyContent: 'center',
    padding: width * 0.02,
    elevation: 10,
    borderWidth: 0.2
  },
})