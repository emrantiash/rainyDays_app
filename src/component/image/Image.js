import { View, Text,Image } from 'react-native'
import React from 'react'

export default function WDImage(props) {
  return (
    <View>
      <Image
      alt = "Image"
        style={[props.style]}
        source={props.source}
      />
    </View>
  )
}