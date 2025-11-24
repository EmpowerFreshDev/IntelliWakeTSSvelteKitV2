import { SvelteComponent } from "svelte";
import type { TAbout } from './AboutData';
import { type TAdjustment } from '@solidbasisventures/intelliwaketsfoundation';
declare const __propDef: {
    props: {
        abouts: TAbout[];
        filterBackAdjustment?: TAdjustment | undefined;
        filterBackMinorCount?: number | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type AboutProps = typeof __propDef.props;
export type AboutEvents = typeof __propDef.events;
export type AboutSlots = typeof __propDef.slots;
export default class About extends SvelteComponent<AboutProps, AboutEvents, AboutSlots> {
}
export {};
