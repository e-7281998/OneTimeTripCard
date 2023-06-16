import axios from 'axios';

const selectUserCardsByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        axios({
            method: "get",
            url: `/user-card/history/${userId}`,
        }).then((res) => {
            let user = {};
            const userCards = res.data.map(userCard => {
                if (userCard.user instanceof Object) {
                    user = userCard.user;
                }
                userCard.user = user;
                return userCard;
            });
            resolve(userCards);
        }).catch(error => { reject(error); });
    })
}

export { selectUserCardsByUserId };