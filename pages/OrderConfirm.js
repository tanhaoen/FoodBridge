import { TouchableOpacity, View, StyleSheet, Image, Animated, Touchable } from 'react-native'
import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { ActivityIndicator, Button, Divider, Text, useTheme } from 'react-native-paper';

import { useFonts } from 'expo-font';

import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

const OrderConfirm = ({ navigation, route }) => {
    const theme = useTheme();
    const [fontsLoaded] = useFonts({
        "Poppins-Medium" : require('../assets/fonts/Poppins-Medium.ttf'),
        "Poppins-Light" : require('../assets/fonts/Poppins-Light.ttf'),
        "Poppins-Regular" : require('../assets/fonts/Poppins-Regular.ttf'),
        "Poppins-Bold" : require('../assets/fonts/Poppins-Bold.ttf'),
      })
    const [isBuffering, setBuffering] = React.useState(false)
    const [orderQuantity, setOrderQuantity] = React.useState(1)
    const {
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
        verified
    } = route.params;
    
    const handleAddOrder = () => {
        if (orderQuantity < quantity) {
            setOrderQuantity(orderQuantity + 1)
        }
    }
    const handleRemoveOrder = () => {
        if (orderQuantity > 1) {
            setOrderQuantity(orderQuantity - 1)
        }
    }
    const curOrderNum = useQuery(api.order_number.getOrderNumber)
    const incrementOrderNumber = useMutation(api.order_number.incrementOrderNumber);
    const addOrder = useMutation(api.orders.addOrders);
    const updateListings = useMutation(api.listings.updateListings);
    const [timeoutId, setTimeoutId] = React.useState(null);

    const handleConfirmOrder = () => {
        setBuffering(true);
        const id = setTimeout(() => {
            incrementOrderNumber({ id: "js76304gpwct76fa0mwqavtsys6ner5d", num: curOrderNum });
            updateListings({
                id: _id,
                column: "quantity",
                input: quantity - orderQuantity,
            });
            if (quantity - orderQuantity <= 0) {
                deleteListing({ id: key });
            }
            addOrder({
                buyer_id: buyerId,
                listings_id: _id,
                quantity: orderQuantity,
                seller_id: sellerId,
                order_number: curOrderNum,
            });
            navigation.navigate("PickUpConfirmation", route.params);
        }, 5000);
        setTimeoutId(id);
    };

    const handleCancelOrder = () => {
        setBuffering(false);
        if (timeoutId) {
            clearTimeout(timeoutId);
            setTimeoutId(null);
        }
    };

    const ConfirmPickUpText = () => {
        return (
            <Button
                mode='contained'
                style={styles.confirmButton}
                labelStyle={{fontFamily: "Poppins"}}
                onPress={handleConfirmOrder}
            >
                Confirm Order
            </Button>
        )
    }
    const BufferIndicator = () => {
        return (
            <View style={{marginBottom:'1.5rem'}}>
                <Button
                mode='contained'
                style={styles.cancelButton}
                labelStyle={{fontFamily: "Poppins"}}
                onPress={handleCancelOrder}
                >
                    Cancel Order
                    <ActivityIndicator
                        animating={true}
                        color='white'
                        style={{marginLeft: 10, marginBottom: 5}}
                    />
                </Button>
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
        },
        image: {
            flex: 1,
            width: '100%',
            opacity: 0.8
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
            justifyContent: 'space-between',
            paddingHorizontal: 20, // Add horizontal padding to the bottom section
            paddingVertical: 10, // Add vertical padding to the bottom section
        },
        bottomFirstSection: {

        },
        bottomSecondSection: {
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        foodTitle: {
            fontSize: 30,
            fontFamily: 'Poppins-Bold',
            marginTop: 0,
            marginBottom: 0
        },
        foodDescription: {
            fontSize: 17,
            fontFamily: 'Poppins-Light',
            marginBottom: 0,
        },
        availableTime: {
            fontSize: 17,
            color: 'black',
            fontFamily: 'Poppins-Regular',
        },
        distance: {
            fontSize: 17,
            color: 'black',
            fontFamily: 'Poppins-Regular',
        },
        price: {
            fontSize: 17,
            color: 'black',
            fontFamily: 'Poppins-SemiBold',
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
            backgroundColor: theme.colors.primary,
            borderRadius: 10,
            marginTop: 10,
            justifyContent: 'center',
        },
        cancelButton: {
            alignItems: 'center',
            marginTop: 10,
            backgroundColor: theme.colors.error,
            borderRadius: 10,
            marginTop: 10,
            justifyContent: 'center',
        }
    })

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
                    <Text style={styles.provider}>{sellerName}</Text>
                    {verified && (
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
                <View style={styles.bottomFirstSection}>
                    <Text variant='headlineSmall' style={{fontFamily:'Poppins-Bold'}}>{title}</Text>
                    <Text variant='titleMedium' style={{fontFamily: 'Poppins-Medium'}}>Available until {new Date(expiryTime * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Text>
                    <Text variant='titleMedium' style={{fontFamily: 'Poppins-Medium'}}>{distance}m away</Text>
                    <Divider />
                    <Text variant='bodyMedium' style={{fontFamily: 'Poppins-Light'}}>{description}</Text>
                    <View style={styles.foodQuantity}>
                        {/* <Text style={{fontSize: 25, marginTop: 15, fontFamily: 'Poppins-SemiBold'}}> x {orderQuantity}</Text> */}
                    </View>
                </View>
                <View style={styles.bottomSecondSection}>
                {/* The part where we let user decides on the quantity to place */}
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', width: '60%'}}>
                        {/* The minus button */}
                        <TouchableOpacity style={{backgroundColor: 'red'}}>
                            <Ionicons name="remove" size={40} style={{marginTop: 5}} onPress={handleRemoveOrder}/>
                        </TouchableOpacity>

                        {/* Middle part where it displays the quantity */}
                        <Text variant='headlineSmall' style={{ fontFamily: 'Poppins-Bold' }}>{orderQuantity}</Text>

                        {/* The add button */}
                        <TouchableOpacity style={{backgroundColor: theme.colors.primary}} onPress={handleAddOrder}>
                            <Ionicons name="add" size={40} style={{marginTop: 5}} />
                        </TouchableOpacity>

                        {/* maximum amount */}
                        {/* <Text style={{marginLeft: 10, marginTop: 10, fontSize: 15, fontFamily: 'Poppins-Bold'}}>max: {quantity}</Text> */}
                    </View>
                    <View style={{alignItems: 'center', marginTop: 20}}>
                        <Text variant='titleMedium' style={{fontFamily: 'Poppins-Medium'}}>${price.toFixed(2)} per serving</Text>
                    </View>
                    <View style={styles.foodTotalPrice}>
                        <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 18, marginTop: 32, marginRight: 10}}>Total:</Text>
                        <Text style={{ fontSize: 50, fontFamily: 'Poppins-Bold', color: '#00692C', marginRight: 60}}>${(price * orderQuantity).toFixed(2)}</Text>
                    </View>
                    <View style={{alignItems:'center', fontFamily: 'Poppins-Bold', fontSize: '10'}}>
                        {orderQuantity === quantity && (
                            <Text style={{color: 'red', fontFamily: "Poppins-Medium"}}>Maximum quantity reached</Text>
                        )}
                    </View>
                </View>
                {/* Confirm Order Button */}
                <View style={{marginBottom: 50}}>
                {isBuffering ? (
                    <BufferIndicator />
                    ) : (
                    <ConfirmPickUpText />
                )}
                </View>
                
            </View>
        </View>
    )
}
export default OrderConfirm