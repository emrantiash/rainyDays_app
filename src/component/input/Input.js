import { View, Text } from 'react-native'
import React from 'react'
import { Input } from  '@rneui/themed';
import WDIcon from '../icon/Icon';

export default function WDInput(props) {
  return (
    <Input
    
    autoFocus={true}
    selection={props.selection}
    value = {props.value}
    name = {props.name}
    secureTextEntry={props.password}
    placeholder={props.placeholder}
    leftIcon={<WDIcon name={props.icon} size={30} color={props.color} />}
    onChangeText={props.onChangeText}
  />
  )
}