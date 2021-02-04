import React, {useContext} from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import AuthProvider from './src/contexts/authContext'
import VerificationScreen from './src/screens/VerificationScreen';

export default App = () => {
  
  return(
    <AuthProvider>
      <PaperProvider>        
        <VerificationScreen />
      </PaperProvider>
    </AuthProvider>
  ) 
}