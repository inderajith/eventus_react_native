import React, {useState, useEffect} from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const authContext = React.createContext()

export default ({children}) => {
    
    const [isVerified, setIsVerified] = useState(false);
    const [myEmail, setMyEmail] = useState('')
    const [settingsData, setSettingsData] = useState({})
    const [message, setMessage] = useState('')

    const baseUrl = 'http://2d4a2fddad2d.ngrok.io'

    const signin = (email, password, cb) => {            

        axios.post(`${baseUrl}/signin`,{email, password})
             .then((response) => {
                 const {msg, verified, mailID} = response.data
                 setMessage(msg)
                 cb()                     
                 if(verified)
                 {
                     setMyEmail(email)
                     AsyncStorage.setItem('email', mailID)
                      setIsVerified(verified)
                }
             })
             .catch((err) => {
                 console.log('err in authcontext signin: ', err);
             })
    }

    const signup = (username, email, password, interest, cb) => {    

        axios.post(`${baseUrl}/signup`,{username, email, password, interest})
             .then((response) => {
                 const {msg, verified} = response.data
                 setMessage(msg)
                 cb()
                 if(verified){
                     setMyEmail(email)
                     AsyncStorage.setItem('email', email)
                     setIsVerified(verified)               
                 }

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
        <authContext.Provider value={{isVerified, baseUrl,message, myEmail, settingsData, changePassword, setIsVerified, signin, signup, getProfileData, updateProfile, setMyEmail} }>
            {children}
        </authContext.Provider>
    )
}
