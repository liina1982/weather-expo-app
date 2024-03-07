import { StyleSheet } from 'react-native'
import React from 'react'
import ArcComponent from './elements/ArcComponent'
import useApplicationDimensions from '../../hooks/useApplicationDimensions'
import TabbarItems from './elements/TabbarItems'
import { BlurView } from 'expo-blur'
import { useForecastModalPosition } from '../../context/ForecastModalContext'
import Animated, {
  interpolate,
  useAnimatedStyle
} from 'react-native-reanimated'

const WeatherTabBar = (): JSX.Element => {
  const TabbarHeight = 88
  const { width, height } = useApplicationDimensions()
  const animatedPosition = useForecastModalPosition()

  const animatedViewStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            animatedPosition.value,
            [0, 1],
            [0, TabbarHeight + 20]
          )
        }
      ]
    }
  })
  return (
    <Animated.View
      style={[
        { ...StyleSheet.absoluteFillObject, top: height - TabbarHeight },
        animatedViewStyles
      ]}
    >
      <BlurView
        intensity={50}
        tint="dark"
        style={{
          ...StyleSheet.absoluteFillObject,
          height: TabbarHeight

        }}
      >
        <ArcComponent height={TabbarHeight} width={width} />
        <TabbarItems />
      </BlurView>
    </Animated.View>
  )
}

export default WeatherTabBar
