import React, {useState, useEffect} from 'react'
import axios from 'axios'


export const authContext = React.createContext()




export default ({children}) => {
    
    const [isVerified, setIsVerified] = useState(false);
    const baseUrl = 'http://b900dc5f7428.ngrok.io'

    const signin = (email, password) => {    

        axios.post(`${baseUrl}/signin`,{email, password})
             .then((response) => {
                 const {msg, verified} = response.data
                 setIsVerified(verified)                 
                 console.log('msg: ', msg);
             })
             .catch((err) => {
                 console.log('err in authcontext signin: ', err);
             })
    }

    const signup = (username, email, password) => {    

        axios.post(`${baseUrl}/signup`,{username, email, password})
             .then((response) => {
                 const {msg, verified} = response.data
                 setIsVerified(verified)
                 console.log('msg: ', msg);
             })
             .catch((err) => {
                 console.log('err in authcontext signup: ', err);
             })
    }

    return(
        <authContext.Provider value={{isVerified,setIsVerified, signin, signup} }>
            {children}
        </authContext.Provider>
    )
}