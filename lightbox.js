//
// Firebox
//
// Copyright 2011 alimsky@oggettoweb.com
//
// https://github.com/alimsky/FireBox/
//
// What is LOVE? Baby don't hurt me.
// Don't hurt me... No more.
// ______ _          ____            _ __ __ 
//|  ____(_)        |  _ \          | /_ /_ |
//| |__   _ _ __ ___| |_) | _____  _| || || |
//|  __| | | '__/ _ \  _ < / _ \ \/ / || || |
//| |    | | | |  __/ |_) | (_) >  <|_|| || |
//|_|    |_|_|  \___|____/ \___/_/\_(_)|_||_|
// 
//
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

var lightboxMaster = function(op) {
	var h  = { },
		dO = { // isn't it clear? d is default, and O is Options
			fadeClassName:'oggetto-lightbox-fade',
			fadeLoaderClassName:'oggetto-lightbox-loader',
			dontCloseOnEsc: false, // observe ESC button to autoclose LB (L is Light and B is Box)
			noFade:false,
			appearOptions:{ duration:0.4, to:0.5 },
			hideOptions:{ duration:0.4 }
		};
	h.ol=0;
	
	//init options
	h.op = op || { };		
	h.op = merge(h.op, dO, true);

	h.go = function () { // Get option
		return h.op;
	};

	h.so = function(on, ov) { //Set option
		if (h.op.hasOwnProperty(on)) {
			h.op[on] = ov;
		}
	};

	if (!h.op.noFade && !$('x78432berg3fader')) {
		ddiv = document.createElement('div');
		ddiv.style.display='none';
		ddiv.id="x78432berg3fader";
		ddiv.className = 'oggetto-lightbox-fade ' + h.op.fadeClassName;
		h.fa = $(document.body.appendChild(ddiv));

		ddiv = document.createElement('div');
		ddiv.style.display='none';
		ddiv.id="x78432berg3loader";
		ddiv.className = 'oggetto-lightbox-loader ' + h.op.fadeLoaderClassName;
		h.fl = $(document.body.appendChild(ddiv));
	}

	h.boxes = [];

	Event.observe(document, 'globallightbox:opened', function(e){
		h.ol++;
		h.boxes[h.ol] = (e.memo.box); //it's not funny, it's ¬ast xiupened ¬ightbox...
		h.hl();
		h.fd();
	}.bind(h));

	Event.observe(document, 'globallightbox:closed', function(e){
		h.ol--;
		h.uf();
	}.bind(h));

	Event.observe(document, 'globallightbox:soft.closed', function(e){
		h.sl();
		h.ol--;
	}.bind(h));

	h.rf = function (){ // Refresh the fader position
		h.fa.setStyle({ // our fader need position too...
			left: 0,
			top: 0,
			position: 'fixed',
			width: document.viewport.getWidth() + 'px',
			height: document.viewport.getHeight() + 'px',
			zIndex: 9980
		});
		h.fl.setStyle({ // our fader need position too...
			zIndex: 10000
		});
	};

	Event.observe(window, 'resize', h.rf);

	//hello
	h.fd = function (){ //Fade
		if (h.ff) {
			return;
		}
		h.ff=true; //Faded==true

		h.rf();

		h.fa.setOpacity(0);
		Effect.Appear(h.fa, h.op.appearOptions);
	};

	h.uf = function (){ //Unfade
		if (h.ol > 0) {
			return;
		}
		h.ff=false; //Faded
		Effect.Fade (h.fa, h.op.hideOptions);
		if (h.ls) { //Hide loader if it didn't hidden yet
			h.ls=false;
			Effect.Fade (h.fl, h.op.hideOptions);
		}
	};

	h.sl = function () { //Show loader
		if (h.ls) {
			return;
		}
		h.ls = true;
		h.fd();
		h.fl.setOpacity(0);
		Effect.Appear(h.fl, h.op.appearOptions);
	}
	h.hl = function () { //Hide loader
		h.ls=false;
		setTimeout(h.uf, 100);
		Effect.Fade (h.fl, h.op.hideOptions);
	}

	// Close on ESC
	//
	if (!h.op.dontCloseOnEsc) {
		Event.observe(document, 'keyup', function (e) {
			if (h.boxes[h.ol] && e.keyCode === 27 && h.boxes[h.ol].isOpened()) {
				h.boxes[h.ol].close();
			}
		});
	}

	return h;
};

//GLOBAL SCOPE ATTACK ATTENTIOOON!!!111
Event.observe(window, 'load', function(){
	window.lightboxMasterGlobal = new lightboxMaster();
});


/*
 * Huy vam a ne kommentarii
 *
 */
var lightbox = function (xdata, op) {
	//"use strict";

	var h  = { },  // OLOLO, dont touch it please
		dO = { // isn't it clear? d is default, and O is Options
			uid: '',
			positionMode: 'absolute-center', // ...
			noEffects: false, // true if wouldn't or cant use Effect class
			dontShowRightNow: false, // all lightbox shown right after creation (by default)
			hDesign: false, // use hardcoded design styles, hope nobody will use it
			keyWord: 'lightbox', // keyword used in control classnames(inside lb) to operate with it 
			appearEffect:'Appear', // I am tired, will finish with comments later...
			hideEffect:'Fade',
			reposition:true,
			wrapperClassName:'oggetto-lightbox',
			appearOptions:{
				duration:0.3
			},
			hideOptions:{
				duration:0.3
			}
		},
		S$ = $ || function (id) { // It was a little dream about make it without Prototype
			document.getElementById(id); 
		},
		fuu, // two little iterators
		piu, // ...
		xiu,
		ddiv; // little DOM shit

	//init options
	h.op = op || { };
	h.op = merge(h.op, dO, true);

	if (h.op.uid.length>0) { // Check if ID is ok
		h.op.uid = h.op.keyWord + '_' + h.op.uid.toString();
	}

	//init
	if ( S$(h.op.uid) && S$(h.op.uid).innerHTML ) { // if the element with this id exist
		h.fb = $(h.op.uid); // parazite on it
		h.fb.update(xdata); // and update it's content with XDATA
	} else {  // if not exist
		if (typeof (xdata) === 'string') { // let's know is it some kind of html...
			if ( S$(xdata) !== null ) { // and there is some element with XDATA id
				h.fb = S$(xdata); // just use it!...
			} else {
				ddiv = $(document.createElement('div'));
				ddiv.className = 'oggetto-lightbox ' + h.op.wrapperClassName;
				ddiv.style.display = 'none';
				ddiv.update (xdata);
				h.fb = document.body.appendChild(ddiv);
			}
		} else {
			if (S$(xdata).tagName) {
				h.fb = xdata;
			} else {
				console.log('Lightbox: Can\'t understand you boy');
				return false;
			}
		}
	}

	if (h.op.uid.length>0) { // Check if ID is ok
		h.fb.id = h.op.uid;
	}

	h.up = function (html) { // Update Inner html
		h.fb.update(html);
		h.bc();
	}

	h.go = function () { // Get option
		return h.op;
	};

	h.so = function(on, ov) { //Set option
		if (h.op.hasOwnProperty(on)) {
			h.op[on] = ov;
		}
	};

	if (!Effect) {
		h.setOption('noEffects', true);
	}

	h.toggle = function () { //Toggle show
		if (h.isOpened()) {
			return h.close();
		} else {
			return h.open();
		}
	};

	h.observe = function(event, handler) {
		h.fb.observe(event, handler);
	}

	h.open = function (reposition) { //Open Lightbox
		h.sp();
		if (h.isOpened()) {
			return false;
		}
		Event.fire(document, 'globallightbox:opened', {box:h});
		h.fb.fire('lightbox:opened');
		if (h.op.noEffects || Prototype.Browser.IE) {
			return h.fb.show();
		} else {
			Effect[h.op.appearEffect](h.fb, h.op.appearOptions);
		}
	};

	h.close = function (soft) { //Close lightbox
		if (!h.isOpened) {
			return false;
		}
		if(soft === true) {
			Event.fire(document, 'globallightbox:soft.closed');
		} else {
			Event.fire(document, 'globallightbox:closed');
		}
		h.fb.fire('lightbox:closed');
			
		if (h.op.noEffects || Prototype.Browser.IE) {
			return h.fb.hide();
		} else {
			Effect[h.op.hideEffect](h.fb, h.op.hideOptions);
		}
	};

	h.closeSoft = function(){ //Close but lock fader, thank you Lewis
		h.close(true);
	}


	h.isOpened = function () { // is this lightbox opened
		if (h.fb.style.display !== 'none') {
			return true;
		}
		return false;
	}

	h.hD = function(){ // Use hardcoded design, lol
		h.fb.setStyle({
			background:"#fff",
			boxShadow:"0 0 10px #555",
			padding:'10px',
			borderRadius:'5px'
		});
	}
	
	h.sp = function (mode) { // very easy
		var m = mode || h.op.positionMode;
		var f = h.fb; //shortcut
		var t = []; //temp shit
		var elay;

		if (h.op.hDesign) {
			h.hD();
		}

		t.dh = document.viewport.getHeight();

		t.sy = document.viewport.getScrollOffsets()[1];

		f.setStyle({
			top: '-100550px',
			position: 'absolute'
		});

		t.olddisplay = f.style.display;

		f.style.display = 'block'; //Sorry for reflow, bitch
		t.w = f.getWidth();
		t.h = f.getHeight();

		f.style.display = t.olddisplay;

		f.style.zIndex = 10001;

		switch (m) {
			case 'absolute-page-center':
				f.setStyle({
					position: 'absolute',
					top: '50%',
					left: '50%',
					marginLeft: -Math.floor(t.w/2) + 'px',
					marginTop: -Math.floor(t.h/2) + 'px'
				});
				break;
			case 'absolute-center':
				t.ct = (t.dh - t.h)/2 + t.sy;
				if (t.ct < 150) {
					t.ct = 150;
				}
				f.setStyle({
					position: 'absolute',
					top: Math.floor(t.ct) + 'px',
					left: '50%',
					marginLeft: -Math.floor(t.w/2) + 'px'
				});
				break;
			default:
				return;
		}

		h.positioned=true;
	};

	h.bc = function () {
		// Bind direct CONTROLS
		//
		if (h.op.controls) {
			for (fuu in h.op.controls) {
				if (h.hasOwnProperty(fuu) && (typeof (h[fuu]) === 'function')  && h.op.controls.hasOwnProperty(fuu)) {
					h.op.controls[fuu].each(function (piu) {
						Event.observe(piu, 'click', h[fuu]);
					});
				}
			}
		}

		// Bind CONTROLS through keyword + controlname in classname
		//
		ddiv = h.fb.select('*');
		ddiv.each(function(fuu){
			var cList = fuu.className.split(' ');
			for (piu=0; piu<cList.length; piu++) {
				if (cList[piu].substring(0, h.op.keyWord.length) === h.op.keyWord) {
					xiu = cList[piu].substring(h.op.keyWord.length+1);
					if (h.hasOwnProperty(xiu) && (typeof (h[xiu]) === 'function')) {
						Event.observe(fuu, 'click', h[xiu]);
					}
				}
			}
		});
	}

	h.bc(); //BIND CONTROLS, WHAR ARE YOU WAITING FOR!!11??

	// Show right after class definition
	//
	if (!h.op.dontShowRightNow) {
		setTimeout(h.open, 110);
	}

	return h;
};
