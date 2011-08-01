/*
 *
 *
 *
 *
 *
 *___________.__              __________              ____ ___         
 *\_   _____/|__|______   ____\______   \____ ______ |    |   \______  
 * |    __)  |  \_  __ \_/ __ \|     ___/  _ \\____ \|    |   /\____ \ 
 * |     \   |  ||  | \/\  ___/|    |  (  <_> )  |_> >    |  / |  |_> >
 * \___  /   |__||__|    \___  >____|   \____/|   __/|______/  |   __/ 
 * \/                    \/               |__|             |__|    
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

var popup = function (e, xdata, options) { 
	this.el=e;
	this.xd=xdata;
	this.op=options;
	Event.observe(e, 'mouseover', popupHang.bind(this));
	Event.observe(e, 'mouseout', function(){ 
		e.removePopup()
	});
}
var popupGlobal = {
	z:10100
}
var popupHang = function() {
	var h  = { },  // OLOLO, dont touch it please
		dO = { 
			uid: '',
			distance: 10,
			wrapperClassName:'oggetto-popup',
			positionMode:'right-center',
			hDesign:false,
			duration:0.4,
			hideTimeout:400,
			moveDistance:40
		},
		ç, // two little iterators
		π, // ...
		ø,
		p = this.el,
		op = this.op,
		xdata = this.xd,
		ddiv; // little DOM shit
	
	if(p.tc) { 
		clearInterval(p.tc);
		return;
	}

	//init options
	h.op = op || { };		
	h.op = merge(h.op, dO, true);
	
	//init
	if (typeof (xdata) === 'string') { // let's know is it some kind of html...
		if ( $(xdata) !== null ) { // and there is some element with XDATA id
			h.fb = $(xdata); // just use it!...
		} else {
			ddiv = document.createElement('div');
			ddiv.className = 'oggetto-popup ' + h.op.wrapperClassName;
			ddiv.style.display = 'none';
			ddiv.update (xdata);
			h.fb = p.parentNode.appendChild(ddiv);
		}
	} else {
		if (typeof $(xdata)==='object' && $(xdata).hasOwnProperty('tagName')) {
			h.fb = $(xdata);
		} else {
			console.log('FirePopup: Can\'t understand you dude');
			return false;
		}
	}

	h.go = function () { // Get option
		return h.op;
	};

	h.so = function(on, ov) { //Set option
		if (h.op.hasOwnProperty(on)) {
			h.op[on] = ov;
		}
	};

	h.hD = function () { 
		h.fb.setStyle({ 
			borderRadius:'10px',
			boxShadow:'0 0 10px #999',
			background:'#fff',
			padding:'10px',
			width:'100px',
			height:'100px'
		})	
	}

	h.sp = function (mode) { // very easy
		var m = mode || h.op.positionMode;
		var f = h.fb; //shortcut
		var t = []; //temp shit
		var elay;

		if (h.op.hDesign) {
			h.hD();
		}

		t.w = f.getWidth();
		t.h = f.getHeight();

		t.gw = p.getWidth();
		t.gh = p.getHeight();
		t.gx = p.cumulativeOffset()[0];
		t.gy = p.cumulativeOffset()[1];

		f.style.zIndex = ++popupGlobal.z;

		switch (m) {
			case 'right-center':
				t.ny = t.gy+(t.gh/2) - (t.h/2);
				t.nx = t.gx - t.w - h.op.distance;
				break;
			default:
				return;
		}
		f.setStyle({
			position: 'absolute',
			left: t.nx + 'px',
			top: t.ny + 'px'
		});

		h.positioned=true;
	};

	p.removePopup = function(){ 
		p.tc = setTimeout(function() {
			/* WARNING: DESTRUCT */
			delete p.tc;
			new Effect.Fade(h.fb, { duration:(h.op.duration/3) });
			new Effect.Move(h.fb, {
				x: h.op.moveDistance, y: 0, mode: 'relative',
				duration:h.op.duration,
				transition: Effect.Transitions.sinoidal,
				afterFinish:function() {
					Event.stopObserving(ddiv);	
					Element.remove(h.fb);
				}
			});
			p.removeClassName('popup-attached');
		}, h.op.hideTimeout);
	};
	
	Event.observe(ddiv, 'mouseout', p.removePopup.bind(this))
	Event.observe(ddiv, 'mouseover', function(){ 
		if(p.tc){ 
			clearInterval(p.tc)
			return;
		}
	});

	h.sp();

	new Effect.Move(h.fb, { x:-h.op.moveDistance, mode:'relative', duration:0.01, afterFinish:function(){ 
		new Effect.Appear(h.fb, { duration:h.op.duration });
		new Effect.Move(h.fb, {
		  x: h.op.moveDistance, y: 0, mode: 'relative',
		  duration:h.op.duration,
		  transition: Effect.Transitions.sinoidal
		});
	} })

	p.addClassName('popup-attached');

	return h;

}
