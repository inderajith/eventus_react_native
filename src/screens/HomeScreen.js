import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'

import {Button} from 'react-native-elements'
// import {Button} from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient';
import Snow from 'react-native-snowflakes';

function HomeScreen({navigation}) {

 

  return (
    <View style={styles.container}>                   
        <View >
          <LinearGradient
            // start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
            
            colors={['#011A3C', '#6678B7']}
            style={{minWidth:150, position:'absolute', top:700, left:150, paddingVertical:10 , borderRadius:4, flex:1, alignItems:'center', justifyContent:'center'}}
          >
          <Text onPress={() => navigation.navigate('Login')} style={{color:'#D6E0FC'}}>Login</Text>                      
        </LinearGradient>
        </View>
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
          <LinearGradient
            // start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
            
            
            colors={['#011A3C', '#6678B7']}
            style={{minWidth:150, position:'absolute', top:750, left:150, paddingVertical:10, flex:1, alignItems:'center', justifyContent:'center', borderRadius:4}}
          >
          <Text onPress={() => navigation.navigate('Register')} style={{color:'#D6E0FC'}}>Register</Text>                      
        </LinearGradient>
        </View>
        <Image style={{width:'100%', height:'100%', zIndex:-222}} source={{uri: 'https://raw.githubusercontent.com/msadura/react-native-snow-bg/d33d0d418add64a2a45304fe14fc4983f509f01e/Example/winterBg.jpg'}}/>
        <Snow fullScreen snowflakesCount={100} fallSpeed="fast" />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,    
    height:'100%',    

  },
  text: {
    color: '#101010',
    fontSize: 24,
    fontWeight: 'bold'
  }
})

export default HomeScreen
