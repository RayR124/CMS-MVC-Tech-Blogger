const comment = async function (event) {
    event.preventDefault();
    const blog_id = document.querySelector('.newComment').dataset.blogid;
    const commentDescription = document.querySelector('#commentDescription').value.trim();
    if (commentDescription) {
        await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                blog_id,
                commentDescription,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        document.location.reload();
    }
};

document.querySelector('.newComment').addEventListener('submit', comment);
