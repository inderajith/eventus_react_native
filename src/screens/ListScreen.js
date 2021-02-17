import React, {useRef, useEffect} from 'react'
import {Text, View, Button} from 'react-native'

function ListScreen({id, name}) {

    const idref = useRef('')

    useEffect(() => {        
        idRef.current = id 
    }, [])
    

    const buttonPress = () => {
        console.log('id: ', idRef)
    }

    return (
        <View >
            <Text ref={idRef}>{name}</Text>
            <Button title="press me" onPress={buttonPress}/>
        </View>
    )
}

export default ListScreen
