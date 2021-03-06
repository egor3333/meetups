<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': isLoading }"
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
import { ImageService } from "@/common/api";

export default {
  name: "ImageUploader",

  data() {
    return {
      isLoading: false
    };
  },

  props: {
    imageId: {
      default: null
    }
  },

  model: {
    prop: "imageId",
    event: "change"
  },

  computed: {
    imageText() {
      if (this.isLoading) {
        return "Загрузка...";
      }

      return this.imageId ? "Удалить изображение" : "Загрузить изображение";
    },
    imageUrl() {
      let url = ImageService.getImageURL(this.imageId);
      return url ? { "--bg-image": `url('${url}')` } : {};
    }
  },

  methods: {
    handleChange(e) {
      this.isLoading = true;
      ImageService.uploadImage(...e.target.files).then(res => {
        this.isLoading = false;
        this.$emit("change", res.id);
      });
    },
    handleClick(e) {
      if (this.imageId) {
        this.$emit("change", null);
        this.$refs.input.value = null;
        e.preventDefault();
      }
    }
  }
};
</script>

<style scoped>
.image-uploader .form-control-file {
  opacity: 0;
  height: 0;
}

.image-uploader .image-uploader__preview {
  --bg-image: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.4)
    ),
    var(--bg-image);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader .image-uploader__preview > span {
  color: var(--white);
  font-family: "Nunito", sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader .image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader .image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
