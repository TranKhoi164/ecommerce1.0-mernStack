import { makeStyles } from "@material-ui/styles";

const manageAccountStyle = makeStyles((theme) => ({
  container: {
    display: 'flex',
    padding: '30px 70px'
  },

  rounded: {
    borderRadius: '50%',
  },

  page_list: {
    marginTop: '20px',
    '& .item': {
      cursor: 'pointer',
      color: 'black',
      padding: '10px 0',
      display: 'flex',
      alignItem: 'center',
      '& .icon': {
        marginTop: '-1px',
        fontSize: '25px',
        marginRight: '10px'
      }
    },
  },

  side_bar: {
    width: '17%',
    marginRight: '20px',
    marginTop: '20px'
  },

  first_block: {
    display: 'flex',
    alignItem: 'center',
    paddingBottom: '10px',
    borderBottom: '1px solid #f2f2f2',
    '& img': {
      height: '50px'
    },
    '& div': {
      marginLeft: '10px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },
  },

  main_page: {
    width: '80%',
  },

  sub_container: {
    padding: '20px 30px',
    background: 'white',
    marginBottom: '30px',
    boxShadow: 'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px',
    '& .header_box': {
      paddingBottom: '20px',
      borderBottom: '1px solid #e6e3e3',
      '& .header': {
        fontSize: '22px',
      }
    },

    '& .header_box_add': {
      display: 'flex',
      alignItem: 'center',
      justifyContent: 'space-between',
      marginBottom: '20px'
    },

    '& .update_box': {
      display: 'flex',
      justifyContent: 'space_between',
      '& .update_infor': {
        width: '80%',
        display: 'flex',
        justifyContent: 'center',
        '& form': {
          width: '90%',
          '& .row': {
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'space-arround',
            alignItems: 'center',
            '& label': {
              width: '17%',
              color: theme.palette.tertiary.main,
            },
            '& .dialog_text': {
              textDecoration: 'underline',
              cursor: 'pointer',
            },
            '& .list_input': {
              position: 'relative',
              '& button': {
                position: 'absolute',
                right: '5px',
                top: '5px',
                height: '25px',
              }
            },
            '& .image_list': {
              display: 'flex',
              flexWrap: 'wrap',
              '& img': {
                width: '50px',
                height: '52px',
                objectFit: 'cover',
              },
              '& .image': {
                display: 'flex',
                marginRight: '5px',
                marginTop: '10px'
              }
            },
            '& .row_input': {
              width: '80%',
              position: 'relative',
              '& input': {
                width: '100%',
                height: '35px',
                border: '1px solid #dbdbd9'
              },
              '& .dialog_text': {
                float: 'right'
              },
              '& textarea': {
                width: '100%',
                height: '150px',
                border: '1px solid #dbdbd9'
              },
            },
            '& .check': {
              marginRight: '30px'
            }
          }
        }
      }
    },
  },
  update_image: {
    display: 'flex',
    flexDirection: 'column',
    alignItem: 'center',
    maxWidth: '200px',

    '& img': {
      height: '110px',
      width: '110px',
      marginBottom: '10px',
    },
    '& label': {
      padding: '10px',
      background: 'none',
      border: 'solid 1px #d4cfcf',
      cursor: 'pointer',
      textAlign: 'center',
    },
    '& .image_list': {
      marginTop: '10px',
      '& img': {
        height: '80px',
        width: '76px',
        marginRight: '10px',
        objectFit: 'cover'
      }
    }
  },
  input_err: {
    color: '#ff4d4d',
    fontSize: 'small',
    border: '1px solid #d4cfcf' ,
  },
  pair_input: {
    width: '100px',
    height: '35px',
    marginRight: '10px',
    border: '1px solid #dbdbd9',
  },
  form_dialog_box: {
    width: '400px',
    display: 'flex',
    justifyContent: 'space-between',
    '& select': {
      width: '32%',
      height: '40px',
      border: '1px solid #dbdbd9'
    }
  },
  input_address: {
    marginTop: '20px',
    width: '400px',
    height: '55px',
    border: '1px solid #dbdbd9',
    fontSize: 'normal'
  },
  list_box_container: {
    boxShadow: 'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px',
    marginBottom: '20px',
  },
  list_box_body: {
    '& .display_list': {
      display: 'flex',
      flexWrap: 'wrap'
    },
  },
  list_box: {
    boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    fontSize: '17px',
    color: theme.palette.tertiary.main,
    justifyContent: 'space-between',
    '& .input_field': {
      marginLeft: '20px',
      width: '60%',
      display: 'flex',
      '& input': {
        width: '30%',
        height: '30px',
      },
      '& select': {
        width: '30%',
        height: '30px',
        marginLeft: '20px',
      }
    },
    '& .display': {
      marginLeft: '20px',
    },
    '& .action_button': { 
      display: 'flex',
      fontSize: '14px',
      cursor: 'pointer',
      marginRight: '20px',
      '& .action': {
        marginLeft: '10px',
      }
    },
  },
  sub_list_box: {
    padding: '5px', 
    border: '1px solid ' + theme.palette.tertiary.main,
    margin: '5px 0px 10px 10px',
    fontSize: '13px',
  },
  manage_category_tree: {
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    "& .action": {
      marginRight: '20px',
      cursor: 'pointer',
    }
  },
  standard_dialog_box: {
    maxWidth: '300px',
  },
  attribute_table: {
    color: theme.palette.tertiary.main,
    width: '100%',
    marginTop: '20px',
    borderCollapse: 'collapse',
    '& td, & th': {
      border: '1px solid #dddddd',
      textAlign: 'left',
      padding: '8px',
    },
    '& th': {
      maxWidth: '130px',
      whiteSpace: 'nowrap',
      '& input, & select': {
        fontSize: '15px',
        width: '100%',
        height: '30px',
        border: 'none'
      }
    }
  },
  purchase_container: {
    width: '100%',
    '& .noOrder_notify': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '100px',
      fontSize: '17px',
      '& img': {
        marginBottom: '15px',
        height: '100px',
        width: '100px',
        objectFit: 'cover'
      }
    },
    '& .order_box': {
      width: '100%',
      marginTop: '30px',
      '& .order_detail': {
        width: '100%',
        alignItems: 'center',
        display: 'flex',
        height: '110px',
        justifyContent: 'space-between',
        borderTop: '1px solid #E7E7E7',
        borderBottom: '1px solid #E7E7E7',
        '& .detail_1': {
          display: 'flex',
          height: '80px',
          '& img': {
            height: '80px',
            width: '80px',
            objectFit: 'cover',
          }
        }
      },
      '& .order_action': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'end'
      }
    },
  },
  order_page: {
    width: '100%', 
    '& .status': {
      fontSize: '15px',
      display: 'flex',
      justifyContent: 'space-between',
      paddingBottom: '20px',
      borderBottom: '1px solid #E7E7E7',
    },
    '& .accomplished_action': {
      height: '100px',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      borderBottom: '1px solid #E7E7E7',
      '& button': {
        width: '200px',
        height: '40px'
      }
    },
    '& .stepper': {
      marginTop: '20px',
      borderBottom: '1px solid #E7E7E7',
      paddingBottom:'20px',
    },
    '& .user_infor': {
      color: theme.palette.tertiary.main,
      lineHeight: '25px',
      fontSize: '13px',
    },
    '& .order_detail': {
      marginTop: '30px',
      width: '100%',
      alignItems: 'center',
      display: 'flex',
      height: '110px',
      justifyContent: 'space-between',
      borderTop: '1px solid #E7E7E7',
      borderBottom: '1px solid #E7E7E7',
      '& .detail_1': {
        display: 'flex',
        height: '80px',
        '& img': {
          height: '80px',
          width: '80px',
          objectFit: 'cover',
        }
      },
    },
    '& table': {
      marginTop: '40px',
      width: '100%',
      borderCollapse: 'collapse',
      color: theme.palette.tertiary.main,
      '& tr, & td': {
        padding: '8px',
        border: '1px solid #dddddd',
        textAlign: 'right',
      },
      '& td': {
        height: '40px'
      }
    }
  },
  ratingProductDialog_container: {
    width: '600px',
    '& .row': {
      display: 'flex',
      alignItems: 'center'
    },
    '& .ratingDetail_container': {
      padding: '0 20px 20px 20px',
    },
    '& .comment_container': {
      marginTop: '20px',
      width: '100%',
      padding: '20px',
      background: '#FAF9F9',
      '& textarea': {
        width: '100%',
        height: '100px',
        border: '1px solid #DCDBDB',
        resize: 'none',
        marginBottom: '5px',
      },
      '& label': {
        background: 'none',
        cursor: 'pointer',
        border: '1px solid #DCDBDB',
        padding: '0 10px 0 10px',
        maxWidth: '170px',
        marginRight: '10px',
        height: '35px',
        display: 'flex',
        alignItems: 'center',
        color: theme.palette.tertiary.main
      },
      '& .image_list': {
        marginTop: '10px',
        display: 'flex',
        '& .imageList_item': {
          position: 'relative',
          width: '50px',
          height: '50px',
          marginRight: '5px',
          '& div': {
            top: '0',
            right: '0',
            width: '15px',
            height: '15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: "absolute",
            background: 'black',
            color: 'white',
            opacity: '0.6',
            cursor: 'pointer',
          },
          '& img': {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            marginRight: '10px',
          }
        },
      }
    }
  },
  orderManagement_page: {
    width: '100%',
    '& .orderManagement_list': {
      width: '100%',
      '& .orderManagement_item': {
        marginTop: '30px',
        '& .account_info': {
          display: 'flex',
          justifyContent: 'space-between',
          color: '#9d9d9d',
          fontSize: '18px',
          border: '1px solid #dddddd',
          padding: '10px',
        },
        '& .order_box': {
          width: '100%',
          marginTop: '15px',
          '& .order_detail': {
            width: '100%',
            alignItems: 'center',
            display: 'flex',
            height: '110px',
            justifyContent: 'space-between',
            borderTop: '1px solid #E7E7E7',
            borderBottom: '1px solid #E7E7E7',
            '& .detail_1': {
              display: 'flex',
              height: '80px',
              '& img': {
                height: '80px',
                width: '80px',
                objectFit: 'cover',
              }
            }
          },
          '& .order_action': {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'end'
          }
        },
      },
      '& .noOrder_notify': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '100px',
        fontSize: '17px',
        '& img': {
          marginBottom: '15px',
          height: '100px',
          width: '100px',
          objectFit: 'cover'
        }
      }
    }
  }
}))

export default manageAccountStyle