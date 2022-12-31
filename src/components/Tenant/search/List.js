import React from "react";
import {
    FlatList,
    SafeAreaView, StyleSheet,
    Text, TouchableOpacity, View
} from "react-native";
import { Avatar } from 'react-native-paper';

// definition of the Item, which will be rendered in the FlatList
const Item = ({ name, mobileNo, photoUrl, roomId, buildingId, floorId, navigation }) => (
    <TouchableOpacity
        onPress={() =>
            navigation.navigate('TenantRoomDetails', {
                item: roomId, buildingItemId: buildingId, buildingFloorId: floorId
            })
        }>
        <View style={styles.item}>
            <View style={styles.avatarWrapperFirst}>
                {photoUrl ? (
                    <Avatar.Image
                        source={{ uri: photoUrl }}
                        size={50}
                        style={{ marginRight: 10 }}
                    />) : (
                    <Avatar.Image
                        source={require('../../../assets/avatar.png')}
                        size={50}
                        style={{ marginRight: 10 }}
                    />)}
            </View>
            <View style={styles.detailsWrapper}>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.details}>{mobileNo}</Text>
            </View>
        </View>
    </TouchableOpacity>
);

// the filter
const List = (props) => {
    const renderItem = ({ item }) => {
        // when no input, show all
        if (props.searchPhrase === "") {
            return <Item name={item.name} photoUrl={item.avatar} mobileNo={item.mobileNumber}
                roomId={item.roomId} buildingId={item.buildingId} floorId={item.buildingFloorId}
                navigation={props.navigation}
            />;
        }
        // filter of the name
        if (item.name.toUpperCase().includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
            return <Item name={item.name} photoUrl={item.avatar} mobileNo={item.mobileNumber}
                roomId={item.roomId} buildingId={item.buildingId} floorId={item.buildingFloorId}
                navigation={props.navigation}
            />;
        }
        // filter of the description
        // if (item.details.toUpperCase().includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
        //   return <Item name={item.name} details={item.details} />;
        // }
    };

    return (
        <SafeAreaView style={styles.list__container}>
            <View
                onStartShouldSetResponder={() => {
                    props.setClicked(false);
                }}
            >
                <FlatList
                    data={props.data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id}
                />
            </View>
        </SafeAreaView>
    );
};

export default List;

const styles = StyleSheet.create({
    list__container: {
        margin: 10,
        height: "85%",
        width: "100%",
    },
    avatarWrapperFirst: {
        flexDirection: 'row',
    },
    item: {
        flexDirection: 'row',
        margin: 30
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 5,
        fontStyle: "italic",
    },
});