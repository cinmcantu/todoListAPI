class UserDAO {
    constructor(db) {
        this.db = db
    }

    getAllUsers() {
        return new Promise((resolve, reject) => {
            this.db.all("SELECT * FROM USUARIOS", (error, rows) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(rows)
                }
            })
        })
    }
}

module.exports = UserDAO