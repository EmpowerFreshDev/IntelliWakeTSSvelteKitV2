import { SvelteComponent } from "svelte";
import type { TAboutBullets } from './AboutData';
declare const __propDef: {
    props: {
        bullets: TAboutBullets[];
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type AboutBulletsProps = typeof __propDef.props;
export type AboutBulletsEvents = typeof __propDef.events;
export type AboutBulletsSlots = typeof __propDef.slots;
export default class AboutBullets extends SvelteComponent<AboutBulletsProps, AboutBulletsEvents, AboutBulletsSlots> {
}
export {};
