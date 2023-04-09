import React, {useState, useEffect} from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { AddressJwtApi, getDistrictsApi, getProvincesApi, getWardsApi } from "../../../../api/addressApi";
import { SuccessSnackbar, ErrorSnackbar } from "../../snackbar/Snackbar";

function CreateAddressDialog({ openDialog, setOpenDialog, classes, getAddressList }) {
  const {createAddressApi} = AddressJwtApi()
  const [location, setLocation] = useState({
    province: '',
    district: '',
    ward: '',
    address: '',
  })
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setwards] = useState([])
  const [message, setMessage] = useState('')
  const [successRequest, setSuccessRequest] = useState(false)
  const [openSnack, setOpenSnack] = useState(false)

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleSubmit = async () => {
    try {
      const createAddresss = await createAddressApi(location)
      getAddressList()
      setMessage(createAddresss.message);
      setOpenSnack(true)
      setSuccessRequest(true)
    } catch (e) {
      setSuccessRequest(false)
      setMessage(e.message)
      setOpenSnack(true)
    } 
    setOpenDialog(false);
  };

  const getProvinces = async () => {
    const provincesRequest = await getProvincesApi()
    setProvinces(provincesRequest)
  }

  const changeProvince = async (e) => {
    const {name, value} = e.target
    const provinceData = JSON.parse(value)

    setLocation({...location, [name]: provinceData.name})

    const districtRequset = await getDistrictsApi(provinceData.code)
    setDistricts(districtRequset)
  }

  const changeDistrict = async (e) => {
    const {name, value} = e.target
    const districtData = JSON.parse(value)

    setLocation({...location, [name]: districtData.name})

    const wardRequset = await getWardsApi(districtData.code)
    setwards(wardRequset)
  }

  const changeWard = (e) => {
    setLocation({...location, ward: e.target.value})
  }

  useEffect(() => {
    getProvinces()
  }, [])

  return (
    <>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Địa chỉ mới</DialogTitle>
        <DialogContent>
          <div className={classes.form_dialog_box}>
            <select name="province" onChange={changeProvince} >
              <option value="" disabled selected>Tỉnh...</option>
              {
                provinces.map(province => {
                  return <option key={province.code} value={`{"name":"${province.name}","code":"${province.code}"}`}>{province.name}</option>
                })
              }
            </select>

            <select name="district" onChange={changeDistrict} >
              <option value="" disabled selected>Huyện...</option>
              {
                districts.map(district => {
                  return <option key={district.code} value={`{"name":"${district.name}","code":"${district.code}"}`}>{district.name}</option>
                })
              }
            </select>

            <select name="ward" onChange={changeWard}>
              <option value="" disabled selected>Xã...</option>
              {
                wards.map(ward => {
                  return <option key={ward.code} value={wards.name}>{ward.name}</option>
                })
              }
            </select>
          </div>
          <textarea onChange={(e) => setLocation({...location, address: e.target.value})} className={classes.input_address} name="address" id="address" placeholder="Địa chỉ"></textarea>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Trở lại
          </Button>
          <Button onClick={handleSubmit} color="secondary" variant="contained">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>

      {successRequest && <SuccessSnackbar message={message} openSnack={openSnack} setOpenSnack={setOpenSnack} />}
      {!successRequest && <ErrorSnackbar message={message} openSnack={openSnack} setOpenSnack={setOpenSnack} />}
    </>
  );
}

export default CreateAddressDialog;
