const ADD_POST = 'ADD_POST'
const UPDATE_POST_TEXT = 'UPDATE_POST_TEXT'
const SET_USER_PROFILE = "SET_USER_PROFILE"
const initialState = {
    posts: [
        {id: 1, message: 'Glad to see everyone', likes: 0},
        {id: 2, message: 'Glad to see you', likes: 3},
        {id: 3, message: 'Glad to see everyone', likes: 5},
    ],
    postText: 'sd',
    profile: null
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:{
            let newPost = {
                id: Math.random(),
                likes: 0,
                message: state.postText
            }
            return {
                ...state,
                postText: '',
                posts: [...state.posts, newPost]
            }
}
        case UPDATE_POST_TEXT:{
            return {
                ...state,
                postText: action.newPostText
            }
        }
        case SET_USER_PROFILE:{
            return {
                ...state,
                profile: action.profile
            }
        }
        default:
            return state
    }
}

export const addPostAC = () => (({type: ADD_POST}))
export const updatePostMessageAC = (newPostText) => (({type: UPDATE_POST_TEXT, newPostText}))
export const setUserProfile = (profile) => (({type: SET_USER_PROFILE, profile}))

export default profileReducer