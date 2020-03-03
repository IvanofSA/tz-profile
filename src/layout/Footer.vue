<template lang="pug">
    footer.footer
        .container
            span footer
</template>

<style scoped lang="scss">
	@import "../styles/variables";
    .footer {
		display: flex;
		align-items: center;
		/*justify-content: center;*/
        background: $color-gray;
        min-height: 70px;
    }
</style>