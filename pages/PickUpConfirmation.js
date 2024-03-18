import { View, StyleSheet, TouchableOpacity, Linking } from "react-native";
import * as React from 'react'
import { ActivityIndicator, Button, Card, Text, useTheme } from "react-native-paper";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useFonts } from 'expo-font';

import MapView, { Marker } from 'react-native-maps';

import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const PickUpConfirmation = ({ navigation, route }) => {
    const {
        _id,
        title,
        description,
        sellerName,
        price,
        quantity,
        orderQuantity,
        expiryTime,
        distance,
        location,
        thumbnailUrl,
        verified } = route.params;

    const theme = useTheme();

    const [fontsLoaded] = useFonts({
        "Poppins-Medium" : require('../assets/fonts/Poppins-Medium.ttf'),
        "Poppins-Light" : require('../assets/fonts/Poppins-Light.ttf'),
        "Poppins-Regular" : require('../assets/fonts/Poppins-Regular.ttf'),
        "Poppins-SemiBold" : require('../assets/fonts/Poppins-SemiBold.ttf'),
        "Poppins-Bold" : require('../assets/fonts/Poppins-Bold.ttf'),
        });
    const orderNumber = useQuery(api.order_number.getOrderNumber)
    const address = "1 Woodlands Square, #01 - 35 Causeway Point, Singapore 738099"
    const [isPaymentSucessful, setPaymentSuccessful] = React.useState(false)
    const handleBackToHome = async () => {
        setPaymentSuccessful(true)
        setTimeout(() => {
            navigation.navigate("HomePage")
        }, 1000)
    }
    const Buffering = () => {
        return (
            <View style={{padding: 50, flex: 1}}>
                <View style={{backgroundColor: theme.colors.primary, padding: 10, borderRadius: 10}}>
                    <ActivityIndicator animating={true} color={'white'} size={35}/>
                </View>
            </View>
        )    
    }
    const OrderCollectedButton = () => {
        return (
            <Button mode='contained' style={styles.orderCollectedButton} onPress={handleBackToHome}>
                <Text variant='headlineSmall' style={{color: 'white', fontFamily: 'Poppins'}}>Order Collected</Text>
            </Button>
        )
    }
    const handleAddressPress = () => {
        // Format the address for the Google Maps URL
        const formattedAddress = address.replace(/\s+/g, '+');
        const mapUrl = `https://www.google.com/maps/search/?api=1&query=${formattedAddress}`;
        // Open the Google Maps app with the specified address
        Linking.openURL(mapUrl);
    }
    
    const styles = StyleSheet.create({
        container: {
            flex: 0.55,
            marginTop: 80,
            alignItems: 'center'
        },
        orderCollectedButton : {
            backgroundColor: theme.colors.primary,
            borderRadius: 10,
        },
        map: {
            flex: 1
        },
    })

    return (
            <>
            <View style={styles.container}>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Text variant='headlineSmall' style={{fontFamily: 'Poppins-SemiBold'}}>Your order is ready!</Text>
                    <Text style={{fontFamily: 'Poppins-Regular', fontSize: 20, padding: 10}}>Pick up number is</Text>
                    <Text variant='displayMedium' style={{fontFamily: 'Poppins-Bold', fontSize: 40, color: '#00692C', padding: 15}}>{orderNumber.order_number}</Text>
                    <Text variant='titleLarge' style={{fontFamily: 'Poppins-Regular'}}>Pay ${(price * orderQuantity).toFixed(2)} in cash</Text>
                    <Text variant='headlineSmall' style={{fontFamily: 'Poppins-SemiBold'}}>Collect by {new Date(expiryTime * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Text>
                </View>
            </View>
            <MapView
                provider='google'
                style={styles.map}
                initialRegion={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                showsUserLocation={true}
                showsMyLocationButton={true}
                minZoomLevel={17}
                cameraZoomRange={17}
            >
                <Marker
                    coordinate={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                    }}
                />
            </MapView>
            
            <View style={{marginBottom: 50}}>
            {isPaymentSucessful ? (
                <Buffering />
                ) : (
                <OrderCollectedButton />
            )}
            </View>
            </>
    )
}



export default PickUpConfirmation