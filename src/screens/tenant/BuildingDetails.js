import React, { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator, Animated, FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../assets/colors/colors';
import { COLORS, FONTS, SIZES } from '../../constants';
import { GlobalContext } from '../../context/GlobalState';
import FloorsList from './FloorsList';


const BuildingDetails = ({ route, navigation }) => {

  const scrollX = new Animated.Value(0);

  const [roomsList, setRoomsList] = useState([])
  const [building, setBuilding] = useState([])
  const [floorList, setFloorList] = useState([])
  const [loader, setLoader] = useState(false)


  const [selectedFloors, setSelectedFloors] = useState(null)

  let { items } = route.params;
  let floorDetailsData = [];
  let roomDetailsData = [];

  const { tenantBuildingListById, getTenantBuildingsById,
    tenantBuildingFloorList, getTenantFloorsBuildingId,
    tenantBuildingFloorRoomsList, getTenantRoomsByFloorId,
    clearStateVariable,screenLoading } = useContext(GlobalContext);

  useEffect(() => {
    //clearStateVariable();
    getTenantBuildingsById(route.params?.items);
    setBuilding(tenantBuildingListById);
    console.log(tenantBuildingListById, "route.param123 \n", items)
    getTenantFloorsBuildingId(route.params?.items)
    setFloorList([]);
    setRoomsList([])
    setSelectedFloors(null)
    setFloorList(tenantBuildingFloorList)
    //loadData()
  }, [route.params?.items])

  function onSelectFloors(item) {
    setLoader(true);
    setRoomsList([])
    getTenantRoomsByFloorId(item._id)
    setRoomsList(tenantBuildingFloorRoomsList)
    setLoader(false);
    setSelectedFloors(item)
  }

  const renderIngredientsItem = ({ item }) => {

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() =>
          setFloorId(item.id)
        }>
        <View
          style={[
            styles.ingredientItemWrapper,
            {
              marginLeft: item.id === '1' ? 20 : 0,
            },
          ]}
        >
          <Image source={item.image} style={styles.ingredientImage} />
          <Text style={styles.ingredientImageText} >{item.name}</Text>
          <Text style={{ color: '#000' }}>₹10,000</Text>

          <View
            style={[
              styles.floorListIcon,
              {
                backgroundColor: colors.primary,
              },
            ]}>
            <Feather
              name="chevron-right"
              size={15}
              style={{ alignSelf: 'center' }}
              color={item.selected ? colors.black : colors.white}
            />
          </View>

        </View>
      </TouchableOpacity>
    );
  };

  function renderFloorList() {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{
            padding: SIZES.padding,
            paddingBottom: SIZES.padding * 2,
            backgroundColor: (selectedFloors?._id == item._id) ? COLORS.primary : COLORS.white,
            borderRadius: SIZES.radius,
            alignItems: "center",
            justifyContent: "center",
            marginRight: SIZES.padding,
            ...styles.shadow
          }}
          onPress={() => onSelectFloors(item)}
        >
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 25,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: (selectedFloors?._id == item._id) ? COLORS.white : COLORS.lightGray
            }}
          >
            <Image
              source={item.image}
              resizeMode="contain"
              style={{
                width: 60,
                height: 60
              }}
            />
          </View>

          <Text
            style={{
              marginTop: SIZES.padding,
              color: (selectedFloors?._id == item._id) ? COLORS.white : COLORS.black,
              ...FONTS.body5
            }}
          >
            {item.floor_name}
          </Text>
        </TouchableOpacity>
      )
    }

    return (
      <View style={{ padding: SIZES.padding * 2 }}>
        <Text style={{ ...FONTS.h1 }}>List of Floors</Text>

        <FlatList
          data={tenantBuildingFloorList}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => `${item._id}`}
          renderItem={renderItem}
          contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
        />
      </View>
    )
  }

  const renderRoomsItems = () => {

    if (loader) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="small" color="#663399" />
        </View>
      );
    }
    return (

      <View style={styles.popularWrapper}>
        <Text style={styles.popularTitle}>List of rooms</Text>
        {tenantBuildingFloorRoomsList.map((item) => (
          <FloorsList key={item.created_at} data={item} buildingId = {route.params?.items} navigation={navigation} />
        ))}
      </View>
    )
  }

  if (screenLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#663399" />
      </View>
    );
  }

  if (loader) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="small" color="#663399" />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Header */}
        <SafeAreaView>
          <View style={styles.headerWrapper}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={styles.headerLeft}>
                <Feather name="chevron-left" size={12} color={colors.textDark} />
              </View>
            </TouchableOpacity>
            <View style={styles.headerRight}>
              <MaterialCommunityIcons
                name="star"
                size={12}
                color={colors.white}
              />
            </View>
          </View>
        </SafeAreaView>



        {tenantBuildingListById.map((items) => (

          <View key={items._id}>
            {/* Titles */}
            <View style={styles.titlesWrapper}>
              <Text style={styles.title}>{items.building_name}</Text>
              <Image
                source={{ uri: items.building_image }}
                style={styles.itemImage}
              />
            </View>

            {/* Price */}
            <View style={styles.priceWrapper}>
              <Text style={styles.priceText}>$ {items.total_amount}</Text>
            </View>

            {/* Pizza info */}


            <View style={styles.infoWrapper}>
              <View style={styles.infoLeftWrapper}>
                <View style={styles.infoItemWrapper}>
                  <Text style={styles.infoItemTitle}>Address</Text>
                  <Text style={styles.infoItemText}>
                    {items.building_address}
                  </Text>
                </View>
                <View style={styles.infoItemWrapper}>
                  <Text style={styles.infoItemTitle}>No of Floors</Text>
                  <Text style={styles.infoItemText}>{items.no_of_floors}</Text>
                </View>
                <View style={styles.infoItemWrapper}>
                  <Text style={styles.infoItemTitle}>Rooms</Text>
                  <Text style={styles.infoItemText}>{items.no_of_rooms}</Text>
                </View>
              </View>

            </View>
          </View>
        ))}


        {renderFloorList()}

        {/* Popular */}
        {renderRoomsItems()}

        {/* Place an order */}
        <TouchableOpacity onPress={() => navigation.navigate('TenantsList', {items: route.params?.items}) }>
          <View style={styles.orderWrapper}>
            <Text style={styles.orderText}>View All Tenants </Text>
            <Feather name="chevron-right" size={18} color={colors.black} />
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
export default BuildingDetails;

const styles = new StyleSheet.create({
  container: {
    flex: 1,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerLeft: {
    borderColor: colors.textLight,
    borderWidth: 2,
    padding: 12,
    borderRadius: 10,
  },
  headerRight: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 10,
    borderColor: colors.primary,
    borderWidth: 2,
  },
  titlesWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 30,
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 32,
    color: colors.textDark,
    width: '50%',
  },
  priceWrapper: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  priceText: {
    color: colors.primary,
    fontFamily: 'Montserrat-Bold',
    fontSize: 32,
  },
  infoWrapper: {
    marginTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLeftWrapper: {
    paddingLeft: 20,
  },
  infoItemWrapper: {
  },
  infoItemTitle: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    color: colors.textLight,
  },
  infoItemText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: colors.textDark,
  },
  itemImage: {
    resizeMode: 'contain',
    marginLeft: 50,
    height: 100,
    width: 100
  },
  ingredientsWrapper: {
    marginTop: 40
  },
  ingredientsTitle: {
    paddingHorizontal: 20,
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: colors.textDark,
  },
  ingredientsListWrapper: {
    paddingVertical: 20,
  },
  ingredientItemWrapper: {
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginRight: 15,
    marginBottom: 10,
    borderRadius: 15,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  ingredientImage: {
    resizeMode: 'contain',

  },
  ingredientImageText: {
    color: '#000'
  },
  orderWrapper: {
    marginTop: 40,
    marginBottom: 50,
    marginHorizontal: 20,
    backgroundColor: colors.primary,
    borderRadius: 50,
    paddingVertical: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    marginRight: 10,
  },
  popularWrapper: {
    paddingHorizontal: 20,
    marginBottom: 30
  },
  popularTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: '#000',
  },
  floorListIcon: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: 26,
    height: 26,
    borderRadius: 26,
    marginBottom: 20,
  }
});