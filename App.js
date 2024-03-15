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

//auth//auth 
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { Authenticated, Unauthenticated} from "convex/react";
import SignUpScreen from "./pages/auth/SignUpScreen";
import SignInScreen from "./pages/auth/SignInScreen";


const convex = new ConvexReactClient(CONVEX_URL.toString(), {
  unsavedChangesWarning: false,
});

const Stack = createStackNavigator();

export default function App() {

  let [fontsLoaded] = useFonts({
    "Poppins" : require('./assets/fonts/Poppins-Black.ttf'),
    "Poppins-Bold": require('./assets/fonts/Poppins-Bold.ttf'),
    "Poppins-SemiBold": require('./assets/fonts/Poppins-SemiBold.ttf')
  })

  if (!fontsLoaded) {
    return <Text>App Loading</Text>
  }
  return (
    
    <ClerkProvider publishableKey="pk_test_Zmx5aW5nLW11c2tveC0zNy5jbGVyay5hY2NvdW50cy5kZXYk">
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>      
        <PaperProvider theme={theme}>
          <SafeAreaProvider>
            <NavigationContainer>
              <LocationProvider>

              <Unauthenticated>
                <Stack.Navigator>
                  <Stack.Screen name="SignInScreen" component={SignInScreen} options={{headerShown: false}}/>
                  <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
                </Stack.Navigator>
              </Unauthenticated>

              <Authenticated>
                <Stack.Navigator> 
                  <Stack.Screen name="HomePage" component={BottomNavBar} options={{headerShown: false}}/>
                  <Stack.Screen name="OrderConfirm" component={OrderConfirm} options={{title: 'Place Order'}}/>
                  <Stack.Screen name="PickUpConfirmation" component={PickUpConfirmation} options={{headerShown: false}}/>
                </Stack.Navigator>
              </Authenticated>
              </LocationProvider>
            </NavigationContainer>
          </SafeAreaProvider>
        </PaperProvider>
    </ConvexProviderWithClerk>
    </ClerkProvider>
    
  );
}