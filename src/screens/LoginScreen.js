import React, {useState, useContext, useEffect, useRef} from 'react'
import { View, StyleSheet, Image, ImageBackground, Easing} from 'react-native'
import { MaterialIcons , MaterialCommunityIcons  } from '@expo/vector-icons';
import { Input, Text, Button } from 'react-native-elements';
import {authContext} from '../contexts/authContext'
import {Snackbar} from 'react-native-paper'
import { Animated } from 'react-native';

function LoginScreen({navigation}) {

    const [mail, setMail] = useState('inder@gmail.com')
    const [password, setPassword] = useState('inder123')
    const [visible, setVisible] = useState(false);        
    const transformValue = useRef(new Animated.Value(-100)).current 

    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);

    const {signin, message} = useContext(authContext)
    

    const submitLogin = () => {
        signin(mail, password, onToggleSnackBar)    
    }

    const myAnimation = () => {
        Animated.timing(transformValue, {
            toValue:0,
            duration:1500,
            easing:Easing.bounce,
            useNativeDriver:true
        }).start() 
    }

    useEffect(() => {                   
                 
            const unsubscribe = navigation.addListener('focus', () => {            
                myAnimation()                
                console.log('login screen rendered')
            })        
    
            return unsubscribe

    }, [navigation])

    return (
        <View style={{flex:1}}>
        <ImageBackground 
            source={{uri: 'https://images.pexels.com/photos/2013658/pexels-photo-2013658.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'}}
            style={StyleSheet.absoluteFillObject}
            blurRadius={80}
        > 
        <Animated.View style={[styles.container, {opacity: transformValue.interpolate({
            inputRange:[-100, 0],
            outputRange:[0, 1]
        }), transform:[{translateY:transformValue}]}]}>
            <Text style={styles.title}>Login</Text>
            <Input
                label="Enter ur mailId"
                labelStyle={{color:'#3399ff'}}
                leftIcon={<MaterialIcons  name="email" size={24} color="#3399ff" />}                                
                placeholder='example@gmail.com'
                errorStyle={{ color: 'red' }}
                errorMessage=''
                onChangeText={value => setMail(value) }                
            />
            
            <Input 
                leftIcon={<MaterialCommunityIcons name="form-textbox-password" size={24} color="#3399ff" />} 
                placeholder="Password" 
                secureTextEntry={true} 
                label="Enter ur password"
                labelStyle={{color:'#3399ff'}}
                onChangeText={value => setPassword(value) }
            />
            <Text style={styles.linker} onPress={() => navigation.navigate('Register')}>Don't have an account?</Text>

            <Button
                title="Submit"
                type="outline"                
                buttonStyle={styles.btn}
                onPress={submitLogin}
            />

            <Snackbar                
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
        </View> 
        
    )
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal:50,        
        backgroundColor:"white",
        marginTop:140,
        marginBottom:200,
        borderRadius:10,
        paddingHorizontal:15,
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
        marginLeft:168,
        color: '#a3acb5'
    }
})

export default LoginScreen
