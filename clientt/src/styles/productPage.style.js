import {makeStyles} from '@material-ui/styles'

const productPageStyle = makeStyles((theme) => ({
  productPage_container: {
    display: 'flex',
    justifyContent: 'center',
  },

  
  productPage_sidebar: {
    height: '100vh',
    position: 'sticky',
    top: '2rem',
    overflowY: 'scroll',
    width: '17%',
    fontSize: '13px',
    color: theme.palette.tertiary.main,
    marginLeft: '10px',
    '& .btn_box': {
      display: 'flex',
      '& .search': {
        background: 'black',
        color: 'white',
      }
    },
    '& .search_btn': {
      width: '70%',
      marginRight: '10px',
      cursor: 'pointer',
      height: '30px'
    },
    '& .category_box': {
      '& .subCategory_radio': {
        marginLeft: '20px'
      }
    }
  },


  productList_container: {
    width: '80%',
    '& .product_list': {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'start',
    }
  },
  product_box_container: {
    width: '245px',
    height: '350px',
    marginLeft: '20px',
    marginBottom:'50px',
    '& .product_box': {
      width: '100%',
      color: theme.palette.tertiary.main,
    },
    '& img': {
      width: '100%',
      height: '300px',
      objectFit: 'cover'
    },
    '& .price': {
      color: theme.palette.secondary.main,
      fontWeight: 'bold',
      display: 'flex',
      justifyContent: 'space-between'
    }
  },


  productDetail_container: {
    marginTop: '170px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& .main_detail_container': {
      width: '85%',
      display: 'flex',
      justifyContent: 'space-between',
      borderBottom: '1px solid  #DDDDDD',
      paddingBottom: '30px',
      
      '& .carousel_container': {
        maxWidth: '45%',
        '& .carousel': {
          '& .car_img ': {
            width: '400px',
            height: '450px',
            objectFit: 'contain'
          },
          '& .thumb img': {
            width: '80px',
            height: '80px',
            objectFit: 'cover'
          }
        },
      },

      '& .main_detail': {
        width: '54%',
        '& .title': {
          fontSize: '18px',
        },
        '& .sku': {
          marginTop: '-5px',
          color: '#919191',
        },
        '& .rating_point': {
          marginTop: '10px',
          fontSize: '13px',
          color: theme.palette.tertiary.main,
          display: 'flex',
          alignItems: 'center',
          marginBottom: '5px'
        },
        '& .price': {
          fontSize: '29px',
          fontWeight: 'bold',
          paddingBottom: '20px',
          marginBottom: '20px',
          borderBottom: '1px solid #e3e3e3'
        },
        '& .field_name': {
          fontWeight: '550', 
          fontSize: '16px', 
          marginBottom: '10px',
        },
        '& .attributes': {
          '& .attribute_row': {
            marginTop: '15px',
            '& .attribute_row_item': {
              display: 'flex',
              marginTop: '15px',
              '& .attribute_item': {
                fontSize: '15px',
                padding: '5px 20px',
                marginRight: '10px',
                border: '1px solid #d4d4d4',
                cursor: 'pointer',
                borderRadius: '10px',
              },
              '& .inactive:hover': {
                border: '1px solid #333',
              },
              '& .active': {
                border: '2px solid #333',
              }
            }
          }
        },

        '& .shipping_container': {
          marginTop: '20px',
          '& .ship_to_container': {
            display: 'flex',
            '& label': {
              display: 'flex',
              alignItems: 'center',
              color: theme.palette.tertiary.main,
              marginRight: '20px'
            },
            '& select, & select:focus': {
              border: 'none'
            }
          }
        },
        '& .quantity_container': {
          marginTop: '20px',
          '& input': {
            border: '1px solid #d4d4d4',
            height: '30px',
          }
        },
        '& .btn_container': {
          position: 'relative',
          marginTop: '30px',
          '& .err_notify': {
            color: 'red',
            position: 'absolute',
            top: '-20px',
          },
          '& button': {
            height: '50px',
            border: '1px solid black',
            fontSize: '15px',
            marginRight: '10px'
          }
        },
        '& .extraPolicy_container': {
          marginTop: '30px',
          fontSize: '13px',
          '& .policy': {
            display: 'flex',
            '& .policy_icon': {
              color: 'green',
              margin: '0 15px 20px 0',
            }
          }
        },
      }
    },
    '& .extra_detail_container': {
      width: '80%',
      '& .extra_detail_header': {
        fontSize: '18px',
        margin: '40px 0 25px 0',
      },
      '& .detail_block': {
        width: '30%',
        '& .detail_block_items': {
          display: 'grid',
          gridTemplateColumns: '50% 50%',
          marginTop: '15px',
          '& .key': {
            color: '#919191',
          }
        }
      },
      '& .description_block': {
        width: '100%',
        overflow: 'hidden',
        '& .markdown': {
          '& img': {
            maxWidth: '100%',
            margin: '10px 0 10px 0',
          }
        },
      },
      '& .rating_container': {
        marginBottom: '200px',
        '& .filter_navbar': {
          display: 'flex',
          justifyContent: 'space-between',
          borderBottom: '1px solid #d4d4d4',
          paddingBottom: '20px',
          '& .starRating_filter': {
            display: 'flex',
            '& .focus': {
              border: '1px solid ' + theme.palette.secondary.main,
            },
          },
          '& input': {
            display: 'none'
          },
          '& label': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '5px',
            width: '80px',
            height: '30px',
            border: '1px solid #d4d4d4',
            cursor: 'pointer',
          },
        },
        '& .ratings_list': {
          '& .ratingItem_container': {
            paddingBottom: '20px',
            marginTop: '20px',
            borderBottom: '1px solid #ECEBEB',
            '& .top': {
              fontSize: '15px',
              display: 'grid',
              gridTemplateColumns: '15% 30% 60%',
              '& .images': {
                marginLeft: '20px',
                display: 'flex',
                '& img': {
                  width:'90px',
                  height: '90px',
                  marginLeft: '10px',
                  objectFit: 'cover',
                }
              }
            },
            '& .bot': {
              marginTop:'20px',
              display: 'grid',
              gridTemplateColumns: '15% 85%',
              color: '#939393',
              fontSize: 'small',
              '& div': {
                display: 'flex',
              }
            }
          }
        }
      }
    }
  }
}))

export default productPageStyle