import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Alert,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';

import colors from '../../assets/colors/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableRipple } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import { icons, images, SIZES, COLORS, FONTS } from '../../constants'
import { GlobalContext } from '../../context/GlobalState';
import Overlay from '../../components/Overlay';
import endpoints from '../../endpoints';
import deviceStorage from '../../services/deviceStorage';
import Moment from 'react-moment';

const RecentTransactions = ({ navigation }) => {
  const [page, setPage] = React.useState(1);
  const [loader, setLoader] = React.useState();
  const [loading, setLoading] = React.useState(true);

  const [data, setData] = React.useState([]);
  const { screenLoading, setScreenLoading, isAdmin } = React.useContext(GlobalContext);
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
              <View style={styles.popularTitlesWrapper}>
                <Text style={styles.infoItemTitle}>Type</Text>
                <Text style={styles.popularTitlesTitle}>
                  {item.room_payment_type}
                </Text>
              </View>



              <View style={styles.popularTitlesWrapper1}>
                <Text style={styles.infoItemTitle}>Amount</Text>
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

              <View style={styles.popularTitlesWrapper}>
                <Text style={styles.popularTitlesTitle}>
                  <Ionicons
                    name="time-outline"
                    size={20}
                    color={colors.done}
                  />

                </Text>
                <Text style={styles.popularTitlesTitle}>
                  <Moment format="D MMM YYYY" key={item._id} element={Text}>{item.updated_at}</Moment>
                </Text>
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
    <SafeAreaView>

      <View style={styles.popularWrapper}>

        <Text style={styles.popularTitle}>Recent Transaction</Text>

        {renderRecentTransactions()}



      </View>
    </SafeAreaView>
  );
};


export default RecentTransactions;

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
    marginBottom: 30
  },
  popularTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: '#000',
    marginBottom: 10
  },
  popularCardWrapper: {
    backgroundColor: colors.white,
    borderRadius: 25,
    paddingTop: 20,
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
    height: 140,
  },
  popularCardWrapperAmount: {
    borderRadius: 25,
    paddingTop: 20,

    paddingLeft: 20,
    flexDirection: 'column',
    overflow: 'hidden',
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
  popularTitlesWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  popularTitlesWrapper1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  popularTitlesTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
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

})
