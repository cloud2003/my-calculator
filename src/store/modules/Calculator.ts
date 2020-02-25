import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import Store from '@/store';

@Module({dynamic: true, store: Store, name: 'app', namespaced: true})
export default class Calculator extends VuexModule {
    public resultX: string = '';
    public isReady: boolean = true;

    @Mutation
    public SET_RESULT(val: string): void {
        this.resultX = val;
    }

    @Mutation
    public SET_STATUS(val: boolean): void {
        this.isReady = val;
    }

    @Action
    public async SetResult(val: string): Promise<void> {
        try {
            this.SET_STATUS(false);
            await new Promise((resolve => setTimeout(() => resolve(), 1000)))
                .then((d) => {
                    console.log('data:', d);
                    this.SET_RESULT(val);
                    this.SET_STATUS(true);
                });
        } catch (e) {
            console.log(e);
        }
    }
}

export const CalcStore: Calculator = getModule(Calculator);
