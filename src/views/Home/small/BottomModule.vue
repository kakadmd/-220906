<template>
  <div>
    <div class="bottom">
      <van-button type="default" class="bottom-btn" round @click="clickBtn"
        >写评论</van-button
      >
      <van-popup
        v-model="isShowComment"
        position="bottom"
        :style="{ height: '18%' }"
      >
        <PostComment></PostComment>
      </van-popup>
      <div class="bar">
        <van-tabbar v-model="active" class="navtabbar" active-color="#646566">
          <van-tabbar-item icon="home-o">
            <template #icon>
              <!-- 评论 -->
              <span class="toutiao toutiao-wenda" @click="postAComment"></span>
            </template>
          </van-tabbar-item>
          <van-tabbar-item>
            <template #icon>
              <!-- 收藏 -->
              <!-- 收藏之后变为蓝色 -->
              <!-- true是收藏 false是取消收藏 -->
              <span
                v-if="shoucang"
                class="toutiao toutiao-shoucang redShoucang"
                @click="favoriteArticles(true)"
              ></span>
              <span
                v-else
                class="toutiao toutiao-shoucang"
                @click="favoriteArticles(false)"
              ></span>
            </template>
          </van-tabbar-item>
          <van-tabbar-item badge="0">
            <template #icon>
              <!-- 点赞 -->
              <span
                class="toutiao toutiao-dianzan2"
                @click="likeArticles(articles.art_id)"
              >
                <LikeArticles v-if="false" :id="articlesId"></LikeArticles>
              </span>
            </template>
          </van-tabbar-item>
          <van-tabbar-item>
            <template #icon>
              <span class="toutiao toutiao-fenxiang" @click="clickShare"></span>
            </template>
          </van-tabbar-item>
        </van-tabbar>
      </div>
    </div>
  </div>
</template>

<script>
import PostComment from '@/views/Home/small/PostComment.vue'
import {
  followsAuthorAPI,
  UnFollowAuthourAPI
  // UnFavoriteAuthorAPI, // 取消收藏文章
  // favoriteAuthorAPI   // 收藏文章
} from '@/api'
export default {
  components: { PostComment },
  data() {
    return {
      active: '',
      isShowComment: false,
      isShowShare: false,
      articlesId: '',
      // 默认不收藏
      shoucang: false
    }
  },
  methods: {
    likeArticles(id) {
      // console.log('点赞文章', id)
      this.articlesId = id
      // console.log(this.articlesId)
    },
    postAComment() {
      console.log('文章评论')
    },
    // 收藏文章 取消收藏文章
    async favoriteArticles(bool) {
      if (bool === true) {
        // 点击之后取消收藏文章
        this.shoucang = false

        // console.log('取消收藏文章11111 蓝色·')
      } else {
        // 点击之后收藏文章
        this.shoucang = true

        // console.log('收藏文章22222 红色')
      }
      // this.shoucang = false
    },
    // 分享
    clickShare() {
      this.isShowShare = true
    },
    clickBtn() {
      this.isShowComment = true
    },
    // 未关注作者 已关注作者切换
    async followedFn(bool) {
      if (bool === true) {
        // true 代表的是已关注按钮
        // 点击已关注就是要去取消关注 ——> 关注按钮要显示
        this.articles.is_followed = false
        const { data } = await followsAuthorAPI({
          id: this.articles.aut_id
        })
        console.log(data) // 关注按钮能显现 200
      } else if (bool === false) {
        this.articles.is_followed = true
        // console.log('2')
        const res = await UnFollowAuthourAPI({
          id: this.articles.aut_id
        })
        console.log(res) // 204
      }
    }
  }
}
</script>

<style lang="less" scoped>
.bottom {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 100px;
  border-top: 0.01333rem solid #d8d8d8;
  background-color: #fff;
  .bar {
    width: 400px;
    height: 100%;
    .navtabbar {
      width: 400px;
      margin-left: 330px;
      .toutiao {
        font-size: 40px;
      }
    }
  }
  .bottom-btn {
    width: 282px;
    height: 46px;
    color: #7e7e7e;
    border-color: #7e7e7e;
    margin-left: 20px;
  }
}
.redShoucang {
  color: #3296fa;
}
</style>
