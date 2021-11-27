(() => {
  function createTitle(text, element = 'h2') {
    let title = document.createElement(element);
    title.innerHTML = text;
    title.classList.add('title')
    return title;
  }  
  
  function createPost(text) {
    const card = document.createElement('div');
    const cardBody = document.createElement('div');
    const cardPost = document.createElement('p');

    card.classList.add('card');
    cardBody.classList.add('card-body');
    cardPost.classList.add('card-text');
    cardPost.textContent = text;
    
    card.prepend(cardBody);
    cardBody.prepend(cardPost);
    return card
  }

  async function loadPage(id) { 
    const response = await fetch(`https://gorest.co.in/public-api/posts/${id}`);
    const page = await response.json();
    return page
  };

  async function loadComment(id) {
    const response = await fetch(`https://gorest.co.in/public-api/comments?post_id=${id}`);
    const comment = await response.json();
    return comment
  }

  function createComment(name, text, email) {
    const card = document.createElement('div');
    const img = document.createElement('img');
    const cardBody = document.createElement('div');
    const cardTitle = document.createElement('h5');
    const cardText = document.createElement('p');
    const cardLink = document.createElement('a');
    
    card.classList.add('card', 'mb-3');
    img.classList.add('card-img-top');
    img.setAttribute('src', 'https://i.dlpng.com/static/png/6542314_preview.png');
    img.style.width = '5rem'
    cardBody.classList.add('card-body');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = name;
    card.classList.add('card-text');
    cardText.textContent = text;
    cardLink.classList.add('card-link');
    cardLink.href = email;
    cardLink.textContent = `Email: ${email}`;

    cardBody.prepend(cardTitle, cardText, cardLink);
    card.prepend(img, cardBody);

    return card
  }

  document.addEventListener('DOMContentLoaded', async () => {
    const container = document.querySelector('.container-sm');
    const pageParams = new URLSearchParams(window.location.search);
    const pageId = pageParams.get('id');
    
    const page = await loadPage(pageId);
    
    const loadedComment = await loadComment(pageId);
    const commentList = document.createElement('div');
    commentList.classList.add('list-group', 'mt-3');
    const commentTitle = document.createElement('h2');
    commentTitle.textContent = 'Comments'
    commentTitle.style.color = 'white';
    commentList.append(commentTitle);

    loadedComment.data.forEach(el => {
      const comment = createComment(el.name, el.body, el.email);
      commentList.append(comment);
    });
    const title = createTitle(page.data.title, 'h1');
    const post = createPost(page.data.body);

    container.append(title, post, commentList);

  })
  
})()
