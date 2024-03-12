import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native"
import * as React from 'react'
import { Searchbar, useTheme } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons'

const RoutingMap = () => {
    const [searchQuery, setSearchQuery] = React.useState('')
    const handleReachedPickUp = () => {
        console.log("Please build your QR code ASAP")
    }
    const handleLocateMe = () => {
        console.log("Locate Me bro")
    }
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{padding: 10}}>
                <Searchbar
                    placeholder="Set Your Own Starting Point"
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                    style= {styles.SearhBox}
                />
            </View>
            <View style={{marginTop: 600, padding: 30}}>
                {/* Locate me button where theres a navigation icon beside it */}
                <TouchableOpacity onPress={handleLocateMe} style={{alignItems: 'center'}}>
                    <View style={{flexDirection: "row"}}>
                        <Ionicons name={"navigate-outline"} size={35} color={"#2DCC70"} style={{marginRight: 10}} />
                        <Text style={styles.LocateMe}>Locate Me</Text>
                    </View>
                </TouchableOpacity>
                {/* Reached Pick Up Point Button */}
                <TouchableOpacity onPress={handleReachedPickUp} style={styles.ReachedBox}>
                    <Text style={styles.ReachedText}>Reached Picked Up Point</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
    
}

const styles = StyleSheet.create({
    SearhBox: {
        borderRadius: 15,
        backgroundColor: "#CDFFED", 
        opacity: 0.7,
        marginTop: 70,
    },
    LocateMe: {
        color: '#2DCC70',
        fontSize: 20,
        fontWeight: 'bold'
    },
    ReachedBox: {
        backgroundColor: '#2DCC70',
        alignItems: 'center',
        marginTop: 10,
        padding: 10,
        borderRadius: 40
    },
    ReachedText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    }
})

export default RoutingMap