import React, {useState,useContext, useEffect} from 'react'
import {View, StyleSheet, Share} from 'react-native'
import {eventContext} from '../contexts/eventContext'
import {Title,Paragraph, Card, Button, Divider, Text , Snackbar} from 'react-native-paper';
import { Entypo, FontAwesome } from '@expo/vector-icons';

function MyCard(props) {
    const {date, time, title, description,  navigation, from, address, name, id, showIcon, urlID, longitude, latitude} = props     

    const {myWishlist, deleteWish,wishlistID} = useContext(eventContext)

    const [myMessage, setMyMessage] = useState('');
    const [containsID, setContainsID] = useState(false)     
    const [visible, setVisible] = useState(false);

    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);
    
    const addWishlist = () => {
        myWishlist(date, time, title, description, from, address, name, id, urlID,latitude, longitude, onToggleSnackBar, setMyMessage)                
        setTimeout(() => {
            setContainsID(true)        
        }, 2000)
        console.log('Wishlist added');            
    }
            
    const deleteWishlist = () => {
        deleteWish(id, onToggleSnackBar, setMyMessage)        
        console.log('wishlist deleted')
    }
            
    const shareID = () => {
        const linkID = `https://events.predicthq.com/events/${urlID}`
        Share.share({
        message: linkID
        })
        .then(() => console.log('link shared'))
        .catch(() => console.log('failed to share the link'))
    }    
    
    useEffect(() => {
        setContainsID(wishlistID.includes(urlID))                
    },[ containsID])
    
    return (
        <Card style={{marginTop:20}} >
                <Card.Content>  
                    <Paragraph style={{color: '#a6a6a6'}}>{date} {time}</Paragraph>
                    <Title style={{marginBottom:30, color: '#707070'}}>{title}</Title>
                </Card.Content>
                <Divider />
                <Card.Actions>
                    <Button onPress={() => {
                        navigation.setOptions({tabBarVisible:true})
                        navigation.navigate('EventDetails', {date, time, title, description, from, address, name, urlID, longitude, latitude})}
                    }>
                    <Text style={{color:'#a6a6a6'}}>Click to know more</Text></Button>                    
                    <Entypo name="share" size={24} color="#3399ff" onPress={shareID} style={{marginLeft:120}} />                                                
                    <FontAwesome name={showIcon ? "heart" : containsID ? "heart" :"heart-o" } size={24} onPress={showIcon ? deleteWishlist : addWishlist} color="red" style={{marginLeft:20}} />                                                                        
                </Card.Actions>
                <Snackbar
                style={{position:'relative',top:1,left:30, width:300}}                
                visible={visible}
                onDismiss={onDismissSnackBar}
                duration={1000}
                action={{  
                    label: 'close',
                onPress: () => {
                    // Do something
                },
                }}>
                {myMessage}
            </Snackbar>
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
