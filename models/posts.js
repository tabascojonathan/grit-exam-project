const db = require('./../db_connection');

class Post {

    constructor({id, title, content}) {
        this.id = id;
        this.title = title;
        this.content = content;
    }

    static async  getBySlug(slug) {

        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM posts WHERE slug='${slug}'`, function (error, results, fields) {
                if (error) {
                    reject(error)
                }else{
                    if(results.length > 0){
                        resolve(results)
                    }else{
                        reject(new Error('None found'))
                    }
                }
            });
        })
    }

    static async  getAll() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM posts', function (error, results, fields) {
                if (error) {
                    reject(error)
                }else{
                    if(results.length > 0){
                        resolve(results)
                    }else{
                        reject(new Error('None found'))
                    }
                }
            });
        })
    }


    async create(){
        const sql = `
            INSERT INTO posts
                (user_id, slug, title, content)
            VALUES
                (?, ?, ?, ?)
            `;
            const values = [1, 'slug-slug-slug', this.title, this.content]

            var self = this;
            //const = await db.query(sql, values);
            const result = await db.query(sql, values, function (error, results, fields) {
                if (error) throw error;
                console.log('this:')
                console.log(self)
                self.id = results.insertId;
              });

    }


    // async save() {
    //     const sql = `
    //       INSERT INTO posts
    //         (user_id, slug, title, content)
    //       VALUES
    //         (?, ?, ?, ?)
    //     `;
    //     const values = [2, "slug-slug", this.title, this.content];
    //     const [result] = await db.query(sql, values);
    //     this.id = result.insertId;
    //     return this;
    // }

}


module.exports = Post;