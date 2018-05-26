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
        const formData = new FormData();
        formData.append('video', data.video);

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        const response = await Api.post('jobs', formData, config);

        if (callback) callback(true, response.data);
    } catch (err) {
        if (callback) callback(false, err);
    }
}

async function show(id, callback) {
    try {
        const response = await Api.get(`jobs/${id}`);

        if (callback) callback(true, response.data);
    } catch (err) {
        if (callback) callback(false, err);
    }
}

export default {
    index,
    store,
    show,
}