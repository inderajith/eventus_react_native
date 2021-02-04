import React, {useState, useContext} from 'react'
import { View, StyleSheet} from 'react-native'
import { MaterialIcons , MaterialCommunityIcons  } from '@expo/vector-icons';
import { Input, Text, Button } from 'react-native-elements';
import {authContext} from '../contexts/authContext'
import {Snackbar} from 'react-native-paper'


function LoginScreen({navigation}) {

    const [mail, setMail] = useState('inder@gmail.com')
    const [password, setPassword] = useState('inder')
    const [visible, setVisible] = useState(false);

    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);

    const {signin} = useContext(authContext)
    

    const submitLogin = () => {
        signin(mail, password)
        onToggleSnackBar()
        
    }

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Sign in</Text>

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
                title="Login"
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
                Login successful
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

export default LoginScreen
