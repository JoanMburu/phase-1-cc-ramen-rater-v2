// Callbacks
const handleClick = (ramen) => {
  const ramenDetailDiv = document.getElementById('ramen-detail');
  ramenDetailDiv.innerHTML = `
    <img class="detail-image" src="${ramen.image}" alt="${ramen.name}" />
    <h2 class="name">${ramen.name}</h2>
    <h3 class="restaurant">${ramen.restaurant}</h3>
  `;
  document.getElementById('rating-display').textContent = ramen.rating;
  document.getElementById('comment-display').textContent = ramen.comment;
};

const addSubmitListener = () => {
  const form = document.getElementById('new-ramen');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      handleSubmit();
    });
  }
};

const displayRamens = () => {
  fetch('http://localhost:3000/ramens')
    .then(response => response.json())
    .then(ramens => {
      const ramenMenuDiv = document.getElementById('ramen-menu');
      ramenMenuDiv.innerHTML = '';
      ramens.forEach(ramen => {
        const img = document.createElement('img');
        img.src = ramen.image;
        img.alt = ramen.name;
        img.addEventListener('click', () => handleClick(ramen));
        ramenMenuDiv.appendChild(img);
      });
    })
    .catch(error => console.error('Error fetching ramens:', error));
};

const handleSubmit = () => {
  const newRamen = {
    name: 'New Ramen',
    restaurant: 'New Restaurant',
    image: './assets/image-placeholder.jpg',
    rating: 0,
    comment: 'New Comment'
  };

  const ramenMenuDivBefore = document.querySelectorAll('#ramen-menu img');
  const form = document.getElementById('new-ramen');
  if (form) {
    form.dispatchEvent(new Event('submit'));
  }
  const ramenMenuDivAfter = document.querySelectorAll('#ramen-menu img');
  
  expect(ramenMenuDivAfter.length).toBe(ramenMenuDivBefore.length + 1);
  expect(ramenMenuDivAfter[ramenMenuDivBefore.length].src).toBe(newRamen.image);
};

const main = () => {
  displayRamens();
  addSubmitListener();
};

main();

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};