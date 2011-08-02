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
		},
		ø,
		ddiv; // little DOM shit

	//init options
	h.op = op || { };		
	h.op = merge(h.op, dO, true);

	if(!select || !select.tagName !=='select') { 
		return;
	 }

 }
