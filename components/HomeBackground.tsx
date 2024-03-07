import { Image, ImageBackground, StyleSheet, type ScaledSize, View, Platform } from 'react-native'
import React from 'react'
import { Canvas, LinearGradient, Rect, vec } from '@shopify/react-native-skia'
import useApplicationDimensions from '../hooks/useApplicationDimensions'
import WeatherTabBar from './tabbar/WeatherTabBar'
import { useForecastModalPosition } from '../context/ForecastModalContext'
import Animated, { Extrapolation, interpolate, interpolateColor, useAnimatedStyle, useDerivedValue, useSharedValue } from 'react-native-reanimated'

const HomeBackground = (): JSX.Element => {
  // own hook created, so android statusbar is also covered by your canvas
  const dimensions = useApplicationDimensions()
  const { width, height } = dimensions
  const style = styles(dimensions)
  const smokeHeight = height * 0.6
  const smokeOffsetY = height * 0.4
  const animatedPosition = useForecastModalPosition()
  const AnimatedImgBkg = Animated.createAnimatedComponent(ImageBackground)
  const AnimatedCanvas = Animated.createAnimatedComponent(Canvas)
  const leftBkgColor = useSharedValue('#2E335A')
  const rightBkgColor = useSharedValue('#1C1B33')
  const bkgColors = useDerivedValue(() => {
    if (Platform.OS === 'ios') {
      leftBkgColor.value = interpolateColor(animatedPosition.value, [0, 1], ['#2E335A', '#422E5A'])
    } else {
      leftBkgColor.value = animatedPosition.value > 0.5 ? '#422E5A' : '#2E335A'
    }
    return [leftBkgColor.value, rightBkgColor.value]
  })
  const animatedImageBkgStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          // Strictly animate only from 0 to 1 -> Extrapolation.CLAMP
          translateY: interpolate(animatedPosition.value, [0, 1], [0, -height], Extrapolation.CLAMP)
        }
      ]
    }
  })
  const animatedCanvasSmokeStyle = useAnimatedStyle(() => {
    return { opacity: interpolate(animatedPosition.value, [0, 0.1], [1, 0], Extrapolation.CLAMP) }
  })
  return (
        <View style={{ ...StyleSheet.absoluteFillObject }}>
            <Canvas style={{ ...StyleSheet.absoluteFillObject }}>
            <Rect x={0} y={0} width={width} height={height}>
                <LinearGradient start={vec(0, 0)} end={vec(width, height)} colors={bkgColors} />
            </Rect>
            </Canvas>
            <AnimatedImgBkg source={require('../assets/home/Background.png')} resizeMode='cover' style={[{ height: '100%' }, animatedImageBkgStyles]}>
            <AnimatedCanvas style={[{ height: smokeHeight, ...StyleSheet.absoluteFillObject, top: smokeOffsetY }, animatedCanvasSmokeStyle]}>
                <Rect x={0} y={0} width={width} height={smokeHeight}>
                    <LinearGradient
                    start={vec(width / 2, 0)}
                    end={vec(width / 2, smokeHeight)}
                    colors={['rgba(58,63,84,0)', 'rgba(58,63,84,1)']}
                    positions={[-0.2, 0.54]}
                    />
                </Rect>
            </AnimatedCanvas>
            <Image
                source={require('../assets/home/House.png')}
                resizeMode='cover'
                style={style.houseImage} />
            </AnimatedImgBkg>
            <WeatherTabBar />
        </View>
  )
}

export default HomeBackground

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const styles = ({ width }: ScaledSize) =>
  StyleSheet.create({
    houseImage: {
      width,
      height: width,
      ...StyleSheet.absoluteFillObject,
      top: '36%'
    }
  })
