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
const navBar=document.querySelector(".nav");

const liquidIndicator=document.createElement("span");
liquidIndicator.className="at-liquid-indicator";
liquidIndicator.setAttribute("aria-hidden","true");
navBar?.appendChild(liquidIndicator);

function positionLiquidIndicator(link, instant=false){
  if(!navBar || !link || window.innerWidth<=900){
    liquidIndicator.classList.remove("visible");
    navBar?.classList.remove("indicator-ready");
    return;
  }

  const navRect=navBar.getBoundingClientRect();
  const linkRect=link.getBoundingClientRect();

  if(instant) liquidIndicator.classList.add("no-motion");

  liquidIndicator.style.setProperty("--at-x",`${linkRect.left-navRect.left}px`);
  liquidIndicator.style.setProperty("--at-y",`${linkRect.top-navRect.top}px`);
  liquidIndicator.style.width=`${linkRect.width}px`;
  liquidIndicator.style.height=`${linkRect.height}px`;
  liquidIndicator.classList.add("visible");

  if(linkRect.width>0 && linkRect.height>0){
    navBar.classList.add("indicator-ready");
  }

  if(instant){
    requestAnimationFrame(()=>requestAnimationFrame(()=>
      liquidIndicator.classList.remove("no-motion")
    ));
  }
}

function getCurrentSection(){
  if(!sections.length) return "home";

  // At the bottom, force the last section so Contact can become active.
  if(window.innerHeight + window.scrollY >=
     document.documentElement.scrollHeight - 12){
    return sections[sections.length-1].id;
  }

  // Probe just below the fixed navbar. The section occupying this line
  // is the section the user is currently reading.
  const navHeight=navBar?.getBoundingClientRect().height || 0;
  const probeY=Math.min(window.innerHeight-1, navHeight + 42);

  let current=sections[0].id;
  for(const section of sections){
    const rect=section.getBoundingClientRect();
    if(rect.top <= probeY && rect.bottom > probeY){
      current=section.id;
      break;
    }
    if(rect.top <= probeY){
      current=section.id;
    }
  }
  return current;
}

function updateActiveNav(){
  const current=getCurrentSection();
  let activeLink=null;

  navLinks.forEach(a=>{
    const active=a.getAttribute("href")==="#"+current;
    a.classList.toggle("active",active);
    if(active) activeLink=a;
  });

  positionLiquidIndicator(activeLink);
}

let navTick=false;
function requestNavUpdate(){
  if(navTick) return;
  navTick=true;
  requestAnimationFrame(()=>{
    updateActiveNav();
    navTick=false;
  });
}

window.addEventListener("scroll",requestNavUpdate,{passive:true});
window.addEventListener("resize",()=>{
  updateActiveNav();
  positionLiquidIndicator(
    navLinks.find(a=>a.classList.contains("active")),
    true
  );
},{passive:true});

window.addEventListener("load",()=>{
  updateActiveNav();
  positionLiquidIndicator(
    navLinks.find(a=>a.classList.contains("active")),
    true
  );
});

updateActiveNav();
requestAnimationFrame(()=>updateActiveNav());
