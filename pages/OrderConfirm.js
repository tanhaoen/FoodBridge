import { Text, TouchableOpacity, View, StyleSheet, Image, Animated } from 'react-native'
import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons'

const OrderConfirm = ({ route }) => {
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
    const handleConfirmOrder = () => {
        
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
                    <Text style={{fontSize: 25, marginTop: 15, fontWeight: "bold"}}> x {orderQuantity}</Text>
                </View>
                <View style={styles.foodTotalPrice}>
                    <Text style={{fontWeight: "bold", fontSize: 20, marginTop: 30, marginRight: 10}}>Total:</Text>
                    <Text style={{ fontSize: 50, fontWeight: 'bold', color: '#00692C', marginRight: 60}}>${price * orderQuantity}</Text>
                </View>
                {/* The part where we let user decides on the quantity to place */}
                <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20, marginLeft: 50}}>
                    {/* The minus button */}
                    <TouchableOpacity style={{backgroundColor: "red"}}>
                        <Ionicons name={"remove"} size={29} style={{marginTop: 1}} onPress={handleRemoveOrder}/>
                    </TouchableOpacity>

                    {/* Middle part where it displays the quantity */}
                    <View style={{backgroundColor: '#C4C4C4', padding: 2, paddingRight: 30, paddingLeft: 30, shadowOpacity: 1}}>
                        <Text style={{fontSize: 20, fontWeight: 'bold', opacity: 1}}>{orderQuantity}</Text>
                    </View>

                    {/* The add button */}
                    <TouchableOpacity style={{backgroundColor: "#2DCC70"}} onPress={handleAddOrder}>
                        <Ionicons name={"add"} size={29} />
                    </TouchableOpacity>

                    {/* maximum amount */}
                    <Text style={{marginLeft: 10, marginTop: 10, fontSize: 15, fontWeight: 'bold'}}>max: {quantity}</Text>
                </View>
                <View style={{alignItems:'center', fontWeight: 'bold', fontSize: '10'}}>
                    {orderQuantity === quantity && (
                        <Text style={{color: 'red'}}>Maximum quantity reached</Text>
                    )}
                    {orderQuantity === 1 && (
                        <Text style={{color: "red"}}>Minimum quantity is 1</Text>
                    )}
                </View>
                <TouchableOpacity style={[styles.confirmButton]} onPress>
                    <Text style={{color: 'white', fontSize: 25, fontWeight: 'bold'}}>Confirm and Pick Up</Text>
                </TouchableOpacity>
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
        fontSize: 25,
        fontWeight: "700",
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
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20
    },
    foodDescription: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    availableTime: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
        marginBottom: 40
    },
    price: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#00692C'
    },
    foodQuantity: {
        flexDirection: 'row',
        marginBottom: 25
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
        padding: 10,
    }
})
export default OrderConfirm