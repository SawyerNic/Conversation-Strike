const handleError = (message) => {
    document.getElementById('errorMessage').textContent = message;
};

const sendPost = async (url, data, handler) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });


        const result = await response.json();

        if (result.redirect) {
            window.location = result.redirect;
        }

        if(result.error){
            console.log('doing stuff');

            handleError(result.error);
        }

        if(handler) {
            handler(result);
        }

        return result;
    } catch (error) {
        console.error('Error:', error);
    }
};

const sendPostXML = async (url, data, handler) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/xml',
            },
            body: JSON.stringify(data),
        });


        const result = await response.text();

        if (result.redirect) {
            window.location = result.redirect;
        }

        if(handler) {
            handler(result);
        }
    } catch (error) {
        console.error('Error:', error);
        handleError(error.message);
    }
};

const sendGet = async (url, handler) => {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();

        if (result.redirect) {
            window.location = result.redirect;
        }

        if(result.error){
            console.log('doing stuff');

            handleError(result.error);
        }

        if(handler) {
            handler(result);
        }

        return result;
    } catch (error) {
        console.error('Error:', error);
    }
};

// In helper.js
const handleSuccess = (message) => {
    console.log(message);
    // Add your success handling code here
};

module.exports = {
    handleSuccess,
    handleError,
    sendPost,
    sendPostXML,
    sendGet
};