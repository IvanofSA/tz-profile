<template lang="pug">
    section.info
        .info__box
            .info__group.info__group_position
                p.info__text {{positions}}
                    a(href="#")  Dentsu Aegis CS

            .info__group.info__group_department
                p.info__text(v-if="department")
                    a(:href="department.url") {{department.text}}

                p.info__text(v-if="supervisor")
                    span Руководитель
                    a(:href="supervisor.url")  {{supervisor.name}}
        .info__box
            .info__group.info__group_time
                span Работает в&nbsp;Dentsu
                span  {{countMonth}} с&nbsp;{{date}}
</template>

<script>

    export default {
        props: {
            positions: {
                default: "",
                type: String
            },
            department: {
                default: () => {
                    return {}
                },
                type: Object
            },
            supervisor: {
                default: () => {
                    return {}
                },
                type: Object
            },
            date: {
                default: "",
                type: String
            }
        },
        computed: {
            countMonth() {
            	this.moment.locale('ru');
                return this.moment(this.date, "DD.MM.YY").fromNow().replace('назад', '');
            }
        }
    }
</script>

<style scoped lang="scss">
	@import "../styles/variables";
    .info {
        position: relative;
        padding: 34px 20px 48px;
        background: $color-gray;
		min-height: 184px;
        &:before {
            content: '';
            position: absolute;
            right: 0;
            bottom: 0;
            display: block;
            width: 56px;
            height: 56px;
            background: url('../assets/img/icon-profile.svg') no-repeat center;
            background-size: contain;
            @media screen and (min-width: $tablet) {
                right: 20px;
                bottom: 20px;
            }
        }
        @media screen and (min-width: $tablet) {
            display: grid;
			grid-template-columns: 1fr 350px;
            grid-gap: 2vw;
            background-position: 95% 95%;
        }
        &__group {
            position: relative;
            padding-left: 30px;
            &:first-of-type {
                margin-bottom: $margin-m;
            }
            &:last-of-type {
                margin-bottom: 0;
            }
            &:before {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                display: block;
                width: 24px;
                height: 24px;
            }
            &_position {
                &:before {
                    background: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg opacity='0.6'%3E%3Cpath d='M17 3H14V6H10V3H7C6.46957 3 5.96086 3.21071 5.58579 3.58579C5.21071 3.96086 5 4.46957 5 5V21C5 21.5304 5.21071 22.0391 5.58579 22.4142C5.96086 22.7893 6.46957 23 7 23H17C17.5304 23 18.0391 22.7893 18.4142 22.4142C18.7893 22.0391 19 21.5304 19 21V5C19 4.46957 18.7893 3.96086 18.4142 3.58579C18.0391 3.21071 17.5304 3 17 3ZM12 8C12.5304 8 13.0391 8.21071 13.4142 8.58579C13.7893 8.96086 14 9.46957 14 10C14 10.5304 13.7893 11.0391 13.4142 11.4142C13.0391 11.7893 12.5304 12 12 12C11.4696 12 10.9609 11.7893 10.5858 11.4142C10.2107 11.0391 10 10.5304 10 10C10 9.46957 10.2107 8.96086 10.5858 8.58579C10.9609 8.21071 11.4696 8 12 8ZM16 16H8V15C8 13.67 10.67 13 12 13C13.33 13 16 13.67 16 15V16ZM13 5H11V1H13V5ZM16 19H8V18H16V19ZM12 21H8V20H12V21Z' fill='black'/%3E%3C/g%3E%3C/svg%3E%0A") no-repeat center;
                    background-size: contain;
                }
            }
            &_department {
                &:before {
                    background: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg opacity='0.6'%3E%3Cpath d='M9 2V8H11V11H5C3.89 11 3 11.89 3 13V16H1V22H7V16H5V13H11V16H9V22H15V16H13V13H19V16H17V22H23V16H21V13C21 11.89 20.11 11 19 11H13V8H15V2H9Z' fill='black'/%3E%3C/g%3E%3C/svg%3E%0A") no-repeat center;
                    background-size: contain;
                }
            }
            &_time {
                padding-left: 0;
                @media screen and (min-width: $tablet) {
                    text-align: right;
                }
                span {
                    &:first-of-type {
                        color: $color-gray-light-text;
                    }
                }
            }
        }
        &__text {
            margin-bottom: $margin-sx;
            line-height: 1.4;

            &:last-of-type {
                margin-bottom: 0;
            }
        }
        &__box {
            margin-bottom: $margin-m;
            &:last-of-type {
                margin-bottom: 0;
            }
            @media screen and (min-width: $tablet) {
                margin-bottom: 0;
            }
        }
    }
</style>