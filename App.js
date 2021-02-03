import React from 'react';
import EventTabNavigator from './src/navigation/EventTabNavigator';
import MainStackNavigator from './src/navigation/MainStackNavigation';
import { Provider as PaperProvider } from 'react-native-paper';


export default App = () => {
  return(
    <PaperProvider>
     <EventTabNavigator />
    </PaperProvider>
  ) 
}