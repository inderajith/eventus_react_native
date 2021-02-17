import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Button } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import MapView, {Circle} from 'react-native-maps';

function HomeScreen({navigation}) {

  const backgroundAnimation = {
    from:{
       backgroundColor:'rgb(255,255,255)'
    },
    to:{
       backgroundColor:'rgb(76, 255, 191)'
    }
 }

  return (
    <View style={styles.container}>
      
      <Button
        icon={
          <MaterialCommunityIcons name="login" size={24} color="#3399ff" />
        }
        iconRight
        type="outline"
        title="login"
        onPress={() => navigation.navigate('Login') }
      />
      {/* <Animatable.Text animation={backgroundAnimation}  duration={4000} delay={2}>
        <View>
          <Text>This is title</Text>
        </View>
      </Animatable.Text> */}
      {/* <View>
      <MapView
        initialRegion={{
          latitude: 11.0168,
          longitude: 76.9558,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        style={{height:300, width:400}}
        
      >
        <Circle 
                center={{
                  latitude: 11.0168,
                  longitude: 76.9558
                }}
                radius={40}
                strokeColor="rgba(158, 158, 255, 1.0)"
                fillColor="rgba(158, 158, 255, 0.3)"
            />
      </MapView>
      </View>
      <Text>hiiiiiiiiiiii</Text> */}

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',    
  },
  text: {
    color: '#101010',
    fontSize: 24,
    fontWeight: 'bold'
  }
})

export default HomeScreen
