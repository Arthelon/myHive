import { genModule, packModule } from '../module'

const SET_LOADER = ''

const {state, reducer, actions} = genModule({
  loader: {
    type: SET_LOADER,
    value: false,
    actions: 'setLoader'
  }
})

export const module = packModule({
  name: 'alert',
  state,
  reducer: {
    ...reducer
  },
  actions: {
    ...actions
  }
})

const nActions = module.actions

export const setLoader = nActions.setLoader
