import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Col, Grid, Row } from "react-native-easy-grid";
import colors from "../../assets/colors/colors";
import Avatar from "./Avatar";

export default function ListItem({
  type,
  description,
  user,
  style,
  time,
  room,
  image,
  fId
}) {
  const navigation = useNavigation();
    console.log(user,"user",fId)

    const users = [
        {
            "_id": "61f64f7af320710016814605",
            "parent_id": "61f64f9af320710016814606",
            "full_name": "karthikboddu",
            "password": "$2b$08$C9fRHUUk4J8rLw5lfk6ym.UHv2yIQzBlL/j5vHMunjkRtbNzVVbLm",
            "user_role": {
                "$oid": "61c35c8f14263e7f4d7e6d6d"
            },
            "username": "karthikboddu",
            "email": "karthik@gmail.com",
            "mobile_no": "+919030493600"
        },
        {
            "_id": "621b5866038d7f00166823d6",
            "parent_id": "61f64f9af320710016814606",
            "full_name": "srikanthboddu",
            "password": "$2b$08$OFhN0AXjjgkfPSJkpJmZUeuA1qqywGBI7lm61JnjCv8LJeeEld/ye",
            "user_role": {
                "$oid": "61c35c8f14263e7f4d7e6d6d"
            },
            "username": "srikanthboddu",
            "email": "srikanthboddu@gmail.com",
            "mobile_no": "+918790731145"
        },
        {
            "_id": "62d04323048802003e92ce92",
            "userType": "INTERNAL",
            "parent_id": "61f64f9af320710016814606",
            "full_name": "narasaiah",
        
            "username": "narasaiah",
            "email": "narasaiah@gmail.com",
            "mobile_no": "+917777777777"
            
        },
        {
            "_id":"62c6f395055f090016603713",
            "userType": "INTERNAL",
            "parent_id": "61f64f9af320710016814606",
            "full_name": "sridhar",
            "username": "sridhar",
            "email": "sridhar@gmail.com",
            "mobile_no": "+919999999999"
           
        },
        {
            "_id":"62c6eb02055f0900166035c3",
            "userType": "INTERNAL",
            "parent_id": "61f64f9af320710016814606",
            "full_name": "marty byrde",
            "username": "marty",
            "email": "marty@gmail.com",
            "mobile_no": "+919999999998"
         
        }
      ]
    

    const filtered = users.filter(employee => {
            return employee.mobile_no === user.number;
     });
     console.log(filtered,"filtered");



  return (
    filtered.map(u => {

    return (
    <TouchableOpacity
      style={{ height: 80, ...style }}
      onPress={() => navigation.navigate("ChatScreen", {id: u._id, fromUserId : fId, parentId : u.parent_id})} key={u._id}
    >
      <Grid style={{ maxHeight: 80 }}>
        <Col
          style={{ width: 80, alignItems: "center", justifyContent: "center" }}
        >
          <Avatar user={user} size={type === "contacts" ? 40 : 65} />
        </Col>
        <Col style={{ marginLeft: 10 }}>
          <Row style={{ alignItems: "center" }}>
            <Col>
              <Text
                style={{ fontWeight: "bold", fontSize: 16, color: colors.text }}
              >
                {u.full_name || user.displayName}
              </Text>
            </Col>
            {time && (
              <Col style={{ alignItems: "flex-end" }}>
                <Text style={{ color: colors.secondaryText, fontSize: 11 }}>
                  {new Date(time.seconds * 1000).toLocaleDateString()}
                </Text>
              </Col>
            )}
          </Row>
          {description && (
            <Row style={{ marginTop: -5 }}>
              <Text style={{ color: colors.secondaryText, fontSize: 13 }}>
                {description}
              </Text>
            </Row>
          )}
        </Col>
      </Grid>
    </TouchableOpacity>
    )
    })
  );
}