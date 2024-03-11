import { ConvexProvider, ConvexReactClient } from "convex/react";
import { CONVEX_URL } from "@env";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Chip, Searchbar, Text, useTheme } from "react-native-paper";
import SortListingDrawer from "../components/SortListingDrawer";
import FilterListingDrawer from "../components/FilterListingDrawer";
import ListingCard from "../components/ListingCard";
import BottomNavBar from "../components/BottomNavBar";

const Home = ({ navigation }) => {
  const theme = useTheme();

  const [searchQuery, setSearchQuery] = React.useState('')
  const [selectedFilter, setSelectedFilter] = React.useState(null)
  const [selectedSorting, setSelectedSorting] = React.useState(null);
  const [selectedCuisine, setSelectedCuisine] = React.useState([]);
  const [drawerVisible, setDrawerVisible] = React.useState(false);
  const [currentDrawer, setCurrentDrawer] = React.useState('');

  const listingData = useQuery(api.listings.queryListings, {
    column: selectedFilter?.column,
    input: selectedFilter?.input,
  });

  const openDrawer = (drawer) => {
    setCurrentDrawer(drawer);
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const styles = StyleSheet.create({
    chip: {
      marginRight: 8,
      marginTop: 10,
      backgroundColor: theme.colors.selection
    },
    filter: {
      marginBottom: 10
    }
  })

  const filterBar = [
    {icon: 'sort', text: '', action: () => openDrawer('sort')},
    {icon: 'food-takeout-box', text: 'Cuisine', action: () => openDrawer('cuisine')},
    {icon: 'map-marker', text: 'Distance'},
    {icon: 'check-decagram', text: 'Verified'}
  ];

  const handleFilterPress = (filter) => {
    // Update the selectedFilter state when a filter is pressed
    setSelectedFilter({
      column: filter.text.toLowerCase(), // Assuming text can be used as a column name
      input: filter.text.toLowerCase()
    });
  };
  
  return (
    <View style={{ marginHorizontal: 16, marginTop: 10 }}>
      <Searchbar
      placeholder="Search"
      onChangeText={setSearchQuery}
      value={searchQuery}
      style={{
        backgroundColor: theme.colors.light,
        opacity: 0.7
      }}
      />

        <ScrollView horizontal style={styles.filter}>
          {filterBar.map((item, index) => (
            <Chip
              key={index}
              icon={item.icon}
              style={styles.chip}
              onPress={item.action}
            >
              {item.text}
            </Chip>
          ))}
        </ScrollView>
        
        {listingData !== undefined ? (
          <ScrollView vertical>
            {listingData.length > 0 ? (
              listingData.map((item, index) => (
                <ListingCard
                  key={item._id}
                  title={item.title}
                  providerName={item.provider_name}
                  price={item.price}
                  quantity={item.quantity}
                  expiryTime={item.expiry_time}
                  distance="400"
                  thumbnailUrl={item.thumbnail_url}
                  verifiedProvider={item.verified_provider}
                />
              ))
            ) : (
              <Text>No listings found</Text>
            )}
          </ScrollView>
        ) : (
          <ActivityIndicator />
        )}


        <SortListingDrawer visible={drawerVisible && currentDrawer=='sort'} onClose={closeDrawer} onSelectionChange={(value) => setSelectedSorting(value)} />
        <FilterListingDrawer visible={drawerVisible && currentDrawer=='cuisine'} onClose={closeDrawer} onSelectionChange={(value) => setSelectedCuisine(value)} />
      </View>
  );
}

export default Home