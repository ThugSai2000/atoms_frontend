import axios from "axios";
import { atom, } from 'recoil';

axios.defaults.withCredentials =true;
axios.defaults.xsrfCookieName= 'csrftoken';
axios.defaults.xsrfHeaderName='x-csrftoken'
// axios.defaults.baseURL = 'https://api.example.com';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
const client = axios.create({
    baseURL: 'http://192.168.29.144:8000/backend',
});
 export default client

// const client = axios.create({
//     baseURL: 'http://atomssol.in/backend',
// });
//  export default client

//  const client = axios.create({
//     baseURL: 'http://65.0.154.172/backend',
// });
//  export default client
 
export const machineDropdownAtom = atom({
    key: 'globalCount',
    default: "",
});

export const globalapi = atom({
    key:'gbres',
    default:[],
})
export const timestampglobal = atom({
    key:'timestamp',
    default:'',
})
export const digitaloutputglobal = atom({
    key:'digitaloutput',
    default:[],
})
// console.log('global api '+JSON.stringify(globalapi))

//  Machines General Details

    