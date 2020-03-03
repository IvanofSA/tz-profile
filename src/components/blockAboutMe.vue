<template lang="pug">
	section.about
		.about__wrapper
			.about__default
				span.about__title(@click="onShowIcon") О себе
				editorIcon(v-if="!edit && showIcon" @onStartEdit="onStartEdit")

			p.about__text(v-if="!edit" ) {{about}}
			.about__editor
				editorTextarea(v-if="edit"
					@onClose="onClose"
					@onDone="onDone")
</template>

<script>
	import editorTextarea from "./utils/editorTextarea";
	import editorIcon from "./utils/editorIcon";

	export default {
		name: "blockAboutMe",
		props: {
			about: {
				default: "",
				type: String
			}
		},
		data() {
			return {
				showIcon: false,
				edit: false
			}
		},
		methods: {
			onShowIcon() {
				this.showIcon = true;
			},
			onStartEdit() {
				this.edit = true;
			},
			onClose() {
				this.edit = false;
				this.showIcon = false;
			},
			onDone() {
				this.edit = false;
				this.showIcon = false;
			},
		},
		components: {
			editorTextarea,
			editorIcon
		}
	}
</script>

<style scoped lang="scss">
	@import "../styles/variables";
	.about {
		@media screen and (min-width: $tablet) {
			display: grid;
			grid-column-gap: 2vw;
			grid-template-columns: 1fr 230px;
			padding: 0 20px;
		}

		&__default {
			display: flex;
			flex-flow: row wrap;
			align-items: center;
		}

		&__title {
			display: block;
			cursor: pointer;
			height: 40px;
			line-height: 40px;
			font-size: $font-l;
		}

		&__text {
			line-height: 1.4;
		}
	}
</style>