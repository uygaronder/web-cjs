export const pingServer = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/api/ping`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });
};