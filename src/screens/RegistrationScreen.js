import React, {useState,useEffect, useContext, useRef} from 'react'
import { View, StyleSheet, ImageBackground, Easing} from 'react-native'
import { MaterialIcons, Ionicons,Entypo, MaterialCommunityIcons   } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import { Input, Text, Button } from 'react-native-elements';
import {authContext} from '../contexts/authContext'
import {Snackbar} from 'react-native-paper'
import { Animated } from 'react-native';


function RegistrationScreen({navigation}) {

    const {signup, message} = useContext(authContext)

    const [username, setUsername] = useState('add')
    const [email, setEmail] = useState('A@')
    const [password, setPassword] = useState('123456')
    const [confirmPassword, setConfirmPassword] = useState('123456')
    const [interest, setInterests] = useState('conferences'); 
    const [usernameValidation, setUsernameValidation] = useState('')
    const [emailValidation, setEmailValidation] = useState('')
    const [passwordValidation, setPasswordValidation] = useState('')
    const [confirmPasswordValidation, setConfirmPasswordValidation] = useState('')
    const [isValidated, setIsValidated] = useState(false)
    const [visible, setVisible] = useState(false);
    const [render, setRender] = useState(0);


    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);
    const translateValue = useRef(new Animated.Value(-100)).current 

    const myAnimation = () => {
        Animated.timing(translateValue, {
            toValue:0,
            duration:2000,
            easing:Easing.bounce,
            useNativeDriver:true 
        }).start()    
    }

    useEffect(() => {        

        const unsubscribe = navigation.addListener('focus', () => {            
            myAnimation()
            
            console.log('registration screen rendered')
        })        

        return unsubscribe

    }, [navigation])
    
    

    const submitRegister = () => {

            setIsValidated(true)
            passwordValidationFunction()
           if(password !== confirmPassword){
               setConfirmPasswordValidation("passwords don't match");
               setTimeout(() => {
                setConfirmPasswordValidation('')
                }, 3000)
               setIsValidated(false)
           }

           if(isValidated){
               signup(username, email, password, interest, onToggleSnackBar)               
           }
    }

    const passwordValidationFunction = () => {
        if(password.length < 6 || password.length > 18){
            setPasswordValidation('password should be between 6 & 18 characters long')
            setIsValidated(false)
        }
        setTimeout(() => {
            setPasswordValidation('')
        }, 3000)
    }

    const emailValidationFunction = () => {
        if(email.indexOf('@') == -1){
            setEmailValidation('Enter a valid email')
            setIsValidated(false)
        }

        setTimeout(() => {
            setEmailValidation('')
        }, 3000)
    }

    const userValidationFunction = () => {
        if(username == ''){
            setUsernameValidation('username should not be empty')
            setIsValidated(false)       
        }
        
        setTimeout(() => {
            setUsernameValidation('')
        }, 3000)
    }

    return (
        <ImageBackground 
            source={{uri: 'https://images.pexels.com/photos/2013658/pexels-photo-2013658.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'}}
            style={StyleSheet.absoluteFillObject}
            blurRadius={80}
        > 
        <Animated.View style={[styles.container, {transform:[{translateY:translateValue}], opacity: translateValue.interpolate({
            inputRange:[-50, 0],
            outputRange:[0, 1]
        })}]}>

            <Text style={styles.title}>Sign up</Text>

            <Input
                label="Enter ur name"
                labelStyle={{color:'#3399ff'}}
                leftIcon={<MaterialIcons name="account-circle" size={24} color="#3399ff" />}                
                placeholder='username'
                errorStyle={{ color: 'red' }}
                errorMessage=''
                onChangeText={value => setUsername(value) }
                onBlur={() => userValidationFunction()}
                errorMessage={usernameValidation}
                errorStyle={{ color: 'red' }}
                onFocus={() => setUsernameValidation('')}
            />
            <Input
                label="Enter ur mailId"
                labelStyle={{color:'#3399ff'}}
                leftIcon={<MaterialIcons  name="email" size={24} color="#3399ff" />}                
                placeholder='example@gmail.com'
                errorStyle={{ color: 'red' }}
                errorMessage=''
                onChangeText={value => setEmail(value) }
                onBlur={() => emailValidationFunction()}
                errorMessage={emailValidation}
                errorStyle={{ color: 'red' }}
                onFocus={() => setEmailValidation('')}
            />            
            <Text style={{color:"#3399ff", position:'relative',left:13, fontSize:16, fontWeight:'bold'}}>Interestes</Text>
            <DropDownPicker
                labelStyle={{color:'grey'}}                
                items={[                
                    {label: 'conferences', value: 'conferences', icon: () => <Ionicons name="newspaper-outline" size={24} color="black" />},
                    {label: 'Awareness', value: 'daylight-savings,airport-delays,severe-weather,disasters,terror,health-warnings', icon: () => <Entypo name="awareness-ribbon" size={24} color="black" />},                    
                    {label: 'concerts', value: 'concerts', icon: () => <Ionicons name="musical-notes" size={24} color="black" />},
                    {label: 'festivals', value: 'school-holidays,public-holidays,festivals', icon: () => <MaterialCommunityIcons name="party-popper" size={24} color="black" />},  
                ]}
                defaultValue={'conferences'}
                containerStyle={{flexDirection:'row', marginLeft:10}}
                style={{backgroundColor: '#fafafa'}}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                dropDownStyle={{backgroundColor: '#fafafa', minHeight:180}}
                onChangeItem={item => {                                    
                    setInterests(item.value)}}
                activeLabelStyle={{color:'#3399ff'}}
                
                
            />
            
            <Input 
                leftIcon={<MaterialCommunityIcons name="form-textbox-password" size={24} color="#3399ff" />} 
                placeholder="Password" 
                secureTextEntry={true} 
                label="Enter ur password"
                labelStyle={{color:'#3399ff'}}
                onChangeText={value => setPassword(value) }
                onBlur={() => passwordValidationFunction()}
                errorMessage={passwordValidation}
                errorStyle={{ color: 'red' }}
                onFocus={() => setPasswordValidation('')}
            />
            <Input 
                // leftIcon={<MaterialCommunityIcons name="form-textbox-password" size={24} color="#3399ff" />} 
                placeholder="Confirm Password" 
                secureTextEntry={true} 
                label="Re-enter password"
                labelStyle={{color:'#3399ff'}}
                onChangeText={value => setConfirmPassword(value) }
                errorMessage={confirmPasswordValidation}
                errorStyle={{ color: 'red' }}
                onFocus={() => setConfirmPasswordValidation('')}
                
            />

            <Text style={styles.linker} onPress={() => navigation.navigate('Login')}>Already have an account?</Text>

            <Button
                title="Register"
                type="outline"
                buttonStyle={styles.btn}
                onPress={submitRegister}
            />

            <Snackbar
                style={{ marginTop:50}}
                visible={visible}
                onDismiss={onDismissSnackBar}
                action={{
                label: 'Undo',
                onPress: () => {
                    // Do something
                },
                }}>
                {message}
            </Snackbar>

        </Animated.View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal:50,
        backgroundColor:'white',
        marginTop:30,
        marginBottom:80,
        paddingHorizontal:15,
        borderRadius:10,
        elevation:10,
        paddingVertical:20
    },    
    title:{
        fontSize:40,
        marginBottom:40,
        color: '#3399ff',
        fontWeight:'bold',
        textAlign:'center'
    },

    btn:{    
        width:100,
        color:'red',
        marginLeft:190,
        marginTop:20            
    },    
    linker:{
        marginLeft:145,
        color: '#a3acb5'
    }
})

export default RegistrationScreen
