import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import Moment from 'react-moment';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../assets/colors/colors';
import { COLORS } from '../constants';
import { GlobalContext } from '../context/GlobalState';
import IconToggle from '../utils/IconToggle';
import { Loading } from './common';

const CardCustom = ({ itemData }) => {

  const { screenLoading } = useContext(GlobalContext);
  const navigation = useNavigation();
  console.log(itemData)

  if (itemData.totalAmount <= 0 && !itemData.isContract) {
    return (<></>);
  }
  return (
    <TouchableOpacity>
      <View style={styles.card}>

        <View style={styles.cardInfo}>

            <View style={styles.menuItem1}>

              <Text style={{ fontWeight: "bold", fontSize: 20, paddingLeft: 10 }}>Amount Due</Text>
              <Text style={{ fontWeight: "bold", fontSize: 15, paddingLeft: 10 }}>₹ {itemData.totalAmount}</Text>

            </View>
          <View style={styles.menuItem}>
            <Text numberOfLines={2} style={{ fontWeight: "bold", fontSize: 13 }}>Expires on</Text>
            {itemData.endAt && (

              <Text numberOfLines={2} style={{ fontWeight: "bold", fontSize: 13 }}>
                <Moment format="D MMM YYYY" element={Text}>{itemData.endAt}</Moment>
              </Text>
            )}
          </View>
          <View style={styles.menuItem2}>
            <View>
              <IconToggle
                set={"fontawesome"}
                name="building" size={16}
                color={COLORS.primary}
              />
            </View>
            <View>
              {itemData.buildingName && (

                <Text numberOfLines={2} style={{ fontWeight: "bold", fontSize: 13, paddingTop: 5 }}>
                  <Text numberOfLines={2} style={{ fontWeight: "bold", fontSize: 13 }}>{itemData.buildingName}</Text>
                </Text>
              )}
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('PaymentDetails')
          }>
          {!screenLoading ?
            <View>
              <View style={styles.orderWrapper}
              >
                <Text style={styles.orderText}>Pay now</Text>
                <IconToggle
                  set={"Feather"}
                  name="chevron-right" size={18}
                  color={colors.black}
                />
              </View>

            </View>
            :
            <Loading size={'small'} />
          }

        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default CardCustom;

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    paddingLeft: 14,
    marginLeft: 20,
    borderRadius: 10,
    borderColor: '#999',
    shadowColor: '#999',
    height:250,
    width:370,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    borderColor: '#000'
  },
  cardImgWrapper: {
    flex: 3,
    flexDirection: 'row'
  },
  cardImg: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardInfo: {
    flexWrap: 'wrap',
    padding: 10
  },
  cardTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  cardDetails: {
    fontSize: 20,
    color: '#fff',
  },
  cardIcon: {
    paddingRight: 20
  },
  menuItem: {
    flexDirection: 'column',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  menuItem1: {
    flexDirection: 'column'
  },
  menuItem2: {
    flexDirection: 'row'
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
    alignItems: 'center'
  },
});