import React from 'react'
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native'
import colors from '../assets/colors/colors'
import { IconToggle } from '../utils'
//import { getStatusBarHeight } from 'react-native-status-bar-height'

export default function BackButton({ goBack }) {
  return (
    <SafeAreaView>
    <View style={styles.headerWrapper}>
      <TouchableOpacity onPress={goBack}>
        <View style={styles.headerLeft}>
        <IconToggle
            name={'chevron-left'}
            size={12}
            set={'Feather'}
            color={colors.textDark}
          />
        </View>
      </TouchableOpacity>

    </View>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    //top: 10 + getStatusBarHeight(),
    left: 4,
  },
  image: {
    width: 24,
    height: 24,
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
})
