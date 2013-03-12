/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~/
 * excerpted from: Bivia Utilities, v1.5
 * (c) 2005 bivia.com
 * created by Ben Curtis of bivia.com, February 22 2005
 * Id: bv_utilities.js,v 1.8 2005/03/14 08:48:59 bcurtis Exp
 *
 * embedded so that enableAddClassOnKey.js is self-contained
 *~~~~*/


/*
	the ondocload "event" is triggered by a script call before the closing body tag:
		<script type="text/javascript">if(window.bv_docLoaded)bv_docLoaded();</script>
		</body>

	it is the event before onload that indicates the document is done downloading;
	after the func declaration we set two handlers to make sure events assigned to
	docload are triggered onload if the author forgets to put the call in the doc,
	and after a delay to give the engine a chance to put everything in place; then
	we also need a check to see if it's already run onload, for pages with no img.
*/
	function bv_addListener(el, evt, fn) {
		if (typeof el == "string") el = document.getElementById(el);
		if (!el) return;
		if (window.addEventListener && evt != 'docload') { // DOM
			el.addEventListener(evt, fn, false); // false, because IE can't handle the truth
		} else if (window.attachEvent && evt != 'docload') { // MS, incl Opera
			el.attachEvent('on'+ evt, fn);
		} else { // Mac IE and the ondocload event
			var prevHandler = (typeof el['on'+ evt] == 'function') ? el['on'+ evt] : function () {};
			el['on'+ evt] = function() { prevHandler(); fn(); } 
		}
	}
	function bv_docLoaded() { setTimeout("if (!window.bv_docInited) window.ondocload();", 5); }
	bv_addListener(window, 'docload', function () { window.bv_docInited = true; });
	bv_addListener(window, 'load', bv_docLoaded);
/* END bv_addListener */



	function bv_trim(s,internal) {
// Mac IE chokes on the ?
//		s = s.replace(/^\s*(.*?)\s*$/, '$1');
		s = s.replace(/^\s+/g, '');
		s = s.replace(/\s+$/g, '');
		if (internal) s = s.replace(/\s+/g, ' ');
		return s;
	}
	function bv_addClassName(el, nm) {
		var regex = new RegExp("\\b"+nm+"\\b", "gi");
		if (el.className.match(regex)) {}
		else el.className = bv_trim(el.className +" "+ nm, 1);
	}
	function bv_removeClassName(el, nm) {
		var regex = new RegExp("\\b"+nm+"\\b", "gi");
		el.className = bv_trim(el.className.replace(regex, ''), 1);
	}


/******** /standard * utilities ********/









/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~/
 * Bivia Enable: Add Class On Key, v1.0
 * (c) 2005 bivia.com
 * created by Ben Curtis of bivia.com, March 15 2005
 * $Id: bv_utilities.js,v 1.8 2005/03/14 08:48:59 bcurtis Exp $
 *~~~~*/


function bv_addClassKeyListener(evt) {
	var e = evt || window.event;
	var Key    = e.charCode || e.keyCode;
	if (bv_keyAssignments[String.fromCharCode(Key)]) {
		var A = bv_keyAssignments[String.fromCharCode(Key)];
		for (var xx=0; xx<A.length; xx++) {
			var regex = new RegExp("\\b"+ A[xx].className +"\\b");
			if (A[xx].trg.className.match(regex))
				bv_removeClassName(A[xx].trg, A[xx].className);
			else bv_addClassName(A[xx].trg, A[xx].className);
		}
	}
}
bv_addListener(window.document, 'keypress', bv_addClassKeyListener);


var bv_keyAssignments = new Object();
function bv_registerKeyAndClass(el, Key, Class) {
	if (!bv_keyAssignments[Key]) bv_keyAssignments[Key] = new Array();
	bv_keyAssignments[Key][bv_keyAssignments[Key].length] = {trg:el,className:Class};
}


var bv_AssignKeysOnlyTo = "div,span,body,link,p,table,a,img,ol,ul,dl";
function bv_initKeyAssignments() {
	var Srch = new Array();
	var Tags = bv_AssignKeysOnlyTo.split(",");
	for (var xx=0; xx<Tags.length; xx++) {
		var Els = (document.getElementsByTagName) ? document.getElementsByTagName(Tags[xx]) : document.all;
		for (var ii=0; ii<Els.length; ii++) {
			Srch[Srch.length] = Els[ii];
		}
	}
	for (var xx=0; xx<Srch.length; xx++) {
		if (Srch[xx].nodeType == 1 && Srch[xx].className) {
			var Assignments = Srch[xx].className.split(" ");
			for (var ii=0; ii<Assignments.length; ii++) {
				var Props = null;
				if (Props = Assignments[ii].match(/\bbvAssignKey-(.)-([\w\d\-\_]+)\b/)) {
					bv_removeClassName(Srch[xx],Props[0]); // prevent a re-scan from assigning the same key twice
					if (Props.length == 3) bv_registerKeyAndClass(Srch[xx], Props[1], Props[2]);
				}
			}
		}
	}
}
bv_addListener(window, "docload", bv_initKeyAssignments);


