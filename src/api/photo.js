import request from '@/utils/request'

export function getPicture(params) {
  return request({
    url: 'http://localhost:8081/oss/fileoss',
    method: 'post',
    params
  })
}
