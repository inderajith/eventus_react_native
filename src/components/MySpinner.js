import React from 'react'
import {ActivityIndicator, Text, View, StyleSheet, ScrollView} from 'react-native'


function MySpinner({height}) {
    return (
        <View style={{flex:1, justifyContent:'center',alignItems:'center', minHeight: height}}>
            <ActivityIndicator size="large" color="#3399ff" />
        </View>
    )
}

export default MySpinner
