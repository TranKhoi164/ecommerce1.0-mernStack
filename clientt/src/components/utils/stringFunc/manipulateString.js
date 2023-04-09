export const cutString = (str, num) => {
  return String(str).length > num ? str.substring(0, num)  + '...' : str
}

export const skuValidate = (productName = '') => {
  return productName.replaceAll(' ', '-')
}

export const skuAttributeValidate = (attribute = {}) => {
  let res = ''
  for (const pro in attribute) {
    res += '_' + attribute[pro] 
  }
  return res
}

export const getDateByTimeStamps = (timestamps = '') => {
  let res = ''
  res = timestamps?.slice(0, 10)
  return res
}

export const addCommaBetweenCharacter = (values = []) => {
  let str = ''
  for (let index = 0; index < values.length; index++) {
    if (index === values.length - 1) {
      str += values[index]
      break
    }
    str += values[index] + ', '
  }
  return str
}

export const parseQueryUrlClient = (queryObj = {}) => {
  let res = {}
  let temp = {...queryObj}

  for (let pro in temp) {
    console.log(pro?.substring(0, 10) + ' ' + pro?.substring(11, pro.length));
    if (pro?.substring(0, 10) === 'attributes') {
      let att = pro?.substring(11, pro.length)
      //Object.assign(res, { attributes: { ...res?.attributes, [att]: queryObj?.[pro] } })
      res.attributes = {...res?.attributes, [att]: queryObj?.[pro]}
      continue
    }
    res[pro] = queryObj?.[pro]
  }
  return res
}

export const queryUrlClient = (queryObj = {}) => {
  let temp = {...queryObj}
  let res = '?'
  if (temp.subpage) {
    res += 'subPage=' + temp.subpage+'&'
  }
  if (temp.category) {
    res += 'category='+temp.category+'&'
  }
  if (temp.attributes) {
    for (let attribute in temp.attributes) {
      for (let i = 0; i < temp.attributes[attribute].length; i++) {
        res += `attributes.${attribute}[${i}]=${temp.attributes[attribute][i]}&`
      }
    }
  }
  return res
}

export const queryUrlServer = (queryObj = {}) => {
  let res = '?'
  let temp = {...queryObj}
  if (temp.subpage) {
    res += 'subPage=' + temp.subpage +   '&'
    delete temp['subpage']
  }
  if (temp.category) {
    res += 'or[0][category]='+temp.category+'&or[1][subCategory]='+temp.category+'&'
    delete temp['category']
  }
  if (temp.attributes) {
    let t = 3
    for (let attribute in temp.attributes) {
      for (let i = 0; i < temp.attributes[attribute].length; i++) {
        res += `or[${t++}][attributes.${attribute}][in][${i}]=${temp.attributes[attribute][i]}&`
      }
    }
    delete temp['attributes']
  }
  if (temp.orders) {
    for (let i = 0; i < temp.orders.length; i++) {
      res += `_id[in][${i}]=${temp.orders[i]}&`
    }
    delete temp['orders']
  }
  for (let el in temp) {
    if (temp[el]) {
      res += `${el}=${temp[el]}&`
    }
  }
  return res
}

export const priceValidate = (price = '') => {
  let res = "";
  //let price = productPrice.toString()
  for (let i = 0; i < price.toString().length; i++) {
    if (
      (price.toString().length - i + 2) % 3 === 0 &&
      i !== price.toString().length - 1
    ) {
      res = res + price.toString()[i] + ".";
      continue;
    }
    res += price.toString()[i];
  }
  return res;
};