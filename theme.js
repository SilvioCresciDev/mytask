// sceglie il tema prima del primo disegno, così la pagina non lampeggia con i colori sbagliati
(function(){let v=null;try{v=localStorage.getItem('mytask-style')}catch(e){}if(v==='classic')return;document.documentElement.dataset.style=['color','pastel','mint','ocean','sunset','cats','cartoon','catoon'].includes(v)?v:'color'})()
