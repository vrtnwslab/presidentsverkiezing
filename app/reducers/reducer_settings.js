export default function reducer (
  state = {
    projectName: 'FR_president',
    realtime: false,
    fetched: false,
    departement: false,
    round: 2
  }, action) {
  switch (action.type) {
    case 'FETCH_FILE':
    case 'FETCH_DATA_FULFILLED':
      return {
        ...state,
        fetched: true
      }
    case 'SET_DEPARTEMENT':
      return {
        ...state,
        departement: action.payload
      }
    case 'SET_ROUND':
      return {
        ...state,
        round: action.payload
      }
    default:
      return state
  }
}
