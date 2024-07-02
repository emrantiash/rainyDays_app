import React from 'react'
import Icon from 'react-native-vector-icons/Entypo';

export default function WDIcon(props) {
  return (
    <Icon  name={props.name} size ={props.size}  color={props.color}
    style = {props.style}
    onPress = {props.onPress}
    
    />
  )
}
