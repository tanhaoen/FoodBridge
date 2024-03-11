import { Text, TouchableOpacity, View, StyleSheet, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from 'react-native-paper'
import { Colors } from 'react-native/Libraries/NewAppScreen';

const OrderConfirm = ({ route }) => {
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
                    <Text style={{fontSize: 25, marginTop: 15, fontWeight: "bold"}}> x 2</Text>
                </View>
                <View style={styles.foodTotalPrice}>
                    <Text style={{fontWeight: "bold", fontSize: 16, marginTop: 30, marginRight: 10}}>Total:</Text>
                    <Text style={{ fontSize: 50, fontWeight: 'bold', color: '#00692C'}}>${price * 2}</Text>
                </View>
                
            </View>
        </View>
    )
}

export default OrderConfirm

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
        color: 'red',
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
    }
})