import React from 'react';
import { StyleSheet, View } from 'react-native';
import BackButton from '../../components/BackButton';
import Transactions from '../../components/Transactions';

const TenantRoomTransactionList = ({route, navigation}) => {

  var dateObj = new Date();
  var currentMonth = dateObj.getUTCMonth() + 1; //months from 1-12
  var currentDay = dateObj.getUTCDate();
  var currentYear = dateObj.getUTCFullYear();
  console.log(route.params.roomId, route.params.roomPaymentId,"roomPaymentId",route)
  return (
    <View>
        <BackButton goBack={navigation.goBack}/>
        <Transactions roomId={route.params.roomId}
          date={currentDay} month={currentMonth} year={currentYear} 
          roomPaymentId={route.params.roomPaymentId} />
    </View>
  )
}

export default TenantRoomTransactionList

const styles = StyleSheet.create({})