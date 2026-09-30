const menu=document.querySelector(".menu"),links=document.querySelector(".links");
menu.addEventListener("click",()=>links.classList.toggle("open"));
document.querySelectorAll(".links a[href^='#']").forEach(a=>a.addEventListener("click",()=>links.classList.remove("open")));

const reveals=document.querySelectorAll(".reveal");
const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");revealObserver.unobserve(e.target);}});
},{threshold:.12});
reveals.forEach(el=>revealObserver.observe(el));

const sections=[...document.querySelectorAll("main section[id]")];
const navLinks=[...document.querySelectorAll(".links a[href^='#']")];
const sectionObserver=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      navLinks.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+e.target.id));
    }
  });
},{rootMargin:"-35% 0px -55% 0px",threshold:0});
sections.forEach(s=>sectionObserver.observe(s));