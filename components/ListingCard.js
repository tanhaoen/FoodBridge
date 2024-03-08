import { ConvexProvider, ConvexReactClient } from "convex/react";
import { CONVEX_URL } from "@env";
import * as React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Avatar, Badge, Button, Card, Text, useTheme } from 'react-native-paper';

const ListingCard = (props) => {
    const theme = useTheme();
    const { title, provider, price, quantity, availableUntil, distance, thumbnail } = props;

    return (
      <Card style={styles.card}>
        
        <View style={styles.horizontalContainer}>
          {/* First Section */}
          <View style={[styles.section, { flex: 3 }]}>
            <Card.Cover
              source={{ uri: thumbnail }}
              style={styles.cover} />
          </View>
  
          {/* Second Section */}
          <View style={[styles.section, { flex: 5, backgroundColor: theme.colors.background, paddingLeft: 10 }]}>
            <Text variant='titleMedium' style={[styles.text, {fontWeight: 'bold'}]}>{title}</Text>
            <Text variant='titleSmall' style={[styles.text]}>{provider}</Text>
            <Text variant='titleLarge' style={[styles.text, {color: theme.colors.secondary, fontWeight: 'bold'}]}>${price}</Text>

            <Text variant='titleSmall' style={[styles.text]}>Available until: {availableUntil}</Text>
            <Text variant='labelSmall' style={[styles.text]}>{distance} away</Text>
          </View>
  
          {/* Third Section */}
          <View style={[styles.section, { flex: 2, backgroundColor: theme.colors.secondary, alignItems: 'center' }]}>
            
            <Text variant='displayMedium' style={[{color: '#F0F08C', fontWeight: 'bold'}]}>{quantity}</Text>
            <Text variant='titleLarge' style={[{color: '#F0F08C', fontWeight: 'bold'}]}>left</Text>
          </View>
        </View>

      </Card>
    );
}

const styles = StyleSheet.create({
    card: {
      marginHorizontal: 16,
      marginTop: 20,
      borderRadius: 8,
      elevation: 4, // for shadow on Android
      height: 150,
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
      fontSize: 18,
      fontWeight: 'bold',
    },
    subtitle: {
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