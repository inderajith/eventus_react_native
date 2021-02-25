import React, {useState, useEffect, useContext} from 'react'
import { View, StyleSheet, Image} from 'react-native'
import {Text, Title, TextInput, Button, Snackbar  } from 'react-native-paper'
import DropDownPicker from 'react-native-dropdown-picker';
import { Ionicons,Entypo, MaterialCommunityIcons    } from '@expo/vector-icons';
import {authContext} from '../contexts/authContext'
import AsyncStorage from '@react-native-async-storage/async-storage'



const SettingsScreen = ({navigation}) => {

    const {getProfileData, settingsData, updateProfile, setIsVerified} = useContext(authContext)
    const {username, email, interest} = settingsData

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getProfileData()
            console.log('settings page rendered');                  
        })        

        return unsubscribe
    }, [navigation])

    const [userName, setUserName] = useState(username);
    const [interests, setInterests] = useState(interest);    
    const [showBtn, setShowBtn] = useState(true);
    const [visible, setVisible] = useState(false);    

    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);
    const type = "outlined"

    const updateSettings = () => {
        updateProfile(interests,userName)
        onToggleSnackBar()
    }

    return(
        <View style={styles.container}>
        <Image 
            source={{uri: 'https://images.pexels.com/photos/2013658/pexels-photo-2013658.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'}}
            style={StyleSheet.absoluteFillObject}
            blurRadius={80}

        /> 
        <Button 
            mode="contained" 
            style={{backgroundColor:'red', width:90, position:'absolute', right:20, top:50}} 
            onPress={() => {
                AsyncStorage.removeItem('email')
                setIsVerified(false)

                }}>
            Logout
        </Button>
            <Title style={styles.title}>SETTINGS</Title>
            
            <TextInput
                label="Email"
                value={email}                
                mode={type}
                disabled
                style={{marginBottom:20}}
                
            />
            <TextInput
                label="Name"
                autoFocus={true}
                value={userName}
                defaultValue={username}
                onChangeText={e => setUserName(e)}
                mode={type}
                style={{marginBottom:20}}
                theme={{ colors: { primary: '#6f7070'}}}
                
            />

            <DropDownPicker
                labelStyle={{color:'grey'}}                
                items={[                
                    {label: 'conferences', value: 'conferences', icon: () => <Ionicons name="newspaper-outline" size={24} color="black" />},
                    {label: 'Awareness', value: 'daylight-savings,airport-delays,severe-weather,disasters,terror,health-warnings', icon: () => <Entypo name="awareness-ribbon" size={24} color="black" />},                    
                    {label: 'concerts', value: 'concerts', icon: () => <Ionicons name="musical-notes" size={24} color="black" />},
                    {label: 'festivals', value: 'school-holidays,public-holidays,festivals', icon: () => <MaterialCommunityIcons name="party-popper" size={24} color="black" />},  
                ]}
                defaultValue={interest}                
                containerStyle={{height: 40}}
                style={{backgroundColor: '#fafafa'}}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                dropDownStyle={{backgroundColor: '#fafafa', minHeight:180}}
                onChangeItem={item => {                                    
                    setInterests(item.value)}}
                onClose={() => setShowBtn(true)}
                onOpen={() => setShowBtn(false)}
                activeLabelStyle={{color:'#3399ff'}}
                
                
            />
            
            <Text style={styles.text} onPress={() => navigation.navigate('ChangePassword')}>Do you like to change password</Text>
            {
                showBtn 
                ? ( <Button mode="contained" style={{width:100,position:'relative', left:220, top:20, backgroundColor:'#3399ff'}} onPress={() => updateSettings()}>
                    Update  
                </Button> ) 
                : null
            }
            <Snackbar
                style={{ marginBottom:100, marginLeft:70,width:300}}
                visible={visible}
                duration={1000}
                onDismiss={onDismissSnackBar}
                action={{                
                onPress: () => {
                    // Do something
                },
                }}>
                Successfully updated ur profile
            </Snackbar>   
            
        </View>
    )
}

const styles = StyleSheet.create({
        
    container:{
        paddingHorizontal:50,
        paddingTop:200,
        minHeight:800,        
    },
    title:{
        color:'#3399ff',
        textAlign:'center',
        fontSize:30,
        marginBottom:50,
    },
    text:{
        marginTop:10,
        color:'grey',
        position: 'relative',
        left:150,
    }

})

export default SettingsScreen