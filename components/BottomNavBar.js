import * as React from 'react';
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Home from "../pages/Home";
import Buyers from "../pages/Buyers";
import Account from "../pages/Account";

const Tab = createBottomTabNavigator();

const BottomNavBar = () => {
  let BuyersCounter = 0
  const orderData = useQuery(api.orders.queryOrders, { user_id: "jh7dd7a3s178tyv4dzz2m1ebrd6nbsq7" });
  if (orderData !== undefined) {
    BuyersCounter = orderData.length
  }
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
        tabBarActiveTintColor: '#2DCC70',
        inactiveTintColor: 'grey'
     })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Buyers" component={Buyers} options={{tabBarBadge: BuyersCounter}} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
}
export default BottomNavBar