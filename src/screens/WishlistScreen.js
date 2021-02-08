import React, {useState, useEffect,useContext} from 'react'
import { Text, View, StyleSheet, ScrollView} from 'react-native'
import MyCard from '../components/MyCard'
import {eventContext} from '../contexts/eventContext';


const WishlistScreen = ({navigation}) => {    
    const {getWish, wishlist} = useContext(eventContext)
    const dummyDetails = [
        {
            date:'Fri, Nov 27, 2020',
            time: '12:00 AM',
            title:'An begginer guide to how to start with js',
            description:'this is an example for an detaield description about the event which is going to be held in the date provided at the right time. So dont miss it , kudos man haha'
        }
        
    ]
    const [details, setDetails] = useState([]);
    console.log('details: ', details);

    useEffect(() => {
        setDetails(wishlist);
        console.log("----------------------------------------------------------------");
        console.log('wishlist screen: ', wishlist);
        
        getWish();
    }, [])

    return(
        <ScrollView style={{backgroundColor:'#f5f5f5', flex:1,  paddingHorizontal:20, paddingTop:20}}  showsHorizontalScrollIndicator={false} >                            
            { wishlist.map(({_id, date, time, title, description, from, address, name}) => <MyCard fav="true" key={_id} fav="false" address={address} name={name} date={date} time={time} title={title} description={description} from={from} navigation={navigation} />) }                        
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