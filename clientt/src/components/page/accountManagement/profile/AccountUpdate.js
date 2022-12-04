import React, {useState} from 'react'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import BasicInforUpdate from './BasicInforUpdate';
import PasswordUpdate from './PasswordUpdate';
import AddressUpdate from './AddressUpdate';

function AccountUpdate({accountData, classes}) {

  return (
    <>
      <BasicInforUpdate accountData={accountData} classes={classes} />
      <PasswordUpdate accountData={accountData} classes={classes} />
      <AddressUpdate accountData={accountData} classes={classes} />
    </>
  )
}

export default AccountUpdate