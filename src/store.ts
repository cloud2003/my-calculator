import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        resultX: '',
        isReady: true,
    },
    mutations: {
        setResult(state, val) {
            state.resultX = val;
        },
        setStatus(state, val) {
            state.isReady = val;
        }
    },
    actions: {
        async setResult(context, val) {
            try {
                context.commit('setStatus', false);
                await new Promise((resolve => setTimeout(() => resolve(), 1000)))
                    .then((d) => {
                        console.log('data:', d);
                        context.commit('setResult', val);
                        context.commit('setStatus', true);
                    });
            } catch (e) {
                console.log(e);
            }
        }
    },
})
