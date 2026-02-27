import { router, useGlobalSearchParams } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

const { width } = Dimensions.get('window');

function BotonProfesion({ profesion, fuente }) {
  const { user } = useGlobalSearchParams();

  const onPress = () => router.navigate(
    {
      pathname: '../tecnico/[tecnico]',
      params: { tecnico: `${profesion}`,
                user: user }
    }
  );

  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor="#000000ff"
      style={styles.touchable}
    >
      <View style={styles.button}>
        
        <Text style={styles.text}>{profesion}</Text>
        <Image
          style={styles.image}
          source={fuente}
          resizeMode="contain"
        />
      </View>
    </TouchableHighlight>
  );
}

export default BotonProfesion;
const styles = StyleSheet.create({
  touchable: {
    borderRadius: 14,
    margin: width * 0.015,
    borderColor: '#000000ff',
    borderWidth: 1
  },
  button: {
    width: width * 0.33,     
    aspectRatio: 1,      
    backgroundColor: '#fefefe',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    padding: width * 0.01,
  },
  image: {
    height: '60%',
    marginBottom: 8,
  },
  text: {
    fontFamily: 'Inter_R',
    fontSize: width * 0.04,  
    textAlign: 'center',
  },
});
