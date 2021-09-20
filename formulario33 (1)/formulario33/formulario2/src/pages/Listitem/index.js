import React from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';


export default function Listitem({ data, handleLeft }) {

 
  return (
      //controle das informaçoes da flatlist e chamada das informações 
    
      <View style={styles.container}>
        <Text style={styles.title}>id: {data.id}</Text>
        <Text style={styles.title}>tag: {data.tag}</Text>
        <Text style={styles.title}>turno: {data.description}</Text>
        <Text style={styles.title}>cont.inicial: {data.time1}</Text>
        <Text style={styles.title}>cont.final: {data.time2}</Text>
      </View>
   
  );
}
// objetos de estilização das informação da flatlist
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    height: 180,
    margin: 10,
    borderRadius: 14,
    padding: 11,
    width: 378,
    paddingHorizontal: 10,
    marginTop: 18,
  },
  title: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
  },
  description: {
    color: '#121212',
    marginTop: 5,
    lineHeight: 20,
    
},
container4: {
  flex: 1,
  paddingTop: 40,
  alignItems: "center",
  
}

});