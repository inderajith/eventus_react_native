import React from 'react'
import {Text, View, StyleSheet, Image, ScrollView} from 'react-native'
import { Title,Paragraph, Button   } from 'react-native-paper';
import { MaterialIcons, Ionicons, FontAwesome5, Entypo  } from '@expo/vector-icons';

const EventDetails = ({ route, navigation}) => {        

    const {date, time, title, description, from, address, name} = route.params 
    console.log('address: ', address);
    

    
    return(
        <ScrollView style={styles.container}>
          <Image
            style={styles.img}
            source={require('../../assets/jsImage.jpg')}
          />
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
          
          <Button mode="contained"style={{backgroundColor:'#3399ff', marginVertical:30, marginRight:10}} onPress={() => console.log('clg')}>
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