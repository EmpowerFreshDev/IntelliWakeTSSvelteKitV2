/* eslint-disable @typescript-eslint/no-explicit-any */
import { invalidate, invalidateAll } from '$app/navigation';
import { CleanNumber, IsOn, ObjectFromFormData, ToArray } from '@empowerfresh/intelliwake';
import { ShowActivityOverlay, ShowMessageBox } from './Definitions';
import { tick } from 'svelte';
/**
 * FormEnhance is intended to be used with Svelte's `use:enhance` feature. It takes the place of repeated boilerplate
 * code including handling showing/hiding the overlay, displaying response messages, and providing callbacks for success
 * and failure
 * @param options Toggle activity overlay, invalidate, reset, and success message and provides callback for API
 * success and failure
 * @constructor
 */
export function FormEnhance(options) {
    if ((options?.validateFormData || options?.validateObject) && !options.input)
        throw new Error('"input" field must be included to validate form, for example: use:enhance={(input) => FormEnhance({input, ...options})}');
    if (options?.input) {
        const validation = options.validateFormData ? options.validateFormData(options.input.formData, options.input.action) :
            options.validateObject ? options.validateObject(ObjectFromFormData(options.input.formData), options.input.action) :
                true;
        if (validation !== true && validation !== undefined) {
            if (typeof validation === 'string') {
                ShowMessageBox.show(validation);
            }
            return options.input.cancel();
        }
    }
    if (options?.showActivityOverlay ?? true)
        ShowActivityOverlay.show();
    if (options?.onStart)
        options.onStart();
    return async (response) => {
        await tick();
        const reset = (!(response.result?.data?.success ?? true) || !!response.result.data?.errorMessage) ? false : (options?.reset ?? false);
        if (reset) {
            response.update({
                reset
            });
        }
        if ((options?.displayResult ?? true) && response.result?.data?.errorMessage) {
            ShowMessageBox.show(response.result.data.errorMessage);
        }
        else if ((options?.displayResult ?? true) && response?.result?.data?.message) {
            ShowMessageBox.show(response.result.data.message);
        }
        else if (response.result?.data?.success && options?.message) {
            ShowMessageBox.show(options.message);
        }
        if (options?.invalidate) {
            if (options.invalidate === 'All' || options.invalidate === 'app:All') {
                if (options.verbose)
                    console.info('Invalidating All');
                await invalidateAll();
            }
            else {
                for (const invalidateItem of ToArray(options.invalidate)) {
                    if (options.verbose)
                        console.info('Invalidate', invalidateItem);
                    await invalidate(invalidateItem);
                }
            }
        }
        if (options?.showActivityOverlay ?? true)
            ShowActivityOverlay.hide();
        if (!response.result?.data?.errorMessage && IsOn(response.result?.data?.success ?? true) && CleanNumber(response.result?.status ?? 200) === 200) {
            if (options?.onSuccess)
                options.onSuccess(response.result?.data, response.action.search);
        }
        else {
            if (options?.onFailure)
                options.onFailure(response.action.search, response.result.data);
        }
        await tick();
        if (options?.onEnd)
            options.onEnd();
    };
}
