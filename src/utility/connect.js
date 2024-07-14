export const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/v1/ping`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });
};