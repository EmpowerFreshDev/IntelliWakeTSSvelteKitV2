import type { Page } from '@sveltejs/kit';
export type TNavComponent = {
    component: string;
    title: string;
    link: string;
    current: boolean;
};
export declare class PathAnalyzer {
    page: Page;
    base: string | undefined;
    constructor(page: Page, base?: string);
    get crumbs(): string | null;
    get crumbsComponents(): string[];
    get pathName(): string;
    get pathNameComponents(): string[];
    get activePageComponents(): string[];
    get baseComponents(): string[];
    get preComponents(): string[];
    get predecessorComponents(): string[];
    get successorComponents(): string[];
    get activePageFull(): string;
    get activePage(): string;
    get activePageSlug(): string;
    get activePageSlugs(): string | null;
    get basePath(): string;
    basePathReplaced(newBaseComponent: string, slug?: string | string[]): string;
    apiPath(action: string): string;
    get backPath(): string;
    get navComponents(): TNavComponent[];
    isOpen(path: string | null): boolean;
    open(path: string, closeIfOpen?: boolean): string;
}
