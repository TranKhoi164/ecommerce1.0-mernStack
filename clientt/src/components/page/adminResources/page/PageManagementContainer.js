import React, {useEffect, useState} from 'react'
import PageBox from './PageBox'
import { PageJwtApi } from "../../../../api/pageApi";
import { SubPageJwtApi } from '../../../../api/subPageApi';
import SubPageBox from './SubPageBox';

function PageManagement({accountData, classes}) {
  const {getPageListApi} = PageJwtApi()
  const {getSubPageListApi} = SubPageJwtApi()
  const [pageList, setPageList] = useState([])
  const [subPageList, setSubPageList] = useState([])
  
  useEffect(() => {
    // const Req = async () => {
    //   await getPageList();
    //   await getSubPageList()
    // }
    // Req()
    try {
      Promise.all([
        getPageListApi().then(pageListData => setPageList(pageListData.page_list)),
        getSubPageListApi().then(subPageListData => {
          subPageListData.sub_page_list.sort((a, b) => {
            if (a?.page?.name > b?.page.name) return 1
            if (a?.page?.name < b?.page?.name) return -1
            return 1
          })
          setSubPageList(subPageListData.sub_page_list)
        })
      ])
    } catch (e) {
      throw new Error(e)
    }
  }, []);

  const getPageList = async () => {
    try {
      const pageListData = await getPageListApi();
      setPageList(pageListData.page_list);
    } catch (e) {
      console.log(e);
    }
  };

  const getSubPageList = async () => {
    try {
      const subPageListData = await getSubPageListApi();
      subPageListData.sub_page_list.sort((a, b) => {
        if (a?.page.name > b?.page.name) return 1
        if (a?.page.name < b?.page.name) return -1
        return 1
      })
      console.log(subPageListData);
      setSubPageList(subPageListData.sub_page_list);
    } catch (e) {
      throw new Error(e)
    }
  }

  return (
    <>
      <PageBox pageList={pageList} getPageList={getPageList} classes={classes} />
      <SubPageBox pageList={pageList} subPageList={subPageList} getSubPageList={getSubPageList} classes={classes} />
    </>
  )
}

export default PageManagement