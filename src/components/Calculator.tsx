import {Component} from "vue-property-decorator";
import {VueComponent} from "@/shims-vue";
import styles from "./Calculator.css?module";
import {CalcStore} from '@/store/modules/Calculator';

@Component
export default class Calculator extends VueComponent {

    private numbers: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    private isResult: boolean = false;
    private buffer: string = '';

    private isNumber(val: string): boolean {
        return !isNaN(parseFloat(val)) && isFinite(+val);
    }

    private get isReady(): boolean {
        return CalcStore.isReady;
    }

    private get result(): string {
        if (this.isNumber(this.buffer.toString().slice(-1))) {
            return eval(this.buffer.toString());
        } else {
            return eval(this.buffer.toString().slice(0, -1));
        }
        // return CalcStore.resultX;
    }

    private clearResult(): void {
        CalcStore.SET_RESULT('');
        this.buffer = '';
    }

    private async equalResult(): Promise<void> {
        try {
            await CalcStore.SetResult(this.result);
            this.buffer = this.result;
            this.isResult = true;

        } catch (e) {
            this.isResult = false;
            console.log(e);
        }
    }

    private operation(val: string): void {
        let bufferLastChar: string = this.buffer.toString().slice(-1);

        if (bufferLastChar && !this.isNumber(bufferLastChar) && !this.isNumber(val)) {
            this.buffer = this.buffer.slice(0, -1) + val;
        } else {

            if (this.isResult && this.isNumber(val)) {
                this.buffer = '';
            }
            this.isResult = false;
            this.buffer = this.buffer.toString() + val;
        }
    }

    render() {
        const items = this.numbers.map((item) => {
            let idClass: string = `div${item}`;
            return <div class={[styles.box, styles[idClass]]}
                        onClick={() => this.operation(item.toString())}>{item}</div>
        });

        return (
            <div class={[styles.parent, {[styles.disabled]: !this.isReady}]}>
                <div class={[styles.box, styles.result]}>
                    <div class={styles.line}>{this.buffer}</div>
                    <div class={styles.line}>{this.result}</div>
                </div>

                {items}

                <div class={[styles.box, styles.tools, styles.div11]} onClick={() => this.clearResult()}>C</div>
                <div class={[styles.box, styles.tools, styles.div12]} onClick={() => this.operation('-')}>-</div>
                <div class={[styles.box, styles.tools, styles.div13]} onClick={() => this.operation('+')}>+</div>
                <div class={[styles.box, styles.tools, styles.div14]} onClick={() => this.equalResult()}>=</div>
            </div>
        )
    }
}
