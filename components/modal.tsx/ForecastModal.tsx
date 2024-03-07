import React, { useEffect, useState } from 'react'
import BottomSheet from '@gorhom/bottom-sheet'
import ForecastModalBackground from './ForecastModalBackground'
import useApplicationDimensions from '../../hooks/useApplicationDimensions'
import ForecastControl from './elements/ForecastControl'
import Separator from './elements/Separator'
import { hourly, weekly } from '../../data/ForecastData'
import ForecastScroll from '../forecast/ForecastScroll'
import { ForecastType } from '../../models/Weather'
import AirQualityWidget from '../forecast/widgets/AirQualityWidget'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import UvIndexWidget from '../forecast/widgets/UvIndexWidget'
import WindWidget from '../forecast/widgets/WindWidget'
import SunriseWidget from '../forecast/widgets/SunriseWidget'
import RainFallWidget from '../forecast/widgets/RainFallWidget'
import FeelsLikeWidget from '../forecast/widgets/FeelsLikeWidget'
import HumidityWidget from '../forecast/widgets/HumidityWidget'
import VisibilityWidget from '../forecast/widgets/VisibilityWidget'
import PressureWidget from '../forecast/widgets/PressureWidget'
import Animated, { useAnimatedReaction, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useForecastModalPosition } from '../../context/ForecastModalContext'

const ForecastModal = (): JSX.Element => {
  const { width, height } = useApplicationDimensions()
  const smalLWidgetSize = width / 2 - 20
  const snapPoints = ['38.5%', '83%']
  const firstSnapPoint = height * (parseFloat(snapPoints[0]) / 100)
  const secondSnapPoint = height * (parseFloat(snapPoints[1]) / 100)
  const minY = height - secondSnapPoint
  const maxY = height - firstSnapPoint
  const cornerRadius = 44
  const capsuleRadius = 30
  const capsuleWidth = width * 0.15 // you divide the component width to the screen width. So the width is same for all screens
  const capsuleHeight = height * 0.17
  const [selectedForcastType, setSelectedForcastType] = useState<ForecastType>(ForecastType.Hourly)
  const currentPosition = useSharedValue(0)
  const animatedPosition = useForecastModalPosition()
  const translateXHourly = useSharedValue(0)
  const translateXWeekly = useSharedValue(width)
  const animatedHourlyStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateXHourly.value }]
    }
  })
  const animatedWeeklyStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateXWeekly.value }]
    }
  })
  useEffect(() => {
    if (selectedForcastType === ForecastType.Weekly) {
      translateXHourly.value = withTiming(-width)
      translateXWeekly.value = withTiming(-width)
    } else {
      translateXHourly.value = withTiming(0)
      translateXWeekly.value = withTiming(width)
    }
  }, [selectedForcastType])
  const normalizePosition = (position: number): number => {
    'worklet'
    return ((position - maxY) / (maxY - minY) * -1)
  }
  useAnimatedReaction(() => {
    return currentPosition.value
  }, (value) => {
    animatedPosition.value = (normalizePosition(value))
  })
  return (
    <BottomSheet
        snapPoints={snapPoints}
        animatedPosition={currentPosition}
        handleIndicatorStyle={{ width: 48, height: 5, backgroundColor: 'rgba(0,0,0,0.5)' }}
        backgroundComponent={() => (<ForecastModalBackground width={width} height={firstSnapPoint} cornerRadius ={cornerRadius}/>)}>
            <>
                <ForecastControl onPress={(type) => { setSelectedForcastType(type) }}/>
                <Separator width={width} height={3} />
                <ScrollView style={{ flex: 1 }} >
                  <Animated.View style={{ flexDirection: 'row' }}>
                    <Animated.View style={[animatedHourlyStyle]}>
                      <ForecastScroll
                        capsuleWidth={capsuleWidth}
                        capsuleHeight={capsuleHeight}
                        capsuleRadius = {capsuleRadius}
                        forecasts={hourly} />
                    </Animated.View>
                    <Animated.View style={[animatedWeeklyStyle]}>
                      <ForecastScroll
                        capsuleWidth={capsuleWidth}
                        capsuleHeight={capsuleHeight}
                        capsuleRadius = {capsuleRadius}
                        forecasts={weekly} />
                    </Animated.View>
                  </Animated.View>

            <View
            style={{ flex: 1, paddingTop: 30, paddingBottom: smalLWidgetSize }}>
            <AirQualityWidget width={width - 30} height={150} />

            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                padding: 15,
                gap: 10
              }}
            >
              <UvIndexWidget width={smalLWidgetSize} height={smalLWidgetSize} />
              <WindWidget width={smalLWidgetSize} height={smalLWidgetSize} />
              <SunriseWidget width={smalLWidgetSize} height={smalLWidgetSize} />
              <RainFallWidget
                width={smalLWidgetSize}
                height={smalLWidgetSize}
              />
              <FeelsLikeWidget
                width={smalLWidgetSize}
                height={smalLWidgetSize}
              />
              <HumidityWidget
                width={smalLWidgetSize}
                height={smalLWidgetSize}
              />
              <VisibilityWidget
                width={smalLWidgetSize}
                height={smalLWidgetSize}
              />
              <PressureWidget
                width={smalLWidgetSize}
                height={smalLWidgetSize}
              />
            </View>
          </View>
        </ScrollView>
        </>
    </BottomSheet>
  )
}

export default ForecastModal
