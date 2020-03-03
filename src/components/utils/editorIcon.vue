<template lang="pug">
    div.editor(@click="onStartEdit" :class="`editor_${side}`")
</template>

<script>
    export default {
        name: "editorIcon",
        props: {
            side: {
                default: "right",
                type: String
            }
        },
        methods: {
            onStartEdit() {
                this.$emit("onStartEdit");
            }
        }
    }
</script>

<style scoped lang="scss">
	@import "../../styles/variables";
	.editor {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        overflow: hidden;
        width: 40px;
        height: 40px;

        &_left {
			margin-right: 25px;
		}
        &_right {
			margin-left: 25px;
		}
        &:hover {
            background: lighten($color-blue, 50%);
            border-radius: 50%;
        }
        &:before {
            content: '';
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            cursor: pointer;
            overflow: hidden;
            width: 24px;
            height: 24px;
            background: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20.71 7.04006C21.1 6.65006 21.1 6.00006 20.71 5.63006L18.37 3.29006C18 2.90006 17.35 2.90006 16.96 3.29006L15.12 5.12006L18.87 8.87006L20.71 7.04006ZM3 17.2501V21.0001H6.75L17.81 9.93006L14.06 6.18006L3 17.2501Z' fill='%23071AC3'/%3E%3C/svg%3E%0A") no-repeat center;
            background-size: contain;
            z-index: 10;
        }
    }
</style>