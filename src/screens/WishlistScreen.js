import React, {useState, useEffect,useContext} from 'react'
import {ActivityIndicator, Text, View, StyleSheet, ScrollView} from 'react-native'
import MyCard from '../components/MyCard'
import {eventContext} from '../contexts/eventContext';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import MySpinner from '../components/MySpinner';


const WishlistScreen = ({navigation}) => {    

    const {getWish, wishlist, deleteWish} = useContext(eventContext)    
    const [showSpinner, setShowSpinner] = useState(true)
    
    

    useEffect(() => {


        const unsubscribe = navigation.addListener('focus', () => {
            getWish();    
            setTimeout(() => {
                if(wishlist.length == 0)
                {
                    setShowSpinner(false)
                }
            },5000)
            console.log('wishlist rendered');                  
        })        

        return unsubscribe
    }, [navigation])


    let myIcon = (<FontAwesome name="heart" size={24} onPress={() => deleteWishlist()} color="red" style={{marginLeft:20}} />)

    return(
        <ScrollView style={{backgroundColor:'#f5f5f5', flex:1,  paddingHorizontal:20, paddingTop:20}}  showsHorizontalScrollIndicator={false} >                            
            { wishlist.length == 0 ? showSpinner ? <MySpinner height={800}  /> : <Text style={{color:'#3399ff', marginLeft:30, marginTop:300, fontSize:25, fontWeight:'bold', textAlign:'center', marginRight:60}}>You have no items in your wishlist</Text>
                                   : wishlist.map(({_id, date, time, title, description, from, address, name, urlID,longitude, latitude}) => 
                                        (
                                            <MyCard 
                                                key={_id} 
                                                id={_id} 
                                                urlID={urlID}
                                                fav={myIcon} 
                                                address={address} 
                                                name={name} 
                                                date={date} 
                                                time={time} 
                                                title={title} 
                                                description={description} 
                                                from={from} 
                                                navigation={navigation}
                                                longitude={longitude}
                                                latitude={latitude}
                                                showIcon={true}                                        
                                            />
                                        )
                            ) 
            }                        
            <View style={{height:60}}></View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{        
        marginHorizontal:20,
        marginTop:40,
        
    }
})

export default WishlistScreen