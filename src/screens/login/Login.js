import React, { useState } from 'react'
import { View, Text,StyleSheet,Dimensions,KeyboardAvoidingView,TouchableWithoutFeedback,Keyboard,Platform  } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { getLogin } from '../../redux/slices/loginSlice'
import WDInput from '../../component/input/Input'
import WDButton from '../../component/button/Button'
import WDSkeleton from '../../component/skeleton/Skeleton'
import WDImage from '../../component/image/Image'

const _image =  '../../assets/images/b.png'

const _size = Dimensions.get('window').width * 15 / 100;


export default function LoginScreen() {
    const dispatch = useDispatch()
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading,setIsLoading] = useState(false)
    const [errorMsg,setErrorMsg] = useState("")

    const setThissMobile = (e) => {
        console.log(e.value)
        setMobile(e.value)

    }


    const _makeLogin = () => {
        setIsLoading(true)
        console.log(mobile, password)
        option = {
            mobile: mobile,
            password: password
        }
        try{
            dispatch(getLogin(option)).then(function(e){
            console.log("===return===",e.payload)
                if(e && e.payload && e.payload.success){
                    setIsLoading(false)
                }
                else if(e && e.payload && !e.payload.success){
                    setErrorMsg("Please try later")
                    setIsLoading(false)
                }
                else {
                    setIsLoading(false)
                    setErrorMsg("Please try later")
                }
             })

        }
        catch(error){
            setErrorMsg("Please try later")
        }

         
       
    }

    return (
        <KeyboardAvoidingView
        behavior={'height'}
        style={styles.container}>
             <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
            <View style={styles.imageContainer}>
               
               {/* <WDImage 
               source={require(_image)}
               style = {styles.image}
               /> */}
            </View>
            <View>
                <WDInput
                    icon="mobile"
                    color="orange"
                    placeholder="Enter mobile number"
                    // name="mobile"
                    onChangeText={(e) => setMobile(e)}
                />
            </View>

            <View>
                <WDInput
                    icon="lock"
                    color="orange"
                    placeholder="Enter password"
                    password
                    onChangeText={(e) => setPassword(e)}
                />
            </View>
            <View>
                <WDButton
                    title="Login"
                    icon="login"
                    color="#fff"
                    onPress={_makeLogin}

                />
            </View>
            <View style={styles.isLoading}>
                {
                    isLoading &&
                    <WDSkeleton />
                }

                <Text>{errorMsg}</Text>
                
            </View>
            </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container : {
         flex :1 ,
        // justifyContent : 'center',
        // alignItems : 'center'
    },
    isLoading : {
        marginTop : _size 
    },
    imageContainer : {
        // flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
         margin : Dimensions.get('window').width * 10 / 100 
    },
    image : {
        //  flex : 1,
       
        // padding :10,
        // justifyContent : 'center',
        

        width : Dimensions.get('window').width * 40 / 100 ,
        height :  Dimensions.get('window').width * 40 / 100 
       }
})
