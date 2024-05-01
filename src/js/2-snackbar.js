// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const inputDealy = form.elements.delay;
const radiobutton = form.elements.state;
const btnSubmit = document.querySelector(".form button")

// console.log(inputDealy.type);
// radiobutton.forEach(element => {
//     element.onclick = () => {
//         if(element.checked) {
//             // console.log(element.value);
//             promiseState = element.value;
//             console.log(promiseState);

//         }
//     }
    
// });


function errorMessage (data) {
    iziToast.error({
        title: 'Error:',
        message: data,
        position: 'topRight',
        messageColor: 'white',
        backgroundColor: 'rgb(238, 4, 50)',
        theme: 'dark', // dark
        color: 'red', // blue, red, green, yellow
        width: "500",
        messageSize: "16",
        titleSize:"16",
        progressBar: false,
    });
}
// }

function succesMessage (data) {
    iziToast.success({
        title: 'OK',
        message: data,
        position: 'topRight',
        messageColor: 'white',
        backgroundColor: "#59a10d",
        theme: 'dark', // dark
        messageSize: "16",
        titleSize:"16",
        progressBar: false,
    });
}
 
function warningMessage (data) {
    iziToast.warning({
        title: 'Caution',
        message: data,
        position: 'topRight',
        messageColor: 'white',
        backgroundColor: " #ffa000",
        theme: 'dark', // dark
        messageSize: "16",
        titleSize:"16",
        progressBar: false,
    });
}


function makePromises (options) {
    const {delay, state} = options;
    console.log(state);
    const newPromise = new Promise ((resolve, reject) => {
        setTimeout (()=>{
            if(state === "fulfilled") {
                console.log(state );
                resolve (`Fulfilled promise in ${delay}ms`)
            }
            else {
                console.log(state );
                reject(`Rejected promise in ${delay}ms`)
            }
        }, delay)
    })
    return newPromise 
}


btnSubmit.addEventListener("click", (event) => {
    // event.preventDefault();
    const promiseOptions = {}
    if(inputDealy.value !== "" ) {
        // console.log(inputDealy.value.trim());
        promiseOptions.delay = Number(inputDealy.value.trim())
    }
   
    const isChecked = Array.from(radiobutton).some(element => element.checked );
    if(isChecked) {
        radiobutton.forEach(element => {
            if (element.checked) {
                promiseOptions.state = element.value;
            }
        })
    }

    const promiseOptionsLength= Object.values(promiseOptions).length

    if (promiseOptionsLength !== 2) {

       warningMessage ("fill all fields") 

        // iziToast.error({
        //     title: 'Error:',
        //     message: "fill all the fields",
        //     position: 'topRight',
        //     messageColor: 'white',
        //     backgroundColor: 'rgb(238, 4, 50)',
        //     theme: 'dark', // dark
        //     color: 'red', // blue, red, green, yellow
        //     width: "500",
        //     messageSize: "16",
        //     titleSize:"16",
        //     progressBar: false,
        // });
    }
    else {
        console.log(promiseOptions);

    makePromises (promiseOptions)
        .then (data =>{

           succesMessage (data)
            // iziToast.success({
            //     title: 'OK',
            //     message: data,
            //     position: 'topRight'
            // });
        })
        .catch (data => {

            errorMessage(data)
            // iziToast.warning({
            //     title: 'Caution',
            //     message: data,
            //     position: 'topRight'
            // });
        })
    }

    // promiseOptions = {};
    radiobutton.forEach(element => {
        element.checked = false 
    })
    inputDealy.value ="";

})