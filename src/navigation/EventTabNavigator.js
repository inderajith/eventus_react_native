import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Zocial, Ionicons,FontAwesome5   } from '@expo/vector-icons';


import EventScreen from '../screens/EventScreen';
import WishlistScreen from '../screens/WishlistScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

function EventTabNavigator() {
  return (
    <NavigationContainer>
    <Tab.Navigator
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
      
      tabBarOptions={{
        activeTintColor: '#fff',
        activeBackgroundColor: '#3399ff'
      }}
    >
      <Tab.Screen 
      name="Events" 
      component={EventScreen}  
      options = {{
        tabBarIcon:({color, size}) => {
          return <Zocial name="eventbrite" size={size} color={color} />
        }
      }}
      />
      <Tab.Screen 
      name="Wishlist" 
      component={WishlistScreen}  
      options = {{
        tabBarIcon:({color, size}) => {
          return <Ionicons name="settings" size={24} color={color} />
        }
      }}
      />
      <Tab.Screen 
      name="Settings" 
      component={SettingsScreen} 
      options = {{
        tabBarIcon:({color, size}) => {
          return <FontAwesome5 name="list-alt" size={24} color={color} />
        }
      }}
      />
    </Tab.Navigator>
    </NavigationContainer>
  );
}

export default EventTabNavigator