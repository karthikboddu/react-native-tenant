import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
//import Pdf from 'react-native-pdf';

const PdfViewer = ({assetDetails}) => {
    if (!assetDetails) {
        return (<></>);
    }
    const source = { uri: assetDetails.url, cache: true };

    return (
        <View style={styles.container}>
  {/*          <Pdf
                trustAllCerts={false}
                source={source}
                password={assetDetails.key}
                onLoadComplete={(numberOfPages, filePath) => {
                }}
                onPageChanged={(page, numberOfPages) => {
                }}
                onError={(error) => {
                    console.log(error);
                }}
                onPressLink={(uri) => {
                }}
                style={styles.pdf} />*/}
        </View>
    )
}

export default PdfViewer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
})
