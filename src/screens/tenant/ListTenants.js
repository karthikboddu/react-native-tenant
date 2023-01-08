import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '../../assets/colors/colors';
import ViewTenants from '../../components/Tenant/ViewTenants';
import { GlobalContext } from '../../context/GlobalState';



const ListTenants = ({navigation}) => {

    const { fetchAllTenantList, tenantDetailsList , setTransparentStatusBG} = useContext(GlobalContext);

    React.useEffect(() => {
        fetchAllTenantList()
        setTransparentStatusBG(colors.danger);
    }, [])
    const listProps = {
        tenantDetailsList,
        navigation
    }

    return (
        
        <View style={[
            styles.container,
            { paddingTop: 0 }
        ]}>
        {/* <BackButton goBack={navigation.goBack}/> */}
            <View
                style={[
                    styles.listContainer
                ]}>
                <ViewTenants listProps={listProps} />
            </View>
        </View>
    )
}

export default ListTenants

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    listContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'transparent'
    },
})