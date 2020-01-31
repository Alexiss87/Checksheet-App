import {
  writable
} from 'svelte/store'

import localsheets from '../localSheets'

const store = writable([...localsheets])


async function setProducts() {
  // let sheets = await getProducts()
  // //console.log(products)
  // if (products) {
  //   products = flattenProducts(products)
  //   store.set(products)
  // }
}

export default store
