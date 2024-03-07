import { Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import MapIcon from '../icons/MapIcon'
import ListIcon from '../icons/ListIcon'
import AddItemBackground from './AddItemBackground'
import useApplicationDimensions from '../../../hooks/useApplicationDimensions'
import CircleButton from './CircleButton'

const TabBarItems = (): JSX.Element => {
  const { width, height } = useApplicationDimensions()
  const addItemBackgroundWidth = width * 0.68
  const addItemBackgroundHeight = height * 0.12
  const circleRadius = addItemBackgroundWidth * 0.22 / 2
  const buttonCenterX = width / 2 - circleRadius
  return (
    <View style={styles.container}>
      <MapIcon />
      <AddItemBackground width={addItemBackgroundWidth} height={addItemBackgroundHeight} />
      <Pressable
        style={{ ...StyleSheet.absoluteFillObject, left: buttonCenterX, top: 5, width: circleRadius * 2, height: circleRadius * 2 }}>
          {({ pressed }) => (
          <CircleButton radius={circleRadius} pressed={pressed}/>
          )}
      </Pressable>
      <ListIcon />
    </View>
  )
}

export default TabBarItems

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32
  }
})
