import React, {useState} from 'react'
import { View, StyleSheet} from 'react-native'
import { MaterialIcons , MaterialCommunityIcons  } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Text, Button } from 'react-native-elements';

function LoginScreen({navigation}) {

    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    

    const submitLogin = () => {
        console.log('mail: ', mail);        
        console.log('password: ', password);        
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
