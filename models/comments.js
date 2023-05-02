const db = require('./../db_connection');

class Comment {

    constructor({id, post_id, content}) {
        this.id = id;
        this.post_id = title;
        this.content = content;
    }

    // VG TODO
    static async  getAllForPostById() {
        return new Promise((resolve, reject) => {
            resolve('Lorem ipusm')
        })
    }


    // VG TODO
    async create(){
        const sql = ``;
        const values = []

        const result = await db.query(sql, values, function (error, results, fields) {
            if (error) throw error;
        });

    }

}


module.exports = Comment;