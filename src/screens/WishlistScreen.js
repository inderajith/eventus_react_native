import React, {useState,useRef, useEffect,useContext} from 'react'
import {ActivityIndicator, Text, View, StyleSheet, ScrollView, FlatList, Image, Animated} from 'react-native'
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
    

    const scrollY = React.useRef(new Animated.Value(0)).current 
    const size = 160


    return(
        <View style={{backgroundColor:'#f5f5f5', paddingHorizontal:20, paddingTop:20}}>   
        <Image 
            source={{uri: 'https://images.pexels.com/photos/2013658/pexels-photo-2013658.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'}}
            style={StyleSheet.absoluteFillObject}
            blurRadius={80}

        />                         
            { wishlist.length == 0 ? showSpinner ? <MySpinner height={800}  /> : <Text style={{color:'#3399ff', marginLeft:30, marginTop:300, fontSize:25, fontWeight:'bold', textAlign:'center', marginRight:60}}>You have no items in your wishlist</Text>
                                   : <Animated.FlatList
                                        onScroll={Animated.event(
                                            [{nativeEvent: {contentOffset: {y: scrollY}}}],
                                            {useNativeDriver:true}
                                        )} 
                                        showsHorizontalScrollIndicator={false}
                                        showsVerticalScrollIndicator={false}
                                       data={wishlist}
                                       keyExtractor={item => item._id}
                                       renderItem={ ({item, index}) => {                                           
                                                    
                                                    const inputRange = [
                                                        -1,
                                                        0,
                                                        size*index,
                                                        size*(index + 2)
                                                    ]
                                                    const opacityInputRange = [
                                                        -1,
                                                        0,
                                                        size*index,
                                                        size*(index + 1)
                                                    ]
                                                    const scale = scrollY.interpolate({
                                                        inputRange,
                                                        outputRange: [1,1,1,0] 
                                                    })
                                                    const opacity = scrollY.interpolate({
                                                        inputRange:opacityInputRange,
                                                        outputRange: [1,1,1,0] 
                                                    })
                                                    const {_id, date, time, title, description, from, address, name, urlID,longitude, latitude} = item 
                                                    return (
                                                        <Animated.View style={{transform:[{scale}], opacity }} >
                                                        <MyCard 
                                                            key={_id} 
                                                            id={_id} 
                                                            urlID={urlID}                                                
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
                                                        </Animated.View>
                                                    )

                                           }
                                       }
                                   />
            }                        
            <View style={{height:60}}></View>
        </View>
    )

    // wishlist.map(({_id, date, time, title, description, from, address, name, urlID,longitude, latitude}) => 
    //                                     (
    //                                         <MyCard 
    //                                             key={_id} 
    //                                             id={_id} 
    //                                             urlID={urlID}                                                
    //                                             address={address} 
    //                                             name={name} 
    //                                             date={date} 
    //                                             time={time} 
    //                                             title={title} 
    //                                             description={description} 
    //                                             from={from} 
    //                                             navigation={navigation}
    //                                             longitude={longitude}
    //                                             latitude={latitude}
    //                                             showIcon={true}                                        
    //                                         />
    //                                     )
    //                                 ) 
}

const styles = StyleSheet.create({
    container:{        
        marginHorizontal:20,
        marginTop:40,
        
    }
})

export default WishlistScreen