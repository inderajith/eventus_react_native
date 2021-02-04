import React, {useContext} from 'react'
import EventTabNavigator from '../navigation/EventTabNavigator'
import MainStackNavigator from '../navigation/MainStackNavigation'
import {authContext} from '../contexts/authContext'


function VerificationScreen() {

    const {isVerified} = useContext(authContext)    


    return (        
            isVerified ?  <EventTabNavigator />  : <MainStackNavigator />                
    )
}

export default VerificationScreen
