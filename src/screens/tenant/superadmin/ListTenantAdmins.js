import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import BackButton from '../../../components/BackButton';
import ViewTenantAdmins from '../../../components/Tenant/superadmin/ViewTenantAdmins';
import { GlobalContext } from '../../../context/GlobalState';



const ListTenantAdmins = ({navigation}) => {

    const { fetchAllParentTenantList, parentTenantList } = useContext(GlobalContext);

    React.useEffect(() => {
        fetchAllParentTenantList()
    }, [])
    const listProps = {
        parentTenantList,
        navigation
    }

    return (
        
        <View style={[
            styles.container,
            { paddingTop: 0 }
        ]}>
        <BackButton goBack={navigation.goBack}/>
            <View
                style={[
                    styles.listContainer
                ]}>
                <ViewTenantAdmins listProps={listProps} />
            </View>
        </View>
    )
}

export default ListTenantAdmins

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