<template lang="pug">
	.photo(@mouseenter="isShowOverlay" @mouseleave="isHideOverlay")
		.photo__img(:class="{'empty': !avatar}")
			img(:src="avatar" alt="avatar" v-if="avatar")
		.photo__overlay(v-show="overlay" @click="onStartEdit")
</template>

<script>
	import editorIcon from "./utils/editorIcon";
	export default {
		name: "Photo",
		props: {
			isShow: {
				default: false,
				type: Boolean
			},
			avatar: {
				default: '',
				type: String
			}
		},
		data(){
			return {
				overlay: false
			}
		},
		components: {
			editorIcon
		},
		methods: {
			isShowOverlay() {
				this.overlay = true;
			},
			isHideOverlay() {
				this.overlay = false;
			},
			onStartEdit() {
				this.$emit("onStartEdit");
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "../styles/variables";
	.photo {
		position: relative;
		cursor: pointer;
		max-width: 184px;
		height: 184px;
		overflow: hidden;

		&__img {
			max-width: 184px;
			height: 184px;
			overflow: hidden;
			&.empty {
				background: $color-gray-border-light;
			}


			img {
				display: block;
				width: 100%;
				margin: 0 auto;
			}
		}
		&__overlay {
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			top: 0;
			margin: auto;
			background: rgba(0,0,0, 0.3);

			&:before {
				content: '';
				position: absolute;
				width: 47px;
				height: 40px;
				right: 0;
				bottom: 0;
				background:$color-blue url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20.1347 6.84439C20.5138 6.46523 20.5138 5.83328 20.1347 5.47356L17.8597 3.19856C17.5 2.81939 16.868 2.81939 16.4888 3.19856L14.7 4.97773L18.3458 8.62356L20.1347 6.84439ZM2.91663 16.7708V20.4166H6.56246L17.3152 9.65412L13.6694 6.00828L2.91663 16.7708Z' fill='white'/%3E%3C/svg%3E%0A") no-repeat center;
				background-size: 24px 24px;
			}
		}
	}
</style>