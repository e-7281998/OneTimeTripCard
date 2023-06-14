import axios from 'axios';

const selectUserCardsByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        axios({
            method: "get",
            url: `/user-card/history/${userId}`,
        }).then((res) => {
            resolve(res.data);
        }).catch(error => { reject(error); });
    })
}

export { selectUserCardsByUserId };