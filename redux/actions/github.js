import { logError } from '../../utils/logDev'

export const LOAD_REPOS_LIST_START   = 'LOAD_REPOS_LIST_START'
export const LOAD_REPOS_LIST_SUCCESS = 'LOAD_REPOS_LIST_SUCCESS'
export const LOAD_REPOS_LIST_FAILURE = 'LOAD_REPOS_LIST_FAILURE'

function loadReposListStart () {
  return {
    type: LOAD_REPOS_LIST_START
  }
}

function loadReposListSuccess (repos) {
  return {
    type: LOAD_REPOS_LIST_SUCCESS,
    repos
  }
}

function loadReposListFailure (error) {
  return {
    type: LOAD_REPOS_LIST_FAILURE,
    error
  }
}

export function loadReposList (username) {
  return (dispatch, getState, api) => {
    const { github } = getState()

    if (github && github.length > 0) {
      return
    }

    dispatch(loadReposListStart())

    api.loadRepos(username)
      .then(repos => {
        dispatch(loadReposListSuccess(repos))
      })
      .catch(error => {
        logError(error)
        dispatch(loadReposListFailure(error))
      })
  }
}
