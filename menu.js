const url = 'https://chinese-food-db.p.rapidapi.com/';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '5eed3c027bmsh4d1ad96c5545644p12e317jsn0e300efdb8bc',
		'x-rapidapi-host': 'chinese-food-db.p.rapidapi.com'
	}
};

let list;
let all = document.getElementById('all')

fetch(url, options)
  .then(response => response.json())
  .then(response => {
    console.log(response)
    list = response;

    const foodMenuDiv = document.getElementById('food-menu');
    list.forEach((item) => {

      const itemDiv = document.createElement('div');
      itemDiv.className = 'food-item';

      itemDiv.innerHTML = `
      <div class="card d-flex flex-column text-center fst-italic rounded-3" style="width: 18rem; height: 370px;">
        <img src="${item.image}" class="card-img-top rounded-top" alt="${item.name}" style="height: 200px; object-fit: cover;">
        <div class="card-body d-flex flex-column">
          <h6 class="card-title">${item.title}</h6>
          <p class="fs-7">Price:$9</p>
          <a href="#" class="btn btn-primary mt-auto" >Add to cart</a>
        </div>
      </div>
    `;
    foodMenuDiv.appendChild(itemDiv);
    });
  })
  .catch(error => console.error('Error fetching food items:', error));

   

  