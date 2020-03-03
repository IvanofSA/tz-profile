<template lang="pug">
	.buttons(:class="`buttons_${side}`")
		span(@click="onDone").buttons__icon.buttons__icon_success
		span(@click="onClose").buttons__icon.buttons__icon_close
</template>

<script>
	export default {
		name: "editButtons",
        props: {
		  side: {
		      default: 'default',
              type: String
          }
        },
		methods: {
			onDone() {
				this.$emit('onDone');
			},
			onClose() {
				this.$emit('onClose');
			}
		}
	}
</script>

<style scoped lang="scss">
	.buttons {
		position: absolute;
		display: flex;
		flex-flow: row;
		align-items: center;
        &_default {
            right: -70px;
            top: 50%;
            transform: translateY(-50%);
        }
        &_bottom {
            left: 50%;
			bottom: -30px;
            transform: translateX(-50%);
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