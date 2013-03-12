function leftFill() {
if (document.images) {
	 if (document.getElementById("leftcolfill").style.display != "block") {
	 		 document.getElementById("leftcolfill").style.display = "block";
} else {
	document.getElementById("leftcolfill").style.display = "none";
	document.getElementById("wrapper2").style.width = "auto";
	}
if (document.getElementById("wrapper2").style.width == "100%") {
document.getElementById("wrapper2").style.width = "auto";
  } else {
  	document.getElementById("wrapper2").style.width = "100%";
         }
}}

function rightFill() {
if (document.images) {
	 if (document.getElementById("rightcolfill").style.display != "block") {
	 		 document.getElementById("rightcolfill").style.display = "block";
			 document.getElementById("wrapper2").style.width = "100%";
} else {
	document.getElementById("rightcolfill").style.display = "none";
	document.getElementById("wrapper2").style.width = "auto";
	}
if (document.getElementById("wrapper2").style.width == "100%") {
document.getElementById("wrapper2").style.width = "auto";
  } else {
  	document.getElementById("wrapper2").style.width = "100%";
         }
}}
