const countriesAPI='data.json';
const dropdownTop=document.querySelector('.dropdown__top');
const continents=document.querySelectorAll('.dropdown__bottom .dropdown__container');
const input=document.getElementById('input-search');
const button=document.getElementById('btn-search');

const getCountries = ()=>{

    fetch(countriesAPI)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        showCountries(data);
    });
}

const showCountries = (data)=>{
    document.querySelector('.countries').innerHTML='';
    document.querySelector('.country-selected').innerHTML='';
    const countriesContainer=document.querySelector('.countries');

    console.log(data);


    for(let i=0;i<data.length;i++){
        countriesContainer.insertAdjacentHTML('beforeend',`
            <div class="country">
                <div class="country-img">
                    <img src="${data[i].flags.png}" alt="${data[i].name}" />
                </div>
                <div class="country-info">
                    <h3>${data[i].name}</h3>
                    <p><strong>Population:</strong> ${data[i].population}</p>
                    <p><strong>Region:</strong> ${data[i].region}</p>
                    <p><strong>Capital:</strong> ${data[i].capital}</p>
                </div>
            </div>
        `);
    }

    
    const countries=document.querySelectorAll('.country');

    for(let i=0;i<countries.length;i++){
        countries[i].addEventListener('click',()=>{
            showCountryDetails(data[i]);
        })
    }
}


const showCountryDetails = (country)=>{
    document.querySelector('.countries').innerHTML='';
    document.querySelector('.search').classList.add('search-switch');

    const languages=[];
    const currencies=[];
    const borders=[];

    for(let i=0;i<country.languages.length;i++){
        languages.push(country.languages[i].name);
    }

    for(let i=0;i<country.currencies.length;i++){
        currencies.push(country.currencies[i].name);
    }
 

    if(country.borders){
        for(let i=0;i<country.borders.length;i++){
            borders.push(country.borders[i]);
        }
    }else{
        borders.push('No border countries');
    }

    
   

    document.querySelector('.country-selected').insertAdjacentHTML('beforeend',`
            <div class="container-btn">
                <button id="btn-back" onclick="backPage()"><i class="fa-solid fa-arrow-left"></i> Back</button>
            </div>

            <div class="country-details">
                <div class="country-img__details">
                    <img src="${country.flag}" alt="${country.name}" />
                </div>
                <div class="country-info__details">
                    <h2>${country.name}</h2>
                    <section class="section-details">
                        <article class="article-details">
                            <p><strong>Native Name:</strong> ${country.nativeName}</p>
                            <p><strong>Population:</strong> ${country.population}</p>
                            <p><strong>Region:</strong> ${country.region}</p>
                            <p><strong>Sub Region:</strong> ${country.subregion}</p>
                            <p><strong>Capital:</strong> ${country.capital}</p>
                        </article>

                        <article class="article-details">
                            <p><strong>Top Level Domain:</strong> ${country.topLevelDomain}</p>
                            <p><strong>Currencies:</strong> ${currencies}</p>
                            <p><strong>Languages:</strong> ${languages}</p>
                        </article>
                    </section>
                    <section class="section-borders">
                        <p><strong>Border Countries:</strong> ${borders}</p>
                        <div>

                        </div>
                    </section>
                </div>
            </div>
    
    `);
}


const backPage = () =>{
    document.querySelector('.search').classList.remove('search-switch');
    getCountries();
}


const displayByRegion = (continent)=>{
    let region=continent.id;
    
    fetch(countriesAPI)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        document.querySelector('.countries').innerHTML='';
        document.querySelector('.country-selected').innerHTML='';
        const countriesContainer=document.querySelector('.countries');
        let arrRegionCountries=[];
    
        for(let i=0; i<data.length; i++){
            if(region==data[i].region){
             
                arrRegionCountries.push(data[i]);
                countriesContainer.insertAdjacentHTML('beforeend',`
                    <div class="country">
                        <div class="country-img">
                            <img src="${data[i].flags.png}" alt="${data[i].name}" />
                        </div>
                        <div class="country-info">
                            <h3>${data[i].name}</h3>
                            <p><strong>Population:</strong> ${data[i].population}</p>
                            <p><strong>Region:</strong> ${data[i].region}</p>
                            <p><strong>Capital:</strong> ${data[i].capital}</p>
                        </div>
                    </div>
                `);

            }

        }

        const countries=document.querySelectorAll('.country');
        for(let i=0;i<countries.length;i++){
            countries[i].addEventListener('click',()=>{
                /*showCountryDetails(data[i]);*/
                console.log(arrRegionCountries);
                console.log(countries[i].textContent);
                if(countries[i].textContent.includes(arrRegionCountries[i].name)){
                    showCountryDetails(arrRegionCountries[i]);
                }else{
                    alert('no incluye');
                }
                
            })
        }
    })


}

const keyboard = (e)=>{
    let inputValue=input.value.toLowerCase();
    
    
    if(e.key==='Enter'){
        fetch(countriesAPI)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            document.querySelector('.countries').innerHTML='';
            document.querySelector('.country-selected').innerHTML='';

            for(let i=0; i<data.length; i++){
                let countryName=data[i].name.toLowerCase();
               

                if(inputValue==countryName){
                    document.querySelector('.countries').insertAdjacentHTML('beforeend',`
                        <div class="country">
                            <div class="country-img">
                                <img src="${data[i].flags.png}" alt="${data[i].name}" />
                            </div>
                            <div class="country-info">
                                <h3>${data[i].name}</h3>
                                <p><strong>Population:</strong> ${data[i].population}</p>
                                <p><strong>Region:</strong> ${data[i].region}</p>
                                <p><strong>Capital:</strong> ${data[i].capital}</p>
                            </div>
                        </div>
                    `);
                    
                    const country=document.querySelector('.country');
                    country.addEventListener('click',()=>{
                        showCountryDetails(data[i]);
                    })
                    
                }
            }

            document.querySelector('input').value='';
        })

      

    }

    

}

input.addEventListener('keydown',keyboard);

button.addEventListener('click',()=>{
    let inputValue=input.value.toLowerCase();
    
        fetch(countriesAPI)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            document.querySelector('.countries').innerHTML='';
            document.querySelector('.country-selected').innerHTML='';

            for(let i=0; i<data.length; i++){
                let countryName=data[i].name.toLowerCase();
               

                if(inputValue==countryName){
                    document.querySelector('.countries').insertAdjacentHTML('beforeend',`
                            <div class="country">
                                <div class="country-img">
                                    <img src="${data[i].flags.png}" alt="${data[i].name}" />
                                </div>
                                <div class="country-info">
                                    <h3>${data[i].name}</h3>
                                    <p><strong>Population:</strong> ${data[i].population}</p>
                                    <p><strong>Region:</strong> ${data[i].region}</p>
                                    <p><strong>Capital:</strong> ${data[i].capital}</p>
                                </div>
                            </div>
                        
                    `);
                    
                    const country=document.querySelector('.country');
                    country.addEventListener('click',()=>{
                        showCountryDetails(data[i]);
                    })
                    
                }
            }

            document.querySelector('input').value='';
        })

      

    
});

dropdownTop.addEventListener('click',()=>{
    document.querySelector('.dropdown__bottom').classList.toggle('switchDropdown');
});

for(let i=0;i<continents.length;i++){
    continents[i].addEventListener('click',()=>{
        displayByRegion(continents[i]);
    });
}


getCountries();
