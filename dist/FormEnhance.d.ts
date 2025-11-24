export type TEnhanceGenericResponse = Record<string, never> & {
    success?: boolean;
    message?: string;
    errorMessage?: string;
};
export type TEnhanceOptions<FORM extends Record<string, never> = Record<string, never>, RESPONSE extends TEnhanceGenericResponse = TEnhanceGenericResponse> = {
    /** Input parameters from the SvelteKit "enhance" object */
    input?: {
        action: URL;
        formData: FormData;
        form: HTMLFormElement;
        controller: AbortController;
        cancel(): void;
        submitter: HTMLElement | null;
    };
    validateFormData?: (formData: FormData, action: URL) => boolean | string | undefined | null | void;
    validateObject?: (object: FORM | any, action?: URL) => boolean | string | undefined | null | void;
    showActivityOverlay?: boolean;
    invalidate?: string | string[] | 'All' | 'app:All' | null;
    reset?: boolean;
    displayResult?: boolean;
    message?: string;
    onStart?: () => void;
    onEnd?: () => void;
    onSuccess?: (data: RESPONSE, originalAction: string) => void;
    onFailure?: (originalAction: string, data: any) => void;
    verbose?: boolean;
};
/**
 * FormEnhance is intended to be used with Svelte's `use:enhance` feature. It takes the place of repeated boilerplate
 * code including handling showing/hiding the overlay, displaying response messages, and providing callbacks for success
 * and failure
 * @param options Toggle activity overlay, invalidate, reset, and success message and provides callback for API
 * success and failure
 * @constructor
 */
export declare function FormEnhance<FORM extends Record<keyof FORM, FORM[keyof FORM]>, RESPONSE extends TEnhanceGenericResponse>(options?: TEnhanceOptions<FORM, RESPONSE>): any;
