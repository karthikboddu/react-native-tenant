import { useActionSheet } from "@expo/react-native-action-sheet";
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../assets/colors/colors';
import BackButton from "../../components/BackButton";
import Button from '../../components/Button';
import AddRoomPayment from '../../components/Tenant/AddRoomPayment';
import ListTenantRoomDetails from "../../components/Tenant/ListTenantRoomDetails";
import { GlobalContext } from '../../context/GlobalState';
import { IconToggle } from '../../utils';


const TenantRoomDetails = ({ route, navigation }) => {
  const { item } = route.params;
  const [loader, setLoader] = useState(false)

  const initialPaymentValues = {
    type: '',
    description: '',
    amount: '',
    roomId: route.params?.item,
    paymentForDate : new Date()
  };
  
  const initialAddEditRoomPaymentValues = {
    pending: false,
    failed: false,
    visible: false,
    data: initialPaymentValues,
    isAdd: null
  };

  const [addEditPaymentModal, setAddEditPaymentModall] = useState(initialAddEditRoomPaymentValues);

  const { getTenantRoomsDetailsByRoomId, initTenantRoomOrderPayment, tenantBuildingFloorRoomsDetails, screenLoading, unLinkTenantRoomContract } = useContext(GlobalContext);

  useEffect(() => {
    setLoader(true)
    getTenantRoomsDetailsByRoomId(route.params?.item)
    setLoader(false)
    
    console.log("tennat room details ", route.params,tenantBuildingFloorRoomsDetails)
  }, [route.params?.items])


  const onChangeInput = (inputValue, inputName) => {
    setAddEditPaymentModall({
      ...addEditPaymentModal,
      data: {
        ...addEditPaymentModal.data,
        [inputName]: inputValue
      }
    });
  }


const initRoomPayment = async () => {

    const payload = JSON.stringify(addEditPaymentModal.data);

    console.log(payload, "paytmPayload",'&tenantId=' )

    initTenantRoomOrderPayment(payload, '?tenantId=' + tenantBuildingFloorRoomsDetails[0]?.contractDetails[0]?.tenant_id);
    setAddEditPaymentModall((prevState) => ({
      ...prevState,
      visible: false
  }));
}
  
const submitAddEditPayment = async () => {
    await initRoomPayment();
 };

const openAddEditPaymentModal = (action, data) => {
    setAddEditPaymentModall((prevState) => ({
      ...prevState,
      isAdd: action === 'add',
      visible: true,
      data
    }));
  }

  const closeAddEditPaymentModal = () => {
    setAddEditPaymentModall((prevState) => ({
      ...prevState,
      visible: false
    }));
  }
  const { showActionSheetWithOptions } = useActionSheet();

  const icons = [
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
      icons
    }, buttonIndex => {
      if (buttonIndex === 0) {
        // cancel action
      } else if (buttonIndex === 1) {
        // Edit Book
        openAddEditPaymentModal('edit', dataItem);
      }
    });
  }
  
  const routeDetails = {
    roomId: route.params?.item, buildingId: route.params?.buildingItemId, buildingFloorId: route.params?.buildingFloorId
 }

  return (
    <View style={styles.container}>
          {/* Header */}
          <BackButton goBack={navigation.goBack}/>
          {tenantBuildingFloorRoomsDetails.length > 0 ? (
            <>
             {tenantBuildingFloorRoomsDetails.map(data => (
               <ListTenantRoomDetails roomDetails = {data} routeDetails = {routeDetails} key={data._id}/>
             ))}
            </>
          ) : (
            <View style={styles.titlesWrapper}>
                    <Text style={styles.title}>Room is empty</Text>
                    <Button
                        onPress={() =>
                            navigation.navigate('TenantSignUp', routeDetails)}
                    >Add tenant to room</Button>
                </View>
          )}

      <View>
        <View style={styles.titlesWrapper}>
          <Text style={styles.titleSecond}>Room Transactions</Text>
          <IconToggle
            name={'book-plus-multiple'}
            size={25}
            set={'material'}
            color={'#298df7'}
            onPress={() => openAddEditPaymentModal('add', initialPaymentValues)}
          />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('TenantRoomTransactionList', { roomId: route.params?.item, roomPaymentId: route.params?.roomPaymentId })}>
          <View style={styles.orderWrapper}>
            <Text style={styles.orderText}>View Room Transactions </Text>
            <Feather name="chevron-right" size={18} color={colors.black} />
          </View>
        </TouchableOpacity>
      </View>
      {addEditPaymentModal.visible && (
        <AddRoomPayment
          addEditPaymentModal={addEditPaymentModal}
          closeAddPaymentModal={closeAddEditPaymentModal}
          submitAddPayment={submitAddEditPayment}
          onChangeInput={onChangeInput}
          handleActionMenuList={handleActionMenuList}
        />
      )}
    </View>
  )
}

export default TenantRoomDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow :1
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
    fontSize: 22,
    color: colors.textDark,
    width: '50%',
  },
  titleSecond: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    color: colors.textDark,
    width: '50%',
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
})
