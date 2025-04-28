let register=()=>{
    return `
    <div class="registrationFormContainer">
            <form action="">
                <div>
                    <h1>Registration Form</h1>
                </div>
                <div>
                    <input type="text" placeholder="Enter Your Name" name="name">
                </div>
                <div>
                    <input type="email" placeholder="Enter Your Email" name="email">
                </div>
                <div>
                    <input type="password" placeholder="Enter Your password" name="password">
                </div>
                <div>
                    <input type="text" placeholder="Enter Your Age" name="age">
                </div>
                <div>
                    <div>
                        <input type="radio" value="Male" name="gender"><span>Male</span>
                    </div>
                    <div>
                        <input type="radio" value="Female" name="gender"><span>Female</span>
                    </div>
                    <div>
                        <input type="radio" value="Other" name="gender"><span>Other</span>

                    </div>
                </div>
                <div>
                    <input type="text" placeholder="Enter Job Role" name="job">
                </div>
                <div>
                    <input type="text" placeholder="Enter Your Education Qualification" name="educationQualification">
                </div>
                <div>
                    <select name="zodiacSign">
                        <option value="" selected disabled><span>select Zodiac Sign</span></option>
                        <option value="Aries"  >Aries</option>
                        <option value="Taurus" >Taurus</option>
                        <option value="Gemini" >Gemini</option>
                        <option value="Cancer" >Cancer</option>
                        <option value="Leo" >Leo</option>
                        <option value="Virgo" >Virgo</option>
                        <option value="Libra" >Libra</option>
                        <option value="Scorpio" >Scorpio</option>
                        <option value="Sagittarius" >Sagittarius</option>
                        <option value="Capricorn" >Capricorn</option>
                        <option value="Aquarius" >Aquarius</option>
                        <option value="Pisces" >Pisces</option>

                    </select>
                </div>
                <div>
                    <input type="text" placeholder="Enter your religion" name="religion">
                </div>
                <div>
                    <textarea placeholder="Enter bio" name="about"></textarea>
                </div>
                <div>
                    <textarea placeholder="Enter Family Details" name="family"></textarea>
                </div>
                <div>
                    <input type="text" placeholder="Enter your Area" name="area">
                </div>
                <div>
                    <input type="text" placeholder="Enter your State" name="state">
                </div>
                <div>
                    <input type="text" placeholder="Enter your pin" name="pin">
                </div>

                <div>
                    <div><label for="">Hobbies</label></div>

                    <div>
                        <input type="checkbox" value="cricket" name="hobbies"><span>Cricket</span>
                        <input type="checkbox" value="music" name="hobbies"><span>Music</span>
                        <input type="checkbox" value="dance" name="hobbies"><span>Dance</span>
                        <input type="checkbox" value="travelling" name="hobbies"><span>Travelling</span>
                        <input type="checkbox" value="cooking" name="hobbies"><span>Cooking</span>
                        <input type="checkbox" value="reading" name="hobbies"><span>Reading</span>
                    </div>
                </div>
                <div>
                    <div><label for="">Interests</label></div>
                    <div>
                        <input type="checkbox" value="cricket" name="interests"><span>Cricket</span>
                        <input type="checkbox" value="music" name="interests"><span>Music</span>
                        <input type="checkbox" value="dance" name="interests"><span>Dance</span>
                        <input type="checkbox" value="travelling" name="interests"><span>Travelling</span>
                        <input type="checkbox" value="cooking" name="interests"><span>Cooking</span>
                        <input type="checkbox" value="reading" name="interests"><span>Reading</span>
                    </div>
                </div>
                <div>
                    <input type="file" name="image" accept=".png,jpeg">
                    <img src="" alt="">
                </div>
                <div>
                    <button>Submit</button>
                </div>
            </form>
        </div>
    `;
}
export default register;

export let bindHandler=()=>{
    let allInput=document.querySelectorAll("input");
let allSelect=document.querySelectorAll("select");
let allText=document.querySelectorAll("textarea");
let allCheckBoxes=document.querySelectorAll("input[type=checkbox]")
let form= document.querySelector("form")

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
allSelect.forEach((select)=>{
    select.addEventListener("change",handleChange);
})
allText.forEach((text)=>{
    text.addEventListener("change",handleChange)
})
allCheckBoxes.forEach((checkBox)=>{
    checkBox.addEventListener("change",handleCheckBox)
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
    let formData=new FormData();
    for(let data in payload){
        if(data=="hobbies" || data=="interests")
        {
            formData.append(data,JSON.stringify(payload[data]));
        }else{
            formData.append(data,payload[data]);
        }
    }
    
    try{

        (async ()=>{
            let resp=await fetch("http://192.168.1.33:8080/api/register",{

                method:"POST",
                body:formData
            })
            let data=await resp.json();
            alert(data)
            console.log(data);
            
        })()
    }catch(error){
        alert("Something went Wrong")
    }
    
}

form.addEventListener("submit",handleSubmit)
    


// first.addEventListener("change",(e)=>{

// console.log(e.target.value);
// })

}