import { ConvexProvider, ConvexReactClient } from "convex/react";
import { CONVEX_URL } from "@env";
import * as React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Avatar, Button, Card, Text, useTheme } from 'react-native-paper';

const ListingCard = () => {
    const theme = useTheme();

    return (
      <Card style={styles.card}>
        
        <View style={styles.horizontalContainer}>
          {/* First Section */}
          <View style={[styles.section, { flex: 3 }]}>
            <Card.Cover
              source={{ uri: 'https://picsum.photos/700' }}
              style={styles.cover} />
          </View>
  
          {/* Second Section */}
          <View style={[styles.section, { flex: 5, backgroundColor: theme.colors.background }]}>
            <Text style={[styles.text, styles.content]}>Food Title</Text>
          </View>
  
          {/* Third Section */}
          <View style={[styles.section, { flex: 2, backgroundColor: theme.colors.secondary, justifyContent: 'center', alignItems: 'center' }]}>
            
            <Text variant='displayMedium' style={[{color: '#F0F08C', fontWeight: 'bold'}]}>10</Text>
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
      padding: 0
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