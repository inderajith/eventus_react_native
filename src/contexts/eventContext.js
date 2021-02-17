import React, {useEffect, useState, useContext} from 'react'
import {authContext} from './authContext'
import axios from 'axios'

export const eventContext = React.createContext()


export default ({children}) => {
    const {baseUrl, myEmail} = useContext(authContext);

    const [fetched, setFetched] = useState('inder')
    const [eventDetails, setEventDetails] = useState([])
    const [wishlist, setWishlist] = useState([])
    const [wishlistID, setWishlistID] = useState([])
    const [message, setMessage] = useState('')
    const [showSnackbar, setShowSnackbar] = useState(false)
    const [keywords, setKeywords] = useState('')
    const [startDate, setStartDate] = useState('2021-02-17')
    const [endDate, setEndDate] = useState('2021-03-01')
    const [country, setCountry] = useState('CJB')
    const [category, setCategory] = useState('conferences,school-holidays,public-holidays,observances,politics,expos,concerts,festivals,performing-arts,sports,community,daylight-savings,airport-delays,severe-weather,disasters,terror,health-warnings')

    const event = []

    const getEvents = () => {        
        const accessToken = 'KAUdGmbj1DI-f24IcTFEzx1OEdsjULyMTECKSCbW'
        axios.get('https://api.predicthq.com/v1/events/',
            {
                headers:{'Authorization':'Bearer ' + accessToken},
                params:{
                    'place.scope':country,                    
                    'category':category,
                    'q':keywords,
                    'start.gte':startDate,
                    'start.lte':'2024-01-01'
                    
                }
            }
        )
        .then((response) => {            
            const data = response.data.results                              
            data.map(item => {
                const id = item.id 
                const title = item.title                 
                const description = item.description.length < 5 ? "No description available" : item.description
                const latitude = item.location[0]
                const longitude = item.location[1]
                const date = item.start.slice(0, 10) 
                const time = item.start.slice(11, 19) == '00:00:00' ? "" : item.start.slice(11, 19)
                let address = "";
                let name = "";
                if(item.entities.length != 0){
                    address = item.entities[0].formatted_address                    
                    name = item.entities[0].name                                                            
                }

                const eventData = {
                    id,
                    title,
                    description,
                    location,
                    date,
                    time,
                    address,
                    name,
                    latitude,
                    longitude,
                    from:"PredictHQ"           
                }
                // setEventDetails((prev) => [...prev, eventData ])
                event.push(eventData)                
            })                
                    setEventDetails(event)
                    getWishlistID()
                    console.log('event api fired:----------')                                     
        })
        .catch((err) => {
            console.log('err in predicthq request: ', err);
        })
    }    
        
            
    const getWish = () => {
        axios.get(`${baseUrl}/wishlist/${myEmail}`)
        .then((response)=>{
            setWishlist(response.data.wishlists)
        })
        .catch(err => {
            console.log('err in  get wishlist eventcontext: ' , err);
        })
    }

    const myWishlist = (date, time, title, description, from, address, name, id, urlID, latitude, longitude, cb, setMyMessage) => {

        const wishlistData = {
            id,
            date,
            time, 
            title, 
            description,
            from, 
            address,
            name,
            urlID,
            latitude,
            longitude,
            myEmail
        }
    
        axios.post(`${baseUrl}/wishlist`, wishlistData)
        .then((response) => {
            const {msg, action} = response.data 
            setMyMessage(msg)
            cb()
            getWishlistID()
        })
        .catch((err) => {
            console.log('err in add wishlist eventcontext: ', err);                                 
            })
    }
    
          
    
    const deleteWish = (id, cb, setMyMessage) => {
        axios.delete(`${baseUrl}/wishlist/${myEmail}/${id}`)
        .then((response) => {
            const {msg, action} = response.data 
            setMyMessage(msg)
            cb()
            getWish()
            getWishlistID()
            
        })
        .catch(err => {
            console.log('err in delete wishlist eventcontext: ' , err);
        })
    }


    const getWishlistID = () => {                
        axios.get(`${baseUrl}/wishlist/${myEmail}`)
        .then((response)=>{
            const arrayID = []
            response.data.wishlists.map(item => {
                arrayID.push(item.urlID)
            })
            setWishlistID(arrayID)
        })
        .catch(err => {
            console.log('err in  get wishlist ID eventcontext : ' , err);
        })
    }

    const fetchDate = () => {
        return new Promise((resolve, reject) => {
            let todayDate = new Date().toISOString().split('T')[0]
            setStartDate(todayDate)            
            resolve()
        })
    }


    useEffect(() => {                
        
        fetchDate()
            .then(() => {           
                getWishlistID()
                setTimeout(() => {
                    getEvents()
                }, 2000)
                
            })
        // return () => {
        //     console.log('unmounted');
        // }
    },[])

    return(
        <eventContext.Provider value={{eventDetails, fetched, keywords,category,message,showSnackbar, startDate, endDate, country ,setKeywords, setStartDate,setEndDate,setEventDetails, setCountry, setCategory, getEvents, myWishlist,getWish,getEvents, deleteWish,wishlist, getWishlistID, wishlistID}}>
            {children}
        </eventContext.Provider>
    )
}
