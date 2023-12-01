import axios from "axios";
import { atom, } from 'recoil';
import  generalDetailsAtom  from "../Store/store";
// const client = axios.create({
//     baseURL: 'http://65.0.154.172',
// });
//  export default client
 const client = axios.create({
    baseURL: 'http://65.0.154.172/',
});
 export default client
 
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

    