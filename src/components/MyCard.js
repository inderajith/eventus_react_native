import React from 'react'
import { StyleSheet} from 'react-native'
import {Title,Paragraph, Card, Button, Divider, Text } from 'react-native-paper';
import { Entypo, FontAwesome } from '@expo/vector-icons';


function MyCard(props) {
    const {date, time, title, description,  navigation, fav} = props 
    
    let favIcon = <FontAwesome name="heart-o" size={24} color="red" style={{marginLeft:20}} />
    
    if(fav == "true"){        
        favIcon = <FontAwesome name="heart" size={24} color="red" style={{marginLeft:20}} />
    }
    
    return (
        <Card style={{marginTop:20}}>
                <Card.Content>  
                    <Paragraph style={{color: '#a6a6a6'}}>{date} {time}  IST</Paragraph>
                    <Title style={{marginBottom:30, color: '#707070'}}>{title}</Title>
                </Card.Content>
                <Divider />
                <Card.Actions>
                    <Button onPress={() => {
                        navigation.setOptions({tabBarVisible:true})
                        navigation.navigate('EventDetails', {date, time, title, description})}
                    }>
                    <Text style={{color:'#a6a6a6'}}>Click to know more</Text></Button>                    
                    <Entypo name="share" size={24} color="#3399ff" style={{marginLeft:120}} />                    
                    {favIcon}
                </Card.Actions>
            </Card>
    )
}


const styles = StyleSheet.create({
    container:{        
        marginHorizontal:20,
        marginTop:40,
        
    }
})

export default MyCard
