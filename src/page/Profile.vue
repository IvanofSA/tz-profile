<template lang="pug">
	div.profile(v-if="user")
		h1.profile__title {{user.name}}
		p.profile__suptitle(v-if="user.vacation_period") {{user.vacation_period}}
		.profile__wrapper
			.profile__sidebar
				blockPhoto(class="profile__photo" :avatar="user.photo" @onStartEdit="onStartEdit" :isShow="edit")
				blockVacation(class="profile__vacation")
				button.profile__button.button.button_blue Мое развитие
			.profile__info
				blockInfo(class="section section_info"
					:positions="user.positions"
					:department="user.department"
					:date="user.date"
					:supervisor="user.supervisor")
				blockContacts(class="section section_contacts"
					:contacts="user.contacts"
					:socials="user.socials")
				template(v-if="!edit")
					blockSkills(class="section section_skills"
						:interests="user.interests"
						:skills="user.skills")
					blockAboutMe(class="section section_about" :about="user.about")
				template(v-else)
					editorPhoto(@onCloseRedactor="onCloseRedactor")
</template>

<script>
	import blockInfo from "../components/blockInfo";
	import blockContacts from "../components/blockContacts";
	import blockSkills from "../components/blockSkills/index";
	import blockPhoto from "../components/blockPhoto";
	import blockVacation from "../components/blockVacation";
	import blockAboutMe from "../components/blockAboutMe";
	import editorPhoto from "../components/utils/editorPhoto";
	import {mapGetters} from "vuex";

	export default {
		name: "Profile",
		components: {
			blockInfo,
			blockContacts,
			blockSkills,
			blockPhoto,
			blockVacation,
			blockAboutMe,
			editorPhoto
		},
		data() {
			return {
				edit: false
			}
		},
		computed: {
			...mapGetters({
				user: 'getUser'
			})
		},
		methods: {
			onStartEdit() {
				this.edit = true;
			},
			onCloseRedactor() {
				this.edit = false;
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "../styles/variables";

	.profile {
		padding: 0 0 40px;

		@media screen and (min-width: $tablet) {
			text-align: center;
		}

		&__title {
			margin: 0 0 $margin-s;
			font-size: $font-xl;
		}

		&__suptitle {
			position: relative;
			padding-left: 30px;
			margin: 0 0 $margin-s;

			@media screen and (min-width: $tablet) {
				display: inline-block;
				text-align: center;
			}

			&:before {
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				display: block;
				width: 20px;
				height: 20px;
				background: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9 7H11V5H9V7ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM10 0C8.68678 0 7.38642 0.258658 6.17317 0.761205C4.95991 1.26375 3.85752 2.00035 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C3.85752 17.9997 4.95991 18.7362 6.17317 19.2388C7.38642 19.7413 8.68678 20 10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7362 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0ZM9 15H11V9H9V15Z' fill='%23757575'/%3E%3C/svg%3E%0A") no-repeat center;
				background-size: contain;
			}
		}

		&__wrapper {
			display: grid;
			width: 100%;
			grid-template-columns: 1fr;

			@media screen and (min-width: $mobile) {
				grid-template-columns: 184px 1fr;
				grid-gap: 2vw;
			}
		}

		&__sidebar {
			margin-bottom: 24px;
		}

		&__photo {
			margin-bottom: $margin-m;
		}

		&__vacation {
			margin-bottom: $margin-m;
		}
	}
</style>