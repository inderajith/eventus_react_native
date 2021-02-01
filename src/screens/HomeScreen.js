import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Button } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function HomeScreen({navigation}) {
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ebebeb'
  },
  text: {
    color: '#101010',
    fontSize: 24,
    fontWeight: 'bold'
  }
})

export default HomeScreen
