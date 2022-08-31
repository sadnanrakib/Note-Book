const loadPhone = async(searchText,dataLimit)=>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    loadPhones(data.data,dataLimit)
}

const loadPhones = (phones,dataLimit) =>{
    const displayPhone = document.getElementById('Phone-container')
    displayPhone.textContent='';
    // disply 20 only
    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length >10){
        
        phones= phones.slice(0,10);
       showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');
    }


    const noPhone = document.getElementById('no-phone-found')
    if(phones.length === 0){
        noPhone.classList.remove('d-none');
    }

    else{
        noPhone.classList.add('d-none');
    }
       

    
phones.forEach(phone=>{
    const phoneDiv = document.createElement('div')
    phoneDiv.classList.add('col')
    phoneDiv.innerHTML=`
    <div class="card">
    <img src="${phone.image}" class="card-img-top p-3" alt="...">
    <div class="card-body">
      <h5 class="card-title">${phone.phone_name}</h5>
      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      <button onclick ="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#exampleModal"> Go somewhere </button>


 
     </div>
</div>
  



    `;
    displayPhone.appendChild(phoneDiv);
});
// stop loder
toggleSpinners(false);

}   

const processCSearch =(dataLimit)=>{
    toggleSpinners(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText,dataLimit);
    // searchField.value ='';
}

// handel Search Button
document.getElementById('btn-search').addEventListener('click',function(){
    // start loder
    // searchField.value ='';
    processCSearch(10);
    
});


// input Search By Enter
var el = document.getElementById("search-field");
;
el.addEventListener("keypress", function(event) {
    // console.log(el.value)
    if (event.key === "Enter") {
        // Enter key was hit
        processCSearch(10);
    }
});


const toggleSpinners = isLoding =>{
    const sectionLoad = document.getElementById('loder');
    if(isLoding){
        sectionLoad.classList.remove('d-none');
    }
    else{
        sectionLoad.classList.add('d-none');
    }
}

// Notr the best way

document.getElementById('btn-show-all').addEventListener('click',function(){
    processCSearch();
});

const loadPhoneDetails=async id=>{
    url= `https://openapi.programming-hero.com/api/phone/${id}`
    const res= await fetch(url);
    const data= await res.json();
    displayPhoneDetails (data.data)
}

const displayPhoneDetails = phone =>{
    console.log(phone);
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    console.log(phone.mainFeatures.sensors[0]);
    phoneDetails.innerHTML = `
        <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No Release Date Found'}</p>
        <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'No Storage Information '}</p>
        <p>Others: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth Information'}</p>
        <p>Sensor: ${phone.mainFeatures.sensors ? phone.mainFeatures.sensors[0] : 'no sensor'}</p>
    `
}
// loadPhone('apple');