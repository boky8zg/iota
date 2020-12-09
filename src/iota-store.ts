import { DeepPartial } from './deep-partial';
import { deepPatch } from './deep-patch';
import { Listener } from './listener';

export class IotaStore<TState> {

    private state: TState;
    private listeners: Set<Listener<TState>> = new Set();
    
    constructor (initialState: TState) {
        this.state = initialState;
    }

    getState(): TState {
        return this.state;
    }

    setState(state: DeepPartial<TState>, overwrite: boolean = false): void {
        if (!overwrite) {
            state = deepPatch(this.state, state);
        }

        this.state = state as TState;

        for (const listener of this.listeners) {
            listener(state as TState);
        }
    }

    subscribe(listener: Listener<TState>): void {
        this.listeners.add(listener);
    }

    unsubscribe(listener: Listener<TState>): void {
        this.listeners.delete(listener);
    }

}
