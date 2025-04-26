import home from "./home.js";
import login from "./login.js"
import register from "./register.js";
let allAnchor = document.querySelectorAll("a")
let root=document.querySelector("#root")

let routes={
    "/login":login,
    "/register":register,
    "/home":home
}

let handleClick=(e)=>{
e.preventDefault();
window.history.pushState(null,"",`${e.target.pathname}`)
let path=window.location.pathname;
root.innerHTML=routes[path]();//login()
}
allAnchor.forEach((anchor)=>{
    anchor.addEventListener("click",handleClick);
})
window.addEventListener("popstate",()=>{
   let path= window.location.pathname;
   if(path=="/index.html"){
    root.innerHTML="";
   }else{
       root.innerHTML=routes[path]();
   }
});
