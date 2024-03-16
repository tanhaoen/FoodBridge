import React from "react";
import { Text, TextInput, TouchableOpacity, View, StyleSheet, Button, Pressable, Alert, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useSignIn, useOAuth } from "@clerk/clerk-expo";
import SignUpScreen from './SignUpScreen';
import { useWarmUpBrowser } from "./useWarmUpBrowser";

const googleIcon = require('../../assets/google3.png');

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		padding: 20
	},
	inputField: {
		marginVertical: 4,
		height: 50,
		borderWidth: 1,
		borderColor: '#6c47ff',
		borderRadius: 4,
		padding: 10,
		backgroundColor: '#fff'
	},
	button: {
		margin: 8,
		alignItems: 'center'
	},
  buttonIcon: {
    width: 24,  // Specify the width of the icon
    height: 24, // Specify the height of the icon
    resizeMode: 'contain', // This ensures the image is scaled proportionally
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
      <View style={styles.container}>
        <View>
          <TextInput
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Email..."
            onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
            style={styles.inputField}
          />
        </View>
   
        <View>
          <TextInput
            value={password}
            placeholder="Password..."
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
            style={styles.inputField}
          />
        </View>
      <View>
        {/* <TouchableOpacity onPress={onSignInPress}>
          <Text>Sign in</Text>
        </TouchableOpacity> */}

        <Button onPress={onSignInPress} title="Sign In" color={'#6c47ff'}></Button>

        {/* <Link href="/reset" asChild>
				<Pressable style={styles.button}>
					<Text>Forgot password?</Text>
				</Pressable>
			</Link> */}
			{/* <Link href="/SignUpScreen" asChild> */}
				<Pressable style={styles.button} onPress={() => navigation.navigate(SignUpScreen)}>
					<Text>Create Account</Text>
				</Pressable>
			{/* </Link> */}
      </View>
      <View>
      <TouchableOpacity style={styles.button} onPress={SignInWithOAuth}>
        <Image source={googleIcon}/>
        {/* <Text style={styles.buttonText}>Sign in with Google</Text> */}
      </TouchableOpacity>        
        </View>
    </View>
      
    )};