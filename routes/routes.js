const express = require('express');
const router = express.Router();
const db = require('./../db_connection');
const authMiddleware = require('./../middlewares/auth');


router.get('/', (req, res) => {
    const data = {
        title: "Welcome",
        message: req.flash('message')
    }
    console.log(data.message)
    res.render('index', data)
})

router.get('/dashboard', authMiddleware, (req, res) => {
    if (req.isAuthenticated) {
        // If the user is authenticated
        const username = req.session.username;
        const data = {
            name: username,
            style: "color: red;",
            message: req.flash('message')
        }
        res.render('dashboard', data)
    } else {
        res.redirect('/login');
    }
})

router.get('/logout', (req, res) => {
    if (req.session.authenticated && req.session.username) {
        req.session.authenticated = false;
        req.session.username = null;
        req.flash('message', 'You are now logged out.');
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/create', authMiddleware, (req, res) => {
    if (req.isAuthenticated) {
        res.render('create');
    } else {
        res.redirect('/login');
    }
});

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    const values = [email, password];
    db.query(sql, values, function (error, results, fields) {
        if (error) throw error;

        if(results.length > 0){
            req.session.username = results[0].name;
            req.session.authenticated = true;
            req.flash('message', 'You are now logged in.');
            res.redirect('/dashboard');
        }else{
            req.flash('message', 'User not found');
            res.redirect('/login');
        }

    });

})

// SIGN UP
router.get('/signup', (req, res) => {
    res.render('signup')
})

// Route for creating a new user
router.post('/users', (req, res) => {
    const { name, email, password } = req.body;
    const user = { name, email, password };

    // Insert new user into MySQL database
    db.query('INSERT INTO users SET ?', user, (err, results) => {
        if (err) {
            console.error('Error creating new user: ', err);
            res.status(500).send('Error creating new user');
            return;
        }
        console.log('New user created with id: ', results.insertId);
        req.session.username = user.name;
        req.session.authenticated = true;
        res.redirect('/dashboard');
    });
});

router.get('/profile', authMiddleware, (req, res) => {
    if (req.isAuthenticated) {
        const username = req.session.username;
        const sql = 'SELECT name, email FROM users WHERE name = ?';
        db.query(sql, [username], (err, results) => {
            if (err) {
                console.error('Error fetching user data: ', err);
                res.status(500).send('Error fetching user data');
                return;
            }
            if (results.length > 0) {
                const user = results[0];
                res.render('profile', { name: user.name, email: user.email });
            } else {
                res.status(404).send('User not found');
            }
        });
    } else {
        res.redirect('/login');
    }
});

router.get('/stats', (req, res) => {
    const postsCountQuery = 'SELECT COUNT(*) AS posts_count FROM posts';
    const usersCountQuery = 'SELECT COUNT(*) AS users_count FROM users';

    db.query(postsCountQuery, (err, postsResult) => {
        if (err) {
            console.error('Error fetching posts count: ', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        db.query(usersCountQuery, (err, usersResult) => {
            if (err) {
                console.error('Error fetching users count: ', err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            const postsCount = postsResult[0].posts_count;
            const usersCount = usersResult[0].users_count;

            res.json({ posts_count: postsCount, users_count: usersCount });
        });
    });
});

module.exports = router;