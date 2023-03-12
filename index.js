let fetchNews=[];
const loadNews=()=>{
    const URL = `https://openapi.programming-hero.com/api/news/categories`;

    fetch(URL)
    .then(res=>res.json())
    .then(data=>{
      if(data.status){
        showcategories(data.data.news_category)
      }else{
       
        // alert('<span class="badge text-bg-warning">No News Found</span>');
        alert('No found');
        return;
      }

      });
}
// catagories-----------------------------------
const showcategories=data=>{
data.forEach(news=>{
    const categories =document.getElementById('catagories');
    categories.innerHTML += `<a class="nav-link" href="#" onclick="fetchCategoryNews('${news.category_id}', '${news.category_name}')">${news.category_name}</a>`;
})
}
const fetchCategoryNews=(category_id,category_name)=>{
    const URL2 =` https://openapi.programming-hero.com/api/news/category/${category_id}`;
    fetch(URL2).then(res=>res.json()).then(data=>{
      fetchNews=data.data;
      showCategoriesNews(data.data,category_name)
    });

}
// news card-------------------------------
const showCategoriesNews =(data,category_name)=>{
    // console.log(data);
   
    const newsCount = document.getElementById('news-count').innerText=`${data.length}`;
    const categoryName = document.getElementById('category-name').innerText=`${category_name}`;
    const newsCard = document.getElementById('news-card');
    newsCard.innerHTML='';
    data.forEach(singleNews=>{
        // console.log(singleNews);
     

        const {image_url,details,title,author,rating,total_view,_id,others_info}=singleNews;

        const date =new Date(author.published_date);
        const mounth = date.getMonth();
        const pub_date = date.getDate();
        const year = date.getFullYear()
        const div = document.createElement('div');
        
        div.classList.add("card", "mb-3");
        div.innerHTML=`
        <div class="row g-0">
    <div class="col-md-4">
      <img src=${image_url} class="img-fluid rounded-start" alt="..." />
    </div>
    <div class="col-md-8 d-flex flex-column">
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">
          ${details.slice(0, 200)}...
        </p>
        
      </div>
      <div class="card-footer border-0 bg-body d-flex justify-content-between">
        <div class="d-flex gap-2">
        <img src=${
          author.img
        } class="img-fluid rounded-circle" alt="..." height="40" width="40"/>
        <div>
        <p class="m-0 p-0">${author.name ? author.name : "Not available" }</p>
        <p class="m-0 p-0">${mounth+' '+pub_date+' '+year}</p>
        </div>
        
        </div>
        <div class="d-flex align-items-center">
        <i class="fas fa-eye"></i>
        
        <p class="m-0 p-0">${total_view ? total_view : "Not available"}</p>
        </div>
        <div class="d-flex gap-2">
     ${starRatings(rating.number)}
       
        <p>${rating.number}</p>
        </div>
        <div>
        
        <i class="fas fa-arrow-right" onclick="fetchNewsDetail('${_id}')" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
        </div>
      </div>
    </div>
  </div>
        `
        newsCard.appendChild(div);
    })
}


// Modal--------------------------

const fetchNewsDetail =_id=>{
    const URL3=`https://openapi.programming-hero.com/api/news/${_id}`;
    fetch(URL3).then(res=>res.json()).then(data=>showModal(data.data[0]));
}
const showModal=data=>{
    // console.log(data);
    const {image_url,details,title,author,rating,total_view,_id,others_info
    }=data;
    const modalBody =document.getElementById('modal-body');
    modalBody.innerHTML=`
    <div class= "card mb-3">
    <div class="row g-0">
    <div class="col-md-12">
      <img src=${image_url} class="img-fluid rounded-start" alt="..." />
    </div>
    <div class="col-md-12 d-flex flex-column">
      <div class="card-body">
        <h5 class="card-title">${title}<span class="badge text-bg-warning">${others_info.is_trending?"Trending":'no trending'}</span></h5>
        <p class="card-text">
          ${details}
        </p>
        
      </div>
      <div class="card-footer border-0 bg-body d-flex justify-content-between">
        <div class="d-flex gap-2">
        <img src=${
          author.img
        } class="img-fluid rounded-circle" alt="..." height="40" width="40"/>
        <div>
        <p class="m-0 p-0">${author.name ? author.name : "Not available" }</p>
        <p class="m-0 p-0">${author.published_date}</p>
        </div>
        
        </div>
        <div class="d-flex align-items-center">
        <i class="fas fa-eye"></i>
        
        <p class="m-0 p-0">${total_view ? total_view : "Not available"}</p>
        </div>
        <div class="d-flex gap-2">
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star-half"></i>
       
        <p>${rating.number}</p>
        </div>
      </div>
    </div>
  </div>
    </div>
    `

}
// create dynamic rattings 
const starRatings=(rating)=>{
  // console.log(rating);
   let ratingHTML='';
   for(i=1;i<=Math.floor(rating);i++){
    ratingHTML +=`<i class="fas fa-star"></i>`;
   }
   if(rating - Math.floor(rating)>0){
    ratingHTML +=`<i class="fas fa-star-half"></i>`;
   }
   return ratingHTML;
}
// show trending

const showTrending=()=>{
  // console.log(fetchNews);
  const trend = fetchNews.filter(trendNews=>trendNews.others_info.is_trending ===true);
  const catagoryName = document.getElementById('category-name').innerText;
  showCategoriesNews(trend,catagoryName);
}
// todays pick
const showTodaysPick=()=>{
  // console.log(fetchNews);
  const todaysPick = fetchNews.filter(todaysPickNews=>todaysPickNews.others_info.is_todays_pick ===true);
  const catagoryName = document.getElementById('category-name').innerText;
  showCategoriesNews(todaysPick,catagoryName);
}


