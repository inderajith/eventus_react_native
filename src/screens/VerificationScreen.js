import React, {useContext, useEffect, useState} from 'react'
import {Text, Image, View} from 'react-native'
import EventTabNavigator from '../navigation/EventTabNavigator'
import MainStackNavigator from '../navigation/MainStackNavigation'
import {authContext} from '../contexts/authContext'
import {eventContext} from '../contexts/eventContext'
import TestingScreen from './TestingScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MySpinner from '../components/MySpinner'
import HomeScreen from './HomeScreen'
import AppIntroSlider from 'react-native-app-intro-slider';
import { Ionicons, AntDesign  } from '@expo/vector-icons'; 


function VerificationScreen() {

    const {isVerified, setIsVerified, setMyEmail} = useContext(authContext)    
    const {getEvents} = useContext(eventContext)    
    const [showSpinner, setShowSpinner] = useState(true)
    const [showRealApp, setShowRealApp] = useState(false)

    const img1 = require('../../assets/eimg1.png')
    const img2 = require('../../assets/eimg2.png')
    const img3 = require('../../assets/eimg3.png')

    const slides = [
        {
          key: 1,
          title: 'Connects Us',
          text: 'Explore and share your ideas with other peoples and grow your community.',
          image: img1,          
        },
        {
          key: 2,
          title: 'Wishlist',
          text: 'Save the event you like to attend. We will notify you when it arrives.',
          image: img2,          
        },
        {
          key: 3,
          title: 'Start to explore',
          text: 'Let\'s explore the upcoming events and enjoy them.',
          image: img3,          
        }
      ];

    const verifyStorage = async () => {
        try{
            const email = await AsyncStorage.getItem('email')             
            if(email){                
                setMyEmail(email)
                setIsVerified(true)
                // getEvents()
            }
            
        }
        catch(err){
            console.log('err: ', err)
        }
    }

    const renderItem = ({ item }) => {
        return (
          <View style={{flex:1, marginTop:200, marginHorizontal:20}}>
            <Image source={item.image} style={{ height: 300, width:'100%', resizeMode:'cover'}}/>
            <Text style={{
                marginTop:50,
                paddingTop: 25,
                paddingBottom:10, 
                fontSize:23, 
                fontWeight:'bold', 
                color:'#21465b', 
                alignSelf:'center'
            }}>{item.title}</Text>
            <Text style={{
             textAlign:'center'   ,
             color:'#b5b5b5',
             fontSize:15,
             paddingHorizontal:30 
            }}>{item.text}</Text>
            
          </View>
        );
      }

      const renderDoneButton = () => {
        return (
          <View style={{
            width: 40,
            height: 40,
            backgroundColor: 'rgba(0, 0, 0, .2)',
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center'
            }}>            
            {/* <Ionicons name="md-checkmark" size={24} color="rgba(255, 255, 255, .9)" /> */}
            <AntDesign name="arrowright" size={24} color="rgba(255, 255, 255, .9)" />
          </View>
        );
      }

    useEffect(() => {        
        setTimeout(() => {
            setShowSpinner(false)
        },1000)
        verifyStorage()

        return () => {
            console.log('unmounted in verification screen:')
        }
    }, [])

    console.log('val: ', showRealApp)

    return (              
        
            showSpinner ? <MySpinner /> 
                        :  isVerified ?   <EventTabNavigator /> 
                                      : showRealApp ? <MainStackNavigator />  : <AppIntroSlider renderItem={renderItem} activeDotStyle={{backgroundColor:'#21465b', width:30}} data={slides}  renderDoneButton={renderDoneButton} onDone={() => setShowRealApp(true)}/>
            // <HomeScreen />
            // <TestingScreen />
            
    )
}

export default VerificationScreen
