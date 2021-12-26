import logger from "pino";

const log = logger({
    prettyPrint: true,
    base: {
        pid: false,
    },
    timestamp: () => `${Date.now().toLocaleString()}`,
});

export default log;
