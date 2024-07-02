import Network from '../network/Network';
import axios from 'axios';
import { AsyncStorage } from 'react-native';

export function  getHeaderFunction(token){

    const
      headers = {
        Authorization: 'Bearer ' + token,
        Accept: 'application/json',
      }
      return token != '' ?  headers : ''
   
};

// get 

export function get(end,token) {
    const headers =  getHeaderFunction(token)
     console.log(Network.network + end, { headers })
    return axios.get(Network.network + end, { headers })
}

// custom-get 

export function customget(end, data,token) {

    const headers = getHeaderFunction(token)
    console.log("the api is =====",Network.network + end+data, { headers })
    return axios.get(Network.network + end +data, { headers })
}

// post

export function post(end, data,token) {
    const headers = getHeaderFunction(token)
    console.log(Network.network + end,data, { headers })
    return axios.post(Network.network + end, data, { headers })
}

// put

export function put(end, data) {

    const headers = getHeaderFunction()
    return axios.put(Network.network + end, data, { headers })
}



