import * as React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Avatar, Badge, Button, Card, Chip, Icon, Text, useTheme } from 'react-native-paper';

import { useFonts } from 'expo-font';

const ListingCard = ({navigation, ...props}) => {
    const theme = useTheme();
    const [fontsLoaded] = useFonts({
      "Poppins-Medium" : require('../assets/fonts/Poppins-Medium.ttf'),
      "Poppins-Light" : require('../assets/fonts/Poppins-Light.ttf'),
      "Poppins-Regular" : require('../assets/fonts/Poppins-Regular.ttf'),
    })
    const {
      key,
      _id,
      title,
      description,
      sellerId,
      sellerName,
      buyerId,
      price,
      quantity,
      expiryTime,
      distance,
      location,
      thumbnailUrl,
      verified } = props;

    return (
      <TouchableOpacity onPress={() => navigation.navigate('OrderConfirm', props)}>
        <Card style={styles.card}>
          <View style={styles.horizontalContainer}>
            {/* First Section */}
            <View style={[styles.section, { flex: 3 }]}>
              <Card.Cover
                source={{ uri: thumbnailUrl }}
                style={styles.cover} />
            </View>

            {/* Second Section */}
            <View style={[styles.section, { flex: 5, backgroundColor: theme.colors.background, paddingLeft: 10, paddingRight: 10 }]}>
              <Text variant='titleSmall' style={[styles.text, {fontFamily: "Poppins-Bold"}]}>{title}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text variant='labelMedium' style={[styles.text, {fontFamily: "Poppins-Medium"}]}>{sellerName}</Text>
                {verified && (<Icon source='check-decagram' color='blue' />)}
              </View>
              {price <= 0 && (
                <Text variant='titleMedium' style={[styles.text, {color: theme.colors.secondary, fontFamily: "Poppins-Bold"}]}>FREE</Text>  
              )}
              {price > 0 && (
                <Text variant='titleMedium' style={[styles.text, {color: theme.colors.secondary, fontFamily: "Poppins-Bold"}]}>${price.toFixed(2)}</Text>
              )}

              <Text variant='labelMedium' style={[styles.text]}>Available until {new Date(expiryTime * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Text>
              <Text variant='labelSmall' style={[styles.text]}>{distance}m away</Text>
            </View>
    
            {/* Third Section */}
            <View style={[styles.section, { flex: 2, backgroundColor: theme.colors.secondary, alignItems: 'center' }]}>
              
              <Text variant='displayMedium' style={[{color: '#F0F08C', fontFamily: "Poppins-Bold"}]}>{quantity}</Text>
              <Text variant='titleLarge' style={[{color: '#F0F08C', fontFamily: "Poppins-Bold"}]}>left</Text>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    borderRadius: 8,
    elevation: 4, // for shadow on Android
    height: 130, 
  },
  horizontalContainer: {
    flexDirection: 'row',
    height: '100%',
    borderRadius: 8,
    overflow: 'hidden'
  },
  section: {
    padding: 0,
    justifyContent: 'center'
  },
  text: {
    color: '#333', // Default text color
  },
  title: {
    fontFamily: "Poppins",
    fontSize: 18,
  },
  subtitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    marginTop: 8,
  },
  content: {
    fontSize: 14,
  },
  cover: {
    flex: 1,
    resizeMode: 'cover',
    borderRadius: 0
  },
  cardActions: {
    justifyContent: 'flex-end',
  },
  button: {
    marginLeft: 8,
  },
});

export default ListingCard;