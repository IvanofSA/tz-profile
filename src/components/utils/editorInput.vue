<template lang="pug">
	.editor
		.editor__inputbox
			input(type="text"
				:class="isError"
				:name="name"
				class="editor__input"
				v-mask="mask"
				v-model="value")
			editButtons(class="editor__buttons" @onClose="onClose" @onDone="onDone")

</template>

<script>
	import editButtons from "./editButtons";

	export default {
		name: "editor",
		props: {
			mask: {
				default: null,
				type: String
			},
			name: {
				default: null,
				type: String
			},
			pattern: {
				type: RegExp
			}
		},
		components: {
			editButtons
		},
		data() {
			return {
				value: null,
				error: false,
			}
		},
		computed: {
			isError() {
				return {'error': this.error}
			}
		},
		methods: {
			onDone() {
				if (this.pattern.test(this.value)) {
					this.$emit('onDone');
					this.$store.dispatch('changeUserPhone', {value: this.value});
				} else {
					this.error = true;
				}
			},
			onClose() {
				this.value = null;
				this.$emit('onClose', {changed: false});
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "../../styles/variables";
	.editor {
		display: flex;
		flex-flow: row wrap;
		align-items: center;

		&__inputbox {
			position: relative;
		}

		&__input {
			max-width: 228px;
			width: 100%;
			height: 40px;
			line-height: 40px;
			padding: 5px 10px;
			border: 1px solid $color-blue;

			&.error {
				border: 1px solid $color-red;
			}
		}

		&__icon {
			display: block;
			width: 24px;
			height: 24px;
			cursor: pointer;

			&_success {
				margin-left: 10px;
				background: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21 6.99997L9 19L3.5 13.5L4.91 12.09L9 16.17L19.59 5.58997L21 6.99997Z' fill='%234FDD36'/%3E%3C/svg%3E%0A") no-repeat center;
				background-size: contain;
			}

			&_close {
				margin-left: 10px;
				background: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z' fill='%23F44336'/%3E%3C/svg%3E%0A") no-repeat center;
				background-size: contain;
			}
		}

	}
</style>