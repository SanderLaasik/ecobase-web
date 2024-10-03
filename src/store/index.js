import { createStore } from 'vuex'

export default createStore({
    state () {
        return {
            stands: []
        }
    },
    mutations: {
        setStands(state, { stands }) {
            state.stands = stands
            console.log(state.stands)
        }
    },
    getters: {
        getStandsAndCoordinates (state) {
            console.log("In get: " + state.stands)
            var stands = []
            if(state.stands.length>0) {
                state.stands.forEach(stand => {
                    stands.push({
                        "id": stand.id,
                        "coordinates": stand.geoJson.coordinates
                    })
                });
            }
            return stands
        }
    }
})