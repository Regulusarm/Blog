(() => {
  function createPagination(all, onePage, count) {
    const stage = Math.ceil(all / onePage);
    count = Math.ceil(count / onePage) - 1;
    console.log(count);
    const pagination = document.createElement('ul');
    pagination.classList.add('pagination');

    const previous = document.createElement('li');
    const preLink = document.createElement('a');
    
    previous.classList.add('page-item');
    preLink.style.cursor = 'pointer'
    preLink.classList.add('page-link');
    preLink.textContent = 'Previous';

    previous.addEventListener('click', () => {
      if(count < 1) {
        return
      }
      while(!(pagination.children[1] == pagination.lastChild)) {
        pagination.children[1].remove()
      }
      count--
      let start = onePage * count;
      let end = start + onePage;

      const currentPage = pages.slice(start, end);
      currentPage.forEach((el) => {
        pagination.lastChild.before(el)
      })
    })
    
    previous.append(preLink);
    pagination.append(previous);
    
    let pages = []
    for(let i = 1; i <= all; i++) {
      const item = document.createElement('li');
      const link = document.createElement('a');
      
      item.classList.add('page-item');
      link.classList.add('page-link');
      
      link.textContent = i;
      link.href = `index.html?page=${i}`
      
      item.append(link);
      pages.push(item);
    };

    let start = onePage * count;
    let end = start + onePage;

    const currentPage = pages.slice(start, end);
    currentPage.forEach((el) => {
      pagination.append(el)
    })
    
    const next = document.createElement('li');
    const nextLink = document.createElement('a');
    
    next.classList.add('page-item');
    nextLink.classList.add('page-link');
    nextLink.textContent = 'Next';
    nextLink.style.cursor = 'pointer'

    next.addEventListener('click', () => {
      if(count == (stage - 1)) {
        return console.log(stage);

      }
      while(!(pagination.children[1] == pagination.lastChild)) {
        pagination.children[1].remove()
      }
      count++
      let start = onePage * count;
      let end = start + onePage;

      const currentPage = pages.slice(start, end);
      currentPage.forEach((el) => {
        pagination.lastChild.before(el)
      })
    })
    
    next.append(nextLink);
    pagination.append(next);

    return pagination
  }
  function createTitle(text, element = 'h2') {
    let title = document.createElement(element);
    title.innerHTML = text;
    title.classList.add('title')
    return title;
  }  
  
  async function loadList(page) { 
    const response = await fetch(`https://gorest.co.in/public-api/posts?page=${page}`);
    const list = await response.json();
    return list
  };
  
  function createlist() {
    const list = document.createElement('ul');
    list.classList.add('list-group');
    return list
  }
  
  function createListItem(title, text, href) {
    const item = document.createElement('li');
    const cardBody = document.createElement('div');
    const cardTitle = document.createElement('h5');
    const cardText = document.createElement('p');
    const btn = document.createElement('a');

    item.classList.add('card', 'mb-3');
    cardBody.classList.add('card-body');
    cardTitle.classList.add('card-title');
    cardText.classList.add('card-text');
    btn.classList.add('btn', 'btn-primary');

    cardTitle.textContent = title;
    cardText.textContent = text;
    btn.textContent = 'Перейти к статье'
    btn.href = href;
    
    cardBody.prepend(cardTitle, cardText, btn);
    item.prepend(cardBody);

    return item
  }

  document.addEventListener('DOMContentLoaded', async () => {
    // container
    const container = document.querySelector('.container-sm');

    // pageID
    const pageParams = new URLSearchParams(window.location.search);
    const pageId = pageParams.get('page') || 1;
    console.log(pageId)
    const title = createTitle('Blog', 'h1');
    const list = createlist();
    const loadedList = await loadList(pageId);
    console.log(loadedList)

    // pagination
    const pages = loadedList.meta.pagination.pages;
    const limit = loadedList.meta.pagination.limit;
    const pagination = createPagination(pages, limit, pageId);

    loadedList.data.forEach(el => {
      const item = createListItem(el.title, el.body, `post.html?id=${el.id}` )
      list.appendChild(item)
    });

    container.prepend(title, list, pagination);
 })
 


})()