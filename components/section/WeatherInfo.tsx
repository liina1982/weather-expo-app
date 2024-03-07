import { StyleSheet } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { type Weather } from '../../models/Weather'
import { DEGREE_SYMBOL } from '../../utils/constant'
import { useForecastModalPosition } from '../../context/ForecastModalContext'
import Animated, { Extrapolation, interpolate, interpolateColor, useAnimatedStyle } from 'react-native-reanimated'

interface WeatherInfoProps {
  weather: Weather
}

const WeatherInfo = ({ weather }: WeatherInfoProps): JSX.Element => {
  const { city, temperature, condition, high, low } = weather
  const { top } = useSafeAreaInsets()
  const topMargin = 51
  const weatherInfoMargin = top + topMargin
  const animatedPosition = useForecastModalPosition()
  const animatedViewStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: interpolate(animatedPosition.value, [0, 1], [0, -topMargin], Extrapolation.CLAMP) }]
    }
  })
  const animatedTempTxtStyles = useAnimatedStyle(() => {
    const fontFamilyValue = animatedPosition.value < 0.5 ? 'SF-Semibold' : 'SF-Thin'
    return {
      fontFamily: fontFamilyValue,
      fontSize: interpolate(animatedPosition.value, [0, 1], [96, 20]),
      lineHeight: interpolate(animatedPosition.value, [0, 1], [96, 20]),
      color: interpolateColor(animatedPosition.value, [0, 1], ['white', 'rgba(235,235,245,0.6)'])
    }
  })
  const animatedMinMaxTxtStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(animatedPosition.value, [0, 0.5], [1, 0])
    }
  })
  const animatedSeperatorTxtStyle = useAnimatedStyle(() => {
    const display = animatedPosition.value > 0.5 ? 'flex' : 'none'
    return {
      opacity: interpolate(animatedPosition.value, [0, 0.5, 1], [0, 0, 1]),
      display
    }
  })
  const animatedTempConditionStyle = useAnimatedStyle(() => {
    const flexDirection = animatedPosition.value < 0.5 ? 'column' : 'row'
    return {
      flexDirection
    }
  })
  const animatedConditionTxtStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            animatedPosition.value,
            [0, 0.5, 1],
            [0, -20, 0],
            Extrapolation.CLAMP
          )
        }
      ]
    }
  })
  return (
    <Animated.View style={[{ alignItems: 'center', marginTop: weatherInfoMargin }, animatedViewStyle]}>
      <Animated.Text style={styles.cityText}>{city}</Animated.Text>
      <Animated.View style={[{ alignItems: 'center' }, animatedTempConditionStyle]}>
        <Animated.View style={{ flexDirection: 'row' }}>
          <Animated.Text style={[styles.temperature, animatedTempTxtStyles]}>{temperature}</Animated.Text>
          <Animated.Text style={[styles.separator, animatedSeperatorTxtStyle]}>|</Animated.Text>
        </Animated.View>
        <Animated.Text style={[styles.condition, animatedConditionTxtStyle]}>{condition}</Animated.Text>
      </Animated.View>
      <Animated.Text style={[styles.degreesText, animatedMinMaxTxtStyles]}>H:{high}{DEGREE_SYMBOL} L:{low}{DEGREE_SYMBOL}</Animated.Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  cityText: {
    fontFamily: 'SF-Regular',
    color: 'white',
    fontSize: 34,
    lineHeight: 41
  },
  temperature: {
    fontFamily: 'SF-Thin',
    color: 'white',
    fontSize: 96,
    lineHeight: 96
  },
  separator: {
    fontFamily: 'SF-Semibold',
    color: 'rgba(235, 235, 245, 0.6)',
    fontSize: 20,
    lineHeight: 20,
    marginHorizontal: 2,
    display: 'none'
  },
  condition: {
    fontFamily: 'SF-Semibold',
    color: 'rgba(235, 235, 245, 0.6)',
    fontSize: 20,
    lineHeight: 20
  },
  degreesText: {
    fontFamily: 'SF-Semibold',
    color: 'white',
    fontSize: 20,
    lineHeight: 40
  }
})

export default WeatherInfo
