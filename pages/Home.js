import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Chip, Searchbar, Text, useTheme } from "react-native-paper";

import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

import SortListingDrawer from "../components/SortListingDrawer";
import FilterListingDrawer from "../components/FilterListingDrawer";
import ListingCard from "../components/ListingCard";
import { LocationContext } from "../components/LocationProvider";

const Home = ({ navigation }) => {
  const theme = useTheme();
  const { location, errorMsg } = React.useContext(LocationContext);

  const [searchQuery, setSearchQuery] = React.useState('')
  const [selectedSorting, setSelectedSorting] = React.useState({ field: "_creationTime", order: "desc" });
  const [drawerVisible, setDrawerVisible] = React.useState(false);
  const [currentDrawer, setCurrentDrawer] = React.useState('');

  const [selectedCuisines, setSelectedCuisines] = React.useState([]);
  const [verifiedOnly, setVerifiedOnly] = React.useState(false);

  const listingData = useQuery(api.listings.queryListings, { user_id: "jh7dd7a3s178tyv4dzz2m1ebrd6nbsq7" });

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return parseInt(distance*1000);
  };

  const toRadians = (degrees) => {
      return degrees * (Math.PI / 180);
  };

  const results = React.useMemo(() => {
    if (listingData !== undefined) {
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

      return temp;
    }
  }, [listingData, verifiedOnly, selectedSorting, selectedCuisines, location]);

  

  const openDrawer = (drawer) => {
    setCurrentDrawer(drawer);
    setDrawerVisible(true);
  };

  const styles = StyleSheet.create({
    chip_unselected: {
      marginRight: 8,
      marginTop: 10,
      backgroundColor: theme.colors.light
    },
    chip_selected: {
      marginRight: 8,
      marginTop: 10,
      backgroundColor: theme.colors.primary
    },
    filter: {
      marginBottom: 10,
      flexDirection: 'row',
      flexWrap: 'wrap'
    }
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

  const handleCuisineChange = (values) => {
    setSelectedCuisines(values);
  }
  
  return (
    <View style={{ marginHorizontal: 16, marginTop: 10 }}>
      <Searchbar
      placeholder="Search"
      onChangeText={setSearchQuery}
      value={searchQuery}
      style={{
        backgroundColor: theme.colors.light,
        opacity: 0.7,
      }}
      />

      <View style={styles.filter}>
        <Chip
          icon="sort"
          style={styles.chip_unselected}
          onPress={() => openDrawer('sort')}
        />

        <Chip
          icon="food-takeout-box"
          style={styles.chip_unselected}
          onPress={() => openDrawer('cuisine')}
        >
          Cuisine
        </Chip>

        <Chip
          icon="map-marker"
          style={styles.chip_unselected}
          onPress={() => openDrawer('distance')}
        >
          Distance
        </Chip>

        <Chip
          icon="check-decagram"
          style={verifiedOnly ? styles.chip_selected : styles.chip_unselected}
          onPress={() => setVerifiedOnly(!verifiedOnly)}
        >
          Verified
        </Chip>
      </View>
      
      {listingData !== undefined ? (
        <ScrollView vertical>
          {listingData.length > 0 ? (
            results.map((item, index) => (
              <ListingCard
                navigation={navigation}
                key={item._id}
                title={item.title}
                sellerName={item.seller_name}
                price={item.price}
                quantity={item.quantity}
                expiryTime={item.expiry_time}
                distance={item.distance}
                thumbnailUrl={item.thumbnail_url}
                verified={item.verified}
              />
            ))
          ) : (
            <Text>No listings found</Text>
          )}
        </ScrollView>
      ) : (
        <ActivityIndicator />
      )}


      <SortListingDrawer visible={drawerVisible && currentDrawer=='sort'} onClose={() => setDrawerVisible(false)} onSelectionChange={handleSortingChange} />
      <FilterListingDrawer visible={drawerVisible && currentDrawer=='cuisine'} onClose={() => setDrawerVisible(false)} onSelectionChange={handleCuisineChange} />
    </View>
  );
}

export default Home