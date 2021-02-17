import React, {useContext, useEffect, useState} from 'react'
import {Text} from 'react-native'
import EventTabNavigator from '../navigation/EventTabNavigator'
import MainStackNavigator from '../navigation/MainStackNavigation'
import {authContext} from '../contexts/authContext'
import {eventContext} from '../contexts/eventContext'
import TestingScreen from './TestingScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MySpinner from '../components/MySpinner'
import HomeScreen from './HomeScreen'


function VerificationScreen() {

    const {isVerified, setIsVerified, setMyEmail} = useContext(authContext)    
    const {getEvents} = useContext(eventContext)    
    const [showSpinner, setShowSpinner] = useState(true)

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

    useEffect(() => {        
        setTimeout(() => {
            setShowSpinner(false)
        },1000)
        verifyStorage()

        return () => {
            console.log('unmounted in verification screen:')
        }
    }, [])

    return (              
            showSpinner ? <MySpinner /> : isVerified ?   <EventTabNavigator /> :<MainStackNavigator />  
            // <HomeScreen />
            // <TestingScreen />
    )
}

export default VerificationScreen
