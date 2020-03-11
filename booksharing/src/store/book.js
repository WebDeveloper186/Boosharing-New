import firebase from 'firebase'
/* eslint-disable*/
export default {
    state: {
        books: [],
        currentBook: undefined
    },
    getters: {
        getBooks: state => {
            return state.books
        },
        getCurrentBook: state => {
            return state.currentBook
        }
    },
    actions: {
        async addBook({
            dispatch
        }, {
            title,
            author,
            img,
            short_description,
            genre,
            owners
        }) {
            try {
                await firebase.database().ref(`/books/${title}`).set({
                    author,
                    img,
                    short_description,
                    genre,
                    owners
                })
            } catch (error) {
                throw error
            }
        },
        getBooks({
            dispatch,
            commit
        }) {
            try {
                return firebase.database().ref(`/books`).once('value').then(function (snapshot) {
                    commit("setBooks", snapshot.val())
                })
            } catch (error) {
                throw error
            }
        },
        currentBook({
            dispatch,
            commit
        }, book) {
            commit("setCurrentBook", book)
        }
    },
    mutations: {
        setBooks(state, payload) {
            const length = Object.keys(payload).length
            for (var i = 0; i < length; i++) {
                const name = Object.keys(payload)[i]
                const data = {
                    name: name,
                    data: payload[name]
                }
                state.books.push(data)
            }
        },
        setCurrentBook(state, data) {
            state.currentBook = data
        }
    }
}