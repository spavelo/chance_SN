import usersAPI from "../api/api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_COUNT = "SET_TOTAL_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IN_FOLLOWING_PROGRESS = "TOGGLE_IN_FOLLOWING_PROGRESS";

const initialState = {
    users: [],
    pageSize: 5,
    totalCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [],
}

const toggleSubscription = (users, action, actionType) => {
    return users.map(u => {
            if (u.id === action.userId) {
                return {...u, followed: actionType}
            }
            return u
        })
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                users: toggleSubscription(state.users, action, true)
            }
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: toggleSubscription(state.users, action,false)
            }
        }
        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_TOTAL_COUNT:
            return {
                ...state,
                totalCount: action.totalCount
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case TOGGLE_IN_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(userId => userId !== action.userId)
            }
        default:
            return state
    }
}

export const followSuccess = (userId) => (({type: FOLLOW, userId}))
export const unFollowSuccess = (userId) => (({type: UNFOLLOW, userId}))
export const setUsers = (users) => (({type: SET_USERS, users}))
export const setPage = (currentPage) => (({type: SET_CURRENT_PAGE, currentPage}))
export const setTotalUsersCount = (totalCount) => (({type: SET_TOTAL_COUNT, totalCount}))
export const toggleIsFetching = (isFetching) => (({type: TOGGLE_IS_FETCHING, isFetching}))
export const toggleFollowingProgress = (isFetching, userId) => (({
    type: TOGGLE_IN_FOLLOWING_PROGRESS,
    isFetching,
    userId
}))

export const getUsersThunkCreator = (page, pageSize) => async (dispatch) => {
    dispatch(toggleIsFetching(true))

    let response = await usersAPI.getUsers(page, pageSize)
    dispatch(setUsers(response.items))
    dispatch(setPage(page))
    dispatch(setTotalUsersCount(response.totalCount))
    dispatch(toggleIsFetching(false))
}

export const unFollow = (userId) => async (dispatch) => {
    dispatch(toggleFollowingProgress(true, userId))
    let data = await usersAPI.unFollow(userId)

    if (data.resultCode === 0) {
        dispatch(unFollowSuccess(userId))
    }
    dispatch(toggleFollowingProgress(false, userId))
}
export const follow = (userId) => async (dispatch) => {
    dispatch(toggleFollowingProgress(true, userId))
    let data = await usersAPI.follow(userId)

    if (data.resultCode === 0) dispatch(followSuccess(userId))

    dispatch(toggleFollowingProgress(false, userId))
}
export default usersReducer