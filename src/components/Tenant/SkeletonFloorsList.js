import React from 'react';
import ContentLoader, { Circle, Rect } from 'react-content-loader/native';
import { StyleSheet, View } from 'react-native';
import colors from '../../assets/colors/colors';

const SkeletonFloorsList = () => {

    const loopData = [
        { label: 'January', id: '1' },
        { label: 'Febraury', id: '2' },
        { label: 'March', id: '3' },
      ];


    const renderSkeletonItems = ({ item }) => {

        return (
        <View       
            key={item.id}
            style={[
            styles.popularCardWrapper
            ]}>
            <ContentLoader
            speed={2}
            width={400}
            height={160}
            viewBox="0 0 400 160"
            backgroundColor="#c0b5b5"
            foregroundColor="#ecebeb"
            >
            <Rect x="48" y="8" rx="3" ry="3" width="120" height="6" />
            <Rect x="48" y="23" rx="3" ry="3" width="120" height="6" />
            <Circle cx="22" cy="22" r="22" />
            </ContentLoader>
        </View>
        )
      }


    return (
        <View>
          {loopData.map((item) => (
            <View       
            key={item.id}
            style={[
            styles.popularCardWrapper
            ]}>
              <ContentLoader
              speed={2}
              width={400}
              height={160}
              viewBox="0 0 400 160"
              backgroundColor="#c0b5b5"
              foregroundColor="#ecebeb"
              >
              <Rect x="48" y="8" rx="3" ry="3" width="180" height="6" />
              <Rect x="48" y="23" rx="3" ry="3" width="180" height="6" />
              <Circle cx="22" cy="22" r="22" />
              </ContentLoader>
          </View>
          ))}
        </View>
    )
}

export default SkeletonFloorsList

const styles = StyleSheet.create({
    popularCardWrapper: {
        backgroundColor: colors.white,
        borderRadius: 25,
        paddingTop: 15,
        paddingLeft: 20,
        marginBottom: 10,
        flexDirection: 'row',
        overflow: 'hidden',
        shadowColor: colors.black,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
        height: 70,
      },
})