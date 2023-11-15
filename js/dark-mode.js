const app=document.querySelector('.app');
const buttonSwitch=document.getElementById('dark-mode');


buttonSwitch.addEventListener('click',()=>{
    app.classList.toggle('dark');
    document.querySelector('body').classList.toggle('dark');
})