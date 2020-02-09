import url from './URL'

export const getChecksheets = async () => {
  const response = await fetch(`${url}/checksheets`)
    .catch(error => {
      console.error(error)
    })
  //console.log(response)
  const checksheets = await response.json()

  if (checksheets.error) {
    console.log(checksheets.error)
    return null
  }
  return checksheets
}

export const getChecksheet = async (id) => {
  const response = await fetch(`${url}/checksheets/${id}`)
    .catch(error => {
      console.error(error)
    })
  const checksheet = await response.json()

  if (checksheet.error) {
    console.log(checksheet.error)
    return null
  }
  return checksheet
}

export const getResults = async (params ='') => {
  const response = await fetch(`${url}/results${params}`)
    .catch(error => {
      console.error(error)
    })
  const results = await response.json()

  if (results.error) {
    console.log(results.error)
    return null
  }
  return results
}

export const getResult = async (id) => {
  const response = await fetch(`${url}/results/${id}`)
    .catch(error => {
      console.error(error)
    })
  const result = await response.json()

  if (result.error) {
    console.log(results.error)
    return null
  }
  return result
}

export const postResults = async (data) => {
  // Default options are marked with *
  const response = await fetch(`${url}/results`, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}

export const getChecks = async (params ='') => {
  const response = await fetch(`${url}/checks${params}`)
    .catch(error => {
      console.error(error)
    })
  const checks = await response.json()

  if (checks.error) {
    console.log(checks.error)
    return null
  }
  return checks
}
