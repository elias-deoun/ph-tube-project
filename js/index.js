function loadCategories() {
  // fetch the data
  fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    // convert promise to json
    .then((res) => res.json())
    // send data to display
    .then((data) => displayCategories(data.categories))
}
function loadVideos() {
  fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then((response) => response.json())
    .then((data) => displayVideos(data.videos))
}
function displayCategories(categories) {
  // get the container
  const categoriesContainer = document.getElementById('container');
  // loop operation on array
  for (const cat of categories) {
    const categoryDiv = document.createElement('div')
    categoryDiv.innerHTML = `
    <button class="btn btn-sm bg-[#25252520] hover:bg-[#FF1F3D]">${cat.category}</button>
    `;
    // append child
    categoriesContainer.append(categoryDiv)
  }
}
const displayVideos = (videos) => {
  const videoContainer = document.getElementById('video-container');

  videos.forEach(video => { 
    const videoCard=document.createElement('div')
    videoCard.innerHTML=`
    <div class="card bg-base-100 mt-5">
  <figure class="relative">
    <img class="w-full h-[150px] object-cover"
      src="${video.thumbnail}"
      alt="Shoes" />
      <span class="absolute bottom-2 right-2 bg-black text-white px-2 text-sm rounded">3hrs 56 min ago</span>
  </figure>
  <div class="flex gap-3 px-0 py-5">
    <div class="profile">
     <div class="avatar">
  <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring-2 ring-offset-2">
    <img src="${video.authors[0].profile_picture}" />
  </div>
</div>
    </div>
    <div class="intro">
      <h2 class="font-semibold text-sm">${video.title}</h2>
      <p class="text-sm text-gray-400 flex gap-1"> ${video.authors[0].profile_name} <img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt=""></p>
      <h2 class="text-sm text-gray-400">${video.others.views}</h2>

    </div>
  </div>
</div>
    `;
    videoContainer.append(videoCard)
  })
}
loadCategories()
loadVideos()
// // {
//     "category_id": "1001",
//     "video_id": "aaal",
//     "thumbnail": "https://i.ibb.co/hdtZYbB/enchnting.jpg",
//     "title": "Enchanted Harmonies",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/jh1q2F3/shopia.jpg",
//             "profile_name": "Sophia Williams",
//             "verified": false
//         }
//     ],
//     "others": {
//         "views": "7.6K",
//         "posted_date": "16450"
//     },
//     "description": "'Enchanted Harmonies' by Sophia Williams enchants listeners with its delicate, soothing sounds and melodic complexity. Garnering 7.6K views, this piece is perfect for those seeking an immersive musical experience that blends elegance with emotion, offering a unique soundscape that resonates deeply with its audience."
// }