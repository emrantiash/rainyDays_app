import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions ,Linking} from 'react-native'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { PricingCard, lightColors, Chip,FAB} from '@rneui/themed';
import WDButton from '../../component/button/Button';

const _width = Dimensions.get('window').width * 100/100
const _height = Dimensions.get('window').height 
export default function Details() {
  const [display ,setDisplay] = useState('none')
  const [quantity ,setQuantity] = useState(1)
  const [barcode,setBarcode] = useState(null)

  const _takeBarCode = (val) =>{
    setDisplay(val)
  }

  const _onSuccess = (e) => {
    // console.warn(e.data)
    setBarcode(null)
    setBarcode(e.data)
    _takeBarCode('none')
  }

  const _onLongPress = () =>{
    // console.warn('comes')
    // submit here
  }

  const _callMarchant = () =>{
    const phoneNumber = '01768009215'
   
    Linking.openURL(`tel:${phoneNumber}`)
  }

  return (
    <View style={styles.container}>
      
      <PricingCard
      
        color={lightColors.primary}
        title="Maliha Haque"
        price={
          <FAB
          loading={false}
       style={{justifyContent : 'flex-end',padding:4}}
        visible={true}
        icon={{ name: 'phone', color: 'white' }}
        size="small"
        onLongPress={_callMarchant}
      />
        }
        info={[ quantity +' Quantity', 'Flat:22,Road:8,House:23,Block:B,Mirpur 11,Dhaka:1209']}
        button={{ title: 'open Camera', icon: 'flight-takeoff' }}
        onButtonPress = {()=>_takeBarCode('flex')}
       
      />
      <View>
        {
            barcode != null && 
           <View>
            {/* <Text>WIdth L {width}</Text> */}
          <Chip
            title={barcode}
            type="outline"
            disabled
            containerStyle={{ marginVertical: 15 }}
          />
          <WDButton 
          title = "Tap To Pick !!"
          width = {_width}
          height = {_height*8/100}
          buttonStyle={styles.buttonStyle}
          onLongPress = {_onLongPress}
          />
          </View>
        }
        
      </View>
      <QRCodeScanner
        onRead={_onSuccess}
        flashMode={display == 'none' ?RNCamera.Constants.FlashMode.off : RNCamera.Constants.FlashMode.torch}
        reactivate={true}
        reactivateTimeout={10}
        cameraStyle={[styles.cameraPosition,{backgroundColor : 'green',display : display}]}
        // showMarker={true}

      />
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    // margin : 10,
    // flex: 1,
     justifyContent: 'flex-start',
  //   alignItems: 'flex-start',
   },
  cameraPosition: {
    // display : display,
    margin : 20,
    flex: 1,
    alignSelf : 'center',
    justifyContent : 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width * 30 / 100,
    height: Dimensions.get('window').height * 20 / 100,
  },
  buttonStyle : {
    flex:1,
    justifyContent : 'center',
    alignItems : 'center',
    width :_width ,
    backgroundColor: '#FC570A' ,
    // borderRadius : 60
  }
})
