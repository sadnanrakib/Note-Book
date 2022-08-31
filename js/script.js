const loadPhone = async(searchText)=>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    loadPhones(data.data)
}

const loadPhones = phones =>{
    const displayPhone = document.getElementById('Phone-container')
    displayPhone.textContent='';
    phones= phones.slice(0,10);
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
    </div>
  </div>



    `;
    displayPhone.appendChild(phoneDiv);
});
// stop loder
toggleSpinners(false);

}   

// handel Search Button
document.getElementById('btn-search').addEventListener('click',function(){
    // start loder
    toggleSpinners(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText);
    searchField.value ='';
});
const toggleSpinners = isLoding=>{
    const sectionLoad = document.getElementById('loder');
    if(isLoding){
        sectionLoad.classList.remove('d-none');
    }
    else{
        sectionLoad.classList.add('d-none');
    }
}



// loadPhone('');