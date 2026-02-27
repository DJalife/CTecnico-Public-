import { db } from '@/services/firebaseConfig';
import { router, useLocalSearchParams } from 'expo-router';
import { collectionGroup, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, ImageBackground, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const imgBackground = require('@/assets/images/brightTheme.png');

function homeTec() {
  const { user } = useLocalSearchParams();
  const tecnico = user.toString()

  const tecnicosRef = collectionGroup(db, "citas")

  const [data, setData] = useState([])
  const [name, setName] = useState()
  useEffect(() => {
  const getTecnicos = async () => {
    const q = query(tecnicosRef, where("tecnico", "==", tecnico));
    const snapshot = await getDocs(q);

    setData(snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })));
  };

  getTecnicos();
}, [tecnico]);

useEffect(() => {
  const getCliente = async () => {
    if (data.length === 0) return;

    const clienteId = data[0].cliente;
    const refCliente = doc(db, "Usuarios", clienteId);
    const snapshotCliente = await getDoc(refCliente);

    setName(snapshotCliente.get("nombre"));
  };

  getCliente();
}, [data]);

    const onPress = (id) => router.navigate(
          {
            pathname: './detallesDiagnostico',
            params: { citaID: `${id}`,
            nombre: `${name}`,
          user: user }
          })

type ItemProps = {id: string, cliente: string, descripcion: string, ubicacion: string};

const Item = ({id, cliente, ubicacion, descripcion}: ItemProps) => (
  <TouchableHighlight 
  underlayColor="#a4a4a4ff" 
  style={styles.touchable}
  onPress={() => onPress(id)}>
    <View style={styles.button}>
      <Text style={{fontFamily:'Inter'}}>Cliente: {cliente}</Text>
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
        renderItem={({item}) => <Item id={item.id} cliente={name} descripcion={item.descripcion} ubicacion={item.ubicacion}/>}
        keyExtractor={item => item.id}
      />
        </ImageBackground>
      </SafeAreaView>
    </ SafeAreaProvider>
  )
}

export default homeTec

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