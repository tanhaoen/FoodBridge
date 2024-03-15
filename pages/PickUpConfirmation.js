import { View, StyleSheet, TouchableOpacity, Text, Linking } from "react-native";
import * as React from 'react'
import { ActivityIndicator, Card } from "react-native-paper";
import Ionicons from 'react-native-vector-icons/Ionicons'

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
    const address = "1 Woodlands Square, #01 - 35 Causeway Point, Singapore 738099"
    const [isPaymentSucessful, setPaymentSuccessful] = React.useState(false)
    const handleBackToHome = async () => {
        setPaymentSuccessful(true)
        setTimeout(() => {
            navigation.navigate("HomePage")
        }, 5000)
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
                <TouchableOpacity onPress={handleBackToHome} style={styles.OrderCollectedButton}>
                    <Text style={{color: 'white', fontSize: 20, fontFamily: 'Poppins'}}>Order Collected</Text>
                </TouchableOpacity>
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
                <Text style={{fontFamily: 'Poppins-Bold', fontSize: 25}}>Your order is ready!</Text>
                <Text style={{fontFamily: 'Poppins-Bold', fontSize: 20}}>Pick up number is</Text>
                <Text style={{fontFamily: 'Poppins', fontSize: 40, color: '#00692C'}}>ORDER_NUMBER</Text>
                <Text style={{fontFamily: 'Poppins', fontSize: 25}}>Collect by {new Date(expiryTime * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} at </Text>
                <TouchableOpacity onPress={handleAddressPress}>
                    <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 30}}>{address}</Text>
                </TouchableOpacity>
            </View>
            {/* Payment details */}
            <View style={{alignItems: 'flex-start', paddingLeft: 30}}>
                <Text style={{fontFamily: 'Poppins', fontSize: 25, paddingLeft: 0}}>Payment Details</Text>
                <View style={{flexDirection: 'row', marginTop: 20}}>
                    <Ionicons name={"logo-paypal"} size={30} color={'#2DCC70'} />
                    <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 20, marginLeft: 10}}>**57</Text>
                </View>
            </View>
            {isPaymentSucessful ? <Buffering /> : <OrderCollectedButton />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 80,
        //alignItems: 'center'
    },
    OrderCollectedButton : {
        backgroundColor: '#2DCC70',
        padding: 15,
        borderRadius: 40,
    }
})

export default PickUpConfirmation