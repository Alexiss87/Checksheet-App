import {
  writable,
  readable
} from 'svelte/store'

import {
  getChecksheet,
  getChecksheets,
  getResults,
  getResult,
  postResults
} from "../services/services.js";

//import localsheets from '../localSheets'

const store = writable([], () => {
  //console.log('got a subcriber')
  setChecksheets()
  return () => {
    console.log('no more subscribers')
  }
})


async function setChecksheets() {
  let checksheets = await getChecksheets()
  if (checksheets) {
    //console.log(checksheets)
    // console.log(localsheets)
    store.set(checksheets)
    return
  }

}

export default store;
