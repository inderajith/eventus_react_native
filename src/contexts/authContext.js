import React, {useState, useEffect} from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const authContext = React.createContext()

export default ({children}) => {
    
    const [isVerified, setIsVerified] = useState(false);
    const [myEmail, setMyEmail] = useState('')
    const [settingsData, setSettingsData] = useState({})

    const baseUrl = 'http://137f9f0490ad.ngrok.io'

    const signin = (email, password) => {    

        axios.post(`${baseUrl}/signin`,{email, password})
             .then((response) => {
                 const {msg, verified, mailID} = response.data
                 setIsVerified(verified)
                 setMyEmail(email)
                 AsyncStorage.setItem('email', mailID)
                 console.log('msg: ', msg);
             })
             .catch((err) => {
                 console.log('err in authcontext signin: ', err);
             })
    }

    const signup = (username, email, password, interest) => {    

        axios.post(`${baseUrl}/signup`,{username, email, password, interest})
             .then((response) => {
                 const {msg, verified} = response.data
                 setIsVerified(verified)
                 console.log('msg: ', msg);
             })
             .catch((err) => {
                 console.log('err in authcontext signup: ', err);
             })
    }

    const getProfileData = () => {
        axios.get(`${baseUrl}/settings/${myEmail}`)
             .then((response) => {
                const {username, email, interest} = response.data.profileData[0]
                console.log('username: ', username);
                setSettingsData({username, email, interest})                  
             })
             .catch((err) => {
                console.log('err in authcontext getProfile: ', err);
            })
    }

    const updateProfile = (interest, username) => {
        axios.put(`${baseUrl}/settings/${myEmail}`, {interest, username})
            .then((response) => {
                console.log(response.data.msg)
            })
            .catch((err) => {
                console.log('err in authcontext updateProfile: ', err);
            })
    }

    const changePassword = (oldPassword, newPassword) => {
        axios.post(`${baseUrl}/settings/changepassword`, {oldPassword, newPassword, myEmail})
             .then((response) => {
                 console.log('change password client: ', response.data.msg)
             })
             .catch((err) => {
                console.log('err in change password client: ', err);
            })

    }

    return(
        <authContext.Provider value={{isVerified, baseUrl, myEmail, settingsData, changePassword, setIsVerified, signin, signup, getProfileData, updateProfile, setMyEmail} }>
            {children}
        </authContext.Provider>
    )
}
