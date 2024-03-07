import { ConvexProvider, ConvexReactClient } from "convex/react";
import * as React from "react";
import { Appbar, BottomNavigation, Text } from "react-native-paper";
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-get-random-values";
import { CONVEX_URL } from "@env";
import Home from "./pages/Home";
import Buyers from "./pages/Buyers";
import Account from "./pages/Account";
import theme from "./theme";

const convex = new ConvexReactClient(CONVEX_URL, {
  unsavedChangesWarning: false,
});

const HomeRoute = () => <Home />;

const BuyersRoute = () => <Buyers />;

const AccountRoute = () => <Account />;

export default function App() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline'},
    { key: 'buyers', title: 'Buyers', focusedIcon: 'walk' },
    { key: 'account', title: 'Account', focusedIcon: 'account' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    buyers: BuyersRoute,
    account: AccountRoute,
  });

  return (
    <ConvexProvider client={convex}>
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <Appbar.Header>
            <Appbar.Content title="Title" />
          </Appbar.Header>
          <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
          />
        </SafeAreaProvider>
      </PaperProvider>
    </ConvexProvider>
  );
}