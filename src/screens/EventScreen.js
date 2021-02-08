import React, {useState, useEffect, useContext} from 'react'
import { Text, View, StyleSheet, ScrollView} from 'react-native'
import MyCard from '../components/MyCard'
import {authContext} from '../contexts/authContext'
import {eventContext} from '../contexts/eventContext'
import {Snackbar} from 'react-native-paper'



const EventScreen = ({navigation}) => {

    const {isVerified, setIsVerified} = useContext(authContext)
    const { eventDetails, fetched, msg, setMsg} = useContext(eventContext)
    
    
    const dummyDetails = [
        {
            date:'Fri, Nov 27, 2020',
            time: '12:00 AM',
            title:'An begginer on guide to how to start with js',
            description:'this is an example for an detaield description about the event which is going to be held in the date provided at the right time. So dont miss it , kudos man haha'
        }
        
    ]
    const [details, setDetails] = useState([]);    
    const [visible, setVisible] = useState(false);

    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);


    useEffect(() => {
        setDetails(eventDetails)
            
    }, [])
    
    // if(msg != ""){
    //     onToggleSnackBar()
    //     setTimeout(() => {
    //         setMsg('')
    //     }, 7000)
    // }

    return(
        <ScrollView style={{backgroundColor:'#f5f5f5', flex:1,  paddingHorizontal:20, paddingTop:20}}  showsHorizontalScrollIndicator={false} >                        
            { details.map(({id, date, time, title, description, from, address, name}) => <MyCard key={id} fav="false" address={address} name={name} date={date} time={time} title={title} description={description} from={from}  navigation={navigation} />) }
            <View style={{height:60}}></View>
            <Snackbar
                style={{ marginBottom:100, marginLeft:70,width:300}}
                visible={visible}
                onDismiss={onDismissSnackBar}
                action={{
                label: 'Undo',
                onPress: () => {
                    // Do something
                },
                }}>
                {msg}
            </Snackbar>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{        
        marginHorizontal:20,
        marginTop:40,
        
    }
})

export default EventScreen