import { Image, StyleSheet, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Button, HelperText, Text, TextInput, Portal, Modal, useTheme } from "react-native-paper";
import * as ImagePicker from "expo-image-picker"; 
import * as React from 'react'
import { useFonts } from 'expo-font';

import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

import { LocationContext } from "../components/LocationProvider";

import RNDateTimePicker from "@react-native-community/datetimepicker";

const ListingCreation = ({ navigation, ...props }) => {
    // Modal related variables
    const theme = useTheme();
    const [fontsLoaded] = useFonts({
        "Poppins-Medium" : require('../assets/fonts/Poppins-Medium.ttf'),
        "Poppins-Light" : require('../assets/fonts/Poppins-Light.ttf'),
    })

    const { location, errorMsg } = React.useContext(LocationContext);
    const today = new Date();

    const maxDate = new Date();
    maxDate.setHours(maxDate.getHours() + 2);

    const [visible, setVisible] = React.useState(false)
    const containerStyle = {
        backgroundColor: 'white', 
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center'
    };

    // Listing required information
    const [foodTitle, setFoodTitle] = React.useState("")
    const [foodDesc, setFoodDesc] = React.useState("")
    const [price, setPrice] = React.useState(0)
    const [quantity, setQuantity] = React.useState(0)
    const [expiryDateTime, setExpiryDateTime] = React.useState(today)
    // const [Category, setCategory] = React.useState("")
    
    const [foodPhoto, setFoodPhoto] = React.useState("")

    const [isFocus, setIsFocus] = React.useState(false);

    const addListing = useMutation(api.listings.addListings)
    const handleAddListing = async () => {
        await addListing({
            title: foodTitle,
            description: foodDesc,
            seller_id: "jh7dd7a3s178tyv4dzz2m1ebrd6nbsq7",
            price: price,
            quantity: quantity,
            expiry_time: Math.floor(expiryDateTime.getTime()),
            categories: [],
            thumbnail_url: file,
            location: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            },
        })
        setVisible(true)
    }
    // Stores the selected image URI 
    const [file, setFile] = React.useState(""); 

    // Stores any error message 
    const [error, setError] = React.useState(null); 
    const handlePickImage = async () => { 
        const { status } = await ImagePicker. 
            requestMediaLibraryPermissionsAsync(); 
  
        if (status !== "granted") { 
  
            // If permission is denied, show an alert 
            Alert.alert( 
                "Permission Denied", 
                `Sorry, we need camera  
                 roll permission to upload images.` 
            ); 
        } else { 
  
            // Launch the image library and get 
            // the selected image 
            const result = 
                await ImagePicker.launchImageLibraryAsync(); 
  
            if (!result.cancelled) { 
  
                // If an image is selected (not cancelled),  
                // update the file state variable 
                setFile(result.uri); 
  
                // Clear any previous errors 
                setError(null); 
            }
        } 
    }; 

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'column',
            // flex: 1,
            marginTop: 0,
            //justifyContent: 'center'
        },
        jumbotron: {
            flexDirection: 'row',
            alignItems: 'center',
            // flex: 5,
            backgroundColor: theme.colors.primary,
        },
        inputSection: {
            justifyContent: 'space-between',
            padding: 20,
            paddingHorizontal: 30,
            flexDirection: 'column',
            height: '50%'
            // flex: 5
        },
        addListingButton: {
            position: '',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            backgroundColor: theme.colors.primary,
            borderRadius: 10,
            marginBottom: 30
        },
        buttonText: {
            color: 'white',
            fontFamily: 'Poppins-Medium',
            // fontSize: 20
        }
    })

    return(
        <View style={styles.container}>
            <View style={styles.jumbotron}>
                <Text style={{fontFamily: "Poppins", fontSize: 35, color: 'black', padding: 27}}>Don't waste, share the plate!</Text>
            </View>
            <ScrollView>
                <View style={styles.inputTextBox}>
                    <TextInput
                        value={foodTitle}
                        placeholder="The shorter the better!"
                        mode= 'outlined'
                        label="Title"
                        onChangeText={(foodTitle) => setFoodTitle(foodTitle)}
                    />
                    <TextInput
                        multiline
                        value={foodDesc}
                        placeholder="The shorter the better!"
                        mode= 'outlined'
                        label="Description"
                        onChangeText={(FoodDesc) => setFoodDesc(FoodDesc)}
                    />
                    <View style={{flexDirection: 'row'}}>   
                        <TextInput
                            inputMode="decimal"
                            // placeholder="You could share it for free!"
                            mode= 'outlined'
                            label="Price / serving"
                            onChangeText={(Price) => setPrice(Price)}
                            style={{flex: 1}}
                        />
                        <TextInput
                            inputMode="numeric"
                            // placeholder="If you dont need it, just share it!"
                            mode= 'outlined'
                            label="Quantity"
                            onChangeText={(Quantity) => setQuantity(Quantity)}
                            style={{flex: 1}}
                        />
                    </View>
                    {/* <TextInput
                        value={ExpiryTime}
                        placeholder="Available Until (e.g., 9:00 AM)"
                        mode = 'outlined'
                        label="Available Until"
                        onChangeText={(ExpiryTime) => setExpiryTime(ExpiryTime)}
                    /> */}
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View>
                            <Text variant="titleMedium">Available until</Text>
                            <Text>Maximum 2 hours later</Text>
                        </View>
                        <RNDateTimePicker
                            mode="datetime"
                            value={expiryDateTime}
                            minimumDate={today}
                            maximumDate={maxDate}
                            onChange={(event, value) => setExpiryDateTime(value)}
                        />
                    </View>
                    
                    {/*Skipped implementing the photo upload section due to time constraints*/}
                    <TouchableOpacity onPress={handlePickImage}>
                        <Text style={{color: '#00692C', fontFamily: 'Poppins'}}>Upload Image</Text>
                    </TouchableOpacity>
                    {/* Conditionally render the image or error message */} 
                    {file ? ( 
                        // Display the selected image 
                        <View style={styles.imageContainer}> 
                            <Image source={{ uri: file }} 
                                style={styles.image} /> 
                        </View> 
                    ) : ( 
                        // Display an error message if there's  
                        // an error or no image selected 
                        <Text style={styles.errorText}>{error}</Text> 
                    )} 
                </View>
            </ScrollView>

            <Button mode='contained' style={styles.addListingButton} onPress={handleAddListing}>
                <Text variant="titleLarge" style={styles.buttonText}>Share Food</Text>
            </Button>

            
            <Portal>
                <Modal visible={visible} onDismiss={() => {navigation.navigate("HomePage")}} contentContainerStyle={containerStyle}>
                    <Image source={require('../assets/success-icon.png')}/>
                    <Text style={{fontFamily: 'Poppins', padding: 25, fontSize: 20, color: '#00692C'}}>Thanks for sharing!</Text>
                </Modal>
            </Portal>
        </View>
    );
}



export default ListingCreation