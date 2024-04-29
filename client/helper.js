// Displays an error message by setting the text content of the element with id 'errorMessage'.
const handleError = (message) => {
    document.getElementById('errorMessage').textContent = message;
};

// Asynchronously sends a POST request to the specified URL with the given data and applies the handler function to the response.
// It handles redirection and errors specifically, logging them or displaying them using handleError.
const sendPost = async (url, data, handler) => {
    try {
        // Execute a fetch request with method POST, including headers for JSON content type and the stringified data as the body.
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        // Parse the JSON response.
        const result = await response.json();

        // If the response includes a redirect, navigate to that URL.
        if (result.redirect) {
            window.location = result.redirect;
        }

        // If the response contains an error, log a placeholder message and display the error message.
        if(result.error){
            console.log('doing stuff');
            handleError(result.error);
        }

        // If a handler function is provided, execute it with the result as an argument.
        if(handler) {
            handler(result);
        }

        // Return the result for further processing.
        return result;
    } catch (error) {
        // Log any errors that occur during the fetch request.
        console.error('Error:', error);
    }
};

// Asynchronously sends a POST request with XML content type to the specified URL with the given data and applies the handler function to the response.
// It handles redirection and errors specifically, displaying the error using handleError.
const sendPostXML = async (url, data, handler) => {
    try {
        // Execute a fetch request with method POST, including headers for XML content type and the stringified data as the body.
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/xml',
            },
            body: JSON.stringify(data),
        });

        // Parse the text response.
        const result = await response.text();

        // If the response includes a redirect, navigate to that URL.
        if (result.redirect) {
            window.location = result.redirect;
        }

        // If a handler function is provided, execute it with the result as an argument.
        if(handler) {
            handler(result);
        }
    } catch (error) {
        // Log any errors that occur during the fetch request and display the error message.
        console.error('Error:', error);
        handleError(error.message);
    }
};

// Asynchronously sends a GET request to the specified URL and applies the handler function to the response.
// It handles redirection and errors specifically, logging them or displaying them using handleError.
const sendGet = async (url, handler) => {
    try {
        // Execute a fetch request with method GET, including headers for JSON content type.
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Parse the JSON response.
        const result = await response.json();

        // If the response includes a redirect, navigate to that URL.
        if (result.redirect) {
            window.location = result.redirect;
        }

        // If the response contains an error, log a placeholder message and display the error message.
        if(result.error){
            console.log('doing stuff');
            handleError(result.error);
        }

        // If a handler function is provided, execute it with the result as an argument.
        if(handler) {
            handler(result);
        }

        // Return the result for further processing.
        return result;
    } catch (error) {
        // Log any errors that occur during the fetch request.
        console.error('Error:', error);
    }
};

// Logs a success message to the console. This can be expanded to include additional success handling logic.
const handleSuccess = (message) => {
    console.log(message);
    // Add your success handling code here
};

// Exporting the functions to be used in other files.
module.exports = {
    handleSuccess,
    handleError,
    sendPost,
    sendPostXML,
    sendGet
};
