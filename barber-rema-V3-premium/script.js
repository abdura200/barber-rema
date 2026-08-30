const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];

window.addEventListener('load',()=>setTimeout(()=>document.body.classList.add('loaded'),450));

const menu=$('.menu'),nav=$('.nav-links');
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open)});
$$('.nav-links a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
$$('.reveal').forEach(el=>observer.observe(el));

const photos=['images/gallery-1.png','images/gallery-2.png','images/gallery-3.png','images/gallery-4.png'];
const lb=$('.lightbox'),lbImg=$('.lightbox img');let photoIndex=0;
function showPhoto(i){photoIndex=(i+photos.length)%photos.length;lbImg.src=photos[photoIndex];lbImg.alt=`Barber Rema galerija ${photoIndex+1}`;lb.classList.add('open');lb.setAttribute('aria-hidden','false');document.body.classList.add('lock')}
function closePhoto(){lb.classList.remove('open');lb.setAttribute('aria-hidden','true');document.body.classList.remove('lock')}
$$('.gallery-photo').forEach(b=>b.addEventListener('click',()=>showPhoto(+b.dataset.index)));
$('.lb-close').onclick=closePhoto;$('.lb-prev').onclick=()=>showPhoto(photoIndex-1);$('.lb-next').onclick=()=>showPhoto(photoIndex+1);
lb.addEventListener('click',e=>{if(e.target===lb)closePhoto()});
document.addEventListener('keydown',e=>{if(!lb.classList.contains('open'))return;if(e.key==='Escape')closePhoto();if(e.key==='ArrowLeft')showPhoto(photoIndex-1);if(e.key==='ArrowRight')showPhoto(photoIndex+1)});

const quotes=$$('.quote'),dots=$('.dots');let q=0;
quotes.forEach((_,i)=>{const d=document.createElement('i');d.className='dot'+(i===0?' active':'');d.onclick=()=>setQuote(i);dots.appendChild(d)});
function setQuote(i){q=(i+quotes.length)%quotes.length;quotes.forEach((x,j)=>x.classList.toggle('active',j===q));$$('.dot',dots).forEach((x,j)=>x.classList.toggle('active',j===q))}
$('#prev').onclick=()=>setQuote(q-1);$('#next').onclick=()=>setQuote(q+1);
setInterval(()=>setQuote(q+1),7000);
