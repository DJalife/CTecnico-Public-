import { db } from '@/services/firebaseConfig';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { router, useLocalSearchParams } from 'expo-router';
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { Dimensions, ImageBackground, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const { height, width } = Dimensions.get('window');
const imgBackground = require('@/assets/images/brightTheme.png');


function agendarCita() {
    const { Tec, nombre, user} = useLocalSearchParams();
    const usuario = user?.toString();
    const [descri, onChangeDesc] = useState('');
    const [ubicacion, onChangeUbi] = useState('');
    const costo = "$250.00"


    const collectionRef = collection(db, 'citas')

    const [date, setDate] = useState(new Date(1760000000000));

    const agendarCita = async (data) =>{
      try{
        await addDoc(collectionRef, data)
        router.navigate(
                          {
                            pathname: './confirmacion',
                            params:{
                              user: user
                            }
                          })
      }
      catch (e){
        console.log(e);
      }
    }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };
  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };
  const showDatepicker = () => {
    showMode('date');
  };
  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <SafeAreaProvider>
        <SafeAreaView  style={{flex:1}}>
          <ImageBackground
                source={imgBackground}
                resizeMode="cover"
                style={styles.image}
              >
                <View style={styles.window}>
            <Text style={{fontFamily:'Inter_LT'}}>Contratando a:</Text>
            <Text style={{fontFamily:'Inter'}}>{nombre}</Text>
            <TextInput style={styles.input} placeholder='Describe tu problema' onChangeText={onChangeDesc} value={descri}/>
            <TextInput style={styles.input} placeholder='Ubicación' onChangeText={onChangeUbi} value={ubicacion}/>
            <TouchableHighlight style={styles.touchable2} underlayColor="#a4a4a4ff" onPress={showDatepicker}>
            <View style={styles.button2}>
                          <Text>Seleccionar Fecha</Text>
                        </View>
              </TouchableHighlight>
            <TouchableHighlight style={styles.touchable2} underlayColor="#a4a4a4ff" onPress={showTimepicker}>
            <View style={styles.button2}>
                          <Text>Seleccionar Hora</Text>
                        </View>
              </TouchableHighlight>
            <Text style={{fontFamily:'Inter_LT'}}>Fecha y Hora seleccionadas:</Text>
            <Text style={{fontFamily:'Inter'}}>{date.toLocaleString()}</Text>
            <Text style={{fontFamily:'Inter_LT'}}>Costo por diagnóstico:</Text>
            <Text style={{fontFamily:'Inter'}}>{costo}</Text>
              </View>
            <TouchableHighlight style={styles.touchable} underlayColor="#a4a4a4ff" onPress={() => agendarCita({tecnico: Tec,
              descripcion: descri, 
              ubicacion: ubicacion, 
              fecha: date.toLocaleString(),
              costo: costo,
              estado: 'pendiente',
              cliente: usuario})}>
                <View style={styles.button}>
                          <Text style={{alignSelf: 'center'}}>Proceder al Pago</Text>
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
});

export default agendarCita