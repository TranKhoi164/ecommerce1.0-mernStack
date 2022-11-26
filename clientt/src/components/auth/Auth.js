import React from 'react'
import authStyle from '../../styles/auth.style'
import LoginBox from './LoginBox'
import RegisterBox from './RegisterBox'

function Auth() {
  const authClasses = authStyle()

  return (
    <div className={authClasses.container}>
      <div className={authClasses.auth_box}>
        <LoginBox authClasses={authClasses}/>
        <RegisterBox authClasses={authClasses}/>
      </div>
    </div>
  )
}

export default Auth