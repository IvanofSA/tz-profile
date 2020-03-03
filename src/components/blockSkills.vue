<template lang="pug">
	section.skills
		.skills__box
			blockSkillsList(class="skills__wrapper" :title="'Интересы'" :skills="interests" :type="'interests'")
			blockSkillsList(class="skills__wrapper" :title="'Профессиональные навыки'" :skills="skills" :type="'skills'")

</template>

<script>
	import blockSkillsList from "./blockSkillsList";
	export default {
        name: "blockSkills",
		props: {
        	skills: {
				type: Array,
				default: () => []
			},
			interests: {
				type: Array,
				default: () => []
			}
		},
		components: {
			blockSkillsList
		}
    }
</script>

<style scoped lang="scss">
	@import "../styles/variables";
	.skills {
		@media screen and (min-width: $tablet) {
			padding: 0 20px;
		}
		@media screen and (min-width: $desktop) {
			display: grid;
			grid-column-gap: 2vw;
            grid-template-columns: 1fr 230px;
		}
		&__box {
			@media screen and (min-width: $desktop) {
				display: grid;
				grid-column-gap: 2vw;
				grid-template-columns: repeat(2, 1fr);
			}
		}
	}

</style>