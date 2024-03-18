import React from "react";
import { Text, TextInput, TouchableOpacity, View, StyleSheet, Button, Pressable, Alert, Image, ImageBackground } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useSignIn, useOAuth } from "@clerk/clerk-expo";
import SignUpScreen from './SignUpScreen';
import { useWarmUpBrowser } from "./useWarmUpBrowser";

const styles = StyleSheet.create({
  container1:{
    flex:1, 
    justifyContent:'center'
  },
	container2: {
		flex: 1,
		justifyContent: 'center',
		padding: 20
	},
	inputField: {
		marginVertical: 4,
		height: 50,
		borderWidth: 1,
		borderColor: '#2DCC70',
		borderRadius: 4,
		padding: 10,
		backgroundColor: '#fff',
    fontFamily: 'Poppins-Regular',
    color: 'rgba(0, 0, 0, 0.5)'
	},
	button: {
		// margin: 8,
		alignItems: 'center',
    paddingHorizontal: 50,
    paddingVertical:10
	},
  buttonIcon: {
    width: 24,  // Specify the width of the icon
    height: 24, // Specify the height of the icon
    resizeMode: 'contain', // This ensures the image is scaled proportionally
  },

  innerImage: {
      width: 200, // Half the width of the background
      height:250,
      // height: '100%', // Half the height of the background
      alignSelf: 'flex-end'
      // If you want a specific size, you can set explicit dimensions
    },


  headerTitle: {
    fontSize: 35,
    // fontWeight: 'bold',
    color: '#FFFFFF', // Adjust the color as needed
    fontFamily: 'Poppins-Regular',
    // alignSelf: 'flex-start', // Aligns the text to the left of its container
    marginRight: 70,
    paddingLeft: 20
  },
  headerContainer: {
    flexDirection: 'row', // Aligns children (Text and Image) in a row
    alignItems: 'center', // Centers children vertically in the container
    justifyContent: 'flex-start', // Aligns children to the start of the container
    backgroundColor: '#2DCC70', // The background color
    width: '100%',
    height: 250, // The height of your header area
  },

});


export default function SignInScreen() {
    const { signIn, setActive, isLoaded } = useSignIn();

    const [emailAddress, setEmailAddress] = React.useState("");
    const [password, setPassword] = React.useState("");

    const navigation = useNavigation();

    //oAuth
    useWarmUpBrowser();
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    // Event handler for signing in with OAuth
    const SignInWithOAuth = React.useCallback(async () => {
        try {
            const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow();

            if (createdSessionId) {
                await setActive({ session: createdSessionId });

            } else {
                // Use signIn or signUp for next steps such as MFA
            }
        } catch (err) {
            console.error("OAuth error", err);
        }
    }, [startOAuthFlow]);

    const onSignInPress = async () => { 
      if (!isLoaded) {
        return;
      }
   
      try {
        const completeSignIn = await signIn.create({
          identifier: emailAddress,
          password,
        });
        // This is an important step,
        // This indicates the user is signed in
        await setActive({ session: completeSignIn.createdSessionId });
      } catch (err) {
        console.log(err);
      }
    };


    return (
      <View style={styles.container1}>
        {/* <View style={{alignItems: 'center', backgroundColor:'#2DCC70', flex:1, height:10}}> */}
        <View style={styles.headerContainer}>

        <Text style={styles.headerTitle}>Log In</Text>

        {/* <View style={styles.imageBackground}> */}
        <ImageBackground source={require('../../assets/purepng 1.png')}
        style={styles.innerImage}>
        </ImageBackground>
        </View>
        {/* </View> */}

      <View style={styles.container2}>
        <View>
          <TextInput
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Email"
            onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
            style={styles.inputField}
          />
        </View>
   
        <View>
          <TextInput
            value={password}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
            style={styles.inputField}
          />
        </View>
      <View>
        <View style={{alignItems: 'center'}}>  
          <TouchableOpacity onPress={onSignInPress} style=
          {{backgroundColor: '#2DCC70', borderRadius: 30, 
          alignItems: 'center',justifyContent:'center', marginTop: 10,
          paddingHorizontal:5, paddingVertical:5}}>


            <Text style=
            {{color: 'white', fontFamily: 'Poppins-Regular', 
            fontSize: 20, paddingHorizontal: 50, padding: 10}}>Sign in</Text>
          </TouchableOpacity>
        </View>


      </View>
      <View style={{alignItems: 'center', marginTop: 10}}>
      <Text style={{fontFamily: 'Poppins-Regular', color: 'rgba(0, 0, 0, 0.5)' }}>Or login with</Text>

      <TouchableOpacity onPress={SignInWithOAuth} style=
          {{backgroundColor: '#2DCC70', borderRadius: 30, 
          alignItems: 'center',justifyContent:'center', marginTop: 10,
          paddingHorizontal:5, paddingVertical:5}}>
      <Image source={require('../../assets/icons8-google-40(-mdpi).png')}/>

      </TouchableOpacity>        
        </View>

    

        <View style={{alignItems: 'center'}}>
				<Pressable style={[styles.button, {flexDirection: 'row'}, {marginTop:10}]} onPress={() => navigation.navigate(SignUpScreen)}>
          <Text style={{fontFamily: 'Poppins-Regular', color: 'rgba(0, 0, 0, 0.5)'}}>Do not have an account? </Text>
					<Text style={{fontFamily: 'Poppins-Regular', color: '#2DCC70'}}>Sign Up</Text>
				</Pressable>
      </View>
      </View>
    </View>
      
    )};