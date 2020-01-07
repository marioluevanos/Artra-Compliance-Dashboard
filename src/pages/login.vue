<template>
    <section class='login' v-show='!user'>
        <AppLogo ref='logo'/>
        <form class='form' @submit.prevent='submitForm' ref='form'>
            <label class='label email-label'>
                <input 
                    class='input' 
                    ref='formEmail' 
                    placeholder='Email' 
                    type='email' 
                    name='email' 
                    v-model='email' 
                    :disabled='formSubmitted' required/>
            </label>
            <label class='label password-label'>
                <input 
                    class='input' 
                    ref='formPassword' 
                    placeholder='Password' 
                    :type=' isPasswordVisible ? "text" : "password"' 
                    name='password' 
                    v-model='password' 
                    :disabled='formSubmitted' required/>
                <AppIcon type='password-hide' @click.native='isPasswordVisible = !isPasswordVisible' v-if='!isPasswordVisible'/>
                <AppIcon type='password-see' @click.native='isPasswordVisible = !isPasswordVisible' v-if='isPasswordVisible'/>
            </label>
            <button 
                class='button-large button-default'
                :disabled='formSubmitted' 
                type='submit'>{{ !formSubmitted ? (user ? 'Success' : 'Login') : 'Authenticating...'}}
            </button>
        </form>
        <footer ref='footer'>
            <a href='#'>Terms of Use</a>
            <a href='#'>Terms of Service</a>
        </footer>
    </section>
</template>

<script>
import gsap from 'gsap'
import AppLogo from '@/components/AppLogo.vue'
import AppIcon from '@/components/AppIcon.vue'

export default {
    name: 'Login',
    components: {
        AppLogo,
        AppIcon
    },
    data() {
        return {
            formSubmitted: false,
            email: '',
            password: '',
            storageKey: 'token',
            isPasswordVisible: false
        }
    },
    computed: {
        user() {
            return this.$store.getters.user
        }
    },
    watch: {
        user(val) {
            if (val && val.token) {
                this.rememberRoute()
            }
        } 
    },
    mounted() {
        this.initStorage()
        if (this.user) {
            this.rememberRoute()
        }
        this.mountedTimeline()
        this.$refs.form.focus()
    },
    methods: {
        rememberRoute() {
            const item = JSON.parse(window.sessionStorage.getItem('arta-admin')) || {}
            const { name = 'summary' } = item
            this.$router.push({ name, params: {id: ''} })
        },
        mountedTimeline() {
            return gsap.fromTo(this.$el, { opacity: 0 }, { opacity: 1, delay: 0.3, duration: 1, ease: 'expo.out' })
        },
        initStorage() {
            const token = this.getStorage(this.storageKey)
            this.$store.commit('SET_USER', token)
        },
        setStorage(token) {
            window.sessionStorage.setItem(this.storageKey, token)
        },
        getStorage(token) {
            return JSON.parse(window.sessionStorage.getItem(this.storageKey))
        },
        submitForm() {
             
            // Disable the button
            this.formSubmitted = true

            // Add fake login
            const fakeToken = { token: 'test-user' }
            setTimeout(() => {
                this.$store.commit('SET_USER', fakeToken)
                this.setStorage(JSON.stringify(fakeToken))
                this.formSubmitted = false
            }, 1000)

            // const { email, password } = this
            // await this.$store.dispatch('login', {
            //     email,
            //     password
            // })
            // .then(res => {
            //     const {user} = this.$store.getters
            //     if (!user) {
            //         alert('Failed to login')
            //         this.formSubmitted = false
            //     }
            //     else {
            //         this.setStorage(user.token)
            //     }
            // })
            // .catch(err => {
            //     console.log(err)
            //     this.formSubmitted = false
            // })
        }
    }
}
</script>

<style lang='scss' scoped>

@import '../styles/vars';
@import '../styles/mixins';

.login {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    min-height: 100vh;
    opacity: 0;
}

.login .app-logo {
    width: vw(275);
    margin: vw(90) auto vw(0);
    position: relative;
}

.form {
    width: vw(560);
    background: white;
    padding: vw(40);
    display: flex;
    flex-direction: column;
    border: 1px solid rgba($color-gray, 0.2);
}

.form .label {
    border-bottom: 1px solid rgba($color-gray, 0.15);
    display: flex;
    align-items: center;
    position: relative;
}

.form .label .app-icon {
    position: absolute;
    right: 0;
}

.form .input {
    width: 100%;
    padding: vw(15) vw(5);
    border: none;
    background: none;
}

.form button {
    justify-content: center;
    margin-top: vw(15);
}

.form .input:focus {
    outline: none;
}

.form .input:focus:placeholder-shown {
    background: rgba($color-primary-light, 0.15);
    height: 100%;
}

.form .input:focus::placeholder {
    color: $color-navy-dark;
}

::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    color: $color-gray;
    font-family: $font-medium;
}
::-moz-placeholder { /* Firefox 19+ */
    color: $color-gray;
    font-family: $font-medium;
}
:-ms-input-placeholder { /* IE 10+ */
    color: $color-gray;
    font-family: $font-medium;
}
:-moz-placeholder { /* Firefox 18- */
    color: $color-gray;
    font-family: $font-medium;
}

input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
    border: none;
    -webkit-text-fill-color: $color-navy-dark;
    -webkit-box-shadow: 0 0 0px 1000px white inset;
    transition: background-color 5000s ease-in-out 0s;
}

footer {
    align-self: stretch;
    display: flex;
    justify-content: space-between;
    border-top: 1px solid rgba($color-gray, 0.15);
    margin: 0 vw(40);
    padding: vw(40) 0;
}

</style>
