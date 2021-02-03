import React, {useState, useEffect} from 'react'
import { Text, View, StyleSheet, ScrollView} from 'react-native'
import MyCard from '../components/MyCard'


const WishlistScreen = ({navigation}) => {

    const dummyDetails = [
        {
            date:'Fri, Nov 27, 2020',
            time: '12:00 AM',
            title:'An begginer guide to how to start with js',
            description:'this is an example for an detaield description about the event which is going to be held in the date provided at the right time. So dont miss it , kudos man haha'
        },
        {
            date:'Tue, Jan 14, 2020',
            time: '07:00 PM',
            title:'React Native vs Flutter which will be good according to your necessity',
            description:'this is an example for an detaield description about the event which is going to be held in the date provided at the right time. So dont miss it , kudos man haha'
        },
        
    ]
    const [details, setDetails] = useState([]);

    useEffect(() => {
        setDetails(dummyDetails);
    }, [])

    return(
        <ScrollView style={{backgroundColor:'#f5f5f5', flex:1,  paddingHorizontal:20, paddingTop:20}}  showsHorizontalScrollIndicator={false} >                            
            { details.map(({date, time, title, description}) => <MyCard fav="true" key={title} date={date} time={time} title={title} description={description} navigation={navigation} />) }                        
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