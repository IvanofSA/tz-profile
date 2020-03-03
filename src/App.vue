<template lang="pug">
	.wrapper
		Header
		main.main
			.container
				router-view
		Footer
</template>
<script>
	import Header from "./layout/Header";
	import Footer from "./layout/Footer";

	export default {
		created() {
			this.$store.dispatch('GET_USER');
		},
		components: {
			Header,
			Footer
		}
	}
</script>
<style lang="scss">
	@import "styles/variables";
	@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600&display=swap&subset=cyrillic');
	@import "~normalize.css/normalize.css";

	* {
		box-sizing: border-box;
	}

	html, body {
		min-height: 100%;
		height: 100%;
	}

	body {
		width: 100%;
		padding: 0;
		line-height: 1.2;
		font-family: 'Open Sans', sans-serif;
		font-size: 14px;
		color: $color-gray-text;

		p {
			margin: 0;
		}

		ul {
			list-style: none;
			margin: 0;
			padding: 0;
		}

		a {
			color: $color-blue;
			text-decoration: none;

			&:hover {
				text-decoration: underline;
			}
		}
	}

	.wrapper {
		min-height: 100vh;
		display: grid;
		grid-template-rows: auto 1fr auto;
	}

	@supports (display:grid) {
		.wrapper {
			display: block;
		}
	}
	.main {
		padding: 40px 0;
		border-bottom: 2px solid $color-gray-border-dark;
	}

	.container {
		padding: 0 20px;
	}

	.section {
		margin-bottom: $margin-m;
		text-align: left;

		&:last-of-type {
			margin-bottom: 0;
		}
	}

	.button {
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		border: 0;
		outline: 0;
		width: 100%;
		max-width: 184px;
		height: 40px;
		font-weight: 600;
		color: $color-white;

		&:hover {
			text-decoration: underline;
		}

		&_blue {
			background: $color-blue;
		}

		&_white {
			background: $color-white;
			color: $color-blue;
		}
	}
</style>
