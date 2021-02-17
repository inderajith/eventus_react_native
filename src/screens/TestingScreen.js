import React, {useRef} from 'react'
import {Text, View, Button} from 'react-native'
import ListScreen from './ListScreen'


function TestingScreen() {

    const listItems = [
        {id:1,name:'inder'},
        {id:2,name:'kkkkk'},
        {id:3,name:'hahhaha'},
        {id:4,name:'qwerty'}
    ]

    return (        
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            {listItems.map(item => <ListScreen key={item.id} id={item.id} name={item.name} /> )}
        </View>
    )
}

export default TestingScreen
