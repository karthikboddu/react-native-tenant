import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import BackButton from '../../components/BackButton'
import PdfViewer from '../../components/Tenant/PdfViewer'
import { getAssetUrl } from '../../services/tenant/uploadService'

const ViewTenantPdfFile = ({navigation,route}) => {
    console.log(route.params.tenantId)
    const [assetData, setAssetData] = useState(null)
    useEffect(() => {
        getAssetUrlByTenant()
    }, [])

    const getAssetUrlByTenant = async()=> {
        const assetDetails = await getAssetUrl(route.params.tenantId, 'identity');
        const assetResult = await assetDetails.json();
        console.log(assetResult, "asset")
        setAssetData(assetResult.data)
    }

  return (
      
    <View  style={styles.container}>
        <BackButton goBack={navigation.goBack}/>
      <PdfViewer assetDetails={assetData}/>
    </View>
  )
}

export default ViewTenantPdfFile

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})