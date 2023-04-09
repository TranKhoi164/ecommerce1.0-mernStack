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
    <div className={classes.list_box_container}>
      <div className={classes.list_box}>
        <div className='display'>
          {`${address}, ${ward}, ${district}, ${province}`}
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
    </div>
  )
}

export default AddressBox