import { Text, TouchableOpacity, View, StyleSheet, Image, Animated, Touchable } from 'react-native'
import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { ActivityIndicator, Card } from 'react-native-paper';

import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { incrementOrderNumber } from '../convex/order_number';

const OrderConfirm = ({ navigation, route }) => {
    const [isBuffering, setBuffering] = React.useState(false)
    const [orderQuantity, setorderQuantity] = React.useState(1)
    const {
        title,
        providerName,
        price,
        quantity,
        expiryTime,
        distance,
        thumbnailUrl,
        verifiedProvider
    } = route.params
    const handleAddOrder = () => {
        if (orderQuantity < quantity) {
            setorderQuantity(orderQuantity + 1)
        }
    }
    const handleRemoveOrder = () => {
        if (orderQuantity > 1) {
            setorderQuantity(orderQuantity - 1)
        }
    }
    const curOrderNum = useQuery(api.order_number.getOrderNumber)
    const incrementOrderNumber = useMutation(api.order_number.incrementOrderNumber);
    const handleConfirmOrder = () => {
        setBuffering(true)
        // Gives the user 8 seconds to cancel order
        setTimeout(() => {
            incrementOrderNumber({id: "kh79ct164m3ejwbqcegn9wwg9s6ndnp7", num: curOrderNum})
            navigation.navigate("PickUpConfirmation", route.params)
        }, 1000)
    }
    const handleCancelOrder = () => {
        setBuffering(false)
    }
    const ConfirmPickUpText = () => {
        return (
            <TouchableOpacity style={[styles.confirmButton]} onPress={handleConfirmOrder}>
                <Text style={{fontFamily: "Poppins", color: 'white', fontSize: 25}}>Confirm and Pick Up</Text>
            </TouchableOpacity>
        )
    }
    const BufferIndicator = () => {
        return (
            <View>
                <View style={styles.confirmButton}>
                    <Text style={{fontFamily: 'Poppins', fontSize: 25, color: 'white'}}>Sending Order</Text>
                    <ActivityIndicator animating={true} color='white' size={35} style={{marginLeft: 10, marginBottom: 5}} />
                </View>
                <TouchableOpacity style={{alignItems: 'center'}} onPress={handleCancelOrder}>
                    <Text style={{color: 'red', fontFamily: 'Poppins-Bold', marginTop: 10, fontSize: 20}}>Cancel Order</Text>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            {/* The top green part */}
            <View style={styles.topSection}>
                <Image 
                    source={{ uri: thumbnailUrl }}
                    style={styles.image}
                    resizeMode='cover'
                />
                <View style={styles.textContainer}>
                    <Text style={styles.provider}>{providerName}</Text>
                    {verifiedProvider && (
                    <Image
                    source={require('../assets/verified-icon.png')}
                    style={styles.verifiedIcon}
                    resizeMode="contain"
                    />
                    )}
                </View>
            </View>
            {/* The bottom white part */}
            <View style={styles.bottomSection}>
                <Text style={styles.foodTitle}>{title}</Text>
                <Text style={styles.foodDescription}>Food Description</Text>
                <Text style={styles.availableTime}>Availble Until {new Date(expiryTime * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Text>
                <View style={styles.foodQuantity}>
                    <Text style={styles.price}>${price}</Text>
                    <Text style={{fontSize: 25, marginTop: 15, fontFamily: 'Poppins-SemiBold'}}> x {orderQuantity}</Text>
                </View>
                <View style={styles.foodTotalPrice}>
                    <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 18, marginTop: 32, marginRight: 10}}>Total:</Text>
                    <Text style={{ fontSize: 50, fontFamily: 'Poppins-Bold', color: '#00692C', marginRight: 60}}>${price * orderQuantity}</Text>
                </View>
                {/* The part where we let user decides on the quantity to place */}
                <View style={{flexDirection: 'row', justifyContent: 'center', marginLeft: 50, alignContent: 'center'}}>
                    {/* The minus button */}
                    <TouchableOpacity style={{backgroundColor: "red"}}>
                        <Ionicons name={"remove"} size={29} style={{marginTop: 5}} onPress={handleRemoveOrder}/>
                    </TouchableOpacity>

                    {/* Middle part where it displays the quantity */}
                    <View style={{backgroundColor: '#C4C4C4', padding: 2, paddingRight: 30, paddingLeft: 30}}>
                        <Text style={{fontSize: 20, fontFamily: 'Poppins-Bold', opacity: 1}}>{orderQuantity}</Text>
                    </View>

                    {/* The add button */}
                    <TouchableOpacity style={{backgroundColor: "#2DCC70"}} onPress={handleAddOrder}>
                        <Ionicons name={"add"} size={29} style={{marginTop: 5}} />
                    </TouchableOpacity>

                    {/* maximum amount */}
                    <Text style={{marginLeft: 10, marginTop: 10, fontSize: 15, fontFamily: 'Poppins-Bold'}}>max: {quantity}</Text>
                </View>
                <View style={{alignItems:'center', fontFamily: 'Poppins-Bold', fontSize: '10'}}>
                    {orderQuantity === quantity && (
                        <Text style={{color: 'red', fontFamily: "Poppins"}}>Maximum quantity reached</Text>
                    )}
                    {orderQuantity === 1 && (
                        <Text style={{color: "red", fontFamily: 'Poppins'}}>Minimum quantity is 1</Text>
                    )}
                </View>
                {/* Confirm Order Button */}
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    {isBuffering ? <BufferIndicator /> : <ConfirmPickUpText />}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topSection: {
        flex: 0.4,
        justifyContent: 'flex-end',
        backgroundColor: '#2DCC70',
    },
    image: {
        flex: 1,
        width: '100%'
    },
    textContainer: {
        position: 'absolute',
        left: 15,
        bottom: 15,
        flexDirection: 'row',
    },
    verifiedIcon: {
        width: 30,
        height: 30,
        marginLeft: 10,
        marginTop: 4,
        shadowColor: '#000', // Dont think the drop shadow works right now 
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 2,
        shadowOpacity: 1,
    },
    provider: {
        fontFamily: 'Poppins-Bold',
        fontSize: 25,
        color: "white",
        textShadowColor: 'rgba(0, 0, 0, 1)', // Shadow color
        textShadowOffset: { width: 1, height: 3 }, // Shadow offset
        textShadowRadius: 10, // Shadow radius
    },
    bottomSection: {
        flex: 0.7,
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        paddingHorizontal: 20, // Add horizontal padding to the bottom section
        paddingVertical: 10, // Add vertical padding to the bottom section
    },
    foodTitle: {
        fontFamily: 'Poppins',
        fontSize: 30,
        fontFamily: 'Poppins-Bold',
        marginTop: 0,
        marginBottom: 0
    },
    foodDescription: {
        fontSize: 17,
        fontFamily: 'Poppins-SemiBold',
        marginBottom: 0,
    },
    availableTime: {
        fontSize: 17,
        color: 'black',
        fontFamily: 'Poppins-SemiBold',
    },
    price: {
        fontSize: 40,
        fontFamily: 'Poppins-SemiBold',
        color: '#00692C'
    },
    foodQuantity: {
        flexDirection: 'row',
    }, 
    foodTotalPrice: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    confirmButton: {
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: "#2DCC70",
        borderRadius: 40,
        marginTop: 10,
        padding: 12,
        justifyContent: 'center',
        flexDirection: 'row'
    }
})
export default OrderConfirm