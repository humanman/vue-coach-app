const BASE_URL = process.env.BASE_URL
export default {
  async contactCoach(context, payload) {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message
    }
    const response = await fetch(`${BASE_URL}/requests/${payload.coachId}.json`, {
      method: 'POST',
      body: JSON.stringify(newRequest)
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to send request');
      throw error;
    }


    responseData.id = responseData.name
    responseData.coachId = payload.coachId
    context.commit('addRequest', responseData);
  },
  async loadRequests(context) {
    const coachId = context.rootGetters.userId
    const response = await fetch(`${BASE_URL}/requests/${coachId}.json`);

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch!');
      throw error;
    }

    let requests = []

    for (const [key] in responseData){
      const message = {
        id: responseData[key].id,
        coachId: coachId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message
      }

      requests.push(message)
    }
    context.commit('setRequests', requests)

  }
}