import { View, StyleSheet } from 'react-native'
import React from 'react'
import ArcComponent from './elements/ArcComponent'
import useApplicationDimensions from '../../hooks/useApplicationDimensions'
import TabbarItems from './elements/TabbarItems'

const WeatherTabBar = (): JSX.Element => {
  const TabbarHeight = 88
  const { width, height } = useApplicationDimensions()
  return (
        <View style={{ ...StyleSheet.absoluteFillObject, top: height - TabbarHeight }}>
            <ArcComponent width={width} height={TabbarHeight} />
            <TabbarItems />
        </View>
  )
}

export default WeatherTabBar
