import { useActionSheet } from "@expo/react-native-action-sheet";
import React, { useContext, useEffect, useState } from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { Alert, FlatList, Image, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../assets/colors/colors';
import AddTenantFloors from '../../components/Tenant/AddTenantFloors';
import SkeletonFloorsList from '../../components/Tenant/SkeletonFloorsList';
import { CONSTANTS, FONTS, icons, SIZES } from '../../constants';
import { GlobalContext } from '../../context/GlobalState';
import { updateBuildingData } from "../../services/tenant/buildingService";
import { IconToggle, Ripple } from '../../utils';
import commonStyles from '../styles';
import FloorsList from './FloorsList';

const BuildingDetails = ({ route, navigation }) => {

  const [roomsList, setRoomsList] = useState([])
  const [building, setBuilding] = useState([])
  const [floorList, setFloorList] = useState([])
  const [loader, setLoader] = useState(false)


  const [selectedFloors, setSelectedFloors] = useState(null)

  let { items } = route.params;
  let { noOfFloors, noOfRooms } = route.params


  const { tenantBuildingListById, getTenantBuildingsById,
    tenantBuildingFloorList, getTenantFloorsBuildingId,
    tenantBuildingFloorRoomsList, getTenantRoomsByFloorId,
    clearStateVariable, screenLoading, skeletonLoading,
    creatNewBuilding, setScreenLoading, createTenantNewFloor,
    createTenantNewRoomFloor } = useContext(GlobalContext);

  useEffect(() => {

    if (route.params?.items) {
      getTenantBuildingsById(route.params?.items);
    } else {
      getTenantBuildingsById(creatNewBuilding._id);
    }
    if (!noOfFloors) {
      noOfFloors = creatNewBuilding.no_of_floors
    }
    setBuilding(tenantBuildingListById);
    if (route.params?.items) {
      getTenantFloorsBuildingId(route.params?.items)
    } else {
      getTenantFloorsBuildingId(creatNewBuilding._id)
    }
    console.log(tenantBuildingListById);
    setFloorList([]);
    setRoomsList([])
    setSelectedFloors(null)
    setFloorList(tenantBuildingFloorList)
    //loadData()
    return () => {
      clearStateVariable();
      console.log("clearStateVariable")
    }
  }, [route.params?.items])

  function onSelectFloors(item) {
    setLoader(true);
    setRoomsList([])
    getTenantRoomsByFloorId(item._id)
    setRoomsList(tenantBuildingFloorRoomsList)
    setLoader(false);
    setSelectedFloors(item)
  }

  const initialFloorValues = {
    floorName: '',
    noOfRooms: 0,
    roomName: '',
    roomAmount: 0,
    buildingId: route.params?.item,
  };

  const initialAddEditFloorValues = {
    pending: false,
    failed: false,
    visible: false,
    data: initialFloorValues,
    isAdd: null,
    isAddRoom: null
  };

  const [addEditFloorModal, setAddEditFloorModal] = useState(initialAddEditFloorValues);

  const onChangeInput = (inputValue, inputName) => {
    setAddEditFloorModal({
      ...addEditFloorModal,
      data: {
        ...addEditFloorModal.data,
        [inputName]: inputValue
      }
    });
  }


  const initRoomPayment = async () => {

    const payload = JSON.stringify(addEditFloorModal.data);
    console.log(payload)
    setAddEditFloorModal((prevState) => ({
      ...prevState,
      pending: true
    }));
    if (addEditFloorModal.isAddRoom) {
      await createTenantNewRoomFloor(payload, selectedFloors._id)
    } else {
      await createTenantNewFloor(payload, route.params?.items)

    }



    if (!screenLoading) {
      setAddEditFloorModal((prevState) => ({
        ...prevState,
        visible: false,
        pending: false
      }));
    }

  }

  const submitAddEditPayment = async () => {
    await initRoomPayment();
  };

  const openAddEditFloorModal = (action, data, isAddRoomBool) => {

    setAddEditFloorModal((prevState) => ({
      ...prevState,
      isAdd: action === 'add',
      visible: true,
      isAddRoom: isAddRoomBool,
      data
    }));
  }

  const closeAddEditPaymentModal = () => {
    setAddEditFloorModal((prevState) => ({
      ...prevState,
      visible: false
    }));
  }
  const { showActionSheetWithOptions } = useActionSheet();

  const actionIcons = [
    <IconToggle
      set={'fontAwesome'}
      name={'close'}
      size={22}
    />,
    <IconToggle
      set={'fontAwesome'}
      name={'edit'}
      size={22}
    />,
    <IconToggle
      set={'fontAwesome'}
      name={'trash'}
      size={22}
    />
  ];

  const handleActionMenuList = (dataItem) => {
    showActionSheetWithOptions({
      options: ["Cancel", "Edit Book"],
      destructiveButtonIndex: 2,
      cancelButtonIndex: 0,
      userInterfaceStyle: 'light',
      actionIcons
    }, buttonIndex => {
      if (buttonIndex === 0) {
        // cancel action
      } else if (buttonIndex === 1) {
        // Edit Book
        openAddEditFloorModal('edit', dataItem);
      }
    });
  }


  const callRefresh = async () => {
    getTenantBuildingsById(route.params?.items);
  }
  const [showSave, setShowSave] = useState(false);

  const [data, setData] = React.useState({
    buildingName: '',
    checkBuildingNameChange: false,
    isValidBuildingName : true,
    buildingAddress: '',
    checkBuildingAddressChange: false,
    isValidBuildingAddress : true,
    noOfFloors: 0,
    checkNoOfFloorsChange: false,
    isValidNoOfFloors : true,
    noOfRooms: 0,
    checkNoOfRoomsChange: false,
    isValidNoOfRooms : true,
  });

  const handleBuildginNameChange = (val) => {
    setShowSave(true)
    if( val.trim().length >= 6 ) {
        setData({
            ...data,
            buildingName: val,
            isValidBuildingName : true,
            checkBuildingNameChange : true
        });
    } else {
        setData({
            ...data,
            buildingName: val,
            isValidBuildingName : false,
            checkBuildingNameChange : false
        });
    }   
  }

  const handleBuildginAddresssChange = (val) => {
    setShowSave(true)
    if( val.trim().length >= 6 ) {
        setData({
            ...data,
            buildingAddress: val,
            isValidBuildingAddress : true,
            checkBuildingAddressChange : true
        });
    } else {
        setData({
            ...data,
            buildingAddress: val,
            isValidBuildingAddress : false,
            checkBuildingAddressChange : false
        });
    }   
  }

  const handleNoOfFloorsChange = (val) => {
    setShowSave(true)
    if( val.trim().length >= 6 ) {
        setData({
            ...data,
            noOfFloors: val,
            isValidNoOfFloors : true,
            checkNoOfFloorsChange : true
        });
    } else {
        setData({
            ...data,
            noOfFloors: val,
            isValidNoOfFloors : false,
            checkNoOfFloorsChange : false
        });
    }   
  }

  const handleNoOfRoomsChange = (val) => {
    setShowSave(true)
    if( val.trim().length >= 6 ) {
        setData({
            ...data,
            noOfRooms: val,
            checkNoOfRoomsChange : true,
            isValidNoOfRooms : true
        });
    } else {
        setData({
            ...data,
            noOfRooms: val,
            checkNoOfRoomsChange : false,
            isValidNoOfRooms : false
        });
    }   
  }


  const submitUpdates = async() => {
    const buildingName = data.buildingName;
    const buiildingAddress = data.buildingAddress;
    const noOfFloors = data.noOfFloors;
    const noOfRooms = data.noOfRooms;
    const payload = {
      buildingName,
      buiildingAddress,
      noOfFloors,
      noOfRooms
    }

    if ( buildingName.length == 0 || buiildingAddress.length == 0 || noOfFloors ==0 ||
      noOfRooms ==0 ) {
      Alert.alert('Wrong Input!', 'Some fields cannot be empty.', [
          {text: 'Okay'}
      ]);
      return;
    }
    console.log(payload)
    setScreenLoading(true);
    const response = await updateBuildingData(JSON.stringify(payload),route.params?.items)
    console.log(await response.json())
    if (route.params?.items) {
      getTenantBuildingsById(route.params?.items);
    } else {
      getTenantBuildingsById(creatNewBuilding._id);
    }
    setScreenLoading(false);
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
        <View style={styles.titlesAddWrapper}>
          <Text style={{ ...FONTS.h1 }}>List of Floors</Text>
          {noOfFloors > tenantBuildingFloorList.length && (
            <IconToggle
              name={'book-plus-multiple'}
              size={25}
              set={'material'}
              color={'#298df7'}
              onPress={() => openAddEditFloorModal('add', initialFloorValues, false)}
            />

          )}
        </View>
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
        <View style={styles.titlesAddWrapper}>
          <Text style={styles.popularTitle}>List of rooms</Text>
          {selectedFloors && selectedFloors.no_of_rooms > tenantBuildingFloorRoomsList.length && (
            <IconToggle
              name={'book-plus-multiple'}
              size={25}
              set={'material'}
              color={'#298df7'}
              onPress={() => openAddEditFloorModal('add', initialFloorValues, true)}
            />
          )}
        </View>
        {skeletonLoading ? (
          <SkeletonFloorsList />
        ) : (
          <>
            {tenantBuildingFloorRoomsList.length > 0 ? tenantBuildingFloorRoomsList.map((item) => (
              <FloorsList key={item.created_at} data={item} buildingId={route.params?.items} loading={loader} navigation={navigation} />
            ))
              :
              (<>
              </>
              )}
          </>
        )}
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
    height={350}
    viewBox="0 0 400 350"
    backgroundColor="#f1e9e9"
    foregroundColor="#fafafa"
  >
    <Rect x="25" y="34" rx="5" ry="5" width="122" height="20" /> 
    <Rect x="24" y="255" rx="5" ry="5" width="80" height="10" /> 
    <Rect x="25" y="295" rx="5" ry="5" width="80" height="10" /> 
    <Rect x="255" y="34" rx="10" ry="10" width="130" height="70" /> 
    <Rect x="24" y="275" rx="5" ry="5" width="80" height="10" /> 
    <Rect x="24" y="315" rx="5" ry="5" width="80" height="10" /> 
    <Rect x="24" y="335" rx="5" ry="5" width="80" height="10" /> 
    <Rect x="25" y="98" rx="5" ry="5" width="50" height="30" />
  </ContentLoader>
        </View>

        {/* Price */}
        <View style={styles.loaderPriceWrapper}>

        </View>

      </View>
    );
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={screenLoading}
          onRefresh={callRefresh}
        />
      }
    >
      <View style={styles.container}>
        {/* Header */}
        <SafeAreaView>
          <View style={styles.headerWrapper}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={styles.headerLeft}>
                <Feather name="chevron-left" size={12} color={colors.textDark} />
              </View>
            </TouchableOpacity>
            {showSave && (
            <TouchableOpacity onPress={() => submitUpdates()}>
            <View style={styles.headerRight}>
                <Feather name="save" size={12} color={colors.textDark} />
            </View>
            </TouchableOpacity>
            )}
          </View>
        </SafeAreaView>

        {screenLoading ? (
          <>
            {renderSkeletonLoader()}
          </>
        ) : (
          <>
            {tenantBuildingListById && tenantBuildingListById._id && (

              <View key={tenantBuildingListById._id}>
                {/* Titles */}
                <View style={styles.titlesWrapper}>
                  <TextInput style={styles.title}
                        autoCorrect={false}
                        editable={true}
                        multiline={true}
                        defaultValue={tenantBuildingListById.building_name}
                        onChangeText={(val) => handleBuildginNameChange(val)}
                  />
                  {tenantBuildingListById.building_image ? (
                    <Image
                    source={{ uri: tenantBuildingListById.building_image }}
                    style={styles.itemImage}
                  />
                  ) : (
                    <Image
                    source={{ uri: icons.defaultBuilding }}
                    style={styles.itemImage}
                  />
                  )}

                </View>

                {/* Price */}
                <View style={styles.priceWrapper}>
                  <Text style={styles.priceText}>{CONSTANTS.currencySymbol} {tenantBuildingListById.total_amount}</Text>
                </View>

                {/* Pizza info */}


                <View style={styles.infoWrapper}>
                  <View style={styles.infoLeftWrapper}>
                    <View style={styles.infoItemWrapper}>
                      <Text style={styles.infoItemTitle}>Address</Text>
                      <TextInput style={styles.infoItemText}
                        autoCorrect={false}
                        editable={true}
                        multiline={true}
                        defaultValue={tenantBuildingListById.building_address}
                        onChangeText={(val) => handleBuildginAddresssChange(val)}
                      />
                    </View>
                    <View style={styles.infoItemWrapper}>
                      <Text style={styles.infoItemTitle}>No of Floors</Text>
                      <TextInput style={styles.infoItemText}
                        autoCorrect={false}
                        editable={true}
                        defaultValue={tenantBuildingListById.no_of_floors.toString()}
                        keyboardType="number-pad"
                        onChangeText={(val) => handleNoOfFloorsChange(val)}
                      />
                    </View>
                    <View style={styles.infoItemWrapper}>
                      <Text style={styles.infoItemTitle}>Rooms</Text>
                      <TextInput style={styles.infoItemText}
                        autoCorrect={false}
                        editable={true}
                        defaultValue={tenantBuildingListById.no_of_rooms.toString()}
                        keyboardType="number-pad"
                        onChangeText={(val) => handleNoOfRoomsChange(val)}
                      />
                    </View>
                  </View>

                </View>
              </View>
            )}
          </>
        )}



        {renderFloorList()}

        {addEditFloorModal.visible && (
          <AddTenantFloors
            addEditPaymentModal={addEditFloorModal}
            closeAddPaymentModal={closeAddEditPaymentModal}
            submitAddPayment={submitAddEditPayment}
            onChangeInput={onChangeInput}
            handleActionMenuList={handleActionMenuList}
          />
        )}



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
  titleSecond: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    paddingHorizontal: 20,
    color: colors.textDark,
  },
  titlesAddWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
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
  popularCardWrapper1: {
    backgroundColor: colors.white,
    borderRadius: 25,
    paddingTop: 10,
    paddingLeft: 20,
    marginBottom: 10,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    height: 70,
  },
  popularTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: '#000',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20
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