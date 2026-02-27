import { db } from '@/services/firebaseConfig';
import { router, useLocalSearchParams } from 'expo-router';
import { collectionGroup, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, ImageBackground, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get('window');
const imgBackground = require('@/assets/images/brightTheme.png');

function selectorTecnicos() {
  const { tecnico, user } = useLocalSearchParams();

  const tecnicosRef = collectionGroup(db, "Tecnicos")

  const [data, setData] = useState([])
  useEffect(() => {
    const connect = async () =>{
    const ref = query(tecnicosRef, where("profesion", "==", tecnico.toString()))
    const snapshot = await getDocs(ref)
    setData(snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})));
    }
    connect();
  }, []);

  const onPress = (id) => router.navigate(
      {
        pathname: '../perfil/[perfilTec]',
        params: { perfilTec: `${id}`,
                  profesion: `${tecnico}`,
                  user: user }
      })

type ItemProps = {id: string, nombre: string, descripcion: string, calificacion: number};

const Item = ({id, nombre, calificacion, descripcion}: ItemProps) => (
  <TouchableHighlight 
  underlayColor="#a4a4a4ff" 
  style={styles.touchable}
  onPress={() => onPress(id)}>
    <View style={styles.button}>
      <Text style={styles.text}>{nombre}</Text>
      <Text style={styles.text}>{calificacion} de 5 ⭐</Text>
      <Text>Toca para saber más</Text>
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
        renderItem={({item}) => <Item id={item.id} nombre={item.nombre} descripcion={item.descripcion} calificacion={item.calificacion}/>}
        keyExtractor={item => item.id}
      />
        </ImageBackground>
      </SafeAreaView>
    </ SafeAreaProvider>
  )
}

export default selectorTecnicos

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
  text: {
    fontFamily: 'Inter_SB'
  }
})