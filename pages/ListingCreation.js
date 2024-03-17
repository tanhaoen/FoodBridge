import { View, Text, StyleSheet, Image } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { TextInput, Portal, Modal } from "react-native-paper";
import * as React from 'react'
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

const ListingCreation = ({ navigation, route }) => {
    // Modal related variables
    const [visible, setVisible] = React.useState(false)
    const containerStyle = {
        backgroundColor: 'white', 
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center'
    };

    // Listing required information
    const [FoodTitle, setFoodTitle] = React.useState("")
    const [FoodDesc, setFoodDesc] = React.useState("")
    const [Price, setPrice] = React.useState(0)
    const [Quantity, setQuantity] = React.useState(0)
    const [ExpiryTime, setExpiryTime] = React.useState("")
    // const [Category, setCategory] = React.useState("")
    const [FoodPhoto, setFoodPhoto] = React.useState("")
    const [Address, setAddress] = React.useState("")
    
    {/* To fix */}
    const ProviderName = ""
    const IsVerified = false

    const addListing = useMutation(api.listings.addListings)
    const handleAddListing = async () => {
        // await addListing({
        //     title: FoodTitle,
        //     description: FoodDesc,
        //     provider_name: ProviderName,
        //     verified_provider: IsVerified,
        //     price: Price,
        //     quantity: Quantity,
        //     expiry_time: ExpiryTime,
        //     categories: [""], // Remove please
        //     thumbnail_url: FoodPhoto,
        //     address: Address
        // })
        setVisible(true)
    }
    return(
        <View style={styles.container}>
            <View style={{flex: 1, backgroundColor: '#2DCC70', alignItems: 'center', justifyContent: 'center', padding: 10}}>
                <Text style={{fontFamily: "Poppins", fontSize: 35, color: 'black', padding: 27}}>Don't waste, share the plate!</Text>
            </View>
            <ScrollView>
                <View style={styles.inputTextBox}>
                    <TextInput
                        value={FoodTitle}
                        placeholder="The shorter the better!"
                        mode= 'outlined'
                        label="Food Title"
                        onChangeText={(FoodTitle) => setFoodTitle(FoodTitle)}
                    />
                    <TextInput
                        value={FoodDesc}
                        placeholder="The shorter the better!"
                        mode= 'outlined'
                        label="Food Description"
                        onChangeText={(FoodDesc) => setFoodDesc(FoodDesc)}
                    />
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>   
                        <TextInput
                            value={Price}
                            placeholder="You could share it for free!"
                            mode= 'outlined'
                            label="Price / serving"
                            onChangeText={(Price) => setPrice(Price)}
                        />
                        <TextInput
                            value={Quantity}
                            placeholder="If you dont need it, just share it!"
                            mode= 'outlined'
                            label="Quantity"
                            onChangeText={(Quantity) => setQuantity(Quantity)}
                        />
                    </View>
                    <TextInput
                        value={Address}
                        placeholder="As complete as possible"
                        mode= 'outlined'
                        label="Pick Up Location"
                        onChangeText={(Address) => setAddress(Address)}
                    />
                    <TextInput
                        value={ExpiryTime}
                        placeholder="Available Until (e.g., 9:00 AM)"
                        mode= 'outlined'
                        label="Availble Until"
                        onChangeText={(ExpiryTime) => setExpiryTime(ExpiryTime)}
                    />
                    {/*Skipped implementing the photo upload section due to time constraints*/}
                    <TextInput
                        value={FoodPhoto}
                        placeholder="Yep you can just paste a photo URL here instead of an actual photo!"
                        mode= 'outlined'
                        label="Photo URL"
                        onChangeText={(FoodPhoto) => setFoodPhoto(FoodPhoto)}
                    />
                </View>
            </ScrollView>
            <TouchableOpacity onPress={handleAddListing} style={styles.addListingButton}>
                <Text style={styles.buttonText}>Share food, fight waste</Text>
            </TouchableOpacity>
            <Portal>
                <Modal visible={visible} onDismiss={() => {navigation.navigate("HomePage")}} contentContainerStyle={containerStyle}>
                    <Image source={require('../assets/success-icon.png')}/>
                    <Text style={{fontFamily: 'Poppins', padding: 25, fontSize: 20, color: '#00692C'}}>Listing Creation Completed! Thanks for not wasting the extra food! Click anywhere to go back home!</Text>
                </Modal>
            </Portal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 0,
        //justifyContent: 'center'
    },
    addListingButton: {
        position: '',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#2DCC70',
        borderRadius:40,
        padding: 13,
        marginBottom: 30
    },
    buttonText: {
        color: 'white',
        fontFamily: 'Poppins',
        fontSize: 20
    },
    inputTextBox: {
        //justifyContent: 'center',
        padding: 20,
        paddingHorizontal: 30
    }
})

export default ListingCreation