import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Home from "../pages/Home";
import Buyers from "../pages/Buyers";
import Account from "../pages/Account";

const Tab = createBottomTabNavigator();

const BottomNavBar = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size}) => {
          let iconName;
          let rn = route.name;

          if (rn === "Home") {
            iconName = focused ? 'home' : 'home-outline';
          } else if (rn === "Buyers") {
            iconName = focused ? 'people' : 'people-outline';
          } else if (rn === "Account") {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />
        },
        activeTintColor: '#2DCC70',
        inactiveTintColor: 'grey'
     })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Buyers" component={Buyers} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
}
export default BottomNavBar