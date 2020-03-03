<template lang="pug">
	.vacation
		span.vacation__text.vacation__text_birthday 20 февраля
		span.vacation__text.vacation__text_vacation 24 дня отпуска
</template>

<script>
	export default {
		name: "Vacation"
	}
</script>

<style scoped lang="scss">
	@import "../styles/variables";

	.vacation {
		display: flex;
		flex-flow: column wrap;
		max-width: 280px;
		padding: 25px;
		background: $color-gray;
		text-align: left;

		&__text {
			position: relative;
			display: block;
			padding-left: 32px;

			&:first-of-type {
				margin-bottom: 27px;
			}

			&:last-of-type {
				margin-bottom: 0;
			}

			&:before {
				content: '';
				position: absolute;
				width: 24px;
				height: 24px;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
			}

			&_birthday {
				&:before {
					background: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg opacity='0.6'%3E%3Cpath d='M11.5 0.5C12 0.75 13 2.4 13 3.5C13 4.6 12.33 5 11.5 5C10.67 5 10 4.85 10 3.75C10 2.65 11 2 11.5 0.5ZM18.5 9C21 9 23 11 23 13.5C23 15.06 22.21 16.43 21 17.24V23H12H3V17.24C1.79 16.43 1 15.06 1 13.5C1 11 3 9 5.5 9H10V6H13V9H18.5ZM12 16C12.663 16 13.2989 15.7366 13.7678 15.2678C14.2366 14.7989 14.5 14.163 14.5 13.5H16C16 14.163 16.2634 14.7989 16.7322 15.2678C17.2011 15.7366 17.837 16 18.5 16C19.163 16 19.7989 15.7366 20.2678 15.2678C20.7366 14.7989 21 14.163 21 13.5C21 12.837 20.7366 12.2011 20.2678 11.7322C19.7989 11.2634 19.163 11 18.5 11H5.5C4.83696 11 4.20107 11.2634 3.73223 11.7322C3.26339 12.2011 3 12.837 3 13.5C3 14.163 3.26339 14.7989 3.73223 15.2678C4.20107 15.7366 4.83696 16 5.5 16C6.16304 16 6.79893 15.7366 7.26777 15.2678C7.73661 14.7989 8 14.163 8 13.5H9.5C9.5 14.163 9.76339 14.7989 10.2322 15.2678C10.7011 15.7366 11.337 16 12 16Z' fill='black'/%3E%3C/g%3E%3C/svg%3E%0A") no-repeat center;
					background-size: contain;
				}

			}

			&_vacation {
				&:before {
					background: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg opacity='0.6'%3E%3Cpath d='M12 9C13.59 16.61 10 22 10 22H13C14.88 16.2 14 12.09 13.5 10L12 9ZM15.66 7.16C15.83 7.37 16 7.59 16.13 7.82C17.84 10.53 17.5 13.95 15.5 16.26C16.34 14.21 16.22 11.79 14.95 9.77C14.87 9.64 14.78 9.53 14.7 9.41C14.11 8.58 13.36 7.92 12.54 7.43C9.66 8.35 7.58 11.04 7.58 14.22C7.58 14.96 7.69 15.67 7.89 16.33C7.05 15.16 6.56 13.73 6.56 12.19C6.56 9.84 7.7 7.76 9.45 6.46C8 6.35 6.46 6.67 5.12 7.5C4.5 7.91 3.96 8.38 3.5 8.91C4.05 7.58 5 6.39 6.3 5.57C7.8 4.63 9.5 4.32 11.14 4.56C10.73 4 10.23 3.47 9.63 3C9.05 2.58 8.42 2.24 7.76 2C9.2 2.04 10.64 2.5 11.87 3.43C12.5 3.9 13 4.47 13.4 5.07C13.5 5.07 13.59 5.06 13.69 5.06C16.89 5.06 19.6 7.17 20.5 10.08C19.38 8.5 17.65 7.43 15.66 7.16Z' fill='black'/%3E%3C/g%3E%3C/svg%3E%0A") no-repeat center;
					background-size: contain;
				}
			}
		}
	}

</style>