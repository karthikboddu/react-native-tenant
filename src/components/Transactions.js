import { useNavigation } from '@react-navigation/native';
import React, { useState } from "react";
import ContentLoader, { Circle, Rect } from 'react-content-loader/native';
import Moment from 'react-moment';
import {
  ActivityIndicator, Alert, FlatList, Modal, Pressable, StyleSheet,
  Text, TouchableOpacity, View
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Avatar, TouchableRipple } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../assets/colors/colors';
import { icons, SIZES } from '../constants';
import { GlobalContext } from '../context/GlobalState';
import endpoints from '../endpoints';
import deviceStorage from '../services/deviceStorage';
import { IconToggle } from '../utils';

const Transactions = (route) => {




  const [page, setPage] = React.useState(1);
  const navigation = useNavigation();

  const [data, setData] = React.useState([]);
  const [pagination, setPagination] = React.useState([]);
  const [startDate, setStartDate] = React.useState(null);

  const [endDate, setEndDate] = React.useState(null);

  const { screenLoading, setScreenLoading, isAdmin } = React.useContext(GlobalContext);

  const [modalVisible, setModalVisible] = useState(false);
  
  const loopData = [
    { label: 'January', id: '1' },
    { label: 'Febraury', id: '2' },
    { label: 'March', id: '3' },
    { label: 'April', id: '4' },
    { label: 'May', id: '5' },
    { label: 'June', id: '6' },
    { label: 'July', id: '7' },
    { label: 'August', id: '8' },
    { label: 'September', id: '9' },
    { label: 'October', id: '10' },
    { label: 'November', id: '11' },
    { label: 'December', id: '12' },
  ];
  const monthsData = [
    { label: 'January', value: '1' },
    { label: 'Febraury', value: '2' },
    { label: 'March', value: '3' },
    { label: 'April', value: '4' },
    { label: 'May', value: '5' },
    { label: 'June', value: '6' },
    { label: 'July', value: '7' },
    { label: 'August', value: '8' },
    { label: 'September', value: '9' },
    { label: 'October', value: '10' },
    { label: 'November', value: '11' },
    { label: 'December', value: '12' },
  ];

  var dateObj = new Date();
  var currentYear = dateObj.getUTCFullYear()
  const yearsArrData = [];
  var startYear = 2022;

  for (let index = startYear; index <= currentYear; index++) {    
    yearsArrData.push({ label: index.toString(), value: index.toString() });
  }

  const statusData = [
    { label: 'Pending', value: 'P' },
    { label: 'Success', value: 'C' },
    { label: 'Failure', value: 'F,P' },
  ];

  const _renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {/* <Image style={styles.icon} source={require('./assets/tick.png')} /> */}
      </View>
    );
  };

  const [dropdown, setDropdown] = useState(null);
  const [year, setYear] = useState(null);
  const [status, setStatus] = useState(null);


  React.useEffect(() => {
    //clearStateVariable();

    if (!route?.roomId) {
      return ;
    }
   
    let isSubscribed = true
    if (isSubscribed) {
      if (isAdmin && (route?.roomId || route?.roomPaymentId)) {
        getRecentAllTenantsRoomOrderDetails('P,C,F', page, startDate, route?.roomId)
      } else {
        getTenantRoomAllOrderDetails('P,C,F', page);
      }
    }
    // const willFocusSubscription = navigation.addListener('focus', () => {
    //   if (isAdmin) {
    //     getRecentAllTenantsRoomOrderDetails('P,C,F', page, startDate, route?.roomId)
    //   } else {
    //     getTenantRoomAllOrderDetails('P,C,F', page);
    //   }
    // }); return willFocusSubscription;

    
    return () => {isSubscribed = false, setData([])}

  }, [dropdown,status])

  React.useEffect(() => {
    return () => {
      setData([]);
      setStartDate(null);
      setEndDate(null);
    }
  }, []);

  const filterByMonth = async (value) => {
    setData([]);
    setDropdown(value);
    setStartDate(year + '-' + value + '-01');
    setEndDate(year + '-' + value + '-30');
  }


  const API_URL = endpoints.apiUrl;
  const getTenantRoomAllOrderDetails = async (params, page) => {

    try {
      console.log(page, "----page")
      setScreenLoading(true);
      const res = await deviceStorage.loadJWT();
      await fetch(`${API_URL}` + `${endpoints.tenantRoomOrderDetails}` + `?paymentStatus=` + `${params}` + `&page=` + `${page}` + `&size=` + `${5}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': res
        }
      }).then((response) => response.json())
        .then((json) => {
          setPage(page + 1)
          setScreenLoading(false);
          setData([...data, ...json?.data])
        }).catch((error) => {
          console.log(error)
        })
    } catch (e) {
      console.log(e)
      Alert.alert('Sorry, something went wrong.', e.message);
    }
  }


  const getRecentAllTenantsRoomOrderDetails = async (params, page, startDate, roomId) => {

    try {
      setScreenLoading(true);
      let query = "";

      if (roomId) {
        query = query + '&roomId=' + roomId
      }
      if (startDate) {
          query = query + '&startDate=' + startDate
      } else {
        setDropdown(route?.month.toString());
        setYear(route?.year.toString());
        query = query + '&startDate=' + route?.year + '-' + route?.month + '-01'
      }
  
      if (endDate) {
          query = query + '&endDate=' + endDate
      } else {
        query = query + '&endDate=' + route?.year + '-' + route?.month + '-30'
      }

      if (route?.roomPaymentId) {
        query = query + '&roomPaymentId=' + route?.roomPaymentId
      }
      if (status) {
        query = query + '&paymentStatus=' + status
      } else {
        query = query + '&paymentStatus=' + params
      }
      console.log(query, "----page")
      const res = await deviceStorage.loadJWT();
      await fetch(`${API_URL}` + `${endpoints.recentAllTenantsRoomOrderDetails}`
                 + `?page=` + `${page}` + `&size=` + `${5}` + query, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': res
        }
      }).then((response) => response.json())
        .then((json) => {
          
          setScreenLoading(false);
          setData([...data, ...json?.data?.orderDetails])
          // setPagination(json?.data?._pagination)
        }).catch((error) => {
          console.log(error)
        })
    } catch (e) {
      console.log(e)
      Alert.alert('Sorry, something went wrong.', e.message);
    }
  }


  const renderFooter = () => {
    return (
      //Footer View with Load More button

      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={getNextPageData}
          //On Click of button calling getData function to load more data
          style={styles.loadMoreBtn}>
          <Text style={styles.btnText}>Load More</Text>
          {screenLoading ? (
            <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
          ) : null}
        </TouchableOpacity>

      </View>
    );
  };

  function renderModal() {
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Show Modal</Text>
        </Pressable>
      </View>
    )
  }

  const getNextPageData = () => {
    setPage(page + 1)
    if (isAdmin) {
      getRecentAllTenantsRoomOrderDetails('P,C,F', page, startDate, route?.roomId)
    } else {
      getTenantRoomAllOrderDetails('P,C,F', page);
    }
  }

  function renderRecentTransactions() {
    const renderItem = ({ item }) => {
      if (!item) {
        return (<></>);
      }
      return (

        <TouchableRipple key={item._id}
                onPress={() =>
                navigation.navigate('EditOrderDetails', {
                  roomId : route?.roomId, roomPaymentId : item._id, tenantId : item.tenant[0] ? item.tenant[0]._id : null 
                })
            }
            style = {{borderRadius: 15}}
        >

          <View
            style={[
              styles.popularCardWrapper
            ]}>


<View style={styles.avatarWrapperFirst}>
                {item.tenant && (
                  <>
                    {item.tenant.photoUrl ? (
                      <Avatar.Image
                        source={{ uri: item.tenant.photoUrl }}
                        size={50}
                        style={{ marginRight: 10 }}
                      />) : (
                      <Avatar.Image
                        source={require('../../assets/avatar.png')}
                        size={50}
                        style={{ marginRight: 10 }}
                      />)}
                  </>
                )}
              </View>

            <View
              style={[
                styles.popularCardWrapperAmount
              ]}>

              <View style={styles.popularTitlesWrapperFirst}>
                    {item.tenant && (
                      <View style={styles.popularTitlesWrapper}>
                          <Text style={styles.popularTitlesTitle} >
                            {item.tenant.full_name}
                          </Text>
                      </View>
                    )}

                <View style={styles.popularTitlesWrapper1}>
                  <Text style={styles.popularTitlesTitle}>
                    {item.payment_status != 'C' ?
                      <MaterialIcons
                        name="pending"
                        size={20}
                        color={colors.pending}
                      /> :
                      <Ionicons
                        name="cloud-done-sharp"
                        size={20}
                        color={colors.done}
                      />
                    }
                  </Text>

                  <Text style={styles.popularTitlesTitle}>
                    ₹ {item.price}
                  </Text>
                </View>

              </View>

              <View style={styles.popularTitlesWrapperSecond}>


                <View style={styles.popularTitlesWrapper}>
                  {/* <Text style={styles.popularTitlesTitle}>
                    {item.room_payment_type}
                  </Text> */}
                  {item.room_payment_type == "ROOM_RENT" ? (
                    <Avatar.Image
                      source={icons.key}
                      size={20}
                      style={styles.popularTitlesTitle}
                    />
                  ) : (
                    <>
                    {item.room_payment_type == "ELECTRICITY" ? 
                    (
                      <Avatar.Image
                        source={icons.lightning}
                        size={20}
                        style={styles.popularTitlesTitle}
                      />
                    ) : 
                    (
                      <>
                      {item.room_payment_type == "BALANCE_AMOUNT" ? (
                        <IconToggle
                          set="material"
                          name="progress-clock"
                          color="#777777" size={16}
                        />
                        ) : (
                          <>
                          {item.room_payment_type == "GARBAGE" ? (
                        <IconToggle
                          set="Ionicons"
                          name="trash-bin-outline"
                          color="#777777" size={16}
                        />
                        ) : (
                      
                      <Text style={styles.popularTitlesTitle}>
                        {item.room_payment_type}
                      </Text>
                        )}</>
                      )}</>
                    )}
                    </>
                    )}

                </View>

                <View style={styles.popularTitlesWrapper}>
                  <Text style={styles.popularTitlesTitle}>
                    <Ionicons
                      name="time-outline"
                      size={20}
                      color={colors.done}
                    />

                  </Text>
                  <Text style={styles.popularTitlesTitleTime}>
                    <Moment fromNow key={item._id} element={Text}>{item.updated_at}</Moment>
                  </Text>
                </View>
                {item.contractDetails && (
                  <View style={styles.popularTitlesWrapper}>
                    <View>
                      <IconToggle
                        set={"fontawesome"}
                        name="building" size={16}
                        color={colors.primary}
                      />
                    </View>
                    <Text style={styles.popularTitlesTitleTime}>
                      {item.contractDetails ? (item.contractDetails.buildingDetails.building_name) : ""}
                    </Text>
                  </View>
                )}
              </View>

            </View>

          </View>
        </TouchableRipple>

      )
    }

    const renderSkeletonItems = ({ item }) => {

      return (

        <TouchableRipple >
          <View
            key={item.id}
            style={[
              styles.popularCardWrapper
            ]}>
            <ContentLoader
              speed={2}
              width={400}
              height={160}
              viewBox="0 0 400 160"
              backgroundColor="#c0b5b5"
              foregroundColor="#ecebeb"
            >
              <Rect x="48" y="8" rx="3" ry="3" width="200" height="6" />
              <Rect x="48" y="23" rx="3" ry="3" width="200" height="6" />
              <Circle cx="22" cy="22" r="22" />
            </ContentLoader>
          </View>
        </TouchableRipple>

      )
    }

    return (

      <View>
        {screenLoading ? (
          <FlatList
            data={loopData}
            onEndReachedThreshold={0.5}
            // onEndReached={() => setPage(page + 1)}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item ? `${item.id}` : 0}
            renderItem={renderSkeletonItems}
            contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
            ListFooterComponent={renderFooter}
          />
        ) : (
          <FlatList
            data={data}

            onEndReachedThreshold={0.5}
            // onEndReached={() => setPage(page + 1)}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item ? `${item._id}` : 0}
            renderItem={renderItem}
            contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
            ListFooterComponent={renderFooter}
          />
        )}
      </View>
    )

  }

  function skeletionLoader() {
    return (
      <View>
        <View
          style={[
            styles.popularCardWrapper
          ]}>
          <ContentLoader
            speed={2}
            width={400}
            height={150}
            viewBox="0 0 400 150"
            backgroundColor="#c0b5b5"
            foregroundColor="#ecebeb"

          >
            <Rect x="48" y="8" rx="3" ry="3" width="86" height="18" />
            <Rect x="156" y="8" rx="3" ry="3" width="86" height="18" />
          </ContentLoader>
        </View>
        {loopVal.map((loop) => {
          return (<TouchableRipple >
            <View
              key={loop}
              style={[
                styles.popularCardWrapper
              ]}>
              <ContentLoader
                speed={2}
                width={400}
                height={160}
                viewBox="0 0 400 160"
                backgroundColor="#c0b5b5"
                foregroundColor="#ecebeb"
              >
                <Rect x="48" y="8" rx="3" ry="3" width="120" height="6" />
                <Rect x="48" y="23" rx="3" ry="3" width="120" height="6" />
                <Circle cx="22" cy="22" r="22" />
              </ContentLoader>
            </View>
          </TouchableRipple>)
        })}
      </View>
    )
  }




  return (

    <View style={styles.container}>


        <View style={styles.popularWrapper}>

          {/* <Text style={styles.popularTitle}>Recent Transaction</Text> */}

          <View style={styles.dropDownWrapper}>

            <Dropdown
              style={styles.dropdown}
              containerStyle={styles.shadow}
              data={monthsData}
    
              labelField="label"
              valueField="value"
              label="Dropdown"
              placeholder="Month"
              value={dropdown}
              onChange={item => {
                filterByMonth(item.value);
              }}

              renderItem={item => _renderItem(item)}
              textError="Error"
            />


            <Dropdown
              style={styles.dropdown}
              containerStyle={styles.shadow}
              data={yearsArrData}

              labelField="label"
              valueField="value"
              label="Dropdown"
              placeholder="Year"
              value={dropdown}
              onChange={item => {
                setYear(item.value);
              }}

              renderItem={item => _renderItem(item)}
              textError="Error"
            />
            <Dropdown
              style={styles.dropdown}
              containerStyle={styles.shadow}
              data={statusData}
              labelField="label"
              valueField="value"
              label="Dropdown"
              placeholder="Status"
              value={status}
              onChange={item => {
                setStatus(item.value);
                setData([])
              }}

              renderItem={item => _renderItem(item)}
              textError="Error"
            />
          </View>
          {renderRecentTransactions()}

        </View>
        {/* {renderModal()} */}





    </View>

  )
}

export default Transactions


const styles = StyleSheet.create({
  container: {
    
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
  popularWrapper: {
    paddingHorizontal: 20,
    marginBottom: 30,
    height: 'auto'
  },
  popularTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: '#000',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20
  },
  popularCardWrapper: {
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
  loaderCardWrapper: {
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
  popularCardWrapperAmount: {
    borderRadius: 25,

    paddingLeft: 10,
    flexDirection: 'column',
    height: 130,
  },
  popularTopWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  popularTopText: {
    marginLeft: 10,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
  },
  avatarWrapperFirst: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  popularTitlesWrapperFirst: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  popularTitlesWrapperSecond: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  popularTitlesWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 10
  },
  popularTitlesWrapper1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 30
  },
  popularTitlesTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 10,
    color: colors.textDark,
  },
  popularTitlesWeight: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    color: colors.textLight,
    // marginTop: 5,
  },
  popularCardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: -20,
  },
  addPizzaButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  ratingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  rating: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    color: colors.textDark,
    marginLeft: 5,
  },
  popularCardRight: {
    flexDirection: 'row',
    justifyContent: 'center',
    //marginTop: 20,
  },
  popularCardImage: {
    color: '#000',
    marginLeft: 5
  },
  roomsListIcon1: {
    marginLeft: 23,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: 26,
    height: 26,
    borderRadius: 26,
    marginBottom: 20,
  },
  orderWrapper: {
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 10,
    backgroundColor: colors.orange,
    borderRadius: 50,
    width: 80,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 10,
    paddingLeft: 5,
    marginRight: 10,
    alignItems: 'center'
  },
  infoItemTitle: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 11,
    color: colors.textLight,
    paddingRight: 10,
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: colors.primary,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    alignItems: 'center'
  },

  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    height: 300,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },

  dropdown: {
    alignItems: 'center',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    marginTop: 20,
    borderRadius: 15,
    width: 100,
    marginLeft: 20
  },
  icon: {
    marginRight: 5,
    width: 18,
    height: 18,
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    alignItems: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  dropDownWrapper: {
    flexDirection: 'row',
    marginBottom: 10
  }
})