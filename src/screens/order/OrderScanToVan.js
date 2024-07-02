import { View, Text, StyleSheet, FlatList, RefreshControl, ScrollView, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { pickOrderToTheVan } from '../../redux/slices/orderSlice';
import { PricingCard, lightColors, Chip, FAB } from '@rneui/themed';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import WDInput from '../../component/input/Input';
import WDSkeleton from '../../component/input/Input';
import WDButton from '../../component/button/Button';


const _size = Dimensions.get('window').width * 10 / 100;
const _width = Dimensions.get('window').width * 100 / 100
const _height = Dimensions.get('window').height

export default function OrderScanToVanScreen({ navigation }) {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.orderReducer.picktoVanData)
  const [error, setError] = useState(useSelector((state) => state.orderReducer.isError))
  const [errorMSg, setErrorMsg] = useState("")
  const token = useSelector((state) => state.loginReducer.data.token)
  const [input, setInput] = useState("")
  const [display, setDisplay] = useState('none')
  const [quantity, setQuantity] = useState(1)
  const [barcode, setBarcode] = useState(null)
  console.log(data)

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
    setDisplay('none')
    setErrorMsg("")
    setInput(e)
  }

  const _onLongPress = () => {
    let option = "branch_sack_barcode=" + input + "&status=3"
    let combinedData = [option, token]
    dispatch(pickOrderToTheVan(combinedData)).then(function (e) {
      if (e.payload && e.payload.success)
        navigation.navigate('Pick-Van')
      else
        setErrorMsg("Something Wrong")

    })
  }
  return (
    <View style={styles.container}
    >
      <Text style={styles.subHeader}>{data.branch_name}</Text>

      <FAB
        // loading
        visible={true}
        style={{
          justifyContent: 'flex-end'
        }}
        icon={{ name: 'camera', color: 'white' }}
        size="small"
        onPress={() => _takeBarCode('flex')}
      />
      {
        display == 'flex' && 
        <FAB
        visible={true}
        style={{
          justifyContent: 'flex-end'
        }}
        icon={{ name: 'close', color: 'white' }}
        size="small"
        onPress={() => _takeBarCode('none')}
      />
      }
      
      <QRCodeScanner
        onRead={_onSuccess}
        flashMode={display == 'none' ? RNCamera.Constants.FlashMode.off : RNCamera.Constants.FlashMode.torch}
        reactivate={true}
        reactivateTimeout={10}
        cameraStyle={[styles.cameraPosition, { backgroundColor: 'green', display: display }]}
        showMarker={true}

      />

      <WDInput
        value={input}
        onChangeText={_takeBarcodeInput}
      />
      {
        display == 'none' &&
        <WDButton
        title="Submit"
        width={_width}
        height={_height * 8 / 100}
        buttonStyle={styles.buttonStyle}
        onPress={_onLongPress}
      />
      }
      
      <View style={styles.errorMSg}>
        <Text style={styles.errorMSgText}>{errorMSg}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    // alignItems : 'flex-start'

  },
  subHeader: {
    backgroundColor: "#FF6666",
    color: "white",
    textAlign: "center",
    paddingVertical: 5,
    padding: 8,
    marginBottom: 5,
    letterSpacing: 0.5,
    fontSize: (_size * 30) / 100
  },
  cameraPosition: {

    margin: 20,
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width * 30 / 100,
    height: Dimensions.get('window').height * 20 / 100,
  },
  buttonStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: _width,
    backgroundColor: '#83AFF7',
    // color :'#000000'

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