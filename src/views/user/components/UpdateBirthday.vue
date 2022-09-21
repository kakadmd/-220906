<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="cancel"
      @confirm="confirm"
    />
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { UploadUserMessageAPI } from '@/api'
export default {
  props: {
    bir: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.bir)
    }
  },
  methods: {
    cancel() {
      this.$emit('popup-showThree')
    },
    async confirm() {
      const time = dayjs(`${this.currentDate}`).format('YYYY-MM-DD')
      // console.log()
      await UploadUserMessageAPI({ birthday: time })
      // console.log(time)
      this.$emit('popup-showThree', time)
    }
  }
}
</script>

<style></style>
