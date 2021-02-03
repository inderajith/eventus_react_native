import React, {useState} from 'react'
import { View, StyleSheet} from 'react-native'
import {Text, Title, TextInput, Button, Snackbar  } from 'react-native-paper'
import DropDownPicker from 'react-native-dropdown-picker';
import { Ionicons, FontAwesome5  } from '@expo/vector-icons';

const SettingsScreen = ({navigation}) => {

    const [name, setName] = useState('Inder');
    const [interests, setInterests] = useState('gaming');
    const [showBtn, setShowBtn] = useState(true);
    const [visible, setVisible] = useState(false);

    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);
    const type = "outlined"

    return(
        <View style={styles.container}>

            <Title style={styles.title}>SETTINGS</Title>
            
            <TextInput
                label="Email"
                value="inderajithinder@gmail.com"                
                mode={type}
                disabled
                style={{marginBottom:20}}
                
            />
            <TextInput
                label="Name"
                value={name}
                onChangeText={e => setName(e)}
                mode={type}
                style={{marginBottom:20}}
                theme={{ colors: { primary: '#3399ff'}}}
                
            />

            <DropDownPicker
                labelStyle={{color:'grey'}}                
                items={[
                    {label: 'coding', value: 'coding', icon: () => <FontAwesome5 name="laptop-code" size={24} color="black" />},
                    {label: 'gaming', value: 'gaming', icon: () => <Ionicons name="ios-game-controller-outline" size={24} color="black" />},
                    {label: 'conference', value: 'conference', icon: () => <Ionicons name="newspaper-outline" size={24} color="black" />}
                ]}
                defaultValue={interests}
                containerStyle={{height: 40}}
                style={{backgroundColor: '#fafafa'}}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                dropDownStyle={{backgroundColor: '#fafafa'}}
                onChangeItem={item => {                                    
                    setInterests(item.value)}}
                onClose={() => setShowBtn(true)}
                onOpen={() => setShowBtn(false)}
                activeLabelStyle={{color:'#3399ff'}}
                
                
            />
            
            <Text style={styles.text} onPress={() => navigation.navigate('ChangePassword')}>Do you like to change password</Text>
            {
                showBtn 
                ? ( <Button mode="contained" style={{width:100,position:'relative', left:220, top:20, backgroundColor:'#3399ff'}} onPress={() => onToggleSnackBar()}>
                    Update
                </Button> ) 
                : null
            }
            <Snackbar
                style={{ marginBottom:100, marginLeft:70,width:300}}
                visible={visible}
                onDismiss={onDismissSnackBar}
                action={{
                label: 'Undo',
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
        marginTop:10,
        color:'grey',
        position: 'relative',
        left:150,

    }
})

export default SettingsScreen