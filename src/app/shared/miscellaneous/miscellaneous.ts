/**
 * PI constant
 * See {@link Todo} for service using it
 */
export const PI = 3.14;

/**
 * PIT let
 * See {@link Todo} for service using it
 */
export const PIT = 4;

/**
 * A foo bar function
 *
 * @param {string} status A status
 */
export function foo(status: string) {
    console.log('bar');
}

export class StringIndexedItems<T> {
    [index: string]: T;
}

export interface InterfaceWithIndexable<T> {
    [yala: string]: T;
}

export const yo: { [index: string]: { message: string } } = {};
