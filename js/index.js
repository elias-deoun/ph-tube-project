function loadCategories() {
  // fetch the data
  fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    // convert promise to json
    .then((res) => res.json())
    // send data to display
    .then((data) => displayCategories(data.categories))
}
function displayCategories(categories) { 
  // get the container
  const categoriesContainer=document.getElementById('container');
  // loop operation on array
  for(const cat of categories){
    const categoryDiv=document.createElement('div')
    categoryDiv.innerHTML=`
    <button class="btn btn-sm bg-[#25252520] hover:bg-[#FF1F3D]">${cat.category}</button>
    `;
    // append child
    categoriesContainer.append(categoryDiv)
  }
}
loadCategories()