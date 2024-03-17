import React from "react";
import { Text, TextInput, TouchableOpacity, View, StyleSheet, Button, Pressable, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useSignIn } from "@clerk/clerk-expo";
import SignUpScreen from './SignUpScreen';


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
	}
});


export default function SignInScreen() {
    const { signIn, setActive, isLoaded } = useSignIn();

    const [emailAddress, setEmailAddress] = React.useState("");
    const [password, setPassword] = React.useState("");

    const navigation = useNavigation();

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
    </View>
      
    )};