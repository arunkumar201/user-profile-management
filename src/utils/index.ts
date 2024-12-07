/**
 * Simulate an asynchronous delay
 * @param sec - Number of seconds to delay
 */
export const wait = (sec: number) => new Promise(resolve => setTimeout(resolve,sec * 1000));
