export default function reducer (
    state = {
      scale: 3000,
      width: 800,
      height: 800,
      center: [2.25, 46.25]
    }, action) {
  switch (action.type) {
    default: {
      return state
    }
  }
}
