import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import BackButton from '../../components/BackButton'
import CreateBuildingForm from '../../components/Tenant/CreateBuildingForm'

const CreateBuilding = ({navigation}) => {
  return (
    <View style={styles.container}>
    <BackButton goBack={navigation.goBack} />
    <ScrollView>
      <CreateBuildingForm navigation={navigation}/>
      </ScrollView>
    </View>
  )
}

export default CreateBuilding

const styles = StyleSheet.create({
    container: {

    },
})