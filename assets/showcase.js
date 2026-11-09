/* Homepage sample: three highly rated firms, random, rotating.
   Pool is real Google ratings already published on firm pages (embedded JSON).
   prefers-reduced-motion: one random set, no rotation. */
(function(){
  var root=document.getElementById("showcase");
  var box=document.getElementById("showcase-cards");
  var dataEl=document.getElementById("rated-pool");
  if(!root||!box||!dataEl) return;
  var data;
  try{data=JSON.parse(dataEl.textContent)}catch(e){return}
  var firms=data.firms||[];
  if(firms.length<1) return;
  function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
  function shuffle(a){
    var i,j,t;
    for(i=a.length-1;i>0;i--){
      j=Math.floor(Math.random()*(i+1));
      t=a[i]; a[i]=a[j]; a[j]=t;
    }
    return a;
  }
  function card(f){
    var pct=Math.round((Number(f.rating)/5)*100);
    return '<a class="pcard" href="'+esc(f.url)+'">'
      +'<span class="pcard-top"><span class="pname">'+esc(f.name)+'</span>'
      +(f.credential?'<span class="cred">'+esc(f.credential)+'</span>':'')
      +'</span>'
      +'<span class="pmeta">'+esc(f.service)+' · '+esc(f.town)+'</span>'
      +'<span class="prate"><i class="stars" style="--r:'+pct+'%" aria-hidden="true">★★★★★</i> <b>'+esc(f.rating)+'</b> <span>'+esc(f.reviews)+' Google reviews</span></span>'
      +'</a>';
  }
  var order=shuffle(firms.slice());
  var idx=0;
  function paint(){
    var html="", k;
    var take=Math.min(3, order.length);
    for(k=0;k<take;k++) html+=card(order[(idx+k)%order.length]);
    box.innerHTML=html;
  }
  paint();
  var reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var pause=document.getElementById("showcase-pause");
  if(reduce||order.length<=3){
    if(pause) pause.hidden=true;
    return;
  }
  var timer=null, paused=false;
  function start(){
    if(timer) clearInterval(timer);
    timer=setInterval(function(){idx=(idx+1)%order.length; paint()}, 5000);
  }
  if(pause){
    pause.hidden=false;
    pause.addEventListener("click",function(){
      paused=!paused;
      pause.textContent=paused?"Resume":"Pause";
      pause.setAttribute("aria-pressed", paused?"true":"false");
      if(paused){clearInterval(timer); timer=null} else start();
    });
  }
  start();
})();
