import { StyleSheet, View } from 'react-native'
import React from 'react'
import MapIcon from '../icons/MapIcon'
import ListIcon from '../icons/ListIcon'
import AddItemBackground from './AddItemBackground'
import useApplicationDimensions from '../../../hooks/useApplicationDimensions'
import CircleButton from './CircleButton'

const TabbarItems = (): JSX.Element => {
  const { width, height } = useApplicationDimensions()
  const addItemBackgroundWidth = width * 0.65
  const addItemBackgroundHeight = height * 0.12
  const circleRadius = addItemBackgroundWidth * 0.22 / 2
  return (
    <View style={styles.container}>
      <MapIcon />
      <AddItemBackground width={addItemBackgroundWidth} height={addItemBackgroundHeight} />
      <CircleButton radius={circleRadius}/>
      <ListIcon />
    </View>
  )
}

export default TabbarItems

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32
  }
})
