import React, {useState, useEffect, useContext} from 'react'
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Platform , Animated, Image} from 'react-native'
import MyCard from '../components/MyCard'
import {authContext} from '../contexts/authContext'
import {eventContext} from '../contexts/eventContext'
import {Searchbar, Button, Divider, Snackbar } from 'react-native-paper'
import { Entypo, FontAwesome, MaterialCommunityIcons  } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import MySpinner from '../components/MySpinner'
// import DatePicker from 'react-native-datepicker'
// import { Dropdown } from 'react-native-material-dropdown';
// import {Picker} from '@react-native-picker/picker';


const EventScreen = ({navigation}) => {

    const {isVerified, setIsVerified} = useContext(authContext)
    const { eventDetails,wishlistID, fetched, myWishlist, keywords,getEvents, startDate, endDate, country, category ,setKeywords, setStartDate,setEndDate, setCountry,setCategory, getWishlistID} = useContext(eventContext) 
    
    const [details, setDetails ] = useState([])
    const [filter, setFilter] = useState(false)
    const [filterText, setFilterText] = useState(true)
    const [showBtn, setShowBtn] = useState(true);
    const [dropStyle, setDropStyle] = useState(false);
    const [date, setDate] = useState(new Date());      
    const [show, setShow] = useState(false);
    const [showSpinner, setShowSpinner] = useState(true);
    
    
   

    
    
    const showDatepicker = () => {
        setShow(true); 
    };
    
    const submitFilter = () => {
        console.log('category: ', category);
        console.log('country: ', country);
        console.log('endDate: ', endDate);
        console.log('startDate: ', startDate);
        console.log('keywords: ', keywords);
        onToggleSnackBar()
        getEvents()
    }
    const dateChange = (event, selectedDate) => {        
        const currentDate = selectedDate || date;
        // setShow(Platform.OS === 'ios');
        setShow(false);
        setDate(currentDate);        
        const formattedDate = currentDate.toISOString().slice(0,10)
        setStartDate(formattedDate)        


      };

      const [visible, setVisible] = useState(false);
      const onToggleSnackBar = () => setVisible(!visible);
      const onDismissSnackBar = () => setVisible(false);


    const showFilters = () => {
        return(
            <View style={{ minHeight: dropStyle ? 350 : 200}}>   
                <Snackbar
                    style={{position:'relative',top:400,left:40, width:250}}                
                    visible={visible}
                    onDismiss={onDismissSnackBar}
                    duration={100}
                    action={{                
                    onPress: () => {
                        // Do something
                    },
                    }}>
                    Filters have been applied
                </Snackbar>             
                <Searchbar
                    placeholder="Search"
                    value={keywords}
                    onChangeText={val => setKeywords(val)}
                />

                <View style={{marginTop:20, flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>                                                 
                    <Button mode="outlined" style={{width:120, borderColor:'#3e7fed'  }} labelStyle={{color:"#3e7fed"}} onPress={() => showDatepicker()}>
                                    Pick a date
                    </Button>
                    <Text style={{color:'white'}}>{startDate}</Text>
                    {show && (
                        <DateTimePicker                    
                        value={date}
                        mode='date'                    
                        minimumDate={new Date()}                    
                        onChange={dateChange}
                        is24Hour={true}
                        display="default"                                            
                        />
                    )}
                </View>
                
                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'flex-end'}}>
                <View style={{ marginTop:20, width:150}}>
                <Text style={{color:'white'||'#c9c9c9', marginBottom:4, marginLeft:2}}>Category</Text>
                <DropDownPicker
                labelStyle={{color:'grey'}}                
                items={[
                    {label: 'All', value: 'conferences,school-holidays,public-holidays,observances,politics,expos,concerts,festivals,performing-arts,sports,community,daylight-savings,airport-delays,severe-weather,disasters,terror,health-warnings'},
                    {label: 'Awareness', value: 'daylight-savings,airport-delays,severe-weather,disasters,terror,health-warnings'},
                    {label: 'conferences', value: 'conferences'},
                    {label: 'concerts', value: 'concerts'},
                    {label: 'festivals', value: 'school-holidays,public-holidays,festivals'},                    
                    

                ]}
                defaultValue='conferences,school-holidays,public-holidays,observances,politics,expos,concerts,festivals,performing-arts,sports,community,daylight-savings,airport-delays,severe-weather,disasters,terror,health-warnings'
                containerStyle={{height: 40}}
                style={{backgroundColor: '#fafafa'}}
                itemStyle={{
                    justifyContent: 'flex-start'                    
                }}
                dropDownStyle={{backgroundColor: '#fafafa', minHeight:150}}
                onChangeItem={item => {                                    
                    setCategory(item.value)
                    }}
                activeLabelStyle={{color:'#3399ff'}}
                onClose={() => {                    
                    setDropStyle(false)
                    setFilterText(true)
                    }}
                onOpen={() => {                    
                    setDropStyle(true)
                    setFilterText(false)
                    }}                                
                />
                </View>

                <View style={{ width:150}}>
                <Text style={{color:'white'||'#c9c9c9', marginBottom:4, marginLeft:2}}>Place</Text>
                <DropDownPicker
                labelStyle={{color:'grey'}}                
                items={[
                    {label: 'Bangalore', value: 'BOM'},
                    {label: 'Ariyalur', value: 'ALU'},
                    {label: 'Coimbatore', value: 'CJB'},                    
                    {label: 'Delhi', value: 'DEL'},                    
                    {label: 'Kerala', value: 'TRV'},
                    {label: 'Sydney', value: 'YQY'},
                    

                ]}
                defaultValue={'CJB'}                
                containerStyle={{height: 40}}
                style={{backgroundColor: '#fafafa'}}
                itemStyle={{
                    justifyContent: 'flex-start'                                    
                }}
                dropDownStyle={{backgroundColor: '#fafafa', minHeight:180}}
                onChangeItem={item => {                                    
                    setCountry(item.value)
                    }}
                activeLabelStyle={{color:'#3399ff'}}
                onClose={() => {
                    setShowBtn(true)
                    setFilterText(true)
                    setDropStyle(false)
                    }}
                onOpen={() => {
                    setShowBtn(false)
                    setFilterText(false)
                    setDropStyle(true)
                    }}
                
                />
                </View>
                </View>

                
                {
                    showBtn ? (
                                <Button mode="contained" style={{width:100, marginTop:20, marginLeft:240, backgroundColor:'#3399ff' }} labelStyle={{color:"white"}} onPress={() => submitFilter()}>
                                    search
                                </Button>
                              )
                            : (<View style={{height:10, position:'relative'}}><Text></Text></View>)
                }
                
                {
                    filterText ? (<Text onPress={() => setFilter(!filter)} style={{color:'white', position:'absolute', bottom:5}}><MaterialCommunityIcons name="filter-minus" size={24} color="white"/>Hide filter</Text>)
                               : null 
                }

            </View>
        )
    }


    useEffect(() => {
        setTimeout(() => {
            if(eventDetails.length == 0)
                setShowSpinner(false)
    
        }, 5000)
    
        const unsubscribe = navigation.addListener('focus', () => {
            setDetails(eventDetails)        
            getWishlistID()            
            getEvents();
            console.log('event screen mounted');
        })
        
        return unsubscribe
            
    }, [navigation, wishlistID])
    
    
    const scrollY = React.useRef(new Animated.Value(0)).current     
    const size = 160
    

    return(
        <View style={{backgroundColor:'#f5f5f5', flex:1,  paddingHorizontal:20, paddingVertical:42}}   >                        
            <Image 
                source={{uri: 'https://images.pexels.com/photos/2127789/pexels-photo-2127789.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'}}
                style={StyleSheet.absoluteFillObject}
                blurRadius={80}                

            />  
            <View  style={{minHeight:20, backgroundColor:'rgba(255, 255, 255, 0.2)',  paddingVertical:10, paddingHorizontal:15, shadowColor:'grey', shadowOpacity:1, shadowOffset:10}}>
                {
                    filter ? showFilters()
                           : <Text style={{color:'white'}} onPress={() => setFilter(!filter)} > <FontAwesome name="filter" size={24} color="white" />Show filters</Text> 
                }       
                
            </View>
            {/* <Divider style={{marginTop:20, zIndex:-3}}/> */}
            <View style={{ position:'relative', zIndex:1}}>            
            {   eventDetails.length == 0 
                        ? showSpinner ?  <MySpinner height={500} /> : <Text style={{color:'#3399ff', marginLeft:30, marginTop:300, fontSize:25, fontWeight:'bold', textAlign:'center', marginRight:60}}>No events Founds</Text>
                        : <Animated.FlatList
                                        onScroll={Animated.event(
                                            [{nativeEvent: {contentOffset: {y: scrollY}}}],
                                            {useNativeDriver:true}
                                        )} 
                                        showsHorizontalScrollIndicator={false}
                                        showsVerticalScrollIndicator={false}
                                       data={eventDetails}
                                       keyExtractor={item => item._id}                                       
                                       renderItem={ ({item, index}) => {                                           
                                                                                               
                                                    const inputRange = [
                                                        -1,
                                                        0,
                                                        size*index,
                                                        size*(index + 2)
                                                    ]
                                                    const opacityInputRange = [
                                                        -1,
                                                        0,
                                                        size*index,
                                                        size*(index + 1)
                                                    ]
                                                    const scale = scrollY.interpolate({
                                                        inputRange,
                                                        outputRange: [1,1,1,0] 
                                                    })
                                                    const opacity = scrollY.interpolate({
                                                        inputRange:opacityInputRange,
                                                        outputRange: [1,1,1,0] 
                                                    })
                                                    const {id, date, time, title, description, from, address, name, latitude, longitude} = item                                                     

                                                    return (
                                                        <Animated.View style={{transform:[{scale}], opacity }} >
                                                        <MyCard 
                                                            key={id} 
                                                            urlID={id}                                                 
                                                            address={address} 
                                                            name={name} 
                                                            date={date} 
                                                            time={time} 
                                                            title={title} 
                                                            description={description} 
                                                            from={from}  
                                                            navigation={navigation}   
                                                            latitude={latitude}
                                                            longitude={longitude}
                                                            showIcon={false}                                                                                            
                                                        />
                                                        </Animated.View>
                                                            )

                                                    }
                                                }
                                            />
                
            }
            </View>
            
            <View style={{height:60}}></View>
            
        </View>
    )

}

// eventDetails.map(({id, date, time, title, description, from, address, name, latitude, longitude}) => 
//                                         (
//                                             <MyCard 
//                                                 key={id} 
//                                                 urlID={id}                                                 
//                                                 address={address} 
//                                                 name={name} 
//                                                 date={date} 
//                                                 time={time} 
//                                                 title={title} 
//                                                 description={description} 
//                                                 from={from}  
//                                                 navigation={navigation}   
//                                                 latitude={latitude}
//                                                 longitude={longitude}
//                                                 showIcon={false}       
//                                             />
//                                         )
//                                     ) 

const styles = StyleSheet.create({
    container:{        
        marginHorizontal:20,
        marginTop:40,
        
    }
})

export default EventScreen