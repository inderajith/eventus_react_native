import React, {useContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Zocial, Ionicons,FontAwesome5   } from '@expo/vector-icons';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';


import EventScreen from '../screens/EventScreen';
import WishlistScreen from '../screens/WishlistScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import EventDetails from '../screens/EventDetails';
import {eventContext} from '../contexts/eventContext'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const settingsNavigation = () => {
  return (
    
      <Stack.Navigator initialRouteName='Settings'>      
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings screen', headerShown:false }} />
        <Stack.Screen name="ChangePassword"  component={ChangePasswordScreen} options={{ title: 'password screen' }} />
      </Stack.Navigator>
    
  )
}
const eventsNavigation = () => {
  return (
    
      <Stack.Navigator initialRouteName='EventsHome'>      
        <Stack.Screen name="EventsHome" component={EventScreen} options={{ title: 'Events',headerShown:false }}  />
        <Stack.Screen name="EventDetails" component={EventDetails} options={{ title: '' }} />
      </Stack.Navigator>
    
  )
}
const wishlistNavigation = () => {
  return (
    
      <Stack.Navigator initialRouteName='EventsHome'>      
        <Stack.Screen name="Wishlist" component={WishlistScreen} options={{ title: '', headerShown:false }}  />
        <Stack.Screen name="EventDetails"  component={EventDetails} options={{ title: '' }} />
      </Stack.Navigator>
    
  )
}

const getTabBarVisibility = (route) => {  
  
  // const routeName = route.state
  //   ? route.state.routes[route.state.index].name
  //   : '';

  const routeName = getFocusedRouteNameFromRoute(route)

  if (routeName === 'EventDetails' || routeName === 'ChangePassword') {
    return false;
  }

  return true;
}

function EventTabNavigator() {  

  const {getEvents, getWishlistID, setEventDetails} = useContext(eventContext)

  return (
    <NavigationContainer>
    <Tab.Navigator
 
      tabBarOptions={{
        activeTintColor: '#fff',
        activeBackgroundColor: '#3399ff',        
        }}        
      >
      <Tab.Screen 
        name="Events" 
        
        listeners={({navigation, route}) => ({
          focus: () => {
            // getEvents();
            // getWishlistID() 
            // console.log('eventTab focused');
          },      
          blur: () => {            
            // getEvents();
            // getWishlistID()
          }   
        })}
        component={eventsNavigation}          
        options = {({route}) => ({
            tabBarVisible: getTabBarVisibility(route),
          tabBarIcon:({color, size}) => {
            return <Zocial name="eventbrite" size={24} color={color} /> 
          },          
          unmountOnBlur:true
          })}
          
      />
      
      <Tab.Screen 
        name="Wishlist"   
        listeners={({navigation, route}) => ({               
          blur: () => {                        
            // getWishlistID()
          },
          
        })}      
        component={wishlistNavigation}  
        options = {({route}) => ({
            tabBarVisible: getTabBarVisibility(route),
          tabBarIcon:({color, size}) => {
            return <FontAwesome5 name="list-alt" size={24} color={color} /> 
          }
          })}
      />

        <Tab.Screen 
          name="Settings" 
          component={settingsNavigation} 
          options = {({route}) => ({
            tabBarVisible: getTabBarVisibility(route),
            tabBarIcon:({color, size}) => {
              return <Ionicons name="settings" size={24} color={color} /> 
            }
          })}
        />
      
    </Tab.Navigator>
    </NavigationContainer>
  );
}

export default EventTabNavigator


    // screenOptions={({ route }) => ({
    //       tabBarIcon: ({focused, color, size}) => {
            
            
    //         let iconName;

    //         if (route.name === 'Events') {
    //           return <Zocial name="eventbrite" size={24} color={color} />
    //         } else if (route.name === 'Settings') {
    //           return <Ionicons name="settings" size={24} color={color} />
    //         } else if (route.name === 'Wishlist') {
    //           return <FontAwesome5 name="list-alt" size={24} color={color} />
    //         }

    //         // You can return any component that you like here!            
    //       },
    //     })}
     