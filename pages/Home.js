import * as React from 'react';
import { FlatList, ScrollView, StyleSheet, View, Image } from 'react-native';
import { ActivityIndicator, Chip, Divider, Icon, IconButton, Searchbar, Text, useTheme } from "react-native-paper";

import { useFonts } from 'expo-font';
import { ClerkProvider, SignedIn, SignedOut, useAuth, useUser } from "@clerk/clerk-expo";

import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

import { calculateDistance} from "../utils";

import Slider from '@react-native-community/slider';

import SortListingDrawer from "../components/SortListingDrawer";
import ListingCard from "../components/ListingCard";
import { LocationContext } from "../components/LocationProvider";
import { TouchableOpacity } from 'react-native-gesture-handler';

const Home = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    "Poppins-Medium" : require('../assets/fonts/Poppins-Medium.ttf'),
    "Poppins-Light" : require('../assets/fonts/Poppins-Light.ttf'),
    "Poppins-Regular" : require('../assets/fonts/Poppins-Regular.ttf'),
  })

  const theme = useTheme();
  const { location, errorMsg } = React.useContext(LocationContext);

  const cuisines = ["Chinese", "Malay", "Indian", "Western", "Korean", "Thai", "Japanese"]

  const [searchQuery, setSearchQuery] = React.useState("");
  const [drawerVisible, setDrawerVisible] = React.useState(false);
  const [currentOption, setCurrentOption] = React.useState('');
  const [selectedSorting, setSelectedSorting] = React.useState({ field: "_creationTime", order: "desc" });
  const [selectedCuisines, setSelectedCuisines] = React.useState([]);
  const [displayDistance, setDisplayDistance] = React.useState(1000);
  const [selectedDistance, setSelectedDistance] = React.useState(1000);
  const [verifiedOnly, setVerifiedOnly] = React.useState(false);

  const { isSignedIn, user } = useUser();

  const USERID = useQuery(api.users.getUserID, { first_name: user.firstName });

  const listingData = useQuery(api.listings.queryListings, { user_id: USERID, search_query: searchQuery });

  const results = React.useMemo(() => {
    if (listingData !== undefined && listingData !== null) {
      let temp = listingData;

      if (location !== undefined && location !== null) {
        temp = temp.map((item) => {
          item.distance = calculateDistance(location.coords.latitude, location.coords.longitude, item.location.latitude, item.location.longitude);
          return item;
        });
      }

      // Apply sorting
      temp = temp.sort((a, b) => {
        if (a[selectedSorting.field] < b[selectedSorting.field]) {
          return selectedSorting.order === "asc" ? -1 : 1;
        } else if (a[selectedSorting.field] > b[selectedSorting.field]) {
          return selectedSorting.order === "asc" ? 1 : -1;
        } else {
          return 0;
        }
      });

      // Toggle filter for verified listings
      if (verifiedOnly) {
        temp = temp.filter((item) => item.verified === true);
      }

      // Filter for selected categories
      if (selectedCuisines.length > 0) {
        temp = temp.filter((item) => selectedCuisines.includes(item.categories[0]));
      }

      // Filter for distance
      temp = temp.filter((item) => item.distance <= selectedDistance);

      return temp;
    }
  }, [listingData, selectedSorting, selectedCuisines, selectedDistance, verifiedOnly, location]);

  const handleCuisineChange = (value) => {
    const isSelected = selectedCuisines.includes(value);
    const updatedCuisines = isSelected
      ? selectedCuisines.filter((selectedCuisine) => selectedCuisine !== value)
      : [...selectedCuisines, value];

    setSelectedCuisines(updatedCuisines);
  };

  const styles = StyleSheet.create({
    chip: {
      marginRight: 8,
      marginTop: 10
    },
    chip_unselected: {
      backgroundColor: theme.colors.light,
      color: 'black'
    },
    chip_selected: {
      backgroundColor: theme.colors.primary,
      color: 'white'
    },
    filter: {
      marginBottom: 25,
      flexDirection: 'row',
      flexWrap: 'wrap',
      flexGrow: 0,
    },
    row : {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      flexWrap: 'wrap'
    },
  })

  const handleSortingChange = (value) => {
    if (value == "recent") {
      setSelectedSorting({ field: "_creationTime", order: "desc" });
    } else if (value === "expiry_latest") {
      setSelectedSorting({ field: "expiry_time", order: "desc" });
    } else if (value === "expiry_earliest") {
      setSelectedSorting({ field: "expiry_time", order: "asc" });
    } else if (value === "price") {
      setSelectedSorting({ field: "price", order: "asc" });
    }
  }

  // const handleCuisineChange = (values) => {
  //   setSelectedCuisines(values);
  // }

  const AssetIcon = () => {
    return <Icon icon={() => <Image source={require('../assets/add_listing_button.png')}/>}/> 
  }

  const handleAddListing = () => {
    navigation.navigate("Create Listing", { user_id: USERID })
  }
  return (
    <View style={{ marginHorizontal: 16, marginTop: 10, flex: 1 }}>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={{
          backgroundColor: theme.colors.light,
          opacity: 0.7,
        }}
      />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filter}>
        <Chip
          icon="sort"
          style={[styles.chip, styles.chip_unselected]}
          onPress={() => setDrawerVisible(true)}
        />

        <Chip
          icon="food-takeout-box"
          style={[styles.chip, currentOption === 'cuisine' ? styles.chip_selected : styles.chip_unselected]}
          onPress={() => setCurrentOption(currentOption === 'cuisine' ? '' : 'cuisine')}
        >
          Cuisine
        </Chip>

        <Chip
          icon="map-marker"
          style={[styles.chip, currentOption === 'distance' ? styles.chip_selected : styles.chip_unselected]}
          onPress={() => setCurrentOption(currentOption === 'distance' ? '' : 'distance')}
        >
          Distance
        </Chip>

        <Chip
          icon="check-decagram"
          style={[styles.chip, verifiedOnly ? styles.chip_selected : styles.chip_unselected]}
          onPress={() => setVerifiedOnly(!verifiedOnly)}
        >
          Verified
        </Chip>
      </ScrollView>

      <View>
        {currentOption === 'distance' && (
          <View style={{ alignItems: 'center' }}>
            <Text>Listings within
              <Text variant="titleLarge" style={{ fontWeight: "bold" }}> {displayDistance}m </Text> 
              radius
            </Text>
            <Slider
              style={{ width: "100%", height: 40 }}
              minimumValue={50}
              maximumValue={1000}
              minimumTrackTintColor={theme.colors.primary}
              maximumTrackTintColor={theme.colors.black}
              value={selectedDistance}
              step={50}
              onValueChange={(value) => setDisplayDistance(value)}
              onSlidingComplete={(value) => setSelectedDistance(value)}
            />
          </View>
        )}

        {currentOption === 'cuisine' && (
          <View style={{alignItems: 'center'}}>
            <Text>Select cuisines:</Text>
            <View style={[styles.row, {justifyContent: 'center'}]}>
              
              {cuisines.map((category, index) => (
                <Chip
                  key={index}
                  style={[
                    styles.chip,
                    selectedCuisines.includes(category) ? styles.chip_selected : styles.chip_unselected
                  ]}
                  onPress={() => handleCuisineChange(category)}
                  showSelectedCheck={false}
                >
                  {category}
                </Chip>
              ))}
            </View>
          </View>
        )}
      </View>

      <Divider />

      {listingData !== undefined ? (
      <View style={{flex: 1}}>
        <ScrollView vertical showsVerticalScrollIndicator={false}>
          {listingData !== undefined && listingData !== null && listingData.length > 0 ? (
            results.map((item, index) => (
              <ListingCard
                navigation={navigation}
                key={item._id}
                _id={item._id}
                title={item.title}
                description={item.description}
                sellerId={item.seller_id}
                sellerName={item.seller_name}
                buyerId={USERID}
                price={item.price}
                quantity={item.quantity}
                expiryTime={item.expiry_time}
                distance={item.distance}
                location={item.location}
                thumbnailUrl={item.thumbnail_url}
                verified={item.verified}
              />
            ))
          ) : (
            <Text>No listings found</Text>
          )}
        </ScrollView>
        <TouchableOpacity onPress={handleAddListing} style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image style={{width: 85, height: 85}} source={require('../assets/add_listing_button.png')} />
        </TouchableOpacity>
      </View>
      ) : (
        <ActivityIndicator />
      )}

      <SortListingDrawer visible={drawerVisible} onClose={() => setDrawerVisible(false)} onSelectionChange={handleSortingChange} />
    </View>
  );
}

export default Home