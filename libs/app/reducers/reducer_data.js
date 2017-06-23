export default function reducer (
  state = [], action) {
  switch (action.type) {
    case 'FETCH_FILE':
      return action.payload
    case 'FETCH_DATA_FULFILLED':
      return action.payload
    default:
      return state
  }
}
