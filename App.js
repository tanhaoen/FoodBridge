import * as React from "react";
import { MD3LightTheme as DefaultTheme, PaperProvider, Text } from 'react-native-paper';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { CONVEX_URL } from "@env";

import { useFonts } from "expo-font";

import theme from "./theme";

import BottomNavBar from "./components/BottomNavBar";
import NavigationBar from "./components/NavigationBar";
import LocationProvider from "./components/LocationProvider";

import OrderConfirm from "./pages/OrderConfirm";
import PickUpConfirmation from "./pages/PickUpConfirmation";

const convex = new ConvexReactClient(CONVEX_URL.toString(), {
  unsavedChangesWarning: false,
});

const Stack = createStackNavigator();

export default function App() {

  let [fontsLoaded] = useFonts({
    "Poppins" : require('./assets/fonts/Poppins-Black.ttf'),
    "Poppins-Regular": require('./assets/fonts/Poppins-Regular.ttf'),
    "Poppins-Bold": require('./assets/fonts/Poppins-Bold.ttf'),
    "Poppins-SemiBold": require('./assets/fonts/Poppins-SemiBold.ttf')
  })

  if (!fontsLoaded) {
    return <Text>App Loading</Text>
  }
  return (
    
    <ConvexProvider client={convex}>  
        <PaperProvider theme={theme}>
          <SafeAreaProvider>
            <NavigationContainer>
              <LocationProvider>
                <Stack.Navigator> 
                  <Stack.Screen name="HomePage" component={BottomNavBar} options={{headerShown: false}}/>
                  <Stack.Screen name="OrderConfirm" component={OrderConfirm} options={{title: 'Place Order'}}/>
                  <Stack.Screen name="PickUpConfirmation" component={PickUpConfirmation} options={{headerShown: false}}/>
                </Stack.Navigator>
              </LocationProvider>
            </NavigationContainer>
          </SafeAreaProvider>
        </PaperProvider>
    </ConvexProvider>
    
  );
}