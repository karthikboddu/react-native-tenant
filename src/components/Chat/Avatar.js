import React from "react";
import { Image } from "react-native";

export default function Avatar({ size, user }) {
  return (
    <Image
      style={{
        width: size,
        height: size,
        borderRadius: size,
      }}
      source={
        user.avatar
          ? { uri: user.avatar }
          : require("../../assets/icon-square.png")
      }
      resizeMode="cover"
    />
  );
}