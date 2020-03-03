<template lang="pug">
	.skillsbox
		.skillsbox__default
			span.skillsbox__title(@click="onShowIcon") {{title}}
			editorIcon(v-if="!edit && showIcon" @onStartEdit="onStartEdit")
		ul.skillsbox__list(v-if="!edit")
			template(v-if="skills.length")
				li.skillsbox__item(v-for="(skill, i) in skills" :key="i")
					span.skillsbox__text {{skill}}
			template(v-else)
				li.skillsbox__item
					span.skillsbox__text(@click="onShowIcon") Заполнить
		.skillsbox__editor
			editDropDown(v-if="edit"
				:type="type"
				:current="skills"
				@onClose="onClose"
				@onDone="onDone")
</template>

<script>
	import editorIcon from "../utils/editorIcon";
	import editDropDown from "../utils/editDropDown";

	export default {
		name: "blockSkillsList",
		props: {
			title: {
				default: '',
				type: String
			},
			skills: {
				type: Array,
				default: () => []
			},
			type: {
				type: String,
				default: ''
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
			editorIcon,
			editDropDown
		}
	}
</script>

<style scoped lang="scss">
	@import "../../styles/variables";
	.skillsbox {
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
			text-decoration: none;
		}
		&__list {
			display: flex;
			flex-flow: row wrap;
		}
		&__item {
			margin-left: $margin-s;
			margin-bottom: $margin-sx;
			&:first-of-type {
				margin-left: 0;
			}
		}
		&__text {
			cursor: pointer;
			color: $color-blue;
		}
	}
</style>