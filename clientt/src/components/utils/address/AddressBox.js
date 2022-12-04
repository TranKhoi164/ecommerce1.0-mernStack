import React, {useState} from 'react'
import { AddressJwtApi } from '../../../api/addressApi'
import UpdateAddressDialog from '../dialog/address/UpdateAddressDialog'

function AddressBox({_id, province, district, ward, address, classes, getAddressList}) {
  const { deleteAddressApi } = AddressJwtApi()
  const [openDialog, setOpenDialog] = useState(false)

  const deleteAddress = async () => {
    await deleteAddressApi(_id)
    getAddressList()
  }

  return (
    <>
      <div className={classes.address_box}>
        <div className='display_address'>
          {`${province}, ${district}, ${ward}, ${address}`}
        </div>
        <div className='action_button'>
          <div className='action' onClick={() => setOpenDialog(true)}>
            Cập nhật
          </div>
          <div className='action' onClick={deleteAddress}>
            Xóa
          </div>
        </div>
      </div>
      <UpdateAddressDialog _id={_id} openDialog={openDialog} setOpenDialog={setOpenDialog} classes={classes} getAddressList={getAddressList}  />
    </>
  )
}

export default AddressBox