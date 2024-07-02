import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Routes from './src/component/routes/Routes';
import { store } from "./src/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

import { StatusBar } from 'react-native';

let persistor = persistStore(store)

function App() {


  return (
    <>
    <StatusBar barStyle="dark-content" />
    <SafeAreaProvider>
    <NavigationContainer>
    <Provider store={store}>
        <PersistGate persistor={persistor}>
    <Routes />
    </PersistGate>
    </Provider>
    </NavigationContainer>
    </SafeAreaProvider>
    
      
    
    </>

  );
};


export default App;