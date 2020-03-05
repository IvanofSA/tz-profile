<template lang="pug">
	.editor-photo
		span.editor-photo__title Редактировавние фото
		span.editor-photo__close(@click="onClose")
		.editor-photo__redactor
			.editor-photo__file
				label.editor-photo__label
					input(type="file"  id="file" ref="myFiles" @change="previewFiles")
			.editor-photo__crop(v-show="isShowCrop")
				vue-cropper(ref="cropper"
					:viewMode="2"
					:autoCropArea="0.5"
					:src="file")
		.editor-photo__buttons
			button.editor-photo__buttons_save.button.button_blue(@click="cropImage") Сохранить
			button.editor-photo__buttons_close.button.button_white(@click="onClose") Закрыть

</template>

<script>
	import VueCropper from 'vue-cropperjs';
	import 'cropperjs/dist/cropper.css';

	export default {
		name: "editorPhoto",
		components: {VueCropper},
		data() {
			return {
				cropImg: null,
				file: null,
				isShowCrop: false
			}
		},
		methods: {
			cropImage() {
				this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
				this.$store.dispatch('changeUserAvatar', {img: this.cropImg});
				this.$emit('onCloseRedactor')
				this.clear();
			},
			clear() {
				this.cropImg = null;
				this.file = null;
			},
			onClose() {
				this.$emit('onCloseRedactor')
			},
            readFileAsync(file) {
                return new Promise((resolve, reject) => {
                    let reader = new FileReader();
                    reader.onload = () => {
                        resolve(reader.result);
                    };
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                })
            },
            async previewFiles() {
                const file = this.$refs.myFiles.files[0];
                try {
                    let base64 = await this.readFileAsync(file);
                    this.$refs.cropper.replace(base64);
                    this.isShowCrop = true;
                } catch (err) {
                    console.log(err);
                }
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "../../styles/variables";

	.editor-photo {
		position: relative;
		margin-top: $margin-m;

		&__title {
			display: block;
			text-align: center;
			margin-bottom: $margin-l;
			font-size: $font-ll;
		}

		&__close {
			display: none;
			@media screen and (min-width: $tablet) {
				position: absolute;
				display: block;
				cursor: pointer;
				right: 0;
				top: 0;
				width: 32px;
				height: 32px;
				background: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M25.3334 8.54667L23.4534 6.66667L16.0001 14.12L8.54675 6.66667L6.66675 8.54667L14.1201 16L6.66675 23.4533L8.54675 25.3333L16.0001 17.88L23.4534 25.3333L25.3334 23.4533L17.8801 16L25.3334 8.54667Z' fill='%23071AC3'/%3E%3C/svg%3E%0A") no-repeat center;
				background-size: contain;
			}
		}

		&__redactor {
			display: flex;
			flex-flow: column wrap;
			align-items: center;
			justify-content: center;
			margin-bottom: $margin-l;

			@media screen and (min-width: $tablet) {
				flex-flow: row;
			}
		}

		&__crop {
			display: block;
			width: 200px;
			height: 200px;

			@media screen and (min-width: $tablet) {
				margin-left: $margin-s;

			}
			div {
				width: 200px;
				height: 200px;
				img {
					display: block;
					object-fit: contain;
				}
			}

		}

		&__buttons {
			display: flex;
			flex-flow: row wrap;
			justify-content: center;

			&_close {
				margin-left: 5px;
			}
		}



		&__label {
			display: block;
			width: 200px;
			height: 200px;
			background: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M19 4L5 4L5 6L19 6L19 4ZM5 15L9 15L9 21L15 21L15 15L19 15L12 8L5 15Z' fill='%23071AC3'/%3E%3C/svg%3E%0A") no-repeat center;
			box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2), 0px 3px 4px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.14);
			cursor: pointer;
			margin-bottom: $margin-s;
			@media screen and (min-width: $tablet) {
				margin-bottom: 0;
			}
			input {
				opacity: 0;
				visibility: hidden;
			}
		}

		& .cropper-container {
			width: 184px !important;
			height: 184px !important;
		}
	}
</style>