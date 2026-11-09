/* Promotes the licence id already printed on a listing card into a chip.
   The text is copied from the card. No new facts, and no "verified" or "featured" label. */
(function(){
  function agency(line){
    if(/EPA/i.test(line)) return "EPA";
    if(/NJ DCA|\bDCA\b/i.test(line)) return "NJ DCA";
    if(/MA DLS|\bDLS\b/i.test(line)) return "MA DLS";
    return "Licence";
  }
  function chipFrom(line){
    var id=(String(line).match(/#([A-Za-z0-9][A-Za-z0-9-]*)/)||[])[1];
    if(!id) return "";
    return agency(line)+" #"+id;
  }
  function add(slot, labels, title){
    if(!slot||!labels.length||slot.querySelector(".cred")) return;
    var el=document.createElement("span");
    el.className="cred";
    el.textContent=labels[0]+(labels.length>1?" · +"+(labels.length-1)+" more":"");
    el.title=title;
    slot.appendChild(el);
  }
  var cards=document.querySelectorAll(".firm");
  for(var i=0;i<cards.length;i++){
    var card=cards[i];
    var slot=card.querySelector("summary > div");
    var lines=[];
    var nodes=card.querySelectorAll(".ids li, .fd li");
    for(var j=0;j<nodes.length;j++){
      var t=nodes[j].textContent.replace(/\s+/g," ").trim();
      var c=chipFrom(t);
      if(c) lines.push(c);
    }
    if(!lines.length){
      var blob=card.textContent.replace(/\s+/g," ");
      var all=blob.match(/#([A-Za-z0-9][A-Za-z0-9-]*)/g)||[];
      var seen={};
      for(var k=0;k<all.length;k++){
        if(seen[all[k]]) continue;
        seen[all[k]]=1;
        var around=blob.slice(Math.max(0,blob.indexOf(all[k])-40), blob.indexOf(all[k])+all[k].length);
        lines.push(agency(around)+" "+all[k]);
      }
    }
    add(slot, lines, lines.join(" · "));
  }
  var prof=document.querySelector(".fp h2");
  if(prof){
    var heads=document.querySelectorAll(".fp .sec h2");
    for(var h=0;h<heads.length;h++){
      if(!/Licence/i.test(heads[h].textContent)) continue;
      var sec=heads[h].parentNode;
      var lis=sec.querySelectorAll("li");
      var labs=[];
      for(var n=0;n<lis.length;n++){
        var c2=chipFrom(lis[n].textContent);
        if(c2) labs.push(c2);
      }
      var pills=document.querySelector(".fp-pills");
      add(pills, labs, labs.join(" · "));
      break;
    }
  }
})();
