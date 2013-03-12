/*
 *	jQuery.tabPages
 * 
 *  O.P.Gobee
 *  You may use, copy and modify this script for free,
 *	provided this message remains intact and included with all copies.
 *	This script is provided 'as is' with no warranties given. Use this script at own risk.
*/


;(function($) {

//create namespace jLearn within jQuery object
if(!$.tabPages) {$.tabPages={};}

//////////////////////////////////////////////////////////////////////////////
/*
>> Function that creates a tabbed page and inserts it in the page.

>> Arguments: a map with properties:
- tabPageLeft,tabPageTop,tabPageWidth,tabPageHeight= dimensions of the pagelike rectangle. NB: the tabs extend 24 px on top of this! [required]
- tabs: an array containing arbitrary nr of ['tabLabel','id of tab's content containerelement']s. A tab is formed for each. [required]
- insertIn= html elem into which the tab page should be inserted [optional][default=body]
- idGenPrefix= an IDprefix that is general for the whole group of tabs and the pagelike rectangle [optional][default=no prefix]
- pathToImg= URL path to location of the images [optional][default=images in same folder as page]
- fontSize: [optional][default:85%]
- tabWidthFactor: determines width of tab spare on both sides of label text [optional][default:100%]
- functionToActivate=function in the calling page activated at click on a tab (is sent clicked as argument: iDprefix+tabNr clicked)[optional][default:no function]
- backgroundColor: [optional][default: #C0C0C0 (grey)]

ALSO EXPECTS:
- jQuery present
- presence of the following 16 images (if not in same folder as the page, specify their  location in pathtoimg)
tab_back_lft.gif
tab_back_mid.gif
tab_back_rght.gif
tab_front_lft.gif
tab_front_lft_page_crn.gif
tab_front_mid.gif
tab_front_rght.gif
tab_page_bor_bottom_mid.gif
tab_page_bor_lft_mid.gif
tab_page_bor_rght_mid.gif
tab_page_bor_top_mid.gif
tab_page_lft_lwr_crn.gif
tab_page_lft_top_crn.gif
tab_page_rght_lwr_crn.gif
tab_page_rght_top_crn.gif
senser.gif

//You can pass more or less arguments, each optional, examples:
//minimal version:
//{tabPageLeft:,tabPageTop:,tabPageWidth:,tabPageHeight:,tabs:[[],[],[]]}

//version with all arguments:
//{insertIn:"divBla",idGenPrefix:"tb",pathToImg:"av/",pathToImg:"85%",tabWidthFactor:"100%",functionToActivate:tabexec,backgroundColor:"#C0C0C0",tabPageLeft:,tabPageTop:,tabPageWidth:,tabPageHeight:,tabs:[[],[],[]]}
*/

$.tabPages.create=create;
function create(map) //
    {//init, collect the arguments in easy variables
	var o= map //shorthand
	if(typeof o!="object") {alert("Error in func writetabpage. Passed map '"+o+"' is not an object");return}
	//variables, if none specified, set defaults
	var insertIn= (exists(o.insertIn))? o.insertIn : "";
	var IDgen= (exists(o.idGenPrefix)) ? o.idGenPrefix : "";
	var jQId;
	var pathtoimg= (exists(o.pathToImg)) ? o.pathToImg : "";
	var fs= (exists(o.fontSize)) ? o.fontSize : "85%";
	var tabwidthfactor= (exists(o.tabWidthFactor)) ? o.tabWidthFactor : "100%";
	var func= (exists(o.functionToActivate)) ? o.functionToActivate : "";
	var backgroundColor=(exists(o.backgroundColor)) ? o.backgroundColor : "#C0C0C0";
	var tabpageleft= (exists(o.tabPageLeft)) ? o.tabPageLeft : 0;
	var tabpagetop= (exists(o.tabPageTop)) ? o.tabPageTop : 0;
	var tabpagewidth= (exists(o.tabPageWidth)) ? o.tabPageWidth : 1000;
	var tabpageheight= (exists(o.tabPageHeight)) ? o.tabPageHeight : 600;
	var tabs= (exists(o.tabs)) ? o.tabs : new Array();
	var label=new Array();
	// catch any undefined texts
	for (var i=0;i<tabs.length;i++)
    	{label[i]=(exists(tabs[i]) && exists(tabs[i][0])) ? tabs[i][0] : "";}

	var nrtabs=tabs.length;
	var string,elemID_to_insert_in;
	var ifnt=parseInt(fs); //take off "%" and convert to Int (for calc)
	var twfact=parseInt(tabwidthfactor); //take off "%" and convert to Int (for calc)
	var ll=parseInt(tabpageleft);
	var tt=parseInt(tabpagetop);
	var ww=parseInt(tabpagewidth);
	var hh=parseInt(tabpageheight);

	var tabw=new Array(); //the tabwidths
	var tabsp=new Array(); //startpos of tabs
	tabsp[0]=0; //1st tab=startpos= 0
	var lw; //letterwidth in pixels
	var idlist; //for construction of list of id's of 1st tab
	var labeltop; //the 'top' position of the div's that contain the texts on the tabs
	
	//URLs 
	var srcpe1="tab_page_lft_top_crn.gif"; //the page-forming images
	var srcpe2="tab_page_bor_top_mid.gif";
	var srcpe3="tab_page_rght_top_crn.gif";
	var srcpe4="tab_page_bor_lft_mid.gif";		//elem 5 = div that fills the page
	var srcpe6="tab_page_bor_rght_mid.gif";
	var srcpe7="tab_page_lft_lwr_crn.gif";
	var srcpe8="tab_page_bor_bottom_mid.gif";
	var srcpe9="tab_page_rght_lwr_crn.gif";
	var	srctbl="tab_back_lft.gif";	    //the tab-forming images
	var srctbm="tab_back_mid.gif";
	var srctbr="tab_back_rght.gif";
	var srctflc="tab_front_lft_page_crn.gif";
	var srctfl="tab_front_lft.gif";
	var srctfm="tab_front_mid.gif";
	var srctfr="tab_front_rght.gif";
	var srcsens="senser.gif";
	
	//shorthands
	var ii="<img id=\""+IDgen;
	var is="\" src=\""+pathtoimg;
	var il="\" style=\"position:absolute;left:";
	var it="px;top:";
	var iw="px;width:";
	var ih="px;height:";
	var iend="px\" > ";
		
	//determine nr of pixels needed per letter in the tabtexts and texttop
	//= nrof pixels counted on screen for a 'w' + 1 pixel between the letters
	if(ifnt>100){lw=14; labeltop=-20;} 
	if(ifnt<=100 && ifnt>95) {lw=12; labeltop=-18;}
	if(ifnt<=95 && ifnt>=75) {lw=10; labeltop=-16;}
	if(ifnt<75) {lw=8; labeltop=-14;}
	
	//for each tab calc width in pixels and startpos in pixels of tab with startpos 1st tab=0
	for(var i=0;i<nrtabs;i++)
		{//alert("label["+i+"]="+label[i])
		//tabwidth in pixels=nr of letters x letterwidth + margin L&R of word 
		//+left and right sides (each 4px) of tab
		//8-4-2004 added multiplication by tabwidthfactor
		tabw[i]=Math.round(((label[i].length)*lw +lw/2)*twfact/100 +8);
		tabsp[i+1]=tabsp[i]+tabw[i]; //nexttab's startpos=startpos of this one plus its width
		}
	
	//construct the html declarations for page forming pieces	
	var pgelem1=ii+"pe"+1+is+srcpe1+il+ll+it+tt+iw+4+ih+4+iend;
	var pgelem2=ii+"pe"+2+is+srcpe2+il+(ll+4)+it+tt+iw+(ww-8)+ih+4+iend;
	var pgelem3=ii+"pe"+3+is+srcpe3+il+(ll+ww-4)+it+tt+iw+4+ih+4+iend;
	var pgelem4=ii+"pe"+4+is+srcpe4+il+ll+it+(tt+4)+iw+4+ih+(hh-8)+iend;
	var pgelem5="<div id=\""+IDgen+"centraldiv"+il+(ll+4)+it+(tt+4)+iw+(ww-8)+ih+(hh-8)+"px; z-index:0;background-color:"+backgroundColor+"\"></div> ";
	var pgelem6=ii+"pe"+6+is+srcpe6+il+(ll+ww-4)+it+(tt+4)+iw+4+ih+(hh-8)+iend;
	var pgelem7=ii+"pe"+7+is+srcpe7+il+ll+it+(tt+hh-4)+iw+4+ih+4+iend;
	var pgelem8=ii+"pe"+8+is+srcpe8+il+(ll+4)+it+(tt+hh-4)+iw+(ww-8)+ih+4+iend;
	var pgelem9=ii+"pe"+9+is+srcpe9+il+(ll+ww-4)+it+(tt+hh-4)+iw+4+ih+4+iend;
	//concatenate
	string=pgelem1+pgelem2+pgelem3+pgelem4+pgelem5+pgelem6+pgelem7+pgelem8+pgelem9;
	
	//construct the html declarations for the tabs
	for(var i=0;i<nrtabs;i++)
		{//the back-tabs
	string+=ii+"tbl"+i+is+srctbl+il+(ll+tabsp[i]+2)+it+(tt-18)+iw+4+ih+18+"px;z-index:49\" > ";
	string+=ii+"tbm"+i+is+srctbm+il+(ll+tabsp[i]+6)+it+(tt-18)+iw+(tabw[i]-8)+ih+18+"px;z-index:49\" > ";
	string+=ii+"tbr"+i+is+srctbr+il+(ll+tabsp[i]+6+tabw[i]-8)+it+(tt-18)+iw+4+ih+18+"px;z-index:49\" > ";
		//the front-tabs
		if(i==0) //for 1st tab take the tab-front page left corner img
			{string+=ii+"tfl"+i+is+srctflc+il+(ll+tabsp[i])+it+(tt-20)+iw+4			+ih+24+"px;z-index:50\" > ";}
		else //else take the regular tab front left img
			{string+=ii+"tfl"+i+is+srctfl+il+(ll+tabsp[i])+it+(tt-20)+iw+4			+ih+24+"px;z-index:50\" > ";}
		string+=ii+"tfm"+i+is+srctfm+il+(ll+tabsp[i]+4)+it+(tt-20)+iw+(tabw[i]-4)		+ih+24+"px;z-index:50\" > ";
		string+=ii+"tfr"+i+is+srctfr+il+(ll+tabsp[i]+4+tabw[i]-4)+it+(tt-20)+iw+4		+ih+24+"px;z-index:50\" > ";
		//the text on the tabs
		string+="<div id=\""+IDgen+"label"+i+il+(ll+tabsp[i]+6)+it+(tt+labeltop)+iw+(tabw[i]-8)+ih+(-labeltop)		+"px;font-size:"+fs+";text-align:center;z-index:51\">"+label[i]+"</div> ";
		//the senser transparent img in front of the tabs that grabs the click on a tab
		//and makes the tabs work
		string+=ii+"sens"+i+is+srcsens+il+(ll+tabsp[i]+2)+it+(tt-18)+iw+(tabw[i])		+ih+18+"px;z-index:100\" > ";
		}//end of for loop constructing the tabs

		//insert the whole stuff in the document
		if(insertIn!="")
			{$("#"+insertIn).append(string);}
		else
			{$("body").append(string);}
	//bind the event-handlers on the tabs
	for (var i=0;i<nrtabs;i++)
	    {$("#"+IDgen+"sens"+i).bind("click",i,function(event){switchTo(event.data);});
		}
	//bind the possibly requested extra func to activate at tab click
	if(typeof func == "function")
		{for (var i=0;i<nrtabs;i++)
	    	{$("#"+IDgen+"sens"+i).bind("click",IDgen+i,function(event){func(event.data);});
	    	}
		}	
	//store info to do the switching
	switchTo.info.push([IDgen,tabs]);
		
    }// end of func writetabpage

	
//////////////////////////////////////////////////////////////////////////	
//the function that handles the switching of tabs	
/*arguments:
nrTab: nr of tab to switch to (zero based) [required]
IDgen: a prefix used in this tabpages [optional]
*/
switchTo.info=[];	
$.tabPages.switchTo=switchTo;
function switchTo(nrTab,IDgen) //IDgen is optional
    {if(!exists(nrTab)){return;}

	var IDgen= (exists(IDgen)) ? IDgen : "";
	var jQId="#"+IDgen;
	var tabs=[];
	var info=switchTo.info;
	//find the tabs info belonging to this tabpages
	for (var i=0;i<info.length;i++)
    	{if(info[i][0]==IDgen) {tabs=info[i][1];break;}
    	}
	var nrTabs=tabs.length;
	
	//hide all front tabs and all contents of this group of tabs
	for(var i=0;i<nrTabs;i++)
		{//construct string that contains the tab's left side, mid piece and right side
		string=jQId+"tfl"+i+","+jQId+"tfm"+i+","+jQId+"tfr"+i;
		$(string).hide();//.css("visibility","hidden");
		if(tabs[i]) //
			{$("#"+tabs[i][1]).hide();} //tabs[x][1] contains the id of the tabs content container
		}
	
	//finally show the front tab and content of the hit tab
	string=jQId+"tfl"+nrTab+","+jQId+"tfm"+nrTab+","+jQId+"tfr"+nrTab;
	$(string).show();//.css("visibility","visible");
	if(tabs[nrTab]) 
		{$("#"+tabs[nrTab][1]).show();}
	}//end of func tabSwitch
/////////////////////////////////////////////////////////////////
	
	
})(jQuery); //end anonymous function and invoke it	