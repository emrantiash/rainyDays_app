import React from 'react';
import { Button } from '@rneui/themed';
import WDIcon from '../icon/Icon';

const WDButton = (props) => {
  return (
    <Button
    icon={ <WDIcon name={props.icon} size={30} color={props.color} /> }
    onLongPress = {props.onLongPress}
    onPress = {props.onPress}
    title={props.title}
    buttonStyle={props.buttonStyle}
    containerStyle={{
      height: props.height,
      width: props.width,
    //   marginHorizontal: 50,
    //   marginVertical: 10,
    }}
    titleStyle={{
      color: 'white',
      marginHorizontal: 20,
    }}

    
  />
  )
}

export default WDButton
