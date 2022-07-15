import request from '@/utils/request'
// import store from '@/store'
// 获取用户登录信息
export const login = (data) => {
  return request({
    method: 'post',
    data,
    url: '/v1_0/authorizations'
  })
}
// 获取验证码的信息
export const getSmsCode = (mobile) => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}

// 获取用户个人信息
export const getUserInfo = () => {
  return request({
    url: '/v1_0/user',
    method: 'GET'
    // headers: {
    //   // vuex里面的token
    //   Authorization: `Bearer ${store.state?.user?.token}`
    // }
  })
}

/**
 * 添加关注
 */
export const addFollow = (userId) => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target: userId
    }
  })
}

/**
 * 取消关注
 */
export const deleteFollow = (userId) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${userId}`
  })
}
