import { useNavigation } from '@react-navigation/native';
import React, { useState } from "react";
import Moment from 'react-moment';
import {
  ActivityIndicator, Alert, FlatList, Modal, Pressable, StyleSheet,
  Text, TouchableOpacity, View
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { ScrollView } from 'react-native-gesture-handler';
import { TouchableRipple } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../assets/colors/colors';
import { SIZES } from '../../constants';
import { GlobalContext } from '../../context/GlobalState';
import endpoints from '../../endpoints';
import deviceStorage from '../../services/deviceStorage';



const TransactionsList = () => {




  const [page, setPage] = React.useState(1);
  const [loader, setLoader] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const navigation = useNavigation();

  const [data, setData] = React.useState([]);
  const [date, setDate] = React.useState('');
  const [startDate, setStartDate] = React.useState(new Date());

  const { screenLoading, isAdmin } = React.useContext(GlobalContext);

  const [modalVisible, setModalVisible] = useState(false);

  const [price, setPrice] = useState(0);
  const [roomId, setRoomId] = useState(0);

  const monthsData = [
    {label: 'January', value: '1'},
    {label: 'Febraury', value: '2'},
    {label: 'March', value: '3'},
    {label: 'April', value: '4'},
    {label: 'May', value: '5'},
    {label: 'June', value: '6'},
    {label: 'July', value: '7'},
    {label: 'August', value: '8'},
    {label: 'September', value: '9'},
    {label: 'October', value: '10'},
    {label: 'November', value: '11'},
    {label: 'December', value: '12'},
  ];

  const yearsData = [
    {label: '2022', value: '2022'},
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

  React.useEffect(() => {
    //clearStateVariable();
    let isSubscribed = true
    if (isSubscribed) {
      if (isAdmin) {
        getRecentAllTenantsRoomOrderDetails('P,C,F', page)
      } else {
        getTenantRoomAllOrderDetails('P,C,F', page);
      }
    }
    const willFocusSubscription = navigation.addListener('focus', () => {
      if (isAdmin) {
        getRecentAllTenantsRoomOrderDetails('P,C,F', page)
      } else {
        getTenantRoomAllOrderDetails('P,C,F', page);
      }
    }); return willFocusSubscription;
    return () => isSubscribed = false
    
  }, [])

  React.useEffect(() => {
    return () => {
      setData([]);
    }
  }, []);

  if (screenLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#663399" />
      </View>
    );
  }


  const API_URL = endpoints.apiUrl;
  const getTenantRoomAllOrderDetails = async (params, page) => {

    try {
      console.log(page, "----page")
      setLoading(true);
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
          setLoading(false);
          setData([...data, ...json?.data])
        }).catch((error) => {
          console.log(error)
        })
    } catch (e) {
      console.log(e)
      Alert.alert('Sorry, something went wrong.', e.message);
    }
  }


  const getRecentAllTenantsRoomOrderDetails = async (params, page) => {

    try {
      console.log(page, "----page")
      setLoading(true);
      const res = await deviceStorage.loadJWT();
      await fetch(`${API_URL}` + `${endpoints.recentAllTenantsRoomOrderDetails}` + `?paymentStatus=` + `${params}` + `&page=` + `${page}` + `&size=` + `${5}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': res
        }
      }).then((response) => response.json())
        .then((json) => {
          console.log(page, "page")
          setPage(page + 1)
          setLoading(false);
          setData([...data, ...json?.data])
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
          {loading ? (
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

    if (isAdmin) {
      getRecentAllTenantsRoomOrderDetails('P,C,F', page)
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

        <TouchableRipple key={item._id}>
          <View
            style={[
              styles.popularCardWrapper
            ]}>



            <View
              style={[
                styles.popularCardWrapperAmount
              ]}>

              <View style={styles.popularTitlesWrapperFirst}>
              {item.tenant && (


                <View style={styles.popularTitlesWrapper}>
                  <Text style={styles.infoItemTitle}>Name</Text>
                  {item.tenant.map(t => (
                    <Text style={styles.popularTitlesTitle} key={t._id}>
                      {t.full_name}
                    </Text>
                  ))}
                </View>

              )}




              <View style={styles.popularTitlesWrapper1}>
                <Text style={styles.popularTitlesTitle}>
                  {item.paymeny_status != 'C' ?
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
                  ₹ {item.total_amount}
                </Text>
              </View>

              </View>

              <View style={styles.popularTitlesWrapperFirst}>

 
              <View style={styles.popularTitlesWrapper}>
                <Text style={styles.infoItemTitle}>Type</Text>
                <Text style={styles.popularTitlesTitle}>
                  {item.room_payment_type}
                </Text>
              </View>
              
              <View style={styles.popularTitlesWrapper}>
                <Text style={styles.popularTitlesTitle}>
                  <Ionicons
                    name="time-outline"
                    size={20}
                    color={colors.done}
                  />

                </Text>
                <Text style={styles.popularTitlesTitle}>
                  <Moment fromNow key={item._id} element={Text}>{item.updated_at}</Moment>
                </Text>
              </View>

              </View>
            </View>

          </View>
        </TouchableRipple>

      )
    }

    return (

      <View>
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
      </View>
    )

  }




  return (

      <View style={styles.container}>
        <ScrollView

          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}>


          <View style={styles.popularWrapper}>

            <Text style={styles.popularTitle}>Recent Transaction</Text>
            <View style={styles.dropDownWrapper}>
            <Dropdown
                    style={styles.dropdown}
                    containerStyle={styles.shadow}
                    data={monthsData}

                    labelField="label"
                    valueField="value"
                    label="Dropdown"
                    placeholder="Select Month"
                    value={dropdown}
                    onChange={item => {
                    setDropdown(item.value);
                        console.log('selected', item);
                    }}

                    renderItem={item => _renderItem(item)}
                    textError="Error"
                />


              <Dropdown
                    style={styles.dropdown}
                    containerStyle={styles.shadow}
                    data={yearsData}

                    labelField="label"
                    valueField="value"
                    label="Dropdown"
                    placeholder="Select Year"
                    value={dropdown}
                    onChange={item => {
                    setYear(item.value);
                        console.log('selected', item);
                    }}

                    renderItem={item => _renderItem(item)}
                    textError="Error"
                />
              </View>

            {renderRecentTransactions()}
            
          </View>
          {/* {renderModal()} */}

           

         
        </ScrollView>




      </View>
      
  )
}

export default TransactionsList


const styles = StyleSheet.create({
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
  popularWrapper: {
    paddingHorizontal: 20,
    marginBottom: 30,
    height: 'auto'
  },
  popularTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: '#000',
    alignItems : 'center',
    marginBottom: 10,
    marginTop : 20
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
    marginRight: 30
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
    height : 300,
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
    alignItems :'center',
    backgroundColor: colors.primary,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    marginTop: 20,
    borderRadius : 10,
    width : 150,
    marginLeft : 20
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
dropDownWrapper : {
  flexDirection: 'row',
}
})