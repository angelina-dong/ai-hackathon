import React, { useEffect } from 'react';
import { View, Image, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';

const LogoSplash = ({ onContinue }) => {
    return (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: "#eaece5"}}>
            <View style={{backgroundColor: "#b2c2bf",}}>
            <Text style={{fontSize: 90, marginTop: 10, color: "#3b3a30", padding: 10, paddingTop: 5}}>Skillink</Text>
            </View>
            <Text style={{padding: 10}}></Text>
        
            <Text style={{fontSize: 18, textDecorationLine: 'underline', color: "#b87289"}}>Find jobs that link to your skills!</Text>
            <Text style={{padding: 40}}></Text>
            <TouchableOpacity style={{fontSize: 18, marginTop: 50, }} onPress = {onContinue}>
                <Text style={{borderRadius: 5, borderColor: "#3b3a30", borderWidth: 1, color: "#3b3a30", padding: 10}}>Click here to get started.</Text></TouchableOpacity>
            
        </View>
    );
};

export default LogoSplash;