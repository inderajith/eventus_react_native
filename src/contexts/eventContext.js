import React, {useEffect, useState, useContext} from 'react'
import {authContext} from './authContext'
import axios from 'axios'

export const eventContext = React.createContext()

export default ({children}) => {

    const {baseUrl, myEmail} = useContext(authContext);

    const [fetched, setFetched] = useState('inder')
    const [eventDetails, setEventDetails] = useState([])
    const [wishlist, setWishlist] = useState([])
    const [msg, setMsg] = useState('')
    const event = []

    useEffect(() => {
        const accessToken = 'KAUdGmbj1DI-f24IcTFEzx1OEdsjULyMTECKSCbW'
        axios.get('https://api.predicthq.com/v1/events/',
            {
                headers:{'Authorization':'Bearer ' + accessToken},
                params:{
                    'place.scope':'CJB',
                    'category':'conferences'
                }
            }
        )
        .then((response) => {            
            const data = response.data.results
            data.map(item => {
                const id = item.id 
                const title = item.title                 
                const description = item.description.length < 5 ? "No description available" : item.description
                const location = item.location
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
                    from:"PredictHQ"           
                }
                // setEventDetails((prev) => [...prev, eventData ])
                event.push(eventData)                
            })            
            setEventDetails(event)
        })
        .catch((err) => {
            console.log('err in predicthq request: ', err);
        })

        // return () => {
        //     console.log('unmounted');
        // }
    },[])

    const myWishlist = (date, time, title, description, from, address, name, id) => {

        const wishlistData = {
            id,
            date,
            time, 
            title, 
            description,
            from, 
            address,
            name,
            myEmail
        }
        
            axios.post(`${baseUrl}/wishlist`, wishlistData)
             .then((response) => {
                 const msg = response.data.msg 
                 console.log('msg: ', msg);
                //  setMsg(msg)                 
             })
             .catch((err) => {
                 console.log('err in add wishlist: ', err);
                //  setMsg('failed to add wishlist')
             })        
    }


    const getWish = () => {
        axios.get(`${baseUrl}/wishlist/${myEmail}`)
             .then((response)=>{
                 setWishlist(response.data.wishlists)
             })
             .catch(err => {
                 console.log('err in pass mail' , err);
             })
    }
    

    return(
        <eventContext.Provider value={{eventDetails, fetched, msg, setMsg, myWishlist,getWish,wishlist}}>
            {children}
        </eventContext.Provider>
    )
}


//https://control.predicthq.com/search/events/geqpewyWCnRDUJQRxA


// Object {
//     "aviation_rank": 100,
//     "brand_safe": true,
//     "category": "public-holidays",
//     "country": "IN",
//     "description": "Easter Sunday commemorates Jesus Christ’s resurrection, according to Christian belief.",
//     "duration": 86399,
//     "entities": Array [],
//     "first_seen": "2019-09-04T17:56:43Z",
//     "id": "gGN9KDgBp2WWa43tnF",
//     "labels": Array [
//       "holiday",
//       "holiday-national",
//     ],
//     "local_rank": null,
//     "location": Array [
//       78.96288,
//       20.593684,
//     ],
//     "phq_attendance": null,
//     "place_hierarchies": Array [
//       Array [
//         "6295630",
//         "6255147",
//         "1269750",
//       ],
//     ],
//     "rank": 90,
//     "relevance": 1,
//     "scope": "country",
//     "start": "2021-04-04T00:00:00Z",
//     "state": "active",
//     "timezone": null,
//     "title": "Easter Day",
//     "updated": "2021-02-06T00:04:53Z",
//   },
// ],
// }