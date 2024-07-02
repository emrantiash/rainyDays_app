import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, StyleSheet, Dimensions, Linking } from 'react-native'
import { orderReceive } from '../../redux/slices/orderSlice';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { PricingCard, lightColors, Chip, FAB } from '@rneui/themed';
import WDButton from '../../component/button/Button';
import WDInput from '../../component/input/Input';


const _width = Dimensions.get('window').width * 100 / 100
const _height = Dimensions.get('window').height

// reference_id=1EYZ987E57&barcode=600150000014375&status=1

export default function OrderInsideScreen({ navigation }) {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.orderReducer.orderInside)
  const [error, setError] = useState(useSelector((state) => state.orderReducer.isError))
  const [errorMSg, setErrorMsg] = useState("")
  const token = useSelector((state) => state.loginReducer.data.token)
  const [input, setInput] = useState("")
  const [display, setDisplay] = useState('none')
  const [quantity, setQuantity] = useState(1)
  const [barcode, setBarcode] = useState(null)

  const _takeBarCode = (val) => {
    setDisplay(val)
  }

  const _onSuccess = (e) => {
    // console.warn(e.data)
    setErrorMsg("")
    setBarcode(null)
    setBarcode(e.data)
    _takeBarCode('none')
    setInput(e.data)
  }

  const _takeBarcodeInput = (e) => {
    setErrorMsg("")
    setInput(e)
  }

  const _onLongPress = () => {


    let option = "reference_id=" + data.reference_id + "&barcode=" + input + "&status=1"
    let combinedData = [option, token]

    input != "" && dispatch(orderReceive(combinedData)).then(function (e) {
      console.log("====response is ===", e.payload.success)
      if (e.payload.success) {
        setError(false)
        navigation.navigate('Order-Details')

      }
      else {
        setErrorMsg("Something Wrong")
      }
    })
    if (input == "") {
      setError(true)
      setErrorMsg("Please enter barcode")
    }

    // console.log(error)

    // if(error){
    //   setErrorMsg("Something Wrong")
    // }
    // else{
    //   navigation.navigate('Order-Details')
    // }
    // setErrorMsg("Something Wrong")

    // navigation.navigate('Order-Details')
  }

  const _callMarchant = () => {
    const phoneNumber = data.merchant_mobile

    Linking.openURL(`tel:${phoneNumber}`)
  }

  return (
    <View style={styles.container}>

      {
        display == 'none'  &&
        <PricingCard

        color={lightColors.primary}
        title={data.merchant_name}
        price={
          <FAB
            loading={false}
            style={{ justifyContent: 'flex-end', padding: 4 }}
            visible={true}
            icon={{ name: 'phone', color: 'white' }}
            size="small"
            onLongPress={_callMarchant}
          />
        }
        info={[quantity + ' Quantity', 'Reference :' + data.reference_id, 'Flat:22,Road:8,House:23,Block:B,Mirpur 11,Dhaka:1209']}
        button={{ title: 'open Camera', icon: 'flight-takeoff' }}
        onButtonPress={() => _takeBarCode('flex')}

      />
      }

     
      <View>
        {
          // barcode != null && 
          <View>
            {/* <Text>WIdth L {width}</Text> */}
            {/* <Chip
            title={barcode}
            type="outline"
            disabled
            containerStyle={{ marginVertical: 15 }}
          /> */}
            <WDInput
              value={input}
              onChangeText={_takeBarcodeInput}
            />
            <WDButton
              title="Pick Up"
              width={_width}
              height={_height * 8 / 100}
              buttonStyle={styles.buttonStyle}
              onPress={_onLongPress}
            />
          </View>
        }

      </View>
      <QRCodeScanner
        onRead={_onSuccess}
        flashMode={display == 'none' ? RNCamera.Constants.FlashMode.off : RNCamera.Constants.FlashMode.torch}
        reactivate={true}
        reactivateTimeout={10}
        cameraStyle={[styles.cameraPosition, { backgroundColor: 'green', display: display }]}
       showMarker={true}

      />
      <View style={styles.errorMSg}>
        <Text style={styles.errorMSgText}>{errorMSg}</Text>
      </View>
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
    // margin: 20,
     flex: 1,
     alignSelf: 'center',
     justifyContent: 'center',
     alignItems: 'center',
    width: Dimensions.get('window').width * 100 / 100,
    height: Dimensions.get('window').height * 80 / 100,
  },
  buttonStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: _width,
    backgroundColor: '#FC570A',

  },
  errorMSg: {
    margin: 20,
    height: 20,
    //  backgroundColor : 'red',

    justifyContent: 'center',
    alignItems: 'center'
  },
  errorMSgText: {
    letterSpacing: 1.0
  }
})
