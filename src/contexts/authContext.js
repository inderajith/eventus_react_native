import React, {useState, useEffect} from 'react'
import axios from 'axios'

export const authContext = React.createContext()

export default ({children}) => {
    
    const [isVerified, setIsVerified] = useState(false);
    const [myEmail, setMyEmail] = useState('')
    const [settingsData, setSettingsData] = useState({})

    const baseUrl = 'http://91bf78dfdb17.ngrok.io'

    const signin = (email, password) => {    

        axios.post(`${baseUrl}/signin`,{email, password})
             .then((response) => {
                 const {msg, verified} = response.data
                 setIsVerified(verified)
                 setMyEmail(email)
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

    return(
        <authContext.Provider value={{isVerified, baseUrl, myEmail, settingsData, setIsVerified, signin, signup, getProfileData, updateProfile} }>
            {children}
        </authContext.Provider>
    )
}




// {
//             "relevance": 1.0,
//             "id": "wm7vxNw6oPzvaMUeRN",
//             "title": "International Conference on Civil, Mechanical, Robotics, Electronics and Electrical Engineering",
//             "description": "",
//             "category": "conferences",
//             "labels": [
//                 "conference",
//                 "education",
//                 "technology"
//             ],
//             "rank": 40,
//             "local_rank": 50,
//             "aviation_rank": 0,
//             "phq_attendance": 300,
//             "entities": [
//                 {
//                     "entity_id": "36xPK39RNqKTxaRnFS4wYY4",
//                     "name": "VIjay Park Inn",
//                     "formatted_address": "101\nSenguptha Street\nRam Nagar\nRam Nagar\nCoimbatore\nTamil Nadu 641009\nIndia",
//                     "type": "venue"
//                 }
//             ],
//             "duration": 32400,
//             "start": "2020-10-04T03:30:00Z",
//             "end": "2020-10-04T12:30:00Z",
//             "updated": "2020-10-04T08:19:35Z",
//             "first_seen": "2020-08-02T11:59:19Z",
//             "timezone": "Asia/Kolkata",
//             "location": [
//                 76.960446,
//                 11.010785
//             ],
//             "scope": "locality",
//             "country": "IN",
//             "place_hierarchies": [
//                 [
//                     "6295630",
//                     "6255147",
//                     "1269750",
//                     "1255053",
//                     "1273866",
//                     "1273865"
//                 ]
//             ],
//             "state": "active",
//             "brand_safe": true
//         }