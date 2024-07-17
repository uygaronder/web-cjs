export const pingServer = async () => {
    console.log(process.env.REACT_APP_API_URL);
    await fetch(`${process.env.REACT_APP_API_URL}/api/ping`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });
};