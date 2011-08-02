/*
   ___ _          __      _           _   
  / __(_)_ __ ___/ _\ ___| | ___  ___| |_ 
 / _\ | | '__/ _ \ \ / _ \ |/ _ \/ __| __|
/ /   | | | |  __/\ \  __/ |  __/ (__| |_ 
\/    |_|_|  \___\__/\___|_|\___|\___|\__|

 *
 */

var merge = function (a, b, m) {
	"use strict";

	var aa; //iterator

	for (aa in b) {
		if (m) {
			if (b.hasOwnProperty(aa) && !a.hasOwnProperty(aa)) {
				a[aa] = b[aa];
			}
		} else {
			if (b.hasOwnProperty(aa) && a.hasOwnProperty(aa)) {
				a[aa] = b[aa];
			}
		}
	}

	return a;
};
var linkDropDown = function(select, options) { 
	var h  = { },  // OLOLO, dont touch it please
		dO = { 
			linkClass: 'ajax-link',
			animOptions : { duration:0.13 }
		},
		html,
		ahtml,
		ø,
		anc,
		ul,
		lis,
		ddiv; // little DOM shit

	h.select = $(select);

	//init options
	h.op = options || { };		
	h.op = merge(h.op, dO, true);

	if(!h.select || (h.select.tagName.toUpperCase() !=='SELECT')) { 
		return;
	 }
	h.select.setStyle({ 
		position:'absolute',
		top:'-150000px'
	 });
	html='<div class="fireselect-container">';
	html= html + '<a href="javascript:;" class="' + h.op.linkClass + '">' + h.select[h.select.selectedIndex].innerHTML + '</a>';
	html=html + '<ul style="display:none;">';
	for (ø=0; ø<h.select.options.length; ø++) { 
		if (ø == select.selectedIndex) {  
			ahtml = 'class="current"';
		 } else { 
			ahtml='';
		  }
		html=html + '<li ' + ahtml + ' onclick="return [\'' + h.select[ø].value + '\', \''+h.select[ø].innerHTML+'\', '+ ø +'];">'+ h.select[ø].innerHTML + '</li>'
		//html= html + '<li>'+ h.select[ø].innerHTML + '</li>';
	 }
	html=html+'</ul></div>';
	var t = h.select.insert({ 
		after: html
	});
	ddiv = h.select.next();
	h.anc = ddiv.select('a')[0];
	ul = ddiv.select('ul')[0];
	lis = ddiv.select('ul li');

	ddiv.setStyle({ 
		position:'relative'
	 })
	h.anc.setStyle({ 
		position:'absolute'
	 })
	ul.setStyle({ 
		position:'absolute'
	 });

	h.sc = function(m){
		lis.invoke('removeClassName','current');
		m.addClassName('current'); //VERY THIN PLACE!!!1111 WARNING;
	};

	h.sp = function(){ 
		var t = [];
		ul.setStyle({  
		//REFLOWWWWWW!!!
			top:'-15000px',
			display:'block'
		 })
		t['obj'] = ul.select('.current')[0];
		t['y'] = t['obj'].positionedOffset()[1];
		t['h'] = t['obj'].getHeight();
		t['p'] = parseInt(t['obj'].getStyle('padding-top'), 10);
		t['lp'] = parseInt(t['obj'].getStyle('padding-left'), 10)+1;
		ul.setStyle({ 
			display:'none',
			left:'-'+t['lp']+'px',
			top:'-'+(t['y']/* + t['h']*/ + t['p'])+'px'
		 });
	}

	h.sh = function(){ 
		h.sp();
		Effect.Appear(ul, h.op.animOptions);
	}

	h.hd = function(){ 
		Effect.Fade(ul, h.op.animOptions);
	}

	h.tg = function(e){ 
		if(ul.style.display !== 'none') { 
			h.hd();
		} else { 
			h.sh();	
		}
		e.stop();
	}

	h.se = function(e) {
		var b = e.target.onclick();
		h.sc(e.target);
		h.anc.innerHTML = b[1];
		h.select.selectedIndex = b[2];
		h.hd();
	}

	h.anc.observe('click', h.tg);
	lis.each(function(li){ 
		li.observe('click', h.se);
		li.observe('mouseover', function(e) {
			e.target.addClassName('over');
		});
		li.observe('mouseout', function(e) {
			e.target.removeClassName('over');
		});
	 });
	document.observe('click', h.hd)
 }
