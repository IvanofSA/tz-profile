<template lang="pug">
	.socials
		.socials__default(v-if="!edit")
			editorIcon(
				v-if="!edit && showIcon"
				:side="'left'"
				@onStartEdit="onStartEdit")

			ul.socials__list(
				@mouseenter="onShowIcon"
				@mouseleave="onHideIcon"
				@touchstart="onShowIcon"
				@touchend="onHideIcon")

				itemSocial(
					v-for="social in socials"
					:key="social.url"
					:url="social.url"
					:type="social.type"
					class="socials__item")

		.socials__editor
			editSocials(
				v-if="edit"
				@onClose="onClose"
				@onDone="onDone")
</template>

<script>
	import itemSocial from "./item"
	import editorIcon from "../utils/editorIcon";
	import editSocials from "../utils/editSocials";

	export default {
		name: "blockSocials",
		props: {
			socials: {
				default: () => [],
				type: Array
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
			onHideIcon() {
				setTimeout(() => {
					this.showIcon = false;
				}, 2000)
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
			itemSocial,
			editorIcon,
			editSocials
		}
	}
</script>

<style scoped lang="scss">
	@import "../../styles/variables";
	.socials {
		&__default {
			display: flex;
			justify-content: flex-end;
			width: 100%;
		}

		&__list {
			display: flex;
			flex-flow: row wrap;
			align-items: center;
			justify-content: space-between;
			max-width: 161px;
			width: 100%;
			height: 40px;
			list-style: none;
			margin: 0;
			padding: 0;
		}
	}

</style>