import { View, StyleSheet, TouchableOpacity, Text, Linking } from "react-native";
import * as React from 'react'
import { ActivityIndicator, Button, Card } from "react-native-paper";
import Ionicons from 'react-native-vector-icons/Ionicons'

import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

const PickUpConfirmation = ({ navigation, route }) => {
    const {
        title,
        providerName,
        price,
        quantity,
        expiryTime,
        distance,
        thumbnailUrl,
        verifiedProvider } = route.params;
    const order_number = useQuery(api.order_number.getOrderNumber)
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
            <View style={{justifyContent: 'flex-end', padding: 50, flex: 1}}>
                <View style={{backgroundColor: '#2DCC70', padding: 10, borderRadius: 40}}>
                    <ActivityIndicator animating={true} color={'white'} size={35}/>
                </View>
            </View>
        )    
    }
    const OrderCollectedButton = () => {
        return (
            <View style={{justifyContent: 'flex-end', padding: 30, flex: 1, alignItems: 'center'}}>
                <Button mode='contained' style={styles.OrderCollectedButton} onPress={handleBackToHome}>
                    <Text style={{color: 'white', fontFamily: 'Poppins'}}>Order Collected</Text>
                </Button>
            </View>
        )
    }
    const handleAddressPress = () => {
        // Format the address for the Google Maps URL
        const formattedAddress = address.replace(/\s+/g, '+');
        const mapUrl = `https://www.google.com/maps/search/?api=1&query=${formattedAddress}`;
        // Open the Google Maps app with the specified address
        Linking.openURL(mapUrl);
    }
    return (
        <View style={styles.container}>
            <View style={{alignItems: 'center', justifyContent: 'center', padding: 30}}>
                <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 25, padding: 10}}>Your order is ready!</Text>
                <Text style={{fontFamily: 'Poppins-Regular', fontSize: 20, padding: 10}}>Pick up number is</Text>
                <Text style={{fontFamily: 'Poppins', fontSize: 40, color: '#00692C', padding: 15}}>{order_number}</Text>
                <Text style={{fontFamily: 'Poppins', fontSize: 25}}>Collect by {new Date(expiryTime * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} at </Text>
                <TouchableOpacity onPress={handleAddressPress}>
                    <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 30}}>{address}</Text>
                </TouchableOpacity>
            </View>
            {isPaymentSucessful ? <Buffering /> : <OrderCollectedButton />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 80,
        alignItems: 'center'
    },
    OrderCollectedButton : {
        backgroundColor: '#2DCC70',
        padding: 15,
        borderRadius: 40,
    }
})

export default PickUpConfirmation