const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// gets all users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    }).then(UserData => res.json(UserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'content', 'created_by']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_by'],
                include: {
                    model: Post,
                    attributes: ['title', 'post_id']
                }
            }
        ]
    }).then(UserData => {
        if (!UserData) {
            res.status(404).json({ message: 'That user might not exist... yet!' });
            return;
        }
        res.json(UserData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }).then(UserData => {
        req.session.save(() => {
            req.session.user_id = UserData.id;
            req.session.username = UserData.username;
            req.session.loggedIn = true;
            res.json(UserData);
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(UserData => {
        if (!UserData) {
            res.status(400).json({ message: 'That user might not exist... yet!' });
            return;
        }

        const validPassword = UserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: "Your password's gotta match, yo!" });
            return;
        }

        req.session.save(() => {
            req.session.user_id = UserData.id;
            req.session.username = UserData.username;
            req.session.loggedIn = true;
            res.json({ user: UserData, message: 'You did it! You logged in!' });
        });
    });
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        res.json({ user: UserData, message: 'Bye Bye! XD' });
        req.session.destroy(() => {
            res.status(404).end();
        });
    }
    else {
        res.status(404).end();
    }
});

router.put('/:id', (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    }).then(UserData => {
        if (!UserData) {
            res.status(404).json({ message: 'That user might not exist... yet!' });
            return;
        }
        res.json(UserData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    }).then(UserData => {
        if (!UserData) {
            res.status(404).json({ message: 'That user might not exist... yet!' });
            return;
        }
        res.json(UserData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;