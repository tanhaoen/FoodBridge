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

const Home = ({ navigation }) => {
  const theme = useTheme();

  const [searchQuery, setSearchQuery] = React.useState('')
  const [selectedSorting, setSelectedSorting] = React.useState({ field: "_creationTime", order: "desc" });
  const [drawerVisible, setDrawerVisible] = React.useState(false);
  const [currentDrawer, setCurrentDrawer] = React.useState('');

  const [selectedCuisines, setSelectedCuisines] = React.useState([]);
  const [verifiedOnly, setVerifiedOnly] = React.useState(false);

  const listingData = useQuery(api.listings.queryListings);

  const results = React.useMemo(() => {
    if (listingData !== undefined) {
      let temp = listingData;

      temp = temp.sort((a, b) => {
        if (a[selectedSorting.field] < b[selectedSorting.field]) {
          return selectedSorting.order === "asc" ? -1 : 1;
        } else if (a[selectedSorting.field] > b[selectedSorting.field]) {
          return selectedSorting.order === "asc" ? 1 : -1;
        } else {
          return 0;
        }
      });

      if (verifiedOnly) {
        temp = temp.filter((item) => item.verified_provider === true);
      }

      if (selectedCuisines.length > 0) {
        temp = temp.filter((item) => selectedCuisines.includes(item.categories[0]));
      }

      return temp;
    }
  }, [listingData, verifiedOnly, selectedSorting, selectedCuisines]);

  

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


      <SortListingDrawer visible={drawerVisible && currentDrawer=='sort'} onClose={() => setDrawerVisible(false)} onSelectionChange={handleSortingChange} />
      <FilterListingDrawer visible={drawerVisible && currentDrawer=='cuisine'} onClose={() => setDrawerVisible(false)} onSelectionChange={handleCuisineChange} />
    </View>
  );
}

export default Home