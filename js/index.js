const showLoader = () => { 
  document.getElementById('loader').classList.remove('hidden')
  document.getElementById('video-container').classList.add('hidden')
}
const hiddenLoader = () => { 
  document.getElementById('loader').classList.add('hidden')
  document.getElementById('video-container').classList.remove('hidden')
}

const removeActiveClass = () => {
  const activeBtn = document.getElementsByClassName('active')
  for (const btn of activeBtn) {
    btn.classList.remove('active')

  }
}

function loadCategories() {
  // fetch the data
  fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    // convert promise to json
    .then((res) => res.json())
    // send data to display
    .then((data) => displayCategories(data.categories))
}
function loadVideos(searchText = '') {
  showLoader()
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((response) => response.json())
    .then((data) => {
      const allBtn = document.getElementById('btn-all');
      allBtn.classList.add('active');
      displayVideos(data.videos)
    })

}
const loadCategoryVideos = (id) => {
  showLoader()
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;

  fetch(url)
    .then(res => res.json()).then(data => {
      removeActiveClass()
      const clickBtn = document.getElementById(`btn-${id}`)
      clickBtn.classList.add('active')
      console.log(clickBtn)
      displayVideos(data.category)
    })

}
const loadVideoDetails = (videoId) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  fetch(url)
    .then(res => res.json())
    .then(data => displayVideoDetails(data.video));
  // console.log(videoId)
}
const displayVideoDetails = (video) => {
  console.log(video)
  document.getElementById('video_details').showModal();
  const detailsContainer = document.getElementById('details_container');
  detailsContainer.innerHTML = `
 <div class="card bg-base-100 image-full shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body flex justify-center items-center flex-col">
    <h2 class="card-title">${video.title}</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
  
  </div>
</div>

`

}
function displayCategories(categories) {
  // get the container
  const categoriesContainer = document.getElementById('container');
  // loop operation on array
  for (const cat of categories) {
    const categoryDiv = document.createElement('div')
    categoryDiv.innerHTML = `
    <button id="btn-${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm bg-[#25252520] hover:bg-[#FF1F3D]">${cat.category}</button>
    `;
    // append child
    categoriesContainer.append(categoryDiv)
  }
}
const displayVideos = (videos) => {
  const videoContainer = document.getElementById('video-container');
  videoContainer.innerHTML = '';
  if (videos.length === 0) {
    videoContainer.innerHTML = `
    <div class="flex justify-center items-center py-20 col-span-4 flex-col">
      <img class="w-[8rem]" src="assets/Icon.png" alt="">
      <h1 class="text-2xl font-bold">!!oops,There is no content.</h1>
     </div>
    `;
    hiddenLoader()
    return;

  }

  videos.forEach(video => {
    const videoCard = document.createElement('div')
    videoCard.innerHTML = `
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
      <p class="text-sm text-gray-400 flex gap-1"> ${video.authors[0].profile_name}
      ${video.authors[0].verified === true ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt="">` : ``}
      </p>
      <h2 class="text-sm text-gray-400">${video.others.views}</h2>

    </div>
  </div>
  <button onclick=loadVideoDetails("${video.video_id}") class="btn btn-wide">Show Details</button>
</div>
    `;
    videoContainer.append(videoCard)
  })
  hiddenLoader()
}
const searchVideos = document.getElementById('searchInput')
searchVideos.addEventListener('keyup', (e) => {
  const input = e.target.value;
  loadVideos(input)
})
loadCategories()
// function toggleButtonColor() {
//   const btn = document.getElementById('btn-all');
//   // Toggle background color
//   if (btn.classList.contains('bg-[#FF1F3D]')) {
//     btn.classList.remove('bg-[#FF1F3D]');
//     btn.classList.add('bg-green-500');
//   } else {
//     btn.classList.remove('bg-green-500');
//     btn.classList.add('bg-[#FF1F3D]');
//   }
// }
// loadVideos()
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