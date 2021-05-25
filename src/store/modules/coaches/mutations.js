export default {
  registerCoach(state, payload) {
    state.userIsCoach = true;
    state.coaches.push(payload);
  },
  setCoaches(state, payload) {
    state.coaches = payload
  }
};