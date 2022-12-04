import React from 'react'
import { useState } from 'react'

function UserDebounce() {
  const [timeOutStore, setTimeOutStore] = useState("")

  function debounce(func, wait) {
    clearTimeout(timeOutStore)
    const timeout = setTimeout(() => {
      func()
    }, wait)

    setTimeOutStore(timeout)
  }

  return debounce
}

export default UserDebounce