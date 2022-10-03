import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const ForgotPassword = () => {
    const navigation = useNavigation();
    console.log(navigation,"navigation");
    return (
        <TouchableOpacity
           onPress={() => navigation.navigate('TenantSignUp', {
                    item: '1',
                })}>
            <Text style={{ color: '#009387', marginTop: 15 }}>Forgot password?</Text>
        </TouchableOpacity>
    )
}

export default ForgotPassword

const styles = StyleSheet.create({})