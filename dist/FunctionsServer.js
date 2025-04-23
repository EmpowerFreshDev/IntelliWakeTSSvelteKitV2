import { FormDataFromObject, ObjectFromFormData } from '@empowerfresh/intelliwake';
/**
 * This function retrieves form data from a given Request object.
 * If an error is encountered while trying to get the form data,
 * it catches this error and instead converts the Request body to JSON, then returns FormData created from this JSON object.
 *
 * @async
 * @export
 * @function RequestFormData
 * @param {Request} request - The request from which to retrieve the form data.
 * @returns {Promise<FormData>} A promise that resolves to the form data if successful, or the form data from JSON if an error is encountered.
 * @throws Will throw an error if the network request fails.
 */
export async function RequestFormData(request) {
    try {
        return await request.formData();
    }
    catch (err) {
        return FormDataFromObject(await request.json());
    }
}
/**
 * This function retrieves an object of generic type T from a given Request object.
 * If an error is encountered while trying to get the object from form data,
 * it catches this error and instead returns the object from the Request body parsed as JSON.
 *
 * @async
 * @export
 * @function RequestObject
 * @param {Request} request - The request from which to retrieve the object.
 * @returns {Promise<T>} A promise that resolves to an object of type T if successful, or the JSON parsed object from the request if an error is encountered.
 * @throws Will throw an error if the network request fails.
 * @template T - The type of object to be returned. It defaults to any.
 */
export async function RequestObject(request) {
    try {
        return ObjectFromFormData(await request.formData());
    }
    catch (err) {
        return await request.json();
    }
}
