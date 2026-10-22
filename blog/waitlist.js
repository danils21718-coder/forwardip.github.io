/* Shared waitlist form handler for all blog pages.
   To collect emails for real: put a form-endpoint URL in ENDPOINT (see instructions).
   While ENDPOINT is empty the visitor's mail app opens with a prefilled message. */
(function(){
  var ENDPOINT = "";                 // e.g. "https://formspree.io/f/xxxxxxxx"
  var MAIL = "forwip7@gmail.com";
  var f = document.getElementById("wl"); if(!f) return;
  var out = document.getElementById("wlok");
  var re = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;
  f.addEventListener("submit", function(e){
    e.preventDefault();
    var em = (f.email.value||"").trim();
    if(!re.test(em)){ out.textContent = f.getAttribute("data-bad"); return; }
    var lang = document.documentElement.lang || "";
    if(!ENDPOINT){
      location.href = "mailto:"+MAIL+"?subject="+encodeURIComponent("iOS waitlist ("+lang+")")+"&body="+encodeURIComponent(em);
      out.textContent = f.getAttribute("data-mail"); return;
    }
    fetch(ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},
      body:JSON.stringify({email:em,lang:lang,page:location.pathname,platform:"ios"})})
    .then(function(r){ out.textContent = r.ok ? f.getAttribute("data-ok") : f.getAttribute("data-err"); if(r.ok) f.reset(); })
    .catch(function(){ out.textContent = f.getAttribute("data-err"); });
  });
})();
