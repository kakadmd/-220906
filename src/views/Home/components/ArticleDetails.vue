<template>
  <div class="details">
    <headers></headers>
    <div class="total">
      <p class="title">
        {{ articles.title }}
      </p>
      <div class="author">
        <div class="img"><img :src="articles.aut_photo" alt="" /></div>
        <div class="name">
          <div class="username">{{ articles.aut_name }}</div>
          <div class="date">{{ articlesDate }}</div>
        </div>
        <van-button
          v-if="isFollowed"
          type="default"
          icon="plus"
          round
          size="mini"
          class="btn"
          @click="followedFn"
          >已关注</van-button
        >
        <van-button
          v-else
          type="info"
          round
          size="mini"
          class="btn"
          @click="followedFn"
          >关注</van-button
        >
      </div>
      <div class="content markdown-body">
        <p v-html="articles.content"></p>
      </div>
      <div class="end">
        <van-divider content-position="center">正文结束</van-divider>
      </div>
      <!-- 评论盒子 -->
      <van-list>
        <div class="comments" v-for="(item, index) in commentList" :key="index">
          <!-- 评论者的头像 -->
          <div class="pinglunPic">
            <img :src="item.aut_photo" alt="" />
          </div>
          <div class="pinglunAll">
            <!-- 评论者的名字和内容 -->
            <div class="pinglunContent">
              <!-- 评论者的名字 -->
              <div class="pinglunAuthour">{{ item.aut_name }}</div>
              <!-- 给评论者的点赞 -->
              <div class="pinglunZang">
                <span class="toutiao toutiao-dianzan">{{
                  item.like_count
                }}</span>
              </div>
            </div>
            <!-- 评论者的评论内容 -->
            <div class="pinglunNeirong">{{ item.content }}</div>
            <!-- 评论者发表评论时间和回复按钮 -->
            <div class="pinglunDate">
              <!-- 评论时间 -->
              <div class="pl_date">{{ pl_DATE }}</div>
              <!-- 回复评论 -->

              <van-button
                size="mini"
                round
                class="replyBtn"
                @click="clickReply(item)"
                >回复<span>{{ item.reply_count }}</span>
              </van-button>
              <van-popup
                v-model="isShowReplyComment"
                position="bottom"
                :style="{ height: '100%' }"
              >
                <RelpyComments
                  @addReply="addReply"
                  :articleID="articleID"
                  :clickReplyComment="value"
                  :pl_DATE="pl_DATE"
                  :ItemABC="ItemABC"
                  @closeReply="closeReply"
                ></RelpyComments>
              </van-popup>
            </div>
          </div>
        </div>
      </van-list>
      <div class="nomore">
        <van-divider
          class="nomoreContent"
          :style="{
            borderColor: 'transparent'
          }"
        >
          没有更多了
        </van-divider>
      </div>
    </div>
    <div class="bottom">
      <van-button type="default" class="bottom-btn" round @click="clickBtn"
        >写评论</van-button
      >
      <van-popup
        v-model="isShowComment"
        position="bottom"
        :style="{ height: '18%' }"
      >
        <PostComment :art="articles" @addComments="addComments"></PostComment>
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
import { timeAgo } from '@/utils/timeAgo'
import 'github-markdown-css/github-markdown.css'
import headers from './headers.vue'
import dayjs from '@/utils/dayjs'
import RelpyComments from '@/views/Home/small/RelpyComments.vue'
import {
  articleDetailsAPI,
  followsAuthorAPI,
  UnFollowAuthourAPI,
  articleCommentsAPI,
  getUserInfoAPI // 获取用户信息
  // UnFavoriteAuthorAPI, // 取消收藏文章
  // favoriteAuthorAPI   // 收藏文章
} from '@/api'
import PostComment from '@/views/Home/small/PostComment.vue'
export default {
  components: { headers, PostComment, RelpyComments },

  data() {
    return {
      articles: {},
      active: '',
      isShowComment: false,
      isShowShare: false,
      articlesId: '',
      // 默认不收藏
      shoucang: false,
      commentList: [], // 评论列表
      totalCount: '', // 评论个数 必须后台返回
      offest: 0,
      limit: 10,
      pl_DATE: '',
      isFlag: false,
      reply_ID: '',
      articlesDate: '', // 文章时间
      commentListItem: '',
      value: [],
      isShowReplyComment: false, // 是否展示回复评论弹出框
      userInfo: {},
      replyCo: '',
      articleID: '',
      IDIDID: '',
      clickReplyComment: [],
      ItemABC: [], // 追加回复的评论列表
      isFollowed: false
    }
  },
  created() {
    this.articleDetails()
  },
  methods: {
    async getUserInfo() {
      const { data } = await getUserInfoAPI()
      // console.log(data.data)
      this.userInfo = data.data
      console.log(this.userInfo)
    },
    async articleDetails() {
      const { data } = await articleDetailsAPI(this.$route.params.id)
      // console.log(data)
      this.isFollowed = data.data.is_followed
      console.log(this.isFollowed)
      this.articles = data.data
      this.articleID = this.articles.art_id
      console.log(this.articleID)
      const { pubdate } = this.articles
      dayjs(pubdate).fromNow()
      this.getComments(this.articles.art_id)
      this.articlesDate = timeAgo(this.articles.pubdate)
    },
    // 点赞
    likeArticles(id) {
      // console.log('点赞文章', id)
      this.articlesId = id
      // console.log(this.articlesId)
    },
    // 评论面板
    postAComment() {
      console.log('文章评论')
    },
    // 获取评论
    async getComments(id) {
      // console.log(id)
      const { data } = await articleCommentsAPI({
        type: 'a',
        source: id,
        offest: this.offest,
        limit: this.limit
      })
      this.commentList = data.data.results
      // console.log(this.commentList)
      for (let i = 0; i < this.commentList.length; i++) {
        this.pl_DATE = timeAgo(this.commentList[i].pubdate)
        // this.totalCount = this.commentList[i].reply_count
        this.commentListItem = this.commentList[i].reply_count
      }
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
    async followedFn() {
      if (this.isFollowed) {
        // true 代表的是已关注按钮
        // 点击已关注就是要去取消关注 ——> 关注按钮要显示
        const { data } = await UnFollowAuthourAPI({
          id: this.articles.aut_id
        })
        this.isFollowed = false
        console.log(data) // 关注按钮能显现
      } else {
        const res = await followsAuthorAPI({
          id: this.articles.aut_id
        })
        this.isFollowed = true
        console.log(res)
      }
      this.getUserInfo()
    },
    // 发表的评论追加到评论列表里面
    addComments(content) {
      this.commentList = [content, ...this.commentList]
    },
    // 对评论进行回复
    async clickReply(item) {
      // console.log(666)
      this.isShowReplyComment = true
      this.value = item
      console.log(this.value)
      this.replyCo = this.value.aut_id
      this.IDIDID = this.value.com_id
      console.log(this.replyCo)
      // console.log(this.IDIDID)
      const { data } = await articleCommentsAPI({
        type: 'c',
        source: this.IDIDID
      })
      this.ItemABC = data.data.results
      console.log(this.ItemABC)
    },
    closeReply(close) {
      // console.log(close)
      this.isShowReplyComment = close
    },

    // 追加回复的评论
    addReply(a) {
      this.ItemABC = [a, ...this.ItemABC]
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  font-size: 40px;
  font-weight: 700;
  color: #3a3a3a;
  padding: 50px 32px;
  margin: 0;
}
.author {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 24px;
  .img {
    flex: 1;
    width: 72px;
    height: 72px;
    border-radius: 36px;
    img {
      width: 72px;
      height: 72px;
      border-radius: 36px;
    }
  }
  .name {
    flex: 4;
    .username {
      font-size: 24px;
      color: #3a3a3a;
    }
    .date {
      font-size: 24px;
      color: #3a3a3a;
    }
  }
  :deep(.btn) {
    flex: 2;
    width: 170px;
    height: 60px;
    text-align: center;
  }
}
.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 56px 32px;
}
:deep(.nomore) {
  display: flex;
  justify-content: center;
  height: 100px;
  .nomoreContent {
    margin: 0;
  }
}
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
.total {
  height: calc(100vh - 200px);
  overflow: auto;
}
.redShoucang {
  color: #3296fa;
}
.comments {
  display: flex;
  justify-content: center;
  height: 236px;
  padding: 0.26667rem 0.42667rem;
  :deep(.pinglunPic) {
    flex: 1;
    width: 72px;
    height: 72px;
    img {
      border-radius: 50%;
      width: 72px;
      height: 72px;
    }
  }
  .pinglunAll {
    flex: 5;
    width: 590px;
    height: 198px;
    .pinglunContent {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .pinglunAuthour {
        color: #406599;
        font-size: 0.34667rem;
      }
      .toutiao-dianzan {
        font-size: 30px;
      }
    }
    .pinglunNeirong {
      height: 36px;
      color: #222222;
      font-size: 32px;
      margin: 32px 0;
    }
    .pinglunDate {
      display: flex;
      align-items: center;
      height: 48px;
      .pl_date {
        margin-right: 25px;
        font-size: 24px;
        color: #222222;
      }
      :deep(.replyBtn) {
        width: 136px;
        height: 44px;
        font-size: 24px;
      }
    }
  }
}
</style>
