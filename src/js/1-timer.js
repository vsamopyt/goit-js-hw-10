// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const btnStart = document.querySelector("button");

const timeValue =  document.querySelectorAll(".value");
const myInput = document.querySelector("#datetime-picker");

btnStart.disabled = true;


function addLeadingZero(value) {
  value=value.toString()
  return value.padStart(2, '0')
}

console.log(addLeadingZero(10));
console.log(addLeadingZero(1));

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  
//   console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
//   console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
//   console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

let userSelectedDate = 0;


const options = {
    enableTime: true,
    altInputClass: "calendar-block",
    // dateFormat: "Y-m-d H:i",
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    
    onClose(selectedDates) {
      console.log(selectedDates[0]);
    },
  };
  
const fp = flatpickr(myInput, {...options});  // flatpickr


fp.config.onOpen.push(function()  {
  btnStart.style.backgroundColor="#4e75ff";
  btnStart.style.color="#fff";
  myInput.style.border = "none";
  myInput.style.outline = "1px solid blue";
})


 fp.config.onClose.push(function() { 
  

  //  btnStart.style.backgroundColor="#cfcfcf";
  //  btnStart.style.color="#989898";
    // fp.selectedDates.push(myInput.value)
    const currentUnixTime = options.defaultDate.getTime()
    // console.log(options.defaultDate, options.defaultDate.getTime());
    
   
   
    const nextUnixTime = fp.selectedDates[0].getTime()
    // console.log(nextUnixTime,fp.selectedDates[0]);

    const gapTime = nextUnixTime - currentUnixTime;

    if (gapTime > 0) {
        userSelectedDate = gapTime;

        btnStart.disabled = false;
        // console.log(userSelectedDate);
    }
    else {

      iziToast.error({
        title: 'Error',
        message: "Please choose a date in the future",
        position:	'topRight',
        backgroundColor: "red",
        messageColor: "#fff",
        titleColor: "#fff",
        iconColor: "#fff",
        theme: 'light',
    });
    
        // window.alert("Please choose a date in the future")
         btnStart.disabled = true;
         btnStart.style.backgroundColor="#cfcfcf";
    btnStart.style.color="#989898";
    myInput.style.border = "none";
    myInput.style.outline = "1px solid black";

    }

    
    // const intervalId = setInterval(() => {
    //     // console.log(userSelectedDate);
    //     console.log(convertMs( userSelectedDate));
    //     const objcTime = convertMs( userSelectedDate);
    //     timeValue[0].textContent = objcTime.days;
    //     timeValue[1].textContent = objcTime.hours
    //     timeValue[2].textContent = objcTime.minutes
    //     timeValue[3].textContent = objcTime.seconds
    //     userSelectedDate = userSelectedDate-1000;

    //     // console.log(userSelectedDate);
    //   }, 1000);

    //   intervalId(userSelectedDate)
//    console.log(convertMs(userSelectedDate));

//     config.selectedDates.push(myInput.value)
// userSelectedDate = nextUnixTime - currentUnixTime 
// console.log(userSelectedDate);
// console.log( fp.selectedDates[0].getTime());
// console.log(convertMs(userSelectedDate));  
 } );




 



//  const intervalId = setInterval((userSelectedDate) => {
//     console.log(convertMs( userSelectedDate));
//     userSelectedDate-=1000
//   }, 1000);


 
btnStart.addEventListener("click", ()=>{
   btnStart.style.backgroundColor="#cfcfcf";
    btnStart.style.color="#989898";
    myInput.style.border = "none";
    myInput.style.outline = "1px solid black";
    btnStart.disabled = true;
    myInput.disabled  = true; 

   const intervaLid =  setInterval(() => {
        console.log(convertMs( userSelectedDate));
        const objcTime = convertMs( userSelectedDate);
        timeValue[0].textContent = addLeadingZero(objcTime.days)
        timeValue[1].textContent = addLeadingZero(objcTime.hours);
        timeValue[2].textContent = addLeadingZero(objcTime.minutes);
        timeValue[3].textContent = addLeadingZero(objcTime.seconds);
        // timeValue[3].textContent = objcTime.seconds;
        // userSelectedDate = userSelectedDate-1000;
        userSelectedDate = userSelectedDate-1000
        if (userSelectedDate <=0) {
            clearInterval(intervaLid)
            btnStart.disabled = true;
            myInput.disabled  = false; 
        }


      }, 1000);

})