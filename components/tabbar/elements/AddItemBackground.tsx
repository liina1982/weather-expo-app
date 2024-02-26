import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Canvas, FitBox, LinearGradient, Path, rect, vec } from '@shopify/react-native-skia'


interface AddItemBackgroundProps {
    width: number,
    height: number,
}
const AddItemBackground = ({width, height}: AddItemBackgroundProps) => {
  return (
    <Canvas style={{width: width, height: height}}>
        <FitBox src={rect(0,0,266,100)} dst={rect(0,0,width,height)}>
        <Path path={'M112 0H154C186 0 195.501 24.1398 205.732 48.6985C216.325 74.1247 227 100 262 100H4.00006C39.0001 100 49.6754 74.1247 60.2678 48.6985C70.4989 24.1398 80.0001 0 112 0Z'}
            style={'fill'}
        >
            <LinearGradient
                start={vec(width/2, height)}
                end={vec(width/2,0)}
                colors={['#262c51','#3e3f74']}
            />
        </Path>
        </FitBox>
    </Canvas>
  )
}

export default AddItemBackground

const styles = StyleSheet.create({})
