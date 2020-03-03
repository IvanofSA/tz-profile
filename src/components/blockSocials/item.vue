<template lang="pug">
    li.social
        a(:href="url" :class="`social__link_${type}`").social__link {{type}}
</template>

<script>
    export default {
        name: "blockSocials",
        props: {
            url: {
                default: '#',
                type: String
            },
			type: {
                default: '',
                type: String
            }
        }
    }
</script>

<style scoped lang="scss">
	@import "../../styles/variables";
    .social {
        &__link {
            display: inline-block;
            width: 24px;
            height: 24px;
            text-indent: -9999px;

            &_fb {
				background: url("../../assets/img/fb.svg") no-repeat center;
				background-size: contain;
            }

            &_vk {
				background: url("../../assets/img/vk.svg") no-repeat center;
				background-size: contain;
            }

            &_inst {
				background: url("../../assets/img/inst.svg") no-repeat center;
				background-size: contain;
            }

            &_ln {
				background: url("../../assets/img/ln.svg") no-repeat center;
				background-size: contain;
            }
        }
    }
</style>