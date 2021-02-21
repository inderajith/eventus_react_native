import React, {useState, useRef} from 'react'
import {Text, View,PanResponder, Animated, TouchableOpacity} from 'react-native'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import ListScreen from './ListScreen'


function TestingScreen() {    
    const opacityValue = useState(new Animated.Value(0))[0]
    const leftValue = useState(new Animated.Value(0))[0]

    const pan = useRef(new Animated.ValueXY()).current;

    const panResponder = useRef(
        PanResponder.create({
          onMoveShouldSetPanResponder: () => true,
          onPanResponderGrant: () => {
            pan.setOffset({
              x: pan.x._value,
              y: pan.y._value
            });
          },
          onPanResponderMove: (_, gesture) => {
              pan.x.setValue(gesture.dx)
              pan.y.setValue(gesture.dy)
          },
          onPanResponderRelease: () => {
            pan.flattenOffset();
          }
        })
      ).current;


    const fadeIn = () => {
        Animated.timing(opacityValue,{
            toValue:1,
            duration:3000,
            useNativeDriver:true     
        }).start()
        Animated.timing(leftValue,{
            toValue:200,
            duration:3000,
            useNativeDriver:true     
        }).start()


    }
    const fadeOut = () => {
        Animated.timing(opacityValue,{
            toValue:0,
            duration:3000,
            useNativeDriver:true     
        }).start()
        Animated.timing(leftValue,{
            toValue:0,
            duration:3000,
            useNativeDriver:true     
        }).start()
    }


    return (        
        <View style={{margin:30, marginTop:200}}>
                {/* <Animated.View 
                    style={[
                        {
                            height:100,
                            width:100,
                            transform: [{ translateX: pan.x }, { translateY: pan.y }],                                 
                            borderRadius:50,
                            backgroundColor:'red'
                        }
                    ]}
                    {...panResponder.panHandlers}
                />
                <TouchableOpacity onPress={fadeIn}>
                    <Text>Fade In</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={fadeOut}>
                    <Text>Fade Out</Text>
                </TouchableOpacity> */}

                <Card>
                    <Card.Title title="Card Title" subtitle="Card Subtitle"/>
                    <Card.Content>
                    <Title>Card title</Title>
                    <Paragraph>Card content</Paragraph>
                    </Card.Content>                    
                    <Card.Actions>
                    <Button>Cancel</Button>
                    <Button>Ok</Button>
                    </Card.Actions>
                </Card>

                <Card style={{marginTop:20,shadowColor: '#000', shadowOffset:{width:0,height:10}, shadowOpacity:1,shadowRadius:20}}>
                    <Card.Title title="Card Title" subtitle="Card Subtitle"/>
                    <Card.Content>
                    <Title>Card title</Title>
                    <Paragraph>Card content</Paragraph>
                    </Card.Content>                    
                    <Card.Actions>
                    <Button>Cancel</Button>
                    <Button>Ok</Button>
                    </Card.Actions>
                </Card>

                <View elevation={10} style={{height:150, backgroundColor:'grey', marginTop:20}}>

                </View>
                

        </View>
    )
}

export default TestingScreen
