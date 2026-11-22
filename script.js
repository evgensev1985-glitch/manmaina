(function(){
'use strict';
var $=function(s,c){return(c||document).querySelector(s)},$$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
var URL_=location.origin+location.pathname,TG='https://t.me/+79510953723';

/* Меню */
var burger=$('#burger'),nav=$('#nav');
function closeMenu(){nav.classList.remove('open');burger.setAttribute('aria-expanded','false')}
burger.addEventListener('click',function(){var o=nav.classList.toggle('open');burger.setAttribute('aria-expanded',o)});
$$('a',nav).forEach(function(a){a.addEventListener('click',closeMenu)});
document.addEventListener('keydown',function(e){if(e.key==='Escape'){closeMenu();closeLb()}});

/* Тост */
var toast=$('#toast'),tt;
function say(m){toast.textContent=m;toast.classList.add('show');clearTimeout(tt);tt=setTimeout(function(){toast.classList.remove('show')},2200)}

/* Поделиться */
$('#share').addEventListener('click',function(){
  var d={title:document.title,text:'Манипулятор, эвакуатор, вышка в Майне',url:URL_};
  if(navigator.share){navigator.share(d).catch(function(){})}
  else if(navigator.clipboard){navigator.clipboard.writeText(URL_).then(function(){say('Ссылка скопирована')},function(){say(URL_)})}
  else{say(URL_)}
});

/* Наверх + активный пункт меню */
var up=$('#up');
up.addEventListener('click',function(){window.scrollTo({top:0})});
var links=$$('a',nav),secs=links.map(function(a){return $(a.getAttribute('href'))});
var tick=false;
window.addEventListener('scroll',function(){
  if(tick)return;tick=true;
  requestAnimationFrame(function(){
    up.classList.toggle('show',window.scrollY>600);
    var y=window.scrollY+120,cur=-1;
    secs.forEach(function(s,i){if(s&&s.offsetTop<=y)cur=i});
    links.forEach(function(a,i){a.classList.toggle('on',i===cur)});
    tick=false;
  });
},{passive:true});

/* Тарифы и расчёт */
var sel=$('#c-dest'),sum=$('#c-sum'),send=$('#c-send');
function calc(){
  var o=sel.options[sel.selectedIndex];
  sum.textContent=Number(o.value).toLocaleString('ru-RU')+' ₽';
  send.href=TG+'?text='+encodeURIComponent('Здравствуйте! Нужен кран-манипулятор, населённый пункт: '+o.text+'. Что нужно сделать: ');
}
sel.addEventListener('change',calc);calc();
var rows=$$('#tariff li'),none=$('#t-none');
$('#t-q').addEventListener('input',function(){
  var q=this.value.trim().toLowerCase().replace(/ё/g,'е'),n=0;
  rows.forEach(function(li){var ok=li.dataset.n.toLowerCase().replace(/ё/g,'е').indexOf(q)>-1;li.hidden=!ok;if(ok)n++});
  none.hidden=n>0;
});
function pick(li){
  for(var i=0;i<sel.options.length;i++){if(sel.options[i].text===li.dataset.n){sel.selectedIndex=i;break}}
  calc();$('#calc').scrollIntoView({behavior:'smooth'});
}
rows.forEach(function(li){
  li.addEventListener('click',function(){pick(li)});
  li.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();pick(li)}});
});

/* Просмотр фото */
var lb;
function closeLb(){if(lb){lb.remove();lb=null}}
$$('.zoom').forEach(function(f){
  f.addEventListener('click',function(){
    var im=$('img',f);closeLb();
    lb=document.createElement('div');lb.className='lb';lb.setAttribute('role','dialog');lb.setAttribute('aria-label',im.alt);
    var c=document.createElement('img');c.src=im.currentSrc||im.src;c.alt=im.alt;lb.appendChild(c);
    lb.addEventListener('click',closeLb);document.body.appendChild(lb);
  });
});
})();
