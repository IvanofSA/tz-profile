<template lang="pug">
	.editor
		.editor__group
			.editor__inputbox(v-for="social in socials")
				span.editor__icon(:class="`editor__icon_${social.type}`")
				input(type="text"
					:name="social.type"
					placeholder="ссылка на профиль"
					class="editor__input"
					v-model="social.url")

				editButtons(class="editor__buttons" :side="'bottom'" @onClose="onClose" @onDone="onDone")
</template>

<script>
	import editButtons from "./editButtons";

	export default {
		name: "editSocials",
		data() {
			return {
				socials: [
					{
						type: "fb",
						url: null
					},
					{
						type: "vk",
						url: null
					},
					{
						type: "inst",
						url: null
					},
					{
						type: "ln",
						url: null
					}
				]
			}
		},
		methods: {
			onDone() {
				this.$emit('onDone');
				this.$store.dispatch('CHANGE_USER_SOCIALS', {socials: this.socials});
			},
			onClose() {
				this.value = null;
				this.$emit('onClose');
			}
		},
		components: {
			editButtons
		}
	}
</script>

<style scoped lang="scss">
	@import "../../styles/variables";
	.editor {
		position: relative;
		display: flex;
		flex-flow: row wrap;
		align-items: flex-end;
		justify-content: flex-end;
		padding-bottom: 35px;

		@media screen and (min-width: $tablet) {
			align-items: center;
		}
		&__group {
			@media screen and (min-width: $tablet) {
				width: 100%;
			}
		}

		&__inputbox {
			position: relative;
			display: flex;
			flex-flow: row;
			align-items: center;
			max-width: 228px;
			width: 100%;
			margin-bottom: 10px;
			padding: 0 7px;
			border: 1px solid $color-blue;

			&:last-of-type {
				margin-bottom: 0;
			}
		}

		&__icon {
			width: 24px;
			height: 24px;

			&_fb {
				background: url("../../assets/img/fb.svg") no-repeat center;
				background-size: contain;
			}

			&_inst {
				background: url("../../assets/img/inst.svg") no-repeat center;
				background-size: contain;
			}

			&_vk {
				background: url("../../assets/img/vk.svg") no-repeat center;
				background-size: contain;
			}

			&_ln {
				background: url("../../assets/img/ln.svg") no-repeat center;
				background-size: contain;
			}
		}

		&__input {
			width: calc(100% - 30px);
			height: 40px;
			line-height: 40px;
			padding: 5px 10px;

			&.error {
				border: 1px solid $color-red;
			}

			&:focus, &:hover, &:active {
				outline: 0;
			}
		}

		& .label {
			display: flex;
			flex-flow: row;
			align-items: center;
			width: min-content;

			&_not-empty {
				width: max-content;
			}

			&__item {
				display: inline-flex;
				align-items: center;
				justify-content: space-between;
				min-width: 80px;
				height: 24px;
				margin-left: 5px;
				padding: 0 5px 0 10px;
				background: lighten($color-gray-light-text, 10%);
				border-radius: 34px;

				&:first-of-type {
					margin-left: 0;
				}
			}

			&__text {
				display: grid;
				grid-auto-columns: max-content;
				padding: 0 5px;
				line-height: 1;
				font-size: 12px;
				letter-spacing: 0.4px;
			}

			&__icon {
				display: block;
				cursor: pointer;
				width: 16px;
				height: 16px;
				background: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.6668 4.27337L11.7268 3.33337L8.00016 7.06004L4.2735 3.33337L3.3335 4.27337L7.06016 8.00004L3.3335 11.7267L4.2735 12.6667L8.00016 8.94004L11.7268 12.6667L12.6668 11.7267L8.94016 8.00004L12.6668 4.27337Z' fill='black'/%3E%3C/svg%3E%0A") no-repeat center;
				background-size: contain;
			}
		}

		& .dropdown {
			position: absolute;
			width: 100%;
			left: 0;
			top: 40px;
			background: $color-white;
			padding: 10px;
			box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2), 0px 3px 4px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.14);

			&__item {
				margin-bottom: 12px;
				color: $color-blue;

				&:last-of-type {
					margin-bottom: 0;
				}
			}
		}
	}
</style>