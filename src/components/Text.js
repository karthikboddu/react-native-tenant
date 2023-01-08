import React from 'react'
import { StyleSheet, Text } from 'react-native'

const Text = ({ xxlarge, xlarge, large, small, xsmall, xxsmall, xxxsmall, style }) => {
    return (

        <Text
            style={[
                styles.caption,
                fontStyle,
                style
            ]}
        />

    )
}

export default Text

const styles = StyleSheet.create({
    caption: {
        fontFamily: Settings.FONT_FAMILY,
        color: '#313131'
    },
    xxlarge: {
        fontSize: '24rem'
    },
    xlarge: {
        fontSize: '20rem'
    },
    large: {
        fontSize: '15rem'
    },
    normal: {
        fontSize: '13rem'
    },
    small: {
        fontSize: '11rem'
    },
    xsmall: {
        fontSize: '9rem'
    },
    xxsmall: {
        fontSize: '7rem'
    },
    xxxsmall: {
        fontSize: '6rem'
    }
})