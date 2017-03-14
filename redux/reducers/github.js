import {
  LOAD_REPOS_LIST_START,
  LOAD_REPOS_LIST_SUCCESS,
  LOAD_REPOS_LIST_FAILURE
} from '../actions/github'

export default function github (store = { loading: true }, action) {
  switch (action.type) {
    case LOAD_REPOS_LIST_START:
      return { loading: true }

    case LOAD_REPOS_LIST_SUCCESS:
      return { loading: false, items: action.repos }

    case LOAD_REPOS_LIST_FAILURE:
      return { loading: false, error: action.error }
  }

  return store
}
