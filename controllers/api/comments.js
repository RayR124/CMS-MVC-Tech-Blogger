const router = require('express').Router();
const { response } = require('express');
const { Comment } = require('../../models');

// gets all comments
router.get('/', (req, res) => {
    Comment.findAll()
        .then(CommentData => res.json(CommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    if (req.session) {
        Comment.create({
            comment_text: req.body.comment_text,
            user_id: req.session.user_id,
            post_id: req.body.post_id
        })
            .then(CommentData => res.json(CommentData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
});

router.delete('/:id', (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(CommentData => {
            if (!CommentData) {
                res.status(404).json({ message: 'That comment might not exist.' });
                return;
            }
            res.json(CommentData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;