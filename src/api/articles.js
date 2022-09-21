import request from '@/utils/request'

// 获取文章详情的接口
export const articleDetailsAPI = (id) => {
  return request({
    url: `/v1_0/articles/${id}`
  })
}

/**
 * 点赞文章
 * @param {Number} id 文章的id
 * @returns  Promise
 */
export const likeArticlesAPI = (id) => {
  return request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: {
      target: id
    }
  })
}

/**
 * 取消对文章点赞
 * @param {Number} id 文章id
 * @returns Promise
 */
export const unlikeAnArticleAPI = (id) => {
  return request({
    url: ' /v1_0/article/likings/:target',
    method: 'DELETE',
    data: {
      target: id
    }
  })
}

/**
 * 关注作者
 * @param {Number} id 关注的作者id
 * @returns   Promise
 */
export const followsAuthorAPI = ({ id }) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target: id
    }
  })
}

/**
 * 取消关注作者
 * @param {Number} param 作者的id
 * @returns Promise
 */
export const UnFollowAuthourAPI = ({ id }) => {
  return request({
    url: `/v1_0/user/followings/${id}`,
    method: 'DELETE'
  })
}

/**
 * 收藏文章
 * @param {Number} param 文章的id
 * @returns Promise
 */
export const favoriteAuthorAPI = ({ id }) => {
  return request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: {
      target: id
    }
  })
}

/**
 * 取消收藏文章
 * @param {Number} param 文章的id
 * @returns Promise
 */
export const UnFavoriteAuthorAPI = (id) => {
  return request({
    url: `/v1_0/article/collections/${id}`,
    method: 'DELETE'
  })
}

/**
 *获取对文章的评论
 * @param {String} type 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
 * @param {Number} source 源id，文章id或评论id
 * @returns Promise
 */
export const articleCommentsAPI = (params) => {
  return request({
    url: '/v1_0/comments',
    params
  })
}

/**
 * 对文章进行评论，或者对评论进行评论
 * @param {*} data
 * target：评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
 * content：评论内容
 * art_id：文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
 * @returns Promise
 */
export const reviewArticleAPI = (data) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data
  })
}
