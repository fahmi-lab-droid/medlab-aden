// ================= LANGUAGE SYSTEM =================

function updateLanguageTexts(lang){
    const elems = document.querySelectorAll('[data-en][data-ar]');
    elems.forEach(el=>{
        el.textContent = (lang==='ar') ? el.getAttribute('data-ar') : el.getAttribute('data-en');
    });
}

function setLang(lang){
    if(lang==="ar"){
        document.body.dir="rtl";
        document.documentElement.lang="ar";
    } else {
        document.body.dir="ltr";
        document.documentElement.lang="en";
    }
    localStorage.setItem("lang", lang);
    updateLanguageTexts(lang);
}

// ================= AUTO LOAD =================

window.onload = function(){

    // Load language
    let savedLang = localStorage.getItem("lang");
    if(savedLang){
        setLang(savedLang);
    } else {
        setLang("en");
    }

    // ================= URL PARAMS =================
    const params = new URLSearchParams(window.location.search);

    // 🧪 LAB TEST AUTO-FILL
    if (params.get("test")) {
        let test = params.get("test");
        let field = document.getElementById("testInput");
        if (field) field.value = test;
    }

    // 👨‍⚕️ DOCTOR AUTO-SELECT
    if (params.get("doctor")) {
        let doctor = params.get("doctor");
        let select = document.getElementById("doctorSelect");
        if (select) select.value = doctor;
    }

};

// ================= BOOKING SYSTEM =================

function sendBooking(form){

    let name = form.name.value;
    let phone = form.phone.value;
    let date = form.date.value;

    // Optional fields
    let test = form.test ? form.test.value : "";
    let doctor = form.doctor ? form.doctor.value : "";

    let message = "";

    // Detect booking type
    if(test){
        message = `🧪 Lab Booking
Name: ${name}
Phone: ${phone}
Test: ${test}
Date: ${date}`;
    }

    else if(doctor){
        message = `🏥 Clinic Appointment
Name: ${name}
Phone: ${phone}
Doctor: ${doctor}
Date: ${date}`;
    }

    else{
        message = `📋 General Booking
Name: ${name}
Phone: ${phone}
Date: ${date}`;
    }

    let url = "https://wa.me/967782965333?text=" + encodeURIComponent(message);
    window.open(url);

    return false;
}