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

const convex = new ConvexReactClient(CONVEX_URL.toString(), {
  unsavedChangesWarning: false,
});

const Stack = createStackNavigator();

export default function App() {

  return (
    <ConvexProvider client={convex}>
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
    </ConvexProvider>
  );
}