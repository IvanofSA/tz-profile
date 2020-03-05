<template lang="pug">
    section.contacts
        .contacts__box
            ul.contacts__list
                li.contacts__item.contacts__item_address(v-if="address")
                    span.contacts__text {{address.text}}
                    span.contacts__desc {{address.text_sup}}

                li.contacts__item.contacts__item_fax(v-if="fax")
                    a(:href="fax").contacts__text  {{fax}}

                li.contacts__item.contacts__item_phone.contacts__item_phone-work(v-if="phoneWork")
                    span.contacts__text {{phoneWork}}
                    span.contacts__desc Рабочий

                li.contacts__item.contacts__item_phone.contacts__item_phone-home(:class="setClassEditor")
                    .contacts__defult.default(@click="onShowIcon" v-if="!edit")
                        .contacts__wrap
                            span.contacts__text {{checkHomePhone}}
                            span.contacts__desc Личный
                        editorIcon(
                            v-if="!edit && showIcon"
                            @onStartEdit="onStartEdit")

                    .contacts__editor
                        editorInput(
                            v-if="edit"
                            @onClose="onClose"
                            @onDone="onDone"
                            :mask="'+7(###)###-##-##'"
                            :name="'phone_home'"
                            :pattern="pattern")
                li.contacts__item.contacts__item_email(v-if="email")
                    a(:href="`mailto:${email}`").contacts__text {{email}}

                li.contacts__item.contacts__item_skype(v-if="skype")
                    a(:href="skype").contacts__text Skype for business

                li.contacts__item.contacts__item_teams(v-if="teams")
                    a(:href="teams").contacts__text Teams
        .contacts__box
            blockSocials(class="contacts__socials" :socials="customSocials")


</template>

<script>
    import blockSocials from "./blockSocials/list"
    import editorInput from "./utils/editorInput";
    import editorIcon from "./utils/editorIcon";

    export default {
        props: {
            socials: {
                default: () => [],
                type: Array
            },
            address: {
                default: () => {},
                type: Object
            },
            fax: {
                default: "",
                type: String
            },
            phoneWork: {
                default: "",
                type: String
            },
            phoneHome: {
                default: "",
                type: String
            },
            email: {
                default: "",
                type: String
            },
            skype: {
                default: "",
                type: String
            },
            teams: {
                default: "",
                type: String
            },
        },
        data() {
            return {
                pattern: /\+7\(\d{3}\)\d{3}-\d{2}-\d{2}/,
                showIcon: false,
                edit: false,
                customSocials: [
                    {
                        type: "fb",
                        url: null
                    },
                    {
                        type: "vk",
                        url: null
                    },
                    {
                        type: "inst",
                        url: null
                    },
                    {
                        type: "ln",
                        url: null
                    }
                ]
            }
        },
        watch: {
            socials() {
                this.customSocials = this.socials.length ? this.socials : this.customSocials;
            }

        },
        computed: {
            checkHomePhone() {
                return this.phoneHome ? this.phoneHome : "Заполнить"
            },
            setClassEditor() {
                return this.phoneHome ? "" : "empty"
            }
        },
        methods: {
            onShowIcon() {
                this.showIcon = true;
            },
            onStartEdit() {
                this.edit = true;
            },
            onClose() {
                this.edit = false;
                this.showIcon = false;
            },
            onDone() {
                this.edit = false;
                this.showIcon = false;
            },
        },
        components: {
            blockSocials,
            editorInput,
            editorIcon
        }
    }
</script>

<style scoped lang="scss">
    @import "../styles/variables";

    .contacts {
        padding: 0 0 24px;
        border-bottom: 1px solid $color-gray-border-light;

        @media screen and (min-width: $tablet) {
            display: grid;
            grid-gap: 2vw;
            grid-template-columns: 1fr 230px;
            padding: 0 20px 24px;
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

        &__defult {
            display: flex;
            flex-flow: row wrap;
            align-items: center;
        }

        &__list {
            display: flex;
            flex-flow: column wrap;
            margin: 0;
            padding: 0;
            list-style: none;
            @media screen and (min-width: $desktop) {
                display: grid;
                grid-column-gap: 2vw;
                grid-template-columns: repeat(2, 1fr);
            }
        }

        &__item {
            position: relative;
            display: flex;
            height: 40px;
            flex-flow: column wrap;
            justify-content: center;
            padding-left: 32px;
            padding-right: 32px;
            margin-bottom: 25px;

            &:last-of-type {
                margin-bottom: 0;
            }

            &:before {
                content: "";
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                display: block;
                width: 24px;
                height: 24px;
            }

            &.empty {
                cursor: pointer;

                & .contacts__text {
                    color: $color-blue;
                }
            }

            &_address {
                @media screen and (min-width: $desktop) {
                    order: 1;
                }

                &:before {
                    background: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg opacity='0.6'%3E%3Cpath d='M12 11.5C11.337 11.5 10.7011 11.2366 10.2322 10.7678C9.76339 10.2989 9.5 9.66304 9.5 9C9.5 8.33696 9.76339 7.70107 10.2322 7.23223C10.7011 6.76339 11.337 6.5 12 6.5C12.663 6.5 13.2989 6.76339 13.7678 7.23223C14.2366 7.70107 14.5 8.33696 14.5 9C14.5 9.3283 14.4353 9.65339 14.3097 9.95671C14.1841 10.26 13.9999 10.5356 13.7678 10.7678C13.5356 10.9999 13.26 11.1841 12.9567 11.3097C12.6534 11.4353 12.3283 11.5 12 11.5ZM12 2C10.1435 2 8.36301 2.7375 7.05025 4.05025C5.7375 5.36301 5 7.14348 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 7.14348 18.2625 5.36301 16.9497 4.05025C15.637 2.7375 13.8565 2 12 2Z' fill='black'/%3E%3C/g%3E%3C/svg%3E%0A") no-repeat center;
                    background-size: contain;
                }
            }

            &_fax {
                @media screen and (min-width: $desktop) {
                    order: 3;
                }

                &:before {
                    background: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M19 3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3ZM9 5V19H5V5H9ZM19 5V9H11V5H19ZM19 11V13H17V11H19ZM16 11V13H14V11H16ZM13 11V13H11V11H13ZM19 14V16H17V14H19ZM16 14V16H14V14H16ZM13 14V16H11V14H13ZM13 17V19H11V17H13ZM16 17V19H14V17H16ZM19 17V19H17V17H19Z' fill='%23424242'/%3E%3C/svg%3E%0A") no-repeat center;
                    background-size: contain;
                }
            }

            &_phone {
                @media screen and (min-width: $desktop) {
                    order: 5;
                }

                &:before {
                    background: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg opacity='0.6'%3E%3Cpath d='M16 18H7V4H16V18ZM11.5 22C11.1022 22 10.7206 21.842 10.4393 21.5607C10.158 21.2794 10 20.8978 10 20.5C10 20.1022 10.158 19.7206 10.4393 19.4393C10.7206 19.158 11.1022 19 11.5 19C11.8978 19 12.2794 19.158 12.5607 19.4393C12.842 19.7206 13 20.1022 13 20.5C13 20.8978 12.842 21.2794 12.5607 21.5607C12.2794 21.842 11.8978 22 11.5 22ZM15.5 1H7.5C6.83696 1 6.20107 1.26339 5.73223 1.73223C5.26339 2.20107 5 2.83696 5 3.5V20.5C5 21.163 5.26339 21.7989 5.73223 22.2678C6.20107 22.7366 6.83696 23 7.5 23H15.5C16.163 23 16.7989 22.7366 17.2678 22.2678C17.7366 21.7989 18 21.163 18 20.5V3.5C18 2.83696 17.7366 2.20107 17.2678 1.73223C16.7989 1.26339 16.163 1 15.5 1Z' fill='black'/%3E%3C/g%3E%3C/svg%3E%0A") no-repeat center;
                    background-size: contain;
                }
            }

            &_phone-work {
                @media screen and (min-width: $desktop) {
                    order: 5;
                }
            }

            &_phone-home {
                @media screen and (min-width: $desktop) {
                    order: 7;
                }
            }

            &_email {
                @media screen and (min-width: $desktop) {
                    order: 2;
                }

                &:before {
                    background: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath opacity='0.6' d='M10 13C10.81 13 11.5 12.7 12.11 12.11C12.7 11.5 13 10.81 13 10C13 9.19 12.7 8.5 12.11 7.89C11.5 7.3 10.81 7 10 7C9.19 7 8.5 7.3 7.89 7.89C7.3 8.5 7 9.19 7 10C7 10.81 7.3 11.5 7.89 12.11C8.5 12.7 9.19 13 10 13ZM10 0C12.75 0 15.1 1 17.05 2.95C19 4.9 20 7.25 20 10V11.45C20 12.45 19.65 13.3 19 14C18.3 14.67 17.5 15 16.5 15C15.3 15 14.31 14.5 13.56 13.5C12.56 14.5 11.38 15 10 15C8.63 15 7.45 14.5 6.46 13.54C5.5 12.55 5 11.38 5 10C5 8.63 5.5 7.45 6.46 6.46C7.45 5.5 8.63 5 10 5C11.38 5 12.55 5.5 13.54 6.46C14.5 7.45 15 8.63 15 10V11.45C15 11.86 15.16 12.22 15.46 12.53C15.76 12.84 16.11 13 16.5 13C16.92 13 17.27 12.84 17.57 12.53C17.87 12.22 18 11.86 18 11.45V10C18 7.81 17.23 5.93 15.65 4.35C14.07 2.77 12.19 2 10 2C7.81 2 5.93 2.77 4.35 4.35C2.77 5.93 2 7.81 2 10C2 12.19 2.77 14.07 4.35 15.65C5.93 17.23 7.81 18 10 18H15V20H10C7.25 20 4.9 19 2.95 17.05C1 15.1 0 12.75 0 10C0 7.25 1 4.9 2.95 2.95C4.9 1 7.25 0 10 0Z' fill='black'/%3E%3C/svg%3E%0A") no-repeat center;
                    background-size: 20px 20px;
                }
            }

            &_skype {
                @media screen and (min-width: $desktop) {
                    order: 4;
                }

                &:before {
                    background: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Crect width='24' height='24' fill='url(%23pattern0)'/%3E%3Cdefs%3E%3Cpattern id='pattern0' patternContentUnits='objectBoundingBox' width='1' height='1'%3E%3Cuse xlink:href='%23image0' transform='scale(0.005)'/%3E%3C/pattern%3E%3Cimage id='image0' width='200' height='200' xlink:href='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAuIwAALiMBeKU/dgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAACAASURBVHic7Z15nFxVte9/a59Tc89zEjKRodMEckUGZRAZlEFEP/epSecCkfee6HNW9ApP74fr8C7iFRzvEwQvaiDSBJWnOCGYqEQQucgYuhOSkISQ9Jyeajp1zl7vj+qhqrvTQ1Wdc+pU7+/nk8+nazprdad+Z++19tprAwqFQqFQKBQKhUKhUCgUCoVCoVAoFAqFQqFQKBQKhUKhUCgUCoVCoVAoFAqFQqFQKBQKhUKhUCgUinlDbjtQDGzY2hmJApGQzxcgqY28eHXVcbd9UhQHC0Ig635+pBaG7wyAmhlYR6C1ANYAXAGg+gQfi4IQBeMQMe2RZnKvjA3vZ9Kf3/fBNbsddF/hIiUpkPXbu8ssSRcC8iIGXUzABgBi3hdiCWkkwEYSbBmZr3QB/DiYdiAU/P2+69bsL5DriiKjdATyRRYtLd0XSxZbCPzfAERyvRSnDMhkFGwaM7yJwaYBNlNgM7UPRG2mRXe8duP5R3O1qyg+PC+Q9du7m0zGpwjYAsainC/EDGnEwck4WJrTv0Va4FRyXBiTIUaKNW2Hzvo39n3uvN+DmZof7FoBU18JTa4AeAUxLQehFoxaALUA1wJEAPyYEHUUgAEwA9QHoA+EPjD6mPgQQAdhiYNEqQMdrU2HQMQ5/96KGfGsQFq2HV3Oun4DGNcDCOV8IZaQiShkMg5gmu8ZS0gjCU4lwNb0whmDhA7yByECEeiRymHy+zVmhHP2bW4MAXiRmF4E+L9MEk+8sqm2Q4mmMHhOIGt/crROkHYLiK4D4Mv5QrMIg1PJdPwxwzSLhA4tXA4RiAD+IIQ/mLM7BYXRB8ITAB7VBH67e2PDPrdd8ireEQgztTzQfS2DbgNQn8d1RoURwxRhMKeFMcM0S+h+iFAFRKgMIlSWsxsOs4+BXxHzgx2tDU+q0WXueEIgp/zk2HoptB8AeHM+15HJOGRiBGCZ/QJLyGQsna2a/BpGRRGuhIhUFs8okTN8GMCDBP5Re2vTS257U+wUvUBa2rq2MOh7yCcrZRqQ8RGwNSmwHg/MY2CeelMVoXLoZTUQ4fJcTRc3jCeZcHdZxHzgmasWx9x2pxgpWoGctP21UEQGvkPAB3K+CDNkfBjSiE99fixjNWnEIKFDK6uGXlkLCD1n0x5jCIQfSRL/vndj3etuO1NMFKVA1m/vX2bJ1G8BOiXXa3DKgIwPgaU16flkejSZThjlNdAragGh5WrW6yTBvBWQt3RsXnTQbWeKgaITyJq23hYB+QgBS3O6wAlGDZZWWhiTslIkdGiVddDLagAx/8X2EiXFoDYI61/3bGx61W1n3KSoBLK2rfcsAfkbAHW5fJ4tEzI6mJ2BYh4NwONZcQYRQSuvhV7ZoIRxYhIE3O4z5Fdf2NIUddsZNygagbS0db6ZIR5DjsE4GwlYsSFkpm5ZWpCxoSkLfCJYBn/tYkD35+PyQuIoMd/U3tpw30JLEReFQNZv7zvFkubjANXM+8PMsGJD4FQi62mZjIOT0axRQ+gB6DWLvLR+UVQw8DhL8cG9/1TX4bYvTuG6QFbf13eSrstdAC+f94dZwhoZzK60ZQkrNjwl1tDLqqFXL1LTqfyJE+NLjU31t//xIpq59qYEcFUg6bJ0fiqXbFU63hjIylKxZaanVBnPkdDhqztJjRoFhpj/JjS6utTLWFy9nZqSvpeTOEwD1nB/tjhSySmC0cKVCCxZrcRhA0x0tiXxTMv9Xde67YuduDaCtNzf/T+Z8IP5fo5TBqzoADKD8Ynaqgn0ykboVbmXbCnmDoPujYrEh45sXBqf/d3ewhWBjNZW/Q2YXyl4OlM1mPHE6JpHKjn+FAkdvvqlEMGcK1MUufEsC/meUls3cX6K9UUWkrS7MU9xyGR8ijis2FCWOIQ/hMCik5U43OF0YvHXlrbOvApKiw3HBbJuXe8HQDhnPp9hIwEZH8p4QsKKDmRlqrRwOfyNK9XahpswGhjijy1tPa1uu1IoHJ1ipbuL+Dswj5XyKTHHWGo3Y7Vci1TBV3dSgb1V5IEk0GfaW+u/5bYj+eLsCJL0fRXzEYc5jTgmlZLo5bVKHMWHYPA3mx/ovtVtR/LFsRFktEL3FYDmNAdiy4Q13I8JcTCs2GBWswS9sgF6VYMd7ioKBIG+3r6p7kavlqg4NoKY0rxxruIAS8iskWO0nCRLHI1KHB6Awf/c/EDPN9z2I1ccGUFO/UlXoynoVcyx+4g1fDyrfEROylbp5bXQa3Lv8KNwHmK6uX1z/Vfc9mO+ODKCpDT6NOYqjmh2bZVMjGSLI1KlxOFBmPjLzW3dn3Tbj/liv0C2s0bAlrm8VSbjWVW5Yx1GxtDC5dBVQO5ZCPjGuge63uO2H/PBdoGslT2XzqXjIVsmZHz4hI+FPwRfbW6bDBVFgwDTfevu7zrXbUfmiu0CEcyzF7MxQ2ZudmKZrsod3ctBQoe/fqkqVS8NghD00Prt/cvcdmQu2PqNa/5FTzmI3j3b+2R8OKsljxUbzqrK9dUvVSvkpQSjwZTmL07a/lruLWMdwlaBUBxvxSw1V5wyshosyGQ8q4TEV7NY1VaVIAS8ISKD33fbj9mwec4iL5rxZeasGiuWFjg50RtAC1dCK5//LlyFNyDwtS1tXXNK4LiFrQJh0MUzvS7jGVOp0ThkLO4Quh++WpXOLXUY9H9btnWvcduPE2HbQuH67YM1lkz24AQiZNOANTJxFODkTU/+hhULZiegXxBqgwRdEMp9BEHpk0EYwHCKwQwMpSSiKYblyYKNWXk6Mlh/3jMfoqmHrriMbb01LZk4E6ATjlAyPjL+M0sLnBGH6GXVJSmOkE44pVrHhhodLdU+LIkInBTRUB8Sc7pTWQx0xyWOxiy8HrVwNCqxf8jES/0mDg1b051u4hXOilb2fAZA0RU32jaCNN/f/QkifHu612QynhV7WNHB8cBc6H74F60uiZQuATilWsfFSwK4cLEfzVU6NJv+4sMpxgt9Kew8amDH60kci03tUl/kJKUUbyi2lkL2dWcmNE/7PHP6CIKxh6NHmo07VLPY8+JYVqZh06og3rEsiKawM79LuY9wXpMf5zX58YU3luHl4yZ+eTCBh15NYDjlibElIEjeCeaLiqny174RpK3nMQJfMvl5GR+BHMtUMae7k4w2ktbC5fDVz789VrFwfpMf728O4dxGP4TrHcfSDKcYd74cw4/3xDwRvzDxtXs2Nd7nth9j2PbfuK6t+1UAK7KeZAlzsBdjK+YyGYNMpMVCJOBrOtmTB9SsLNdw0+lluGBR8S5m/r03hRueGEJXvOinXq9rAut2b2wYmf2t9mPn+D9lASMtholyEs4sRCyv9Zw4NAI+dVoEv7y8pqjFAQBvrPNh2yVVWFZW9Ec7LJEWbnTbiTHsEQgzYXITapZZlbky4/AaEjr0Sm/1sKoPCfzwoip86JQwdI+ETEsiGr59XgV8Re4vEz6zdnvvErf9AGwSyIZ7u8IAsm5VU0aPjLSuVlnnqcB8Q42On19ajbPqcz9k1y3WVel41/KiH6lDJOXn3XYCsEkgUqfsRQzmSaNHLKtSVy/zTjnJKdU67nprFeqC3hH0ZN5Z/AIBAdc3b+9c6bYftvwvG7qWlT5OFyNO7C9nY2KHoFZe65nR47QaHT+6qAqV/iJJUeXIqTWeOHvRR5JuctsJW76ZJkRWBiIzGJdGYiL2IAG9otoOFwpOU1jgzgsqUe7ztjgAoMxHti1YFhZ6//rt3U1uemCLQA6gelwgnDKy+lixMbGlNj16FP/dTBBw2zkVqAl4Y6SbjYTlmZqugMn8ETcdsOfbuZEstHXHAYRkRvk6p5LZTd8qa20xX2g2rQrhjDr7AvLjSYn9QxYGDYnU6DJFmY9Q5iNEdMJJEQ0hvXC3/Pbj3jn3hiR95IyHj97q1jnudt6+h8AylFlGIjNHj3C5J0aPsE742Knz6rM9K6YEnugy8MhrSezqNNA9y+KdRsCKcg0t1TpOrfbhwsV+LC/PfT3j14eTs7+pWCDURmP6+wD82A3zdn5DD0sj0Tj+iGV2s+kyb4weG1cFCza1MiXw0MEE7nw5hqNRa/YPjGIxsH/Iwv4hC786lMStzwHNVTouPSmAy5YGsKpi7mI5MGThZwcSs7+xiCCJD8AlgdgWqrXc33OvOdJ3zdhec5mMjxcpCt0P/5K1dpkuGATgN++owYo87tZjHIla+PiuIXQMFH56c3qdD62rgrhsaQCBGaLvzpjEB/40gP1DcxdnsaAJbf3ujbUvO23Xvv0glvFKZiOGzH5XIlxpl9mCsq5aL4g49g2auHbHIAYMe+qgnu1N4dneFG55dgTvXhHElcsCOK3WN373G04xfn04gf94KYa+RNHXYk2LKeX7AedLUGwTCEeHxg93ZGllnVUuIt4QyIUFqK9KWozP/nXYNnFkMmgwtu6NY+veOIIaYUlEICWB16OWV7JWJ4QgW8F8k9Ol8LblLdmnPzf+c+YpUHrAM0WJp9Xmn7n66YEE9tgwrZqNhMXYP2Th8Ij3xZGGlp3S1nW201ZtE8i+/7HmZTA6AWQF5yJcYZfJgrOmMv/p1UOveisgLmYk0Uanbdq78kW8C8xZxxaIcLmtJgsFAWgM5SeQuMnY7aE1h+KHrnTaos1Lw2Jn5uhBQocIFHZNwS78GuVdFt7r0YC4iGle3da1ykmD9gokGHgkc/TQPDJ6ACjIltmU0kfB8QGXOWnPVoHsu27NfjaTz48bC3inhahRgMi2PiSKZm96qSAh3u6kPdur71jS/eMPPJK9AtKr12aeI0C5j3BqdfGX03gJAp8/umPVEWwXiCb0HxIjRUL3THp3jMECrF1cs9YbMZeHqGt+sNexMgzbBbL/n8/rZk3bIYJF3+l+CgeG8y/JuHJZoOgbOngO5vOcMuXIBgchra+Tz3t30n2D+adox/aSvKEAi46KNAS80SlbjgjkwI0X/0Evqxqa/Z3FxTM9hemlXO4j/OeFlXjbSYGCXG+hw4wNTtlyZoscM5HP57lo9c/HjLwD9THCOuE751Xg5jPKPL+nvQg4zalA3RGBrGvrXM4880lTxchwivFUtzH7G+cIAdi8OoTfXVmDzatDHtkXXnwQULV6W78jfbOciUFAjq5+FpJ7X4nP/qZ5UuUXuPmMMjxyZQ22rA0hqJQyb3w+62Qn7DgiEIZY4YQdO/jzUaMgwfp0LIlo+N+nl+EPV9Xgw+vDqPKXRlMIJ2DAkZ5ZTv2PrHDITsFhALc8G7X1cJqagMAnTo3gT++uwdfeVI51VZ4L15xHcukIhIGlTtixiye7DEfK1v2C8K4VQTx0WTV+emk13r0i6Jm+v45D5Mg5684IhOCtztTTcOuzIzjg4F7u9dU6bn1TOR57Zy0+uj6MxpBSyiTqnDDiyF+dQN5oYTIDwynGh/48iP6ksyW6jSGBj50awY6ranHHWypxTqPfvk4b3sKR75RDAmFH1G43R6IWPvz4EIYM5/ewCgIuXOzHPRdW4qHLqnHlssBCTxOXzgjCBO9sBJmFF/pSeP/OAVe7gzRX6bjtnAr8+ooa/OPK4EIViiN7tx1aSUdJ1Vh0DJh476PH8fded4/1Xl6u4Zazy/HwFTW4fGlgoU29HPlOORX5lVw5a2dMYsuOAdzV7v7hmCvLNXzz3ApsvbhqIaWIlUCKHYuBb74QxXt+fxzPujyaAMCZ9T789NJqfP70MpSVwDENs1BSAilp9gyYuGbHAG5+etj1Rg0aAdeuDeHhy2twdoMqsc8XpwRSuIq/IkUy8OCBBC77dT++tzuGuOnuvKspLHDPhVX4+KmRUt0X70iLeiWQAhMzGd99KYpLf92PH+6JuyoUjYCPrA/jtnOK/2TbHCghgZAzv0wx0ZuQ+PfnRvC2X/XjrvYYBl1YOxnjiqUB3PmWylKrGi4hgTA8t5uwUPQnJb75QhQX/KIPNz01bMvxB3Ph3CY/vnFuRSmtmQw6YcSpgbfXITtFiyEZvziYwD8+chzX7RzAH15PQjo8qFy02I8bNninN9ksOPKdciZpTuiztV7cYzzVncJT3SmcFNGwaVUQ71sVcmwb7n9fF8bfelL401GPh4XEfU6YcWYEkWoEmY4jUQu3vxDFJQ/34d/+PoLDI/ZXCxOAr5xZjmqvn9jLVDoCIeA1J+x4lajJuO+VOK74TT8+/cSQ7Uek1YcE/tcpnmsRkA3zYSfMOHUbOeiQHU8jGfjda0m863f9+Mjjg3ip376AftOqIOq9vMdE0KuOmHHCCEEedMJOqSAZ2HnUwMZHj+OTfxnCwQJ0eJxMQCNcs8Z73S7HIKB0BCLB+52wU2owgN8fSeKdv+3H7S9EC36cwpXLvFsBnEppB5yw44hAOlqbDgELdy0kXywGftAew5YdA+iOF04lSyIa1td4sfqXR/ZdU3vECUsOraQTA3jREVslzHN9Kbz30ePYW8A2ROc3ea/QmlOGY6utjkVpBHrBKVulTE88vQ+lUCJp9uD+ESs6VLXytl2OHKTjXBqD+RnHbJU4gwbj47uGkCjATq21ld4TiExGwdK8wQlbjgnEYvEXp2wtBA6PWNhWgLaojWHvpXrZSICkvGTltx5rtNuWY3+dvZtr9wDoccreQuD/Hcy/oNVrFb7SSIClCSb4ZFLfYrc9524f6UD9r47ZWwDsGzTzLqPXKL0m4hmMiQ6XAthstzmnx9dHHbZX8hRii6/pdFlxHljx4fGfyR94Q/PdHbb26HVUIGThd07aWwiE9fzu/gmLXe/KMh9kIjr+M+k+Mk3rUjvtOSqQ9qsbXgGwz0mbpYwgoDqQn0Dc3js/H2QiCpYT6W3S/QDJi+y06XgKg4FfOW2zVDm91pd3kN3jcheW+SBjE8UYpPsAIhDjrXbadDwJTswPguhTTtvNF0HA2Q0+nFnvR31QICUZfUmJPQMmnu5OYTjl/J34Hcvybw1lZ8VwoZHxkfGfSR+tACA0rbl7b8sr169tt8Om4wLpaG14ct0DvYcAXu607Vw5o86HL51VjlUV2rSvpyTw52NJ3NMRd6wd6aoKDe9blX81rlcEIo0EpDmR1ha+4PjPZJkbANgiEOdXiYgYkD913G6OXLzEjx9fXHVCcQCATwCXLAlg2yVVuO/iKlywyN4jCiI64ZY3FaaVz3N97neEnAsyOtGjgXQfICZ+eSqrWG2XXVeWUQn8IzfszpfqgMDX3jS/TiBn1Pvw/Qsq8bNLq3HF0kDBm7ZV+gl3vbUSGwpQhbt/yEL7cY+MILEJgWSNHpofpPnX2GXXFYG0tza9BA8sGm5eHcy5x21LtY5vnJs+ouC65hDqgvn9qX0CuK45hEeurMUb6wrTUtSJY+UKgYwNQZrpJhNEBPJNVCCTPwgQrbPLtmuVaky4mxhvdsv+XDi3AKXgK8o13PiGMnz2H8rw994Unuw08LfuFF4ZMmc9iEej9FFsVy4P4splAdTmKbJMTAn84qA3BGJFj4//nE7tTvwdhD8AENt2XqFrAikLm23RqPZ1gGrc8mE26grY+UMj4Kx6H86qn7j79yYkDo9YiJuclQUjAEvLNKyu1OC3qbHuT/bFXW+0PSdMA1Ysc/U8Y3rlC6TFwvYd0OSaQJ65anGspa37Dga+4JYPs2H3CnNdUOQ99cqFQYNxx+6Y43ZzwRzOGD2EPpHeBSD8451ZItjOGjZSwTfvu1rrbBjyOwCKdpzvijt3qq2TfPvFKAYMD4weUsIamRCICEyktUnombEIrTb6bWkZ6apA9m9p6mbgPjd9mImnu72RAp0PvzyYQNu+/PeROIE51DdeWkIk0lOqUSiQ3ddL+NmWaZbru2WEZf4fgIuyD+ZDBxMwPFTpOhtP96TwL08Pe6MLrJSwhieaJ45mq8YeQWTEIgBgJUxb7mauC6T96sWHiMU9bvsxHZ0xibvbvXG3nY3n+1L42K7BgrcOsgtzpD9j9KCs6ZUIhDPEkiYZTA3DBlwXCACkLPFvKNJY5Hu7o/jNYW8fb/LIa0lct3PQlfPdc0JKWIMT7ZzJH8pI7RJEcErbVPPIxqW23MmKQiD7rqk9QsDtbvsxHZKBz/11CFv3xr0xNcnAlMAdu2O44cnCNHhwCnOgKyv2EBnxRnr0mPK1tWX0AIpEIAAQjpi3AM40JJ4vFgNffXYEH/zToO2NpQvFC/3ps9y/81LU8XNI8kEaiazMFWVNp6YdPQDg+HRPFoKiEcgzVy2OEeNf3PZjJnZ1Gnj37/rxsV1D+PMxoyi/eK8MmvjC34ax+bHj2OPSaVb5YB7vBHM6UCKhZQXjJxg9ABs34RXXbn1man6g91ECX+K2K3NhUVjgimVBXLE0gFNdbOGZsBh/6TRw/74Enug0PDcVHEPGR2B0Hxx/rIUrxlO7JDRo5bVTgvP0i/hOx6aGT9rhU3F1DSNisa37w6zheQBF33r8WEzino4Y7umIYVFY4PwmP85f5MeZ9T7U2HxATWdMYlengZ1Hk3iiM+WpGGNapITZf3T8Ien+rHUPESybXhwAiHmPXW4V1wgySsv93Tcy4Va3/ciHZWUaNtTqWFOp4+RyDSsrdDSGxLyrgwcNxrGYhaNRib2DJl7sT+HFfhM9BWxiXQyYfa/DHI09iAhaWc34ng/SfNDKT1yyR8Rvb9/U+JgdfhXXCDJKY1P97Z1dPe8CcK7bvuTK4RFr9Ei17BRxSCfUBQUiOiGk0/iecosZ0dGCxbjFSMl0MaOXmirkioyPjIsDGA3MMzZEiVDZTB+3dDNgW1vbohxBAKB5e+dKkuI5ABVu+6KwEWnCOHZgYr+HpkOLVI1Pp0QgDBGasYrkvzpaG86yy72iyWJNZs/GplcJ/HG3/VDYS6rv9azNUCJcMS4OElo69pgBBu2w07+iFQgAtLc2bmXgB277obAHc6g3a6+HCJaBxMTefxGqOGFgPo7knXb5BxS5QADAqhj8GICn3fZDUVhkIgrzeOf4Y+ELZG2GEv5Q1tbaExANmPJxezwc9cPOixeCfe9Yk9SE/l4Qut32RVEgTAOpnomTwUloWYE4CX22uAMAwKCfv7ClKTrrG/Og6AUCALs31hyWLN4JwBvb4BQnRkoYPa9lV+qGK7KLESOVs0+tAAgp77XR07QNuw0Uir2tdU+DeAuA0loAWGCk+l6DNCYKb0WoHKRNrDZo4YqsxzNwtF1vsDVABzwkEADo2NT4MwJ9xm0/FLmR6j2SHZQHwtmr5f5QVhwyI4Qf2bEHfTKeEggAtLfWfwtEX3TbD8X8MPuPwYoOjD8WvgBEcGIbOWn+OcUdoyTIoP8orIfT4zmBAEDHpvovMeFrbvuhmBvmQA/MzO2zerYYSGjQyuYWdwAAA3e2X1t/rOCOToMnBQIAezY13ATwl932QzEz5kAPzMGu8cek6dAyFgNBAiJSdaIy9mlgQxf6Nwvv6fR4ViAA0NHa+K/EuMltPxTTY/YfyxaH0KFlZagIWqRyrkH52Gfu2r2xxrGNdZ4WCAC0b274GoE+DZXdKirM3iPZ0ypNH51GTaRztUhVViO4WSF0+yz/zYX1dGY8LxAgHbgT83uh1kncR0qkeg7BzAjISfeNjhwTXzctUjmXlfLJfO7Fq6ts2147HUVbzZsLLW2db2aIXwKod9uXBYlpwOjJXucg3QctnB2Aa+HKuadzx67D2NXeWn/B6HHijlESI8gY7a1NfzVN7Y0APeW2LwsNmYgieexA9iKgLzBJHKPTqnmKA8CIxeJ6p8UBlJhAgHQLIbNi4K0A3+W2LwsFa7gfRterWSfQikA4q3R9XBy++Z+rSOCP7v2nuo4CuTtP2yVMS1vXFgZ9F2rTlT1IE6m+17OPJyBKl49kCoFEOuaYT0A+CgP/uae14QOFcDcXSm4EyaS9tXErWeYGBmwtiV6IyPgIjGMHssUhNIhJo0R6EbA6J3EAeL4sYn4if29zp6RHkDEu3Ml6Z1fPZwHcDA90SylqpIR5/FjWHnJgtHQkVJaVqSLNPym1Ow8IR3SpnfvS5trXZn+zfSwIgYyxdlvXyUIT3wf4bW774kVkfARm/9HxLbLA6JQqWDYl8Bb+UDoGyY1eKcVb3Io7MllQAgGQbk63vftqYroVwBK33fEC0kjAPN4JmRjJep40HSJckbVNFkjHIJnd2OfJiGD5tpc3NxVFJnLhCWSUDVs7IymfuIkJn4Gadk2PlDAHukdXxDPOUCQCBcJZTaWB0Z2A8y4dyYT7wbiqY3PjE7k7XVgWrEDGWLW1s0EPiBuI8UkA807QlyRSwhzphzXYm5W6BdKVuFqoPKtvFTA6pQqVz7kidyp0SEq6vBimVZkseIGM0bLt6HLWtM8D9H4A80/WlwLSgjncDyvj6LMx0i14IlPWMdL7yStyKRvJ5HlmeseezfVHZ3+rsyiBTGLV1s4Gn48+AqKPAqhz2x9HMA2Yw8dhDfeNd1Yfg0ikp1NZR6ClEYHwjD1z5wKD7g0Y1oftbr6QK0ogJ+CMh4+GozH9fWBcD+A8t/2xAxkfhjXSn7WWMQYRgfyhdLA9KU1Lmg8iVJbr2sYYcQJ9or21vqj7nimBzIE1bb0tAnwdgTcCWOG2P/kgjQRkdBDWyPEp0yhgdMTwB6cXxminwxxqqbKvw9hlsbi+2OKN6VACmQ/MdEpb19mSaCNA7wSw1m2X5oJMxiBjw5DxYcjU9EdBktDTwphmKgXQ6HQqktd0CuB+Bn15T0f9d/FF8sT+HSWQPFi7retkTcPlEuLtBD4PRVJmL40EYCRgxYchE9FpRwpgdBql+0H+4AmmS2PCOOHJTnMlCeBun+W/2en9HPmiBFJAmrf3NEPyuQDOBHAagNMIqLLXKo/ANAxzZKhGJqNgI3FCQYxBug/CF0xnnqb94hdSGPxj09S/su+a2iP5XMgtlEBs5tT7+5aamjwZzCsgeSWIlgOonfRPA+ADMNZ/cwRACoAFoC/rH/MhCHqVgFdT8eZCnAAAAShJREFUKe3A2Bdv5W273s7SvIGkvIQJvsl+kO5LdxPxBaesYYy/R+gnzFjNk9dB+HEqKb+9f0uTp1vGKoGUGGtv21mXTCRbSfdvFoHQOaT7iHT/jF948gUg/OF81zISBDzMRPc2NdT99o8XkfdOEJ0GJZASpvnujpWmaV1KkBcDuACEprHXSPOPBuWBXKdRFoBnCbRTSt4RMOXjxbqWkQ9KIAuINXfvbSE2/4GCFavJ718DUDPAy5Ge2k13Uo0EMIj0OeT7AOwhcAcIe3Uz8IzXAu5cUAJRjHPatoHqOFsRlimjqlqOPHPVYtUlRqFQKBQKhUKhUCgUCoVCoVAoFAqFQqFQKBQKhUKhUCgUCoVCoVAoFAqFQqFQKBQKhUKhUCgUCoVCMX/+PzDTVJQfCf8AAAAAAElFTkSuQmCC'/%3E%3C/defs%3E%3C/svg%3E%0A") no-repeat center;
                    background-size: contain;
                }
            }

            &_teams {
                @media screen and (min-width: $desktop) {
                    order: 6;
                }

                &:before {
                    background: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Crect width='24' height='24' fill='url(%23pattern0)'/%3E%3Cdefs%3E%3Cpattern id='pattern0' patternContentUnits='objectBoundingBox' width='1' height='1'%3E%3Cuse xlink:href='%23image0' transform='scale(0.005)'/%3E%3C/pattern%3E%3Cimage id='image0' width='200' height='200' xlink:href='data:image/png;base64,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'/%3E%3C/defs%3E%3C/svg%3E%0A") no-repeat center;
                    background-size: contain;
                }
            }
        }

        &__text {
            display: block;
            margin-bottom: 2px;
        }

        &__desc {
            display: block;
            color: $color-gray-light-text;
            font-size: $font-xs;
            line-height: 1;
        }
    }
</style>