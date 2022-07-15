import request from '@/utils/request'

// 获取用户频道数据的接口
export const getChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}

// 获取所有频道数据
export const getAllchannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/channels'
  })
}

export const getAddChannel = (channel) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
      channels: [channel]
    }
  })
}

/**
 * 删除用户频道
 */
export const deleteUserChannel = (channelId) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${channelId}`
  })
}
