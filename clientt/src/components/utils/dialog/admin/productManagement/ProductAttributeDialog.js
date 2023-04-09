import React, {useState} from 'react'
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

function ProductAttributeDialog({ product, setProduct, openDialog, setOpenDialog, attributes, classes  }) {
  const [productAttributeValues, setProductAttributeValues] = useState({})

  const handleClose = () => {
    setProductAttributeValues({})
    setProduct({...product, attributes: {}})
    setOpenDialog(false)
  }

  console.log(productAttributeValues)

  const checkBoxChange = (e)=> {
    const isChecked = e.target.checked
    const attributeValue = e.target.value
    const attributeName = e.target.name

    if (isChecked) {
      setProductAttributeValues({...productAttributeValues, [attributeName]: [...productAttributeValues[attributeName] || [], attributeValue]})
    } else {
      const filtered = productAttributeValues[attributeName].filter(value => {
        return value !== attributeValue
      })
      if (filtered.length === 0) {
        setProductAttributeValues(current => {
          const copy = {...current}
          delete copy[attributeName]
          return copy
        })
        return
      }
      setProductAttributeValues({...productAttributeValues, [attributeName]: filtered})
    }
  }

  const handleSubmit = async () => {
    setProduct({...product, attributes: productAttributeValues})
    setOpenDialog(false)
    setProductAttributeValues({})
  }

  return (
    <>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Chọn các thuộc tính cho sản phẩm</DialogTitle>
        <DialogContent>
          <div className={classes.standard_dialog_box}>
            {attributes.map(attribute => {
              return <div key={attribute._id}>
                <div><strong>{attribute.name}</strong></div>
                {attribute.values.map(value => {
                  return (
                    <span style={{marginLeft: '5px'}} key={value}>
                      <input type='checkbox' value={value} id={attribute.name + value} name={attribute.name} onChange={checkBoxChange} />
                      <label htmlFor={attribute.name + value}>{value}</label>
                    </span>
                  )
                })}
              </div>
            })}
          </div>
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
    </>
  )
}

export default ProductAttributeDialog