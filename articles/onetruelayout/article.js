function addFootnotes()
	{
	var footnotes = document.getElementById('footnotes');
	if (!footnotes) { return; }
	var footnote_list = footnotes.getElementsByTagName('li');
	var backlink = document.createElement('a');
	var footnote_surround = document.createElement('sup');
	backlink.className = 'backlink';
	//backlink.href = "#";
	var back_text = document.createTextNode('↩');
	//var back_text = document.createTextNode('↶');
	backlink.appendChild(back_text);
	var all_links = document.getElementsByTagName('a');
	for (var i = 0; i < footnote_list.length; i++)
		{
		var return_to = null;
		for (var j = 0; j < all_links.length; j++)
			{
			var footnote_id = footnote_list[i].id;
			if (all_links[j].href.indexOf('#'+footnote_id) != -1)
				{
				var new_backlink = backlink.cloneNode(true);
				footnote_list[i].appendChild(new_backlink);
			
				all_links[j].id = 'back_to_'+footnote_id;
				all_links[j].childNodes[0].nodeValue = '['+(i+1)+']';
				all_links[j].onclick = function() { window.fresh = false; }
				var new_surround = footnote_surround.cloneNode(true);
				var link_parent = all_links[j].parentNode;
				link_parent.insertBefore(new_surround, all_links[j]);
				var link_dump = link_parent.removeChild(all_links[j]);
				new_surround.appendChild(link_dump);
				new_backlink.href = '#back_to_'+footnote_id;
				new_backlink.onclick = function()
					{
					if (0 && !window.fresh)
						{
						history.back();
						return false;
						}
					}
				}
			}
		}
	}

window.onload = function()
	{
	addFootnotes();
	window.fresh = true;
	}