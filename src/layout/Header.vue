<template lang="pug">
    header.header
        .container
            span header
</template>

<style scoped lang="scss">
	@import "../styles/variables";
	.header {
		display: flex;
		align-items: center;
		background: $color-gray;
        min-height: 70px;
    }
</style>