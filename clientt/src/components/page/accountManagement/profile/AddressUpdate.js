import { Button } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import AddIcon from '@material-ui/icons/Add';
import CreateAddressDialog from '../../../utils/dialog/address/CreateAddressDialog';
import { AddressJwtApi } from '../../../../api/addressApi';
import AddressBox from '../../../utils/address/AddressBox';

function AddressUpdate({accountData, classes}) {
  const [openDialog, setOpenDialog] = useState(false)
  const [addressList, setAddressList] = useState([])
  const { getAddressListApi } = AddressJwtApi()

  const getAddressList = async () => {
    try {
      const addressList = await getAddressListApi()
      setAddressList(addressList.address_list)
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getAddressList()
  }, [])
  

  return (
    <div className={classes.profile_container}>
      <div className='header_box' style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <div className='header'>Địa chỉ của tôi</div>
        <Button variant="contained" color='secondary' onClick={() => setOpenDialog(true)}><AddIcon /> Thêm địa chỉ mới</Button>
      </div>
      <div>
        {
          addressList.map(address => {
            return <AddressBox key={address._id} _id={address._id} province={address.province} district={address.district} ward={address.ward} address={address.address} classes={classes} getAddressList={getAddressList} />
          })
        }
      </div>
      <CreateAddressDialog openDialog={openDialog} setOpenDialog={setOpenDialog} classes={classes} getAddressList={getAddressList}  />
    </div>
  )
}

export default AddressUpdate