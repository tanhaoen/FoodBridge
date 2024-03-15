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
import { StripeProvider } from '@stripe/stripe-react-native';

//auth 
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { Authenticated, Unauthenticated} from "convex/react";
import SignUpScreen from "./pages/SignUpScreen";

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
      <StripeProvider
      publishableKey="pk_test_51Ot4QZA0VuWCNyHgeH82SNHTHpi6WH5fPxmKHsXp1BczhafjJiElZbviAMeSo6rTq77XjPWYjJvTwsaWeiDUSsiX00zsUkEx9Z"
      // urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
      // merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
    >
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <NavigationContainer>
            <Unauthenticated>
            <Stack.Navigator>
              <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{headerShown: false}}/>
              </Stack.Navigator>
            </Unauthenticated>
            <Authenticated>
            <Stack.Navigator> 
              <Stack.Screen name="HomePage" component={BottomNavBar} options={{headerShown: false}}/>
              <Stack.Screen name="OrderConfirm" component={OrderConfirm} options={{title: 'Place Order'}}/>
              <Stack.Screen name="RoutingMap" component={RoutingMap} options={{headerShown: false}}/>
            </Stack.Navigator>
            </Authenticated>
          </NavigationContainer>
        </SafeAreaProvider>
      </PaperProvider>
      </StripeProvider>
    </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}