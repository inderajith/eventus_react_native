import React from 'react'
import {Text, View, StyleSheet} from 'react-native'
import {Button} from 'react-native-elements'

const EventScreen = ({navigation}) => {
    return(
        <View style={styles.container}>
            <Text>EventScreen</Text>
            {/* <Button 
                title="go to wishlist"
                type="outline"
                onPress={() => navigation.navigate('Wishlist')}
            />
            <Button 
                title="go to Settings"
                type="outline"
                onPress={() => navigation.navigate('Settings')}
            /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{        
        marginHorizontal:50,        
        flex:1,
        justifyContent:'center'
        
    }
})

export default EventScreen