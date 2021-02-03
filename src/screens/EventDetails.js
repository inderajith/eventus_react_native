import React from 'react'
import {Text, View, StyleSheet, Image} from 'react-native'
import { Title,Paragraph, Button   } from 'react-native-paper';
import { MaterialIcons, Ionicons  } from '@expo/vector-icons';

const EventDetails = ({ route, navigation}) => {
    console.log('route: ', route);
    console.log('navigation: ', navigation);

    const {date, time, title, description} = route.params 
    

    
    return(
        <View style={styles.container}>
          <Image
            style={styles.img}
            source={require('../../assets/jsImage.jpg')}
          />
          <Title style={styles.title}>{title}</Title>
          <Paragraph style={styles.description}>{description}</Paragraph>
          <Text style={{color:'black'}}>from Eventbrite</Text>
          <Text style={styles.date}><MaterialIcons name="date-range" size={24} color="grey" />{date}</Text>
          <Text style={styles.time}><Ionicons name="time-outline" size={24} color="grey" /> {time}</Text>
          <Button mode="contained"style={{backgroundColor:'#3399ff', marginTop:30, marginRight:10}} onPress={() => console.log('clg')}>
            Go to event
          </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginTop:50,
        marginLeft:10
    },  
    title:{
        fontSize:30
    },description:{
        marginTop:20,
        fontSize:17 
    },
    date:{
        marginTop:40,
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