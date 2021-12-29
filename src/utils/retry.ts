import logger from "./logger";

function waitFor(millSeconds: any) {
    return new Promise((resolve: any, reject: any) => {
        setTimeout(() => {
            resolve();
        }, millSeconds);
    });
}

export async function retryFetching(fn: any, nthTry: number, delayTime: number): Promise<any> {
    const response = await fn();

    const { data } = response;
    if (data.message) {
        logger.info(new Date(Date.now()).toISOString(), nthTry, "time");

        await waitFor(delayTime);
        return retryFetching(fn, nthTry - 1, delayTime);
    }

    return data;
}
