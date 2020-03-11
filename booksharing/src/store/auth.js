import firebase from 'firebase'
/*eslint-disable */
export default {
    state: {
        userData: {
            name: undefined,
            phone: undefined,
            uid: undefined
        }
    },
    getters: {
        getUData: state => {
            return state.userData
        }
    },
    actions: {
        async login({
            dispatch
        }, {
            email,
            password
        }) {
            try {
                await firebase.auth().signInWithEmailAndPassword(email, password)
                await dispatch('getUserData')
            } catch (error) {
                throw error
            }
        },
        async register({
            dispatch
        }, {
            name,
            email,
            phone,
            password
        }) {
            try {
                await firebase.auth().createUserWithEmailAndPassword(email, password)
                const uid = await dispatch('getUid')
                await firebase.database().ref(`/users/${uid}/info`).set({
                    name,
                    phone
                })
            } catch (error) {
                throw error
            }
        },
        getUid({
            dispatch
        }) {
            const user = firebase.auth().currentUser
            return user ? user.uid : null
        },
        async getUserData({
            dispatch,
            commit
        }) {
            const uid = await dispatch('getUid')
            try {
                return firebase.database().ref(`/users/${uid}/info`).once('value').then(function (snapshot) {
                    //Получение инфы из бд
                    if (snapshot.val() !== null) {
                        const userData = {
                            uid: uid,
                            data: snapshot.val()
                        }
                        commit("setUserData", userData)
                    }
                })
            } catch (error) {
                throw error
            }
        },
        async logout({
            commit
        }) {
            await firebase.auth().signOut()
            commit("removeUserData")
        }
    },
    mutations: {
        setUserData(state, payload) {
            state.userData.name = payload.data.name
            state.userData.phone = payload.data.phone
            state.userData.uid = payload.uid
        },
        removeUserData(state) {
            state.userData.name = undefined
            state.userData.phone = undefined
            state.userData.uid = undefined
        }
    }
}