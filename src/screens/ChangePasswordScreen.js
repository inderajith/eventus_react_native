import React, {useState} from 'react'
import { View, StyleSheet} from 'react-native'
import {Text, Title, TextInput, Button, Snackbar } from 'react-native-paper'

const ChangePasswordScreen = ({navigation}) => {

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [visible, setVisible] = useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);
    
    const type = "outlined"

    return(
        <View style={styles.container}>

            <Title style={styles.title}>Change Password</Title>

            <TextInput
                label="Old Password"
                value={oldPassword}
                onChangeText={e => setOldPassword(e)}
                mode={type}
                style={{marginBottom:20}}
                theme={{ colors: { primary: '#3399ff'}}}
                
            />
            <TextInput
                label="New Password"
                value={newPassword}
                onChangeText={e => setNewPassword(e)}
                mode={type}
                style={{marginBottom:20}}
                theme={{ colors: { primary: '#3399ff'}}}
                
            />
            <TextInput
                label="Confirm Password"                
                value={confirmPassword}
                onChangeText={e => setConfirmPassword(e)}
                mode={type}
                style={{marginBottom:20}}
                theme={{ colors: { primary: '#3399ff'}}}  
                
            />            
            <Button mode="contained" style={{width:100,position:'relative', left:220, top:20, backgroundColor:'#3399ff'}} onPress={() => onToggleSnackBar()}>
                Change
            </Button>
            <Snackbar
                style={{ marginBottom:100, marginLeft:50,width:320}}
                visible={visible}
                onDismiss={onDismissSnackBar}
                action={{
                label: 'Undo',
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