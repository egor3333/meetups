<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{'image-uploader__preview-loading': isLoading}"
      :style="imageUrl"
      @click="handleClick"
    >
      <span>{{ imageText }}</span>
      <input
        type="file"
        accept="image/*"
        class="form-control-file"
        :disabled="isLoading"
        @change="handleChange"
        ref="input"
      />
    </label>
  </div>
</template>

<script>
import { ImageService } from '../image-service';

export default {
  name: 'ImageUploader',

  data() {
    return {
      isLoading: false
    }
  },

  props: {
    imageId: {
      default: null
    }
  },

  model: {
    prop: 'imageId',
    event: 'change'
  },

  computed: {
    imageText() {
      if (this.isLoading) { return 'Загрузка...'}

      return this.imageId ? 'Удалить изображение' : 'Загрузить изображение'
    },
    imageUrl() {
      let url = ImageService.getImageURL(this.imageId)
      return url ? { '--bg-image': `url('${url}')` } : {}
    }
  },

  methods: {
    handleChange(e) {
      this.isLoading = true
      ImageService.uploadImage(...e.target.files).then(res => {
        this.isLoading = false
        this.$emit('change', res.id)
      })
    },
    handleClick(e) {
      if (this.imageId) {
        this.$emit('change', null)
        this.$refs.input.value = null
        e.preventDefault()
      }
    }
  }
};
</script>

<style scoped></style>
