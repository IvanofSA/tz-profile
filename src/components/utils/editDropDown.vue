<template lang="pug">
    .editor
        .editor__inputbox.editor__inputbox_dropdown
            .editor__label.label(:class="{'label_not-empty': labels.length}")
                .label__item(
                    v-for="(label, i) in labels")
                    span.label__text {{label}}
                    span.label__icon(@click="removeLabel(i)")
            input(type="text"
                @input="throttledSave"
                class="editor__input"
                v-model="search")
            ul.editor__dropdown.dropdown(v-if="isOpen")
                template(v-if="!isCustomLabel")
                    li.dropdown__item(
                        v-for="(result, i) in results"
                        :key="i"
                        @click="setResult(result)") {{result}}
                template(v-else)
                    li.dropdown__item(@click="setResult(search)") Добавить интерес “{{search}}” в общий список
            editButtons(class="edit__buttons" @onClose="onClose" @onDone="onDone")
</template>

<script>
    import editButtons from "./editButtons";
	import throttle from "../../utils/throttle";

    export default {
        name: "editor",
        props: {
            type: {
                default: '',
                type: String
            },
            current: {
                type: Array,
                default: () => []
            },
        },
        data() {
            return {
                search: null,
                isOpen: false,
                isCustomLabel: false,
                labels: [],
                results: [],
                items: ['Дизайн', 'Разработка', 'Еще что то', 'Всякое', 'Русский реп', 'Танцы', 'Капуста', 'Протеин', 'Пиво']
            }
        },
        components: {
            editButtons
        },
        mounted() {
            if(this.current) {
                this.labels = [...this.current];
            }
        },
		computed: {
			throttledSave() {
				let DELAY = 1000;
				return throttle(this.onChange, DELAY);
			}
		},
        methods: {
            onChange() {
                this.filterResults();

                if (this.search.length > 2 && this.results.length) {
                    this.isOpen = true;
                    this.isCustomLabel = false;
                }

                if (this.search.length > 2 && !this.results.length) {
                    this.isOpen = true;
                    this.isCustomLabel = true;
                }

                if (this.search.length <= 2) {
                    this.isOpen = false;
                    this.isCustomLabel = false;
                }
            },
            removeLabel(index) {
                this.labels.splice(index, 1);
            },
            setResult(result) {
                this.$set(this.labels, this.labels.length, result);
                this.search = "";
                this.isOpen = false;
                this.isCustomLabel = false;
            },
            filterResults() {
                this.results = this.items.filter(item => {
                    return item.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
                });
            },
            onDone() {
                this.$emit('onDone');
                this.$store.dispatch('changeUserSkills', {labels: this.labels, type: this.type});
            },
            onClose() {
                this.search = '';
                this.$emit('onClose');
            }
        }
    }
</script>

<style lang="scss">
	@import "../../styles/variables";

	.editor {
        position: relative;
        display: flex;
        flex-flow: row wrap;
        align-items: center;

        &__inputbox {
            position: relative;

            &_dropdown {
                display: flex;
                flex-flow: row;
                align-items: center;
                width: 100%;
                height: 40px;
                margin-right: 70px;
                padding: 5px 10px;
                border: 1px solid $color-blue;
                line-height: 40px;
            }

            &.error {
                border: 1px solid $color-red;
            }
        }

        &__input {
            width: inherit;
            height: 38px;
            padding: 5px 10px;
            border: 0;
            line-height: 40px;

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