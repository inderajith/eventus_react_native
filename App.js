import React, {useContext} from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import AuthProvider from './src/contexts/authContext'
import VerificationScreen from './src/screens/VerificationScreen';
import EventProvider from './src/contexts/eventContext'

export default App = () => {
  
  return(
    <AuthProvider>
      <EventProvider>
        <PaperProvider>        
          <VerificationScreen />
        </PaperProvider>
      </EventProvider>
    </AuthProvider>
  ) 
}