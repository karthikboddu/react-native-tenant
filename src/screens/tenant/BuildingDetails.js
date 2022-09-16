import React, { useContext, useEffect, useState } from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../assets/colors/colors';
import { FONTS, SIZES } from '../../constants';
import { GlobalContext } from '../../context/GlobalState';
import { Ripple } from '../../utils';
import commonStyles from '../styles';
import FloorsList from './FloorsList';

const BuildingDetails = ({ route, navigation }) => {

  const [roomsList, setRoomsList] = useState([])
  const [building, setBuilding] = useState([])
  const [floorList, setFloorList] = useState([])
  const [loader, setLoader] = useState(false)


  const [selectedFloors, setSelectedFloors] = useState(null)

  let { items } = route.params;


  const { tenantBuildingListById, getTenantBuildingsById,
    tenantBuildingFloorList, getTenantFloorsBuildingId,
    tenantBuildingFloorRoomsList, getTenantRoomsByFloorId,
    clearStateVariable, screenLoading } = useContext(GlobalContext);

  useEffect(() => {
    //clearStateVariable();
    getTenantBuildingsById(route.params?.items);
    setBuilding(tenantBuildingListById);
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

  function renderFloorList() {
    const renderItem = ({ item }) => {
      const selectedItem = selectedFloors?._id == item._id
      return (
        <Ripple
          onPress={() => onSelectFloors(item)}
          style={{
            paddingHorizontal: 16,
            paddingVertical: 12,
            marginRight: 8,
          }}
        >
          <View>
            <Text style={{ fontSize: 18, color: selectedItem ? '#2d2d2d' : '#a0a0a0', fontWeight: selectedItem ? '600' : '600' }}>{item.floor_name}</Text>
            <View style={commonStyles.vSpace2} />
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ paddingHorizontal: 8, paddingVertical: 2, backgroundColor: selectedItem ? '#507ed1' : 'transparent' }} />
            </View>
          </View>
        </Ripple>
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

    return (

      <View style={styles.popularWrapper}>
        <Text style={styles.popularTitle}>List of rooms</Text>
        {tenantBuildingFloorRoomsList.map((item) => (
          <FloorsList key={item.created_at} data={item} buildingId={route.params?.items} loading={loader} navigation={navigation} />
        ))}
      </View>
    )
  }


  const renderSkeletonLoader = () => {
    return (
      <View>
        {/* Titles */}
        <View style={styles.loaderTitleWrapper}>
          <ContentLoader
            speed={50}
            width={400}
            height={150}
            viewBox="0 0 400 150"
            backgroundColor="#f1e9e9"
            foregroundColor="#fafafa"

          >
            <Rect x="25" y="15" rx="5" ry="5" width="122" height="10" />
            <Rect x="24" y="101" rx="5" ry="5" width="120" height="10" />
            <Rect x="24" y="131" rx="5" ry="5" width="120" height="10" />
            <Rect x="24" y="161" rx="5" ry="5" width="120" height="10" />
            <Rect x="255" y="20" rx="15" ry="15" width="91" height="98" />
          </ContentLoader>
          <ContentLoader
            speed={50}
            width={400}
            height={150}
            viewBox="0 0 400 150"
            backgroundColor="#f1e9e9"
            foregroundColor="#fafafa"

          >
            <Rect x="25" y="15" rx="5" ry="5" width="122" height="10" />
            <Rect x="24" y="101" rx="5" ry="5" width="120" height="10" />
          </ContentLoader>
        </View>

        {/* Price */}
        <View style={styles.loaderPriceWrapper}>

        </View>

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
          </View>
        </SafeAreaView>

        {screenLoading ? (
          <>
            {renderSkeletonLoader()}
          </>
        ) : (
          <>
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
          </>
        )}

        {renderFloorList()}


        {renderRoomsItems()}


        <TouchableOpacity onPress={() => navigation.navigate('TenantsList', { items: route.params?.items })}>
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
  },
  infoLoaderWrapper: {

  },
  loaderPriceWrapper: {

  },
  loaderTitleWrapper: {

  }
});