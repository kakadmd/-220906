<template>
  <div>
    <van-nav-bar
      :title="`${ItemABC.length}条回复`"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="pl">
      <!-- 点击的评论 -->
      <div class="comments">
        <!-- 评论者的头像 -->
        <div class="pinglunPic">
          <img :src="clickReplyComment.aut_photo" alt="" />
        </div>
        <div class="pinglunAll">
          <!-- 评论者的名字和内容 -->
          <div class="pinglunContent">
            <!-- 评论者的名字 -->
            <div class="pinglunAuthour">{{ clickReplyComment.aut_name }}</div>
            <!-- 给评论者的点赞 -->
            <div class="pinglunZang">
              <span class="toutiao toutiao-dianzan">{{
                clickReplyComment.like_count
              }}</span>
            </div>
          </div>
          <!-- 评论者的评论内容 -->
          <div class="pinglunNeirong">{{ clickReplyComment.content }}</div>
          <!-- 评论者发表评论时间和回复按钮 -->
          <div class="pinglunDate">
            <!-- 评论时间 -->
            <div class="pl_date">{{ pl_DATE }}</div>
            <!-- 回复评论 -->

            <van-button size="mini" round class="replyBtn"
              >回复<span>{{ ItemABC.length }}</span>
            </van-button>
          </div>
        </div>
      </div>
      <!-- 全部回复 -->
      <van-cell value="全部回复" />

      <!-- 对评论的回复 -->
      <div class="comments" v-for="(i, index) in ItemABC" :key="index">
        <!-- 评论者的头像 -->
        <div class="pinglunPic">
          <img :src="i.aut_photo" alt="" />
        </div>
        <div class="pinglunAll">
          <!-- 评论者的名字和内容 -->
          <div class="pinglunContent">
            <!-- 评论者的名字 -->
            <div class="pinglunAuthour">{{ i.aut_name }}</div>
            <!-- 给评论者的点赞 -->
            <div class="pinglunZang">
              <span class="toutiao toutiao-dianzan">{{ i.like_count }}</span>
            </div>
          </div>
          <!-- 评论者的评论内容 -->
          <div class="pinglunNeirong">{{ i.content }}</div>
          <!-- 评论者发表评论时间和回复按钮 -->
          <div class="pinglunDate">
            <!-- 评论时间 -->
            <div class="pl_date"></div>
            <!-- 回复评论 -->

            <van-button size="mini" round class="replyBtn"
              >回复<span></span>
            </van-button>
          </div>
        </div>
      </div>
    </div>
    <van-button
      v-show="isHidden"
      @click="clickReply"
      type="info"
      size="large"
      class="btn"
      round
      >评论
    </van-button>
    <van-popup
      v-model="isShowRelpyComment"
      position="bottom"
      :style="{ height: '18%' }"
    >
      <div class="total">
        <van-field
          class="filed"
          v-model="message"
          rows="2"
          autosize
          type="textarea"
          maxlength="50"
          placeholder="请输入留言"
          show-word-limit
        />
        <van-button class="btn" @click="clickClose"
          ><span>发布</span></van-button
        >
      </div>
    </van-popup>
  </div>
</template>

<script>
import { reviewArticleAPI } from '@/api'
export default {
  name: 'reply',
  props: {
    clickReplyComment: {
      type: Object,
      required: true
    },
    articleID: {
      type: [Number, String],
      default: ''
    },
    ItemABC: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      value: '',
      isShowRelpyComment: false,
      message: '',
      replyList: [],
      pl_DATE: '',
      total_count: 0,
      isHidden: true
    }
  },
  methods: {
    onClickLeft() {
      this.$emit('closeReply', false)
    },
    // 点击进行回复
    clickReply() {
      // console.log('开始评论')
      this.isShowRelpyComment = true
    },
    // 点击发布 弹窗关闭
    async clickClose() {
      console.log(this.articleID)
      const { data } = await reviewArticleAPI({
        target: this.clickReplyComment.com_id, // 评论的id
        content: this.message, // 用户输入的内容
        art_id: this.articleID // 文章id
      })

      // 发送给父组件让父组件添加进去
      this.$emit('addReply', data.data.new_obj)
      console.log(data.data.new_obj)

      this.replyList.push()

      // console.log('发布评论')
      if (this.message === '') {
        this.$toast.fail('评论不能为空')
      }
      this.isShowRelpyComment = false
      // 发表的评论追加到对评论的回复的列表里面
    }
  }
}
</script>

<style lang="less" scoped>
.pl {
  height: calc(100vh - 200px);
  overflow: scroll;
  .comments {
    display: flex;
    justify-content: center;
    height: 236px;
    padding: 0.26667rem 0.42667rem;
    border-bottom: 1px solid #f5f6f7;
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
}
:deep(.total) {
  display: flex;
  // justify-content: center;
  align-items: center;
  padding: 32px 0 32px 28px;
  .filed {
    width: 596px;
    height: 176px;
    background-color: #f5f7f9;
    margin: 0;
  }
  .btn {
    width: 120px;
    height: 88px;
    text-align: center;
    border: none;
    color: #6ba3d8;
    span {
      font-size: 32px;
      display: block;
      width: 80px;
      height: 40px;
    }
  }
}
</style>
