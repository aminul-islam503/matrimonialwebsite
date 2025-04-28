import home from "./home.js";
import login from "./login.js"
import register,{bindHandler} from "./register.js";
let allAnchor = document.querySelectorAll("a")
let root=document.querySelector("#root")

let routes={
    "/login":[login],
    "/register":[register,bindHandler],
    "/home":[home]
}

let handleClick=(e)=>{
e.preventDefault();
window.history.pushState(null,"",`${e.target.pathname}`)
let path=window.location.pathname;
root.innerHTML=routes[path][0]();//login()
if(routes[path][1]){
    routes[path][1]();
}
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



