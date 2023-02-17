//creates a new blog
const newBlog = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#blogTitle').value.trim();
    const description = document.querySelector('#blogDescription').value.trim();
    if (title && description) {
        const response = await fetch(`/controllers/api/blog`, {
            method: 'POST',
            body: JSON.stringify({ title, description }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            document.location.replace('/home');
        } else {
            alert("Errt, try again!");
        }
    }
};

document.querySelector('.newBlog').addEventListener('submit', newBlog);

//deletes the blog
const deleteBlog = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        const response = await fetch(`/controller/api/blog/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            document.location.replace('/home');
        } else {
            alert("Errt, you can't delet that!");
        }
    }
};

document.querySelector('.blog').addEventListener('click', deleteBlog);