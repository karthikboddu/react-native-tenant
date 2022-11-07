import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import ContentLoader, { Circle, Rect } from 'react-content-loader/native';
import Moment from 'react-moment';
import {
  ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import { Avatar, TouchableRipple } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../assets/colors/colors';
import { COLORS, icons, SIZES } from '../../constants';
import { GlobalContext } from '../../context/GlobalState';
import endpoints from '../../endpoints';
import deviceStorage from '../../services/deviceStorage';



const RecentTransactions = ({ }) => {
  const [page, setPage] = React.useState(1);
  const navigation = useNavigation();

  const [data, setData] = React.useState([]);
  const { screenLoading, setScreenLoading, isAdmin, isLoading, setLoading } = React.useContext(GlobalContext);

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

  // if (screenLoading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <ActivityIndicator size="large" color="#663399" />
  //     </View>
  //   );
  // }


  const API_URL = endpoints.apiUrl;
  const getTenantRoomAllOrderDetails = async (params, page) => {

    try {

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
      setScreenLoading(true);
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
          setPage(page + 1)
          setScreenLoading(false);
          setData([...data, ...json?.data?.orderDetails])
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
          <Text style={styles.btnText}>View  All Transactions</Text>
          {screenLoading ? (
            <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
          ) : null}
        </TouchableOpacity>
      </View>
    );
  };

  const getNextPageData = () => {
    navigation.navigate('TransactionsList')
  }

  function renderRecentTransactions() {
    const renderItem = ({ item }) => {
      if (!item) {
        return (<></>);
      }
      return (

        <TouchableRipple key={item._id}
        >

          <View
            style={[
              styles.popularCardWrapper
            ]}>


            {isAdmin ? (
              <View style={styles.avatarWrapperFirst}>
                {item.tenant[0] && (
                  <>
                    {item.tenant[0].photoUrl ? (
                      <Avatar.Image
                        source={{ uri: item.tenant[0].photoUrl }}
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
            ) : (
              <View style={styles.avatarWrapperFirst}>
                {item.tenant_id && (
                  <>
                    {item.tenant_id.photoUrl ? (
                      <Avatar.Image
                        source={{ uri: item.tenant_id.photoUrl }}
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
            )}

            <View
              style={[
                styles.popularCardWrapperAmount
              ]}>

              <View style={styles.popularTitlesWrapperFirst}>
                {isAdmin ? (
                  <>
                    {item.tenant && (


                      <View style={styles.popularTitlesWrapper}>

                        {item.tenant.map(t => (
                          <Text style={styles.popularTitlesTitle} key={t._id}>
                            {t.full_name}
                          </Text>
                        ))}
                      </View>

                    )}
                  </>
                ) : <>
                  {item.tenant_id && (


                    <View style={styles.popularTitlesWrapper}>
                      <Text style={styles.popularTitlesTitle} >
                        {item.tenant_id.full_name}
                      </Text>
                    </View>

                  )}
                </>}



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
                    ₹ {item.total_amount}
                  </Text>
                </View>

              </View>

              <View style={styles.popularTitlesWrapperSecond}>


                <View style={styles.popularTitlesWrapper}>
                  {/* <Text style={styles.infoItemTitle}>Type</Text> */}
                  <Text style={styles.popularTitlesTitle}>
                    {item.room_payment_type}
                  </Text>
                  <Image
                            source={icons.icons}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLORS.primary : COLORS.secondary
                            }}
                        />
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
            {isAdmin && (
              <TouchableRipple
                onPress={() =>
                  navigation.navigate('TenantRoomDetails', {
                    item: item.contractDetails[0].floor_room_id, buildingItemId: item.contractDetails[0].building_id, roomPaymentId: item._id
                  })
                }
                style={{ borderRadius: 20 }}>
                <View
                  style={[
                    styles.detailsListIcon,
                    {
                      backgroundColor: colors.primary,
                    },
                  ]}>
                  <Feather
                    name="chevron-right"
                    size={15}
                    style={{ alignSelf: 'center' }}
                    color={colors.white}

                  />
                </View>
              </TouchableRipple>
            )}
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
              <Rect x="48" y="8" rx="3" ry="3" width="120" height="6" />
              <Rect x="48" y="23" rx="3" ry="3" width="120" height="6" />
              <Circle cx="22" cy="22" r="22" />
            </ContentLoader>
          </View>
        </TouchableRipple>

      )
    }


    return (

      <View>
        {!screenLoading ? (
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
        ) : (
          <FlatList
            data={loopData}
            onEndReachedThreshold={0.5}
            // onEndReached={() => setPage(page + 1)}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item ? `${item.id}` : 0}
            renderItem={renderSkeletonItems}
            contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
          />
        )}
      </View>
    )

  }

  return (

    <View style={styles.popularWrapper}>

      <Text style={styles.popularTitle}>Recent Transaction</Text>

      {renderRecentTransactions()}



    </View>
  );
};


export default RecentTransactions;

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
    height: 300
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
    fontSize: 14,
    color: colors.textLight,
    paddingRight: 50,
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
  detailsListIcon: {
    marginLeft: 23,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: 26,
    height: 26,
    borderRadius: 26,
    marginBottom: 20,
  },


})
