interface map {
    [mode: string]: { BASE_URL: string };
}

const map: map = {
    development: {
        BASE_URL: "http://152.136.185.210:5000"
    },
    production: {
        BASE_URL: "http://152.136.185.210:5000"
    },
    test: {
        BASE_URL: "http://152.136.185.210:5000"
    }
};
const mode: string = process.env.NODE_ENV || "production";
export const { BASE_URL } = map[mode];
export const TIME_OUT = 10000;
