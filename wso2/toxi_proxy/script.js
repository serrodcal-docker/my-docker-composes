import http from 'k6/http';
import { check } from 'k6';
import { Counter } from 'k6/metrics';

// A simple counter for http requests
export const requests = new Counter('http_reqs');
// you can specify stages of your test (ramp up/down patterns) through the options object
// target is the number of VUs you are aiming for
export const options = {
    stages: [
        { target: 1, duration: '1m' },
        { target: 5, duration: '1m' },
        { target: 10, duration: '1m' },
        { target: 15, duration: '1m' },
        { target: 20, duration: '1m' },
        { target: 15, duration: '1m' },
        { target: 10, duration: '1m' },
        { target: 5, duration: '1m' },
        { target: 1, duration: '1m' },
        { target: 5, duration: '1m' },
        { target: 10, duration: '1m' },
        { target: 15, duration: '1m' },
        { target: 20, duration: '1m' },
        { target: 15, duration: '1m' },
        { target: 10, duration: '1m' },
        { target: 5, duration: '1m' },
        { target: 0, duration: '1m' },
    ],
    thresholds: {},
};

export default function () {
    const host = 'http://localhost:8290'

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
        timeout: '5s',
    };

    // our HTTP request, note that we are saving the response to res, which can be accessed later
    // const res = http.get(host + '/health/hospital/SVQ002', params);
    const res = http.get(host + '/toxi/test', params);
    const checkRes = check(res, {
        'Response status is 200': (r) => r.status === 200,
    });

}