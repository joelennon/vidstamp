import Api from './Api';

async function index(callback) {
    try {
        const response = await Api.get('jobs');

        if (callback) callback(true, response.data);
    } catch (err) {
        if (callback) callback(false, err);
    }
}

async function store(data, callback) {
    try {
        const response = await Api.post('jobs');

        if (callback) callback(true, response.data);
    } catch (err) {
        if (callback) callback(false, err);
    }
}

export default {
    index,
    store,
}