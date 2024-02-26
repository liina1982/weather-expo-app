import { Image, ImageBackground, StyleSheet, type ScaledSize, View } from 'react-native'
import React from 'react'
import { Canvas, LinearGradient, Rect, vec } from '@shopify/react-native-skia'
import useApplicationDimensions from '../hooks/useApplicationDimensions'
import WeatherTabBar from './tabbar/WeatherTabBar'

const HomeBackground = (): JSX.Element => {
  // own hook created, so android statusbar is also covered by your canvas
  const dimensions = useApplicationDimensions()
  const { width, height } = dimensions
  const style = styles(dimensions)
  const smokeHeight = height * 0.6
  const smokeOffsetY = height * 0.4
  return (
        <View style={{ flex: 1 }}>
            <Canvas style={{ flex: 1 }}>
            <Rect x={0} y={0} width={width} height={height}>
                <LinearGradient start={vec(0, 0)} end={vec(width, height)} colors={['#000000', '#2E335A']} />
            </Rect>
            </Canvas>
            <ImageBackground source={require('../assets/home/Background.png')} resizeMode='cover' style={{ height: '100%' }}>
            <Canvas style={{ height: smokeHeight, ...StyleSheet.absoluteFillObject, top: smokeOffsetY }}>
                <Rect x={0} y={0} width={width} height={smokeHeight}>
                    <LinearGradient
                    start={vec(width / 2, 0)}
                    end={vec(width / 2, smokeHeight)}
                    colors={['rgba(58,63,84,0)', 'rgba(58,63,84,1)']}
                    positions={[-0.2, 0.54]}
                    />
                </Rect>
            </Canvas>
            <Image
                source={require('../assets/home/House.png')}
                resizeMode='cover'
                style={style.houseImage} />
            </ImageBackground>
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
