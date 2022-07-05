import request from '@/utils/request'

export const login = (data) => {
  return request({
    method: 'post',
    data,
    url: '/v1_0/authorizations'
  })
}

export const getSmsCode = (mobile) => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}
