import { atom,} from 'recoil';
// general deatails store
export  const  generalDetailsAtom  = atom(
   { key:'generalDetailsAtom',
    default:null}
)

export const analogInputAtom = atom({
    key:"analogInputAtom",
    default:[]
})
export const analogOutputAtom = atom({
    key:"analogOutputAtom",
    default:[]
})
export const paramsAtomglobal = atom({
    key:'paramsAtomglobal',
    default:[]
})

////////////// Trails Store //////////////


export const trailsDataStore = atom({
    key: "trailsDataStore",
    default:[]
})
export const trailsSelectDateStore = atom({
    key:"trailsSelectDateStore",
    default:new Date()
})

/////////// Report Store ///////////

export const segmentControlState = atom({
    key:"segmentControlState",
    default:'table'
})

