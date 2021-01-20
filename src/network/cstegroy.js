import {request} from './request'

// 分类数据请求
export function getSlideBarData() {
  return request({
    url: '/category'
  })
}
// 

export function getMainTopData(maitKey) {
  return request({
    url: '/subcategory',
    params: {
      maitKey
    }
  })
}

// 

export function getMainMoreData(miniWallkey, type) {
  return request({
    url: '/subcategory/detail',
    params: {
      miniWallkey,
      type
    }
  })
}