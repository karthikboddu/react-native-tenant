import { useRoute } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import colors from "../../assets/colors/colors";
import Avatar from "./Avatar";

export default function ChatHeader() {
  const route = useRoute();
  console.log(route,"route")
  return (
    <View style={{ flexDirection: "row" }}>
      <View>
        <Avatar size={40} user={route.params.user} />
      </View>
      <View
        style={{
          marginLeft: 15,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: colors.black, fontSize: 18 }}>
          {route.params.user ? route.params.user.name : route.params.user.name}
        </Text>
      </View>
    </View>
  );
}