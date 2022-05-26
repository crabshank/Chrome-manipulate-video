var videoTags=[];
var sdivs=[];
var vids=[];
var vid_css=[];
var corners=[];
var crr={v:'',l:0,f:2,style:''};
var timer;
var timer2;
var observer=null;

function getClientRect(el,offst){
	if(offst){
		return {bottom: el.clientHeight+el.clientTop+el.offsetTop, height: el.clientHeight, left: el.clientLeft+el.offsetLeft, right: el.clientLeft+el.offsetLeft+el.clientWidth, top: el.clientTop+el.offsetTop, width: el.clientWidth};
	}else{
		return {bottom: el.clientHeight+el.clientTop, height: el.clientHeight, left: el.clientLeft, right: el.clientLeft+el.clientWidth, top: el.clientTop, width: el.clientWidth};
	}
}

function absBoundingClientRect(el){
	let st = [window?.scrollY,
					window?.pageYOffset,
					el?.ownerDocument?.documentElement?.scrollTop,
					document?.documentElement?.scrollTop,
					document?.body?.parentNode?.scrollTop,
					document?.body?.scrollTop,
					document?.head?.scrollTop];
					
		let sl = [window?.scrollX,
						window?.pageXOffset,
						el?.ownerDocument?.documentElement?.scrollLeft,
						document?.documentElement?.scrollLeft,
						document?.body?.parentNode?.scrollLeft,
						document?.body?.scrollLeft,
						document?.head?.scrollLeft];
						
				let scrollTop=0;
				for(let k=0; k<st.length; k++){
					if(!!st[k] && typeof  st[k] !=='undefined' && st[k]>0){
						scrollTop=(st[k]>scrollTop)?st[k]:scrollTop;
					}
				}			

				let scrollLeft=0;
				for(let k=0; k<sl.length; k++){
					if(!!sl[k] && typeof  sl[k] !=='undefined' && sl[k]>0){
						scrollLeft=(sl[k]>scrollLeft)?sl[k]:scrollLeft;
					}
				}
	
	const rct=el.getBoundingClientRect();
	let r={};

	r.left=rct.left+scrollLeft;
	r.right=rct.right+scrollLeft;
	r.top=rct.top+scrollTop;
	r.bottom=rct.bottom+scrollTop;
	r.height=rct.height;
	r.width=rct.width;
	
	return r;
}

function getTagNameShadow(docm, tgn){
var shrc=[docm];
var shrc_l=1;

let srCnt=0;

while(srCnt<shrc_l){
	allNodes=[shrc[srCnt],...shrc[srCnt].querySelectorAll('*')];
	for(let i=0, len=allNodes.length; i<len; i++){
		if(!!allNodes[i] && typeof allNodes[i] !=='undefined' && allNodes[i].tagName===tgn && i>0){
			shrc.push(allNodes[i]);
		}

		if(!!allNodes[i].shadowRoot && typeof allNodes[i].shadowRoot !=='undefined'){
			let c=allNodes[i].shadowRoot.children;
			shrc.push(...c);
		}
	}
	srCnt++;
	shrc_l=shrc.length;
}
	shrc=shrc.slice(1);
	let out=shrc.filter((c)=>{return c.tagName===tgn;});
	
	return out;
}

function get_src(vid){
	if (vid.src !== "") {
		return vid.src;
	} else if (vid.currentSrc !== "") {
		return vid.currentSrc;
	}else{
		return '';
	}
}

function removeEls(d, array) {
    var newArray = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i] != d) {
            newArray.push(array[i]);
        }
    }
    return newArray;
}


function eligVid(vid){
if((get_src(vid)!='') && (vid.readyState != 0)){
	return true;
}else{
	return false;
}
}

function simpleCopyArray(array){
		var newArray = [];
	    for (let i = 0; i < array.length; i++) {
            newArray.push(array[i]);
		}
		return newArray;
}

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
	//console.log(message);
		switch (message.message) {
						
                case "Scan!":
				
					
function resetStyle(){
	try{
		crr.v.style.cssText=crr.style;
	  }catch(e){;}
}

if (observer==null) {

observer = new MutationObserver((mutations) => {
	
if (timer2) {
	clearTimeout(timer2);
}
timer2 = setTimeout(() => {
		resetStyle();
},250);
		
});

observer.observe(document, {
			attributeFilter: ["style"],
			childList: true,
			subtree: true,
			attributeOldValue: true
});

}
				
				function rstCorners(vid, corners){
								var vRect=getClientRect(vid,true);
								for(let k=0, len=corners.length; k<len; k++){
							if (k==0){
								corners[k].style.top=vRect.top+'px';
								corners[k].style.left=vRect.left+'px';
								corners[k].setAttribute('left_prp',0);
								corners[k].setAttribute('top_prp',0);
							}else if (k==1){
								corners[k].style.top=vRect.top+'px';
								let lf1=vRect.right-corners[k].clientWidth;
								corners[k].style.left=lf1+'px';
								corners[k].setAttribute('left_prp',(lf1-vRect.left)/vRect.width);
								corners[k].setAttribute('top_prp',0);	
							}else if (k==2){
								corners[k].style.left=vRect.left+'px';
								let tp2=vRect.bottom-corners[k].clientHeight;
								corners[k].style.top=tp2+'px';
								corners[k].setAttribute('left_prp',0);
								corners[k].setAttribute('top_prp',(tp2-vRect.top)/vRect.height);
							}else if(k==3){
								let lf3=vRect.right-corners[k].clientWidth;
								let tp3=vRect.bottom-corners[k].clientHeight;
								corners[k].style.top=tp3+'px';
								corners[k].style.left=lf3+'px';
								corners[k].setAttribute('left_prp',(lf3-vRect.left)/vRect.width);
								corners[k].setAttribute('top_prp',(tp3-vRect.top)/vRect.height);
							}
							
								let ar=absBoundingClientRect(corners[k]);

								corners[k].setAttribute('left_a',ar.left);
								corners[k].setAttribute('top_a',ar.top);	

								corners[k].setAttribute('right_a',ar.right);
								corners[k].setAttribute('bottom_a',ar.bottom);	
								
								}
								
								

								return corners;
}
				


						function getStrms(){

						                        var tmpVidTags = [
    ...getTagNameShadow(document,'VIDEO')
];

if (videoTags.length==0){
	videoTags=simpleCopyArray(tmpVidTags);
	
	trk=0;
		for (let k = 0; k<videoTags.length; k++) {
			if (!eligVid(videoTags[k])) {
				videoTags=removeEls(videoTags[k], videoTags);
			}
		}
}else{
	
	trk2=videoTags.length;

		for (let k = 0; k<tmpVidTags.length; k++) {
			if (!checkInclude(videoTags,tmpVidTags[k])) {
				videoTags.push(tmpVidTags[k]);
				trk=trk2;
			}
		}
		
		for (let k = trk; k<videoTags.length; k++) {
				if (!eligVid(videoTags[k])) {
				videoTags=removeEls(videoTags[k], videoTags);
				trk--;
				}
		}

}
   

						
						for (let i = trk; i<videoTags.length; i++) {
                            createbutn(i, videoTags[i], get_src(videoTags[i]));
						}
						
						 if (videoTags.length>1){ 
						 console.log(videoTags);
						 }else if (videoTags.length==1){
						 console.log(videoTags[0]);
						 }
							
                        
						}
		
								getStrms();
		
		                        function b_hide(b,vid) {
								var v_par=vid;
								if(!!vid.parentElement && typeof vid.parentElement!=='undefined'){
									v_par= vid.parentElement;
								}
								 v_par.style.setProperty("cursor", "initial", "important");
								 corners=[...b.childNodes];
								 b.style.setProperty("display", "initial", "important");
								 b.style.setProperty("visibility", "initial", "important");
								 b.style.setProperty("z-index", Number.MAX_SAFE_INTEGER, "important");	
								 corners[0].style.setProperty("display", "initial", "important");
								 corners[0].style.setProperty("visibility", "initial", "important");
								 corners[0].style.setProperty("z-index", Number.MAX_SAFE_INTEGER, "important");
								 corners[1].style.setProperty("display", "initial", "important");
								 corners[1].style.setProperty("visibility", "initial", "important");
								 corners[1].style.setProperty("z-index", Number.MAX_SAFE_INTEGER, "important");
								 corners[2].style.setProperty("display", "initial", "important");
								 corners[2].style.setProperty("visibility", "initial", "important");
								 corners[2].style.setProperty("z-index", Number.MAX_SAFE_INTEGER, "important");
								 corners[3].style.setProperty("display", "initial", "important");
								 corners[3].style.setProperty("visibility", "initial", "important");
								 corners[3].style.setProperty("z-index", Number.MAX_SAFE_INTEGER, "important");

								 clearTimeout(timer);
								timer = setTimeout(function(){
								let msd=false;
								
								for(let k=0, len=corners.length; k<len; k++){
									if(corners[k].getAttribute("md")=="true"){
										msd=true;
										break;
									}
								}
								if(!msd){
								b.style.setProperty("display", "none", "important");
								b.style.setProperty("visibility", "hidden", "important");
								if(document.fullscreen || document.webkitIsFullScreen){
									v_par.style.setProperty("cursor", "none", "important");
								}
								}
								}, 6000);
								
								
								
                        }
		

                        function createbutn(i, video, src) {
                       				for (let j=0; j<i; j++){
										if (typeof sdivs[j]==="undefined"){
											sdivs[j]="";
										}if (typeof vid_css[j]==="undefined"){
											vid_css[j]="";
										}if (typeof vids[j]==="undefined"){
											vids[j]="";
										}
									}
						video.setAttribute('toAdj','false');	
						vids[i] = video;
						sdivs[i] = document.createElement('section');
						 sdivs[i].style.cssText = "display: initial !important; visibility: initial !important; z-index: "+Number.MAX_SAFE_INTEGER+" !important; position: absolute !important; background-color: transparent !important; pointer-events: none !important;";
                         video.insertAdjacentElement('beforebegin', sdivs[i]);
						var rect = getClientRect(video,false);
						sdivs[i].style.height = rect.height+'px';
						sdivs[i].style.width = rect.width+'px';
						let h_off=rect.width;
						let v_off=rect.height;
							sdivs[i].style.left=(rect.left)+'px';
							sdivs[i].style.top=(rect.top)+'px';
			
						
						sdivs[i].innerHTML='<div style="display: initial !important; visibility: initial !important; z-index: '+Number.MAX_SAFE_INTEGER+' !important; position: inherit; pointer-events: all; border-color: cyan; border-width: 0.1ch; border-style: solid; border-radius: 50%; user-select: none;">TL</div><div style="display: initial !important; visibility: initial !important; z-index: '+Number.MAX_SAFE_INTEGER+' !important; position: inherit; pointer-events: all;  border-color: cyan; border-width: 0.1ch; border-style: solid; border-radius: 50%; user-select: none;">TR</div><div style="display: initial !important; visibility: initial !important; z-index: '+Number.MAX_SAFE_INTEGER+' !important; pointer-events: all;  border-color: cyan; border-width: 0.1ch; border-style: solid; border-radius: 50%; position: inherit; user-select: none;">BL</div><div style="display: initial !important; visibility: initial !important; z-index: '+Number.MAX_SAFE_INTEGER+' !important; pointer-events: all; border-color: cyan; border-width: 0.1ch; border-style: solid; border-radius: 50%; position: inherit; user-select: none;">BR</div>';
						
						let crnrs=[...sdivs[i].childNodes];
						
								let cs0=window.getComputedStyle(crnrs[0],null);
								let cs1=window.getComputedStyle(crnrs[1],null);
								let cs2=window.getComputedStyle(crnrs[2],null);
								let cs3=window.getComputedStyle(crnrs[3],null);
						
								crnrs[0].setAttribute('left_c',cs0.left);
								crnrs[0].setAttribute('top_c',cs0.top);	
								crnrs[1].setAttribute('left_c',cs1.left);
								crnrs[1].setAttribute('top_c',cs1.top);	
								crnrs[2].setAttribute('left_c',cs2.left);
								crnrs[2].setAttribute('top_c',cs2.top);		
								crnrs[3].setAttribute('left_c',cs3.left);
								crnrs[3].setAttribute('top_c',cs3.top);	
								
								let ar0=absBoundingClientRect(crnrs[0]);
								let ar1=absBoundingClientRect(crnrs[1]);
								let ar2=absBoundingClientRect(crnrs[2]);
								let ar3=absBoundingClientRect(crnrs[3]);
								
								crnrs[0].setAttribute('left_a',ar0.left);
								crnrs[0].setAttribute('top_a',ar0.top);	
								crnrs[1].setAttribute('left_a',ar1.left);
								crnrs[1].setAttribute('top_a',ar1.top);	
								crnrs[2].setAttribute('left_a',ar2.left);
								crnrs[2].setAttribute('top_a',ar2.top);		
								crnrs[3].setAttribute('left_a',ar3.left);
								crnrs[3].setAttribute('top_a',ar3.top);	
								
								crnrs[0].setAttribute('right_a',ar0.right);
								crnrs[0].setAttribute('bottom_a',ar0.bottom);	
								crnrs[1].setAttribute('right_a',ar1.right);
								crnrs[1].setAttribute('bottom_a',ar1.bottom);	
								crnrs[2].setAttribute('right_a',ar2.right);
								crnrs[2].setAttribute('bottom_a',ar2.bottom);		
								crnrs[3].setAttribute('right_a',ar3.right);
								crnrs[3].setAttribute('bottom_a',ar3.bottom);

														function switchCnrs(el,vid){
								event.preventDefault();
								event.stopPropagation();	

								let crnrs=[...el.childNodes];
								if(vid.getAttribute('toAdj')==='false'){

										for(let k=0, len=crnrs.length; k<len; k++){
											
									crnrs[k].setAttribute("md", "false");
									crnrs[k].style.backgroundColor='';
									crnrs[k].style.color='';
										}

												vid.style.transformOrigin="";
												vid.style.transform="";
												crr.style=(vid===crr.v)?vid.style.cssText:crr.style;
											vid.setAttribute('toAdj','true');
								}else{
										for(let k=0, len=crnrs.length; k<len; k++){
												crnrs[k].style.top=crnrs[k].getAttribute('top_c')+'px';
												crnrs[k].style.left=crnrs[k].getAttribute('left_c')+'px';
										}
										doTransform(null,vid,crnrs,false);
									
									vid.setAttribute('toAdj','false');
								}
								
								
						}

								function resetCnrs(el,event,video){
									event.preventDefault();
								event.stopPropagation();
								let sd=el.parentNode;
								let vRct=getClientRect(video,false);
								sd.style.left=(vRct.left)+'px';
								sd.style.top=(vRct.top)+'px';
								el.setAttribute("md", "dbl");
								crr.v=video;
								crr.l=el;
							 corners=[...el.parentNode.childNodes];
							 corners=rstCorners(video, corners);

							crr.v.style.transformOrigin="";
							crr.v.style.transform="";
							crr.style=crr.v.style.cssText;
						}
						
						let corners=[...sdivs[i].childNodes];
						crr.v=video;
						crr.l=corners[0];
						
						corners=rstCorners(video, corners);
						 
						corners.forEach((el, ix) => {
							
								let cs=window.getComputedStyle(el,null);
								el.setAttribute('left_c',cs.left);
								el.setAttribute('top_c',cs.top);
								
								let ar=absBoundingClientRect(el);

								el.setAttribute('left_a',ar.left);
								el.setAttribute('top_a',ar.top);	

								el.setAttribute('right_a',ar.right);
								el.setAttribute('bottom_a',ar.bottom);	
							
							el.onpointerdown = (event) => {
								if(event.ctrlKey){
									resetCnrs(el,event,crr.v);
								}else{
									if(el.getAttribute("md")=="dbl"){
									el.setAttribute("md", "false");
									}else{
									el.setAttribute("md", "true");
									}
									crr.v=video;
									crr.l=el;
								}
							}
							
							
							el.ondblclick = (event) => {
								resetCnrs(el,event,crr.v);
							}	

								
							
						});
						
						window.addEventListener('pointerdown', (event) => {
							event.stopPropagation();
							let crnrs=[...crr.l.parentNode.childNodes];

						for (let k=0, len=crnrs.length; k<len;  k++){
							if(event.target!==crnrs[k]){
								let rectC={left: parseFloat(crnrs[k].getAttribute('left_a')), 
														right: parseFloat(crnrs[k].getAttribute('right_a')), 
														top: parseFloat(crnrs[k].getAttribute('top_a')),
														bottom: parseFloat(crnrs[k].getAttribute('bottom_a'))
													};
													
									if(event.pageX >= rectC.left && event.pageX <= rectC.right && event.pageY >= rectC.top && event.pageY <= rectC.bottom){
										if(event.ctrlKey){
											resetCnrs(crnrs[k],event,crr.v);
										}else{
											if(crnrs[k].getAttribute("md")=="dbl"){
											crnrs[k].setAttribute("md", "false");
											}else{
											crnrs[k].setAttribute("md", "true");
											}
											crr.v=video;
											crr.l=crnrs[k];
											k=len-1;
										}
									}
								}
						}
							
						});

						window.addEventListener('dblclick', (event) => {
							event.stopPropagation();
							let crnrs=[...crr.l.parentNode.childNodes];
							
							for (let k=0, len=crnrs.length; k<len;  k++){
								if(event.target!==crnrs[k]){
									let rectC={left: parseFloat(crnrs[k].getAttribute('left_a')), 
															right: parseFloat(crnrs[k].getAttribute('right_a')), 
															top: parseFloat(crnrs[k].getAttribute('top_a')),
															bottom: parseFloat(crnrs[k].getAttribute('bottom_a'))
														};
														
										if(event.pageX >= rectC.left && event.pageX <= rectC.right && event.pageY >= rectC.top && event.pageY <= rectC.bottom){
											resetCnrs(crnrs[k],event,crr.v);
											k=len-1;
										}
									}
							}
							
						});		


						window.addEventListener('pointerup', e => {
							crr.v.style.setProperty("pointer-events", "", "important");
							let crnrs=[...crr.l.parentNode.childNodes];
							for (let k=0, len=crnrs.length; k<len;  k++){
									crnrs[k].setAttribute("md", "false");
									crnrs[k].style.backgroundColor='';
									crnrs[k].style.color='';
								}
						});

						window.addEventListener('pointermove', e => {
								if(crr.l.getAttribute("md")=="true"){
							btclk(e);
							}
							b_hide(crr.l.parentNode,crr.v);
						});					
						
						
						document.addEventListener('fullscreenchange',() => {
let cr=[...crr.l.parentNode.childNodes];
let rect=getClientRect(crr.v,true);
for (let k=0, len=cr.length; k<len;  k++){
	let ml=0;
	let mt=0;
	 if (k==1){
								ml=-cr[k].clientWidth;
							}else if (k==2){
								mt=-cr[k].clientHeight;
							}else if(k==3){
								mt=-cr[k].clientHeight;
									ml=-cr[k].clientWidth;
								}
	let lf=(cr[k].getAttribute('left_prp')*rect.width+rect.left+ml)+'px';
	let tp=(cr[k].getAttribute('top_prp')*rect.height+rect.top+mt)+'px';
								cr[k].style.left=lf;
								cr[k].style.top=tp;
								
								let cs=window.getComputedStyle(cr[k],null);
								cr[k].setAttribute('left_c',cs.left);
								cr[k].setAttribute('top_c',cs.top);
								
								let ar=absBoundingClientRect(cr[k]);

								cr[k].setAttribute('left_a',ar.left);
								cr[k].setAttribute('top_a',ar.top);	

								cr[k].setAttribute('right_a',ar.right);
								cr[k].setAttribute('bottom_a',ar.bottom);	
								
									}

								
});
						
						window.addEventListener('keydown', e => {
							if(e.keyCode===223 && e.ctrlKey && e.shiftKey){
								for(let i=0; i<sdivs.length; i++){
									if(sdivs[i]!==''){
									switchCnrs(sdivs[i],vids[i]);
									}
								}
							}
						});
                       	
							
                        }
						

                        function btclk(e) {
							if(crr.f>0){
crr.f=0;
								crr.v.style.setProperty("pointer-events", "none", "important");
								 crr.v.style.setProperty('transition','none','important');
								crr.v.style.setProperty('-webkit-transition','none','important');
								crr.l.style.backgroundColor='cyan';
								crr.l.style.color='magenta'; 	
								
let cr_pr=[...crr.l.parentNode.childNodes];

						// TR BR BL
							vRect=getClientRect(crr.v,true);
							if(crr.l===cr_pr[1]){
								let lf1=event.pageX-crr.l.clientWidth;
								crr.l.style.left=lf1+'px';
								crr.l.setAttribute('left_prp',(lf1-vRect.left)/vRect.width);
								if(e.altKey){
									crr.l.style.top=event.pageY+'px';
									crr.l.setAttribute('top_prp',(event.pageY-vRect.top)/vRect.height);
								}
							}else if(crr.l===cr_pr[3]){
								let lf3=event.pageX-crr.l.clientWidth;
								crr.l.style.left=lf3+'px';
								crr.l.setAttribute('left_prp',(lf3-vRect.left)/vRect.width);
								if(e.altKey){
									let tp3=event.pageY-crr.l.clientHeight;
									crr.l.style.top=tp3+'px';
									crr.l.setAttribute('top_prp',(tp3-vRect.top)/vRect.height);
								}
							}else if(crr.l===cr_pr[2]){
								crr.l.style.left=event.pageX+'px';
								crr.l.setAttribute('left_prp',(event.pageX-vRect.left)/vRect.width);
								if(e.altKey){
									let tp2=event.pageY-crr.l.clientHeight;
									crr.l.style.top=tp2+'px';
									crr.l.setAttribute('top_prp',(tp2-vRect.top)/vRect.height);
								}
							}else{
								crr.l.style.left=event.pageX+'px';
								crr.l.setAttribute('left_prp',(event.pageX-vRect.left)/vRect.width);
								if(e.altKey){
								crr.l.style.top=event.pageY+'px';
								crr.l.setAttribute('top_prp',(event.pageY-vRect.top)/vRect.height);
								}
							}
								
								doTransform(e,crr.v,cr_pr,true);


								
							}
									
                                }


function doTransform(e,vid,crnrs,local){
								let invis=false;
								if(window.getComputedStyle(crnrs[0].parentElement,null).display==='none'){
									invis=true;
									crnrs[0].parentElement.style.setProperty("display", "initial", "important");
									crnrs[0].parentElement.style.setProperty("visibility", "visible", "important");
								}
								
								let xy0=getClientRect(crnrs[0],true);
								let xy1=getClientRect(crnrs[1],true);
								let xy2=getClientRect(crnrs[3],true);
								let xy3=getClientRect(crnrs[2],true);
								
								if(invis){
								 b_hide(crnrs[0].parentElement,vid);
								}
								
								vid.style.transform='';
								crr.style=(vid===crr.v)?vid.style.cssText:crr.style;
								let xy_v=vid.getBoundingClientRect();
								
								if(!!e && !e.altKey && local){
									if (crr.l===crnrs[0] || crr.l===crnrs[1]){ //TL||TR
										let dist=Math.abs(xy1.right-xy0.left);
										crnrs[1].style.left=(0.5*dist+0.5*vid.clientWidth)+'px';
										crnrs[0].style.left=(0.5*vid.clientWidth-0.5*dist)+'px';
									}else if (crr.l===crnrs[3]|| crr.l===crnrs[2]){ //BL||BR
										let dist=Math.abs(xy3.right-xy2.left);
										crnrs[3].style.left=(0.5*dist+0.5*vid.clientWidth)+'px';
										crnrs[2].style.left=(0.5*vid.clientWidth-0.5*dist)+'px';
									}
									crnrs[0].style.top=(crr.l===crnrs[1])?crnrs[1].style.top:crnrs[0].style.top;
									crnrs[1].style.top=(crr.l===crnrs[0])?crnrs[0].style.top:crnrs[1].style.top;
									crnrs[3].style.top=(crr.l===crnrs[2])?crnrs[2].style.top:crnrs[3].style.top;
									crnrs[2].style.top=(crr.l===crnrs[3])?crnrs[3].style.top:crnrs[2].style.top;
									
								 xy0=getClientRect(crnrs[0],true);
								 xy1=getClientRect(crnrs[1],true);
								 xy2=getClientRect(crnrs[3],true);
								 xy3=getClientRect(crnrs[2],true);
								}
		
								let cs0=window.getComputedStyle(crnrs[0],null);
								let cs1=window.getComputedStyle(crnrs[1],null);
								let cs2=window.getComputedStyle(crnrs[2],null);
								let cs3=window.getComputedStyle(crnrs[3],null);
						
								crnrs[0].setAttribute('left_c',cs0.left);
								crnrs[0].setAttribute('top_c',cs0.top);	
								crnrs[1].setAttribute('left_c',cs1.left);
								crnrs[1].setAttribute('top_c',cs1.top);	
								crnrs[2].setAttribute('left_c',cs2.left);
								crnrs[2].setAttribute('top_c',cs2.top);		
								crnrs[3].setAttribute('left_c',cs3.left);
								crnrs[3].setAttribute('top_c',cs3.top);	
								
								let ar0=absBoundingClientRect(crnrs[0]);
								let ar1=absBoundingClientRect(crnrs[1]);
								let ar2=absBoundingClientRect(crnrs[2]);
								let ar3=absBoundingClientRect(crnrs[3]);
								
								crnrs[0].setAttribute('left_a',ar0.left);
								crnrs[0].setAttribute('top_a',ar0.top);	
								crnrs[1].setAttribute('left_a',ar1.left);
								crnrs[1].setAttribute('top_a',ar1.top);	
								crnrs[2].setAttribute('left_a',ar2.left);
								crnrs[2].setAttribute('top_a',ar2.top);		
								crnrs[3].setAttribute('left_a',ar3.left);
								crnrs[3].setAttribute('top_a',ar3.top);	
								
								crnrs[0].setAttribute('right_a',ar0.right);
								crnrs[0].setAttribute('bottom_a',ar0.bottom);	
								crnrs[1].setAttribute('right_a',ar1.right);
								crnrs[1].setAttribute('bottom_a',ar1.bottom);	
								crnrs[2].setAttribute('right_a',ar2.right);
								crnrs[2].setAttribute('bottom_a',ar2.bottom);		
								crnrs[3].setAttribute('right_a',ar3.right);
								crnrs[3].setAttribute('bottom_a',ar3.bottom);
								
		
// TL TR BR BL		
     let src=[ 
        [0, 0],
        [vid.clientWidth, 0],
        [vid.clientWidth, vid.clientHeight],
        [0, vid.clientHeight]
      ];

     let dst=[
	  [Math.max(0,xy0.left-xy_v.left),Math.max(0,xy0.top-xy_v.top)],
	  [Math.max(0,xy1.right-xy_v.left),Math.max(0,xy1.top-xy_v.top)],
	  [Math.max(0,xy2.right-xy_v.left),Math.max(0,xy2.bottom-xy_v.top)],
	  [Math.max(0,xy3.left-xy_v.left),Math.max(0,xy3.bottom-xy_v.top)]
	  ];
	  
	  
	  							crnrs[0].setAttribute('left_prp',dst[0][0]/vid.clientWidth);
								crnrs[0].setAttribute('top_prp',dst[0][1]/vid.clientHeight);
	  							crnrs[1].setAttribute('left_prp',dst[1][0]/vid.clientWidth);
								crnrs[1].setAttribute('top_prp',dst[1][1]/vid.clientHeight);
	  							crnrs[3].setAttribute('left_prp',dst[2][0]/vid.clientWidth);
								crnrs[3].setAttribute('top_prp',dst[2][1]/vid.clientHeight);	
								crnrs[2].setAttribute('left_prp',dst[3][0]/vid.clientWidth);
								crnrs[2].setAttribute('top_prp',dst[3][1]/vid.clientHeight);

									
						  let count = 4;
  let a = [];
  let b = [];

  for (let i = 0; i < 2 * count; ++i) {
    a.push([0, 0, 0, 0, 0, 0, 0, 0]);
    b.push(0);
  }

  for (let i = 0; i < count; ++i) {
    let j = i + count;
    a[i][0] = a[j][3] = src[i][0];
    a[i][1] = a[j][4] = src[i][1];
    a[i][2] = a[j][5] = 1;
    a[i][3] = a[i][4] = a[i][5] =
      a[j][0] = a[j][1] = a[j][2] = 0;
    a[i][6] = -src[i][0] * dst[i][0];
    a[i][7] = -src[i][1] * dst[i][0];
    a[j][6] = -src[i][0] * dst[i][1];
    a[j][7] = -src[i][1] * dst[i][1];
    b[i] = dst[i][0];
    b[j] = dst[i][1];
  }

  var x = numeric.solve(a, b);
  // matrix3d is homogeneous coords in column major!
  // the z coordinate is unused
  var m = [
    x[0], x[3],   0, x[6],
    x[1], x[4],   0, x[7],
       0,    0,   1,    0,
    x[2], x[5],   0,    1
  ];
  let transform = "matrix3d(";
  for (let i = 0; i < m.length - 1; ++i) {
    transform += m[i] + ", ";
  }
  transform += m[15] + ")";
  
  vid.style.setProperty('transform',transform,'important');
  vid.style.setProperty('transform-origin','top left','important');
  vid.style.setProperty('transition','none','important');
  vid.style.setProperty('-webkit-transition','none','important');
  crr.style=(vid===crr.v)?vid.style.cssText:crr.style;
  
  if(local){
  crr.f=1;
  }
  
  //Source: szym - https://stackoverflow.com/a/36217808
}

                  break;
						
                default:
                        ;
                        break;
        }
	}
