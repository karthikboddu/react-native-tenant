import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, TouchableOpacity } from 'react-native';
import colors from "../../assets/colors/colors";

const ContactsFloatingIcon = ({fromUserId}) => {
    const navigation = useNavigation();
    console.log(fromUserId,"fromuseid")
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("contacts", {fid : fromUserId})}
            style={{
                position: "absolute",
                right: 20,
                bottom: 20,
                borderRadius: 60,
                width: 60,
                height: 60,
                backgroundColor: colors.secondary,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <MaterialCommunityIcons
                name="android-messages"
                size={30}
                color="white"
                style={{ transform: [{ scaleX: -1 }] }}
            />
        </TouchableOpacity>
    )
}

export default ContactsFloatingIcon

const styles = StyleSheet.create({})