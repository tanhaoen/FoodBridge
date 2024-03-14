import { ConvexProvider, ConvexReactClient } from "convex/react";
import * as React from "react";
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-get-random-values";
import { CONVEX_URL } from "@env";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OrderConfirm from "./pages/OrderConfirm";
import BottomNavBar from "./components/BottomNavBar";
import NavigationBar from "./components/NavigationBar";
import RoutingMap from "./pages/RoutingMap";
import theme from "./theme";
import { StripeProvider } from '@stripe/stripe-react-native';


const convex = new ConvexReactClient(CONVEX_URL.toString(), {
  unsavedChangesWarning: false,
});

const Stack = createStackNavigator();

export default function App() {

  return (
    <ConvexProvider client={convex}>
      <StripeProvider
      publishableKey="pk_test_51Ot4QZA0VuWCNyHgeH82SNHTHpi6WH5fPxmKHsXp1BczhafjJiElZbviAMeSo6rTq77XjPWYjJvTwsaWeiDUSsiX00zsUkEx9Z"
      // urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
      // merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
    >
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator> 
              <Stack.Screen name="HomePage" component={BottomNavBar} options={{headerShown: false}}/>
              <Stack.Screen name="OrderConfirm" component={OrderConfirm} options={{title: 'Place Order'}}/>
              <Stack.Screen name="RoutingMap" component={RoutingMap} options={{headerShown: false}}/>
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </PaperProvider>
      </StripeProvider>
    </ConvexProvider>
  );
}