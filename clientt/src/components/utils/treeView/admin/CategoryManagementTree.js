import React,{useState} from "react";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import { Typography } from "@material-ui/core";
import { SubCategoryJwtApi } from "../../../../api/subCategoryApi";
import { CategoryJwtApi } from "../../../../api/categoryApi";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

function StyledCategoryTreeItem(props) {
  const {deleteCategoryApi} = CategoryJwtApi()
  const {labelText, labelInfo, categoryId, classes, openDialog, setOpenDialog, getSubPageList, ...other} = props
 
  const deleteCategory = async () => {
    try {
      const msg = await deleteCategoryApi(categoryId)
      await getSubPageList()
      console.log(msg);
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <TreeItem
      label={
        <div className={classes.manage_category_tree}>
          <Typography variant="body2">
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            <span className="action" onClick={() => setOpenDialog(!openDialog)}>Tạo danh mục con</span>
            <span className="action" onClick={() => deleteCategory()}>Xóa</span>
          </Typography>
        </div>
      }
      {...other}
    />
  )
}

function CreateSubCategoryItem(props) {
  const {subPageId, categoryId, getSubPageList, setOpenDialog, classes, ...other} = props
  const [subCategory, setSubCategory] = useState({
    name: "",
  })
  const { createSubCategoryApi } = SubCategoryJwtApi()

  const handleSubmit = async () => {
    try {
      const createSubCategoryMsg = await createSubCategoryApi({...subCategory, subPage: subPageId, category: categoryId})
      console.log(createSubCategoryMsg.message);
      await getSubPageList()
      setOpenDialog(false)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <TreeItem
      label={
        <div className={classes.manage_category_tree}>
          <input type="text" placeholder="Tên danh mục con" onChange={(e) => setSubCategory({name: e.target.value})} />
          <Typography variant="caption" color="inherit">
            <span className="action" onClick={handleSubmit}>Lưu</span>
          </Typography>
        </div>
      }
      {...other}
    />
  )
}

function CategoryManagementTree({category, getSubPageList, classes}) {
  const [openDialog, setOpenDialog] = useState(false)
  const { deleteSubCategoryApi } = SubCategoryJwtApi()

  const deleteSubCategory = async (id) => {
    try {
      const msg = await deleteSubCategoryApi(id)
      await getSubPageList()
      console.log(msg);
    } catch (e) {
      console.log(e.message)
    } 
  }

  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      <StyledCategoryTreeItem key={category?._id} nodeId={category?._id} labelText={category?.name} labelInfo={'Tạo danh mục con'} categoryId={category?._id} getSubPageList={getSubPageList} openDialog={openDialog} setOpenDialog={setOpenDialog} classes={classes}>
        {openDialog && <CreateSubCategoryItem nodeId={"1"} subPageId={category?.subPage} categoryId={category?._id} getSubPageList={getSubPageList} setOpenDialog={setOpenDialog} classes={classes} />}
        {category?.subCategories.map((subCategory) => {
          return <TreeItem nodeId={subCategory?._id} label={<div style={{display: 'flex', alignItems: 'center'}}>{subCategory?.name} <DeleteForeverIcon style={{marginLeft: '10px', fontSize: '16px'}} onClick={() => deleteSubCategory(subCategory._id)} /></div>} />
        })}
      </StyledCategoryTreeItem>
    </TreeView>
  );
}

export default CategoryManagementTree;
