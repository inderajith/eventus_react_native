import React from 'react'
import {Text, View, StyleSheet, Image, ScrollView, Linking} from 'react-native'
import { Title,Paragraph, Button   } from 'react-native-paper';
import { MaterialIcons, Ionicons, FontAwesome5, Entypo  } from '@expo/vector-icons';
import MapView, {Circle} from 'react-native-maps';

const EventDetails = ({ route, navigation}) => {        

    const {date, time, title, description, from, address, name, urlID, longitude, latitude} = route.params 
    console.log('address: ', address);
    

    
    return(
        <ScrollView style={styles.container}>
          <MapView
                initialRegion={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
                }}
                style={{height:250, marginHorizontal:5, marginVertical:20}}
                
            >
                <Circle 
                        center={{
                        latitude: latitude,
                        longitude: longitude
                        }}
                        radius={40}
                        strokeColor="rgba(158, 158, 255, 1.0)"
                        fillColor="rgba(158, 158, 255, 0.3)"
                    />
            </MapView>
          <Title style={styles.title}>{title}</Title>
          <Paragraph style={styles.description}>{description}</Paragraph>
          <Text style={{color:'#939596', marginBottom:20}}>from {from}</Text>
          {name == "" ? null : (
              <View>
                <Text style={{color:'#787878', marginBottom:10}}><FontAwesome5 name="building" size={24} color="#787878" />{name}</Text>                
              </View>
              )}
          {address == "" ? null : (
              <View>
                <Text style={{color:'#787878', marginBottom:10}}><Entypo name="address" size={24} color="#787878" />{address}</Text>                
              </View>
              )}
          <Text style={styles.date}><MaterialIcons name="date-range" size={24} color="grey" />{date}</Text>
          {time == "" ? null : <Text style={styles.time}><Ionicons name="time-outline" size={24} color="grey" /> {time}</Text> }
          
          <Button mode="contained"style={{backgroundColor:'#3399ff', marginVertical:30, marginRight:10}} onPress={() => Linking.openURL(`https://events.predicthq.com/events/${urlID}`)}>
            Go to event
          </Button>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        marginTop:50,
        marginLeft:10,
        flex:1
    },  
    title:{
        fontSize:30
    },description:{
        marginTop:20,
        fontSize:17,
        marginBottom:10
    },
    date:{
        marginTop:10,
        color:'grey'
    },
    time:{
        marginTop:10,
        color:'grey'
    },
    img:{
        height:200,
        width:410,
        marginBottom:30
    }
})

export default EventDetails