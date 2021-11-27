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

  document.addEventListener('DOMContentLoaded', async () => {
    const container = document.querySelector('.container-sm');
    const pageParams = new URLSearchParams(window.location.search);
    const pageId = pageParams.get('id');
    const page = await loadPage(pageId);
    const title = createTitle(page.data.title, 'h1');
    const post = createPost(page.data.body);

    container.append(title, post);

  })
  
})()
