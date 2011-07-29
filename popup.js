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

var popup = function(xdata) {
	var _ = lightbox;
	var h  = { },  // OLOLO, dont touch it please
		dO = { 
			uid: '',
			wrapperClassName:'oggetto-popup'
		},
		ç, // two little iterators
		π, // ...
		ø,
		ddiv; // little DOM shit
	
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
			h.fb = document.body.appendChild(ddiv);
		}
	} else {
		if ($(xdata).tagName) {
			h.fb = xdata;
		} else {
			console.log('Lightbox: Can\'t understand you boy');
			return false;
		}
	}

	h.up = _.up;


}
