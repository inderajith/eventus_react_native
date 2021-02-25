import React, {useState, useContext} from 'react'
import { View, StyleSheet, Image} from 'react-native'
import {Text, Title, TextInput, Button, Snackbar } from 'react-native-paper'
import {authContext} from '../contexts/authContext'

const ChangePasswordScreen = ({navigation}) => {

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordValidation, setConfirmPasswordValidation] = useState(false);
    const [visible, setVisible] = useState(false);

    const {changePassword} = useContext(authContext)

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);
    
    const type = "outlined"


    const submitPassword = () => {
        if(newPassword === confirmPassword){
            changePassword(oldPassword, newPassword)
            onToggleSnackBar()
            setOldPassword('')
            setNewPassword('')
            setConfirmPasswordValidation('')
        }else{
            setConfirmPasswordValidation(true)
            setTimeout(() => {
                setConfirmPasswordValidation(false)
            }, 3000)
        }
    }

    return(
        <View style={styles.container}>
        <Image 
            source={{uri: 'https://images.pexels.com/photos/2013658/pexels-photo-2013658.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'}}
            style={StyleSheet.absoluteFillObject}
            blurRadius={80}

        /> 

            <Title style={styles.title}>Change Password</Title>

            <TextInput
                label="Old Password"                            
                value={oldPassword}
                onChangeText={e => setOldPassword(e)}
                mode={type}
                style={{marginBottom:20}}
                theme={{ colors: { primary: '#6f7070'}}}
                autoFocus={true}                                
            />

            <TextInput
                label="New Password"
                value={newPassword}
                onChangeText={e => setNewPassword(e)}
                mode={type}
                style={{marginBottom:20}}
                theme={{ colors: { primary: '#6f7070'}}}
                error={confirmPasswordValidation}
                
            />
            
            <TextInput
                label="Confirm Password"                
                value={confirmPassword}
                onChangeText={e => setConfirmPassword(e)}
                mode={type}
                style={{marginBottom:20}}
                theme={{ colors: { primary: '#6f7070'}}}                                  
                error={confirmPasswordValidation}                
            />

            <Button mode="contained" style={{width:100,position:'relative', left:220, top:20, backgroundColor:'#3399ff'}} onPress={() => submitPassword()}>
                Change
            </Button>
            
            <Snackbar
                style={{ marginBottom:100, marginLeft:50,width:320}}
                visible={visible}
                onDismiss={onDismissSnackBar}
                action={{
                onPress: () => {
                    // Do something
                },
                }}>
                Password has been changed Successfully
            </Snackbar>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal:50,
        paddingTop:150,
        minHeight:800
    },
    title:{
        color:'#3399ff',
        textAlign:'center',
        fontSize:30,
        marginBottom:50
    },
    text:{
        color:'grey',
        position: 'relative',
        left:150,

    }
})

export default ChangePasswordScreen