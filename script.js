const postsContainer=document.getElementById("posts");
const commentsContainer=document.getElementById("comments");
const errorDiv=document.getElementById("error");
const retryBtn=document.getElementById("retryBtn");
const searchInput=document.getElementById("search");

let allPosts=[];

async function fetchPosts(){
  try{
    errorDiv.classList.add("hidden");
    postsContainer.innerHTML="Loading...";

    const res=await fetch("https://jsonplaceholder.typicode.com/posts");
    if(!res.ok) throw new Error("Failed to fetch posts");

    const data=await res.json();
    allPosts=data.slice(0,20);
    displayPosts(allPosts);
  }
  catch(err){
    showError(err.message);
  }
}

function displayPosts(posts){
  postsContainer.innerHTML="";

  posts.forEach(post=>{
    const div=document.createElement("div");
    div.className="post";
    div.innerHTML=`<h3>${post.title}</h3><p>${post.body}</p>`;

    div.onclick=()=>loadComments(post.id);

    postsContainer.appendChild(div);
  });
}

async function loadComments(id){
  try{
    commentsContainer.innerHTML="Loading comments...";

    const res=await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
    if(!res.ok) throw new Error("Failed to fetch comments");

    const data=await res.json();

    commentsContainer.innerHTML="<h2>Comments</h2>";

    data.forEach(c=>{
      const div=document.createElement("div");
      div.className="comment";
      div.innerHTML=`<strong>${c.name}</strong><p>${c.body}</p>`;
      commentsContainer.appendChild(div);
    });
  }
  catch(err){
    showError(err.message);
  }
}

function showError(msg){
  errorDiv.textContent=msg;
  errorDiv.classList.remove("hidden");
}

retryBtn.onclick=fetchPosts;

searchInput.addEventListener("input",()=>{
  const value=searchInput.value.toLowerCase();
  const filtered=allPosts.filter(p=>p.title.toLowerCase().includes(value));
  displayPosts(filtered);
});

fetchPosts();
