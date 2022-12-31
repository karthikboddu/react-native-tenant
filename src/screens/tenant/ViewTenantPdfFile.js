import React, { useEffect, useState } from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import BackButton from '../../components/BackButton'
import PdfViewer from '../../components/Tenant/PdfViewer'
import Popup from '../../components/Tenant/Popup'
import { getAssetUrl } from '../../services/tenant/uploadService'

const ViewTenantPdfFile = ({navigation,route}) => {
    const [assetData, setAssetData] = useState(null)
    useEffect(() => {
        getAssetUrlByTenant()
    }, [])

    const getAssetUrlByTenant = async()=> {
        const assetDetails = await getAssetUrl(route.params.tenantId, 'identity');
        const assetResult = await assetDetails.json();
        setAssetData(assetResult.data)
    }
    const p = {
      type: 'Warning',
      title: 'Payment Failed',
      button: true,
      textBody: 'Payment failed, Please try again',
      buttonText: 'Ok',
      autoClose : true,
      timing : 5000
    }

  return (
      
    <View  style={styles.container}>
        <BackButton goBack={navigation.goBack}/>
        {Platform.OS != 'web' ? (<><Popup config={p}/></>) : (
      <PdfViewer assetDetails={assetData}/>
      )}
    </View>
  )
}

export default ViewTenantPdfFile

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})