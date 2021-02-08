import React, {useState, useContext} from 'react'
import { View, StyleSheet} from 'react-native'
import { MaterialIcons , MaterialCommunityIcons, Ionicons, FontAwesome5   } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import { Input, Text, Button } from 'react-native-elements';
import {authContext} from '../contexts/authContext'
import {Snackbar} from 'react-native-paper'

function RegistrationScreen({navigation}) {

    const {signup} = useContext(authContext)

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [interest, setInterests] = useState(''); 
    const [usernameValidation, setUsernameValidation] = useState('')
    const [emailValidation, setEmailValidation] = useState('')
    const [passwordValidation, setPasswordValidation] = useState('')
    const [confirmPasswordValidation, setConfirmPasswordValidation] = useState('')
    const [isValidated, setIsValidated] = useState(false)
    const [visible, setVisible] = useState(false);

    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);
    
    

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
               signup(username, email, password, interest)
               onToggleSnackBar()
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
        <View style={styles.container}>

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
            <Text>Interested in :</Text>
            <DropDownPicker
                labelStyle={{color:'grey'}}                
                items={[
                    {label: 'coding', value: 'coding', icon: () => <FontAwesome5 name="laptop-code" size={24} color="black" />},
                    {label: 'gaming', value: 'gaming', icon: () => <Ionicons name="ios-game-controller-outline" size={24} color="black" />},
                    {label: 'conference', value: 'conference', icon: () => <Ionicons name="newspaper-outline" size={24} color="black" />}
                ]}
                defaultValue={'coding'}
                containerStyle={{height: 40}}
                style={{backgroundColor: '#fafafa'}}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                dropDownStyle={{backgroundColor: '#fafafa'}}
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
                Registration successful
            </Snackbar>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal:50,
        marginBottom:100,
        flex:1,
        justifyContent:'center',
        alignItems:'center'        
    },    
    title:{
        fontSize:40,
        marginBottom:40,
        color: '#3399ff',
        fontWeight:'bold'
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

export default RegistrationScreen
