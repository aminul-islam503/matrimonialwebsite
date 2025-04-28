import home from "./home.js";
import login from "./login.js";
import register from "./register.js";

let anchorAll=document.querySelectorAll("a");
let root=document.getElementById("root");
// console.log(root);

let routes={
    "/login":login,
    "/register":register,
    "/home":home
}



let handleClick=(e)=>{
    e.preventDefault();
    window.history.pushState(null,"",`${e.target.pathname}`);
    let path=window.location.pathname;
    root.innerHTML=routes[path]();
    
}
anchorAll.forEach((anchor)=>{
    anchor.addEventListener("click",handleClick);
});
window.addEventListener("popstate",()=>{
    let path=window.location.pathname;
    if(path=="/index.html")
    {
        root.innerHTML="";
    }else{
        root.innerHTML=routes[path]();
    }
})





let allInput=document.querySelectorAll("input");
let allText=document.querySelectorAll("textarea");
let allSelect=document.querySelectorAll("select");
let allCheckBoxes=document.querySelectorAll("input[type=checkbox]");
let form =document.querySelector("form");

let state={
    hobbies:[],
    interests:[],
    setState(name,value){
        if(name!="hobbies" && name!="interests"){
            state[name]=value;
        }
    },
    setCheckBox(name,value,isChecked){

        if(isChecked){

            this[name].push(value);
        }
        else{
            this[name]=this[name].filter(item => item!== value);
        }
    }
}
let handleCheckBox=(e)=>{
    let name= e.target.name;
    let value=e.target.value;
    let isChecked=e.target.checked;
    console.log(isChecked);
    
    // console.log(name,value)
    state.setCheckBox(name,value,isChecked)
}
let  handleChange=(e)=>{
    let name = e.target.name;
    let value=e.target.value;
    if(name=="image"){
        let file = e.target.files[0];
        value=file;
        let reader = new FileReader();
        reader.onload=function(){
            form.style.backgroundImage=`url(${reader.result})`
        }
        reader.readAsDataURL(file)
    }
    state.setState(name,value)
    } 

allInput.forEach((input)=>{
    input.addEventListener("change",handleChange);
})
allText.forEach((text)=>{
    text.addEventListener("change",handleChange);
});
allSelect.forEach((select)=>{
    select.addEventListener("change",handleChange);
})
allCheckBoxes.forEach((checkbox)=>{
checkbox.addEventListener("change",handleCheckBox);
})

let handleSubmit=(e)=>{
    e.preventDefault()

    //console.log(state)
    let payload={
        name:state.name,
        age:state.age,
        email:state.email,
        password:state.password,
        gender:state.gender,
        job:state.job,
        educationQualification:state.educationQualification,
        zodiacSign:state.zodiacSign,
        about:state.about,
        religion:state.religion,
        family:state.family,
        area:state.area,
        state:state.state,
        pin:state.pin,
        hobbies:state.hobbies,
        interests:state.interests,
        image:state.image
    };
    console.log(payload);
    try{

        (async ()=>{
            let resp=await fetch("",{

                method:"POST",
                body:JSON.stringify(payload)
            })
        })()
    }catch(error){
        alert("Something went Wrong")
    }
    
}

form.addEventListener("submit",handleSubmit)
    
