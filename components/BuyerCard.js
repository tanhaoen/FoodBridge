import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Badge, Button, Card, Chip, Icon, Text, useTheme } from 'react-native-paper';

const BuyerCard = (props) => {

  const {
    buyerName,
    eta,
    distance,
    item,
    quantity
  } = props;

  const theme = useTheme();

  const styles = StyleSheet.create({
    card: {
      // marginHorizontal: 16,
      marginTop: 20,
      borderRadius: 8,
      elevation: 4, // for shadow on Android
      height: 90,
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

  return (
    <Card style={styles.card}>
      <View style={styles.horizontalContainer}>
        <View style={[styles.section, {flex: 3, backgroundColor: theme.colors.background}]}>
          <Text variant='titleMedium' style={[styles.text, {fontWeight: 'bold', paddingLeft: 10}]}>{buyerName}</Text>
          <Text variant='titleSmall' style={[styles.text, {paddingLeft: 10}]}>{eta} minutes away</Text>
          <Text variant='titleSmall' style={[styles.text, {paddingLeft: 10}]}>{distance}m</Text>
        </View>

        <View style={[styles.section, {flex: 5, alignItems: 'center', paddingRight: 10, backgroundColor: theme.colors.background}]}>
          <Text
            variant='titleSmall'
            style={[styles.text, {paddingLeft: 10}]}
          >
          {quantity} x {item}
          </Text>
        </View>

        <View style={[styles.section, {flex: 2, backgroundColor: theme.colors.primary, alignItems: 'center'}]}>
          <Avatar.Image size={60} source={require('../assets/avatar.png')} />
        </View>
      </View>
    </Card>
  )
}

export default BuyerCard;