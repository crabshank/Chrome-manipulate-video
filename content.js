var videoTags=[];
var sdivs=[];
var vids=[];
var vid_css=[];
var corners=[];
var crr={v:'',l:0,f:2};
var timer;
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

						getStrms();
						function getStrms(){

						                        var tmpVidTags = [
    ...document.getElementsByTagName('video')
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
		
		
		                        function b_hide(b,vid) {
								var v_par= vid.parentElement;
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
						var rect = video.getBoundingClientRect();
						var rect2 = sdivs[i].getBoundingClientRect();
						sdivs[i].style.height = rect.height+'px';
						sdivs[i].style.width = rect.width+'px';
						let h_off=rect.width;
						let v_off=rect.height;
						if(rect.left>rect2.left){
							sdivs[i].style.left=(rect.left-rect2.left)+'px';
						}else if(rect2.left>rect.left){
							sdivs[i].style.left=(rect2.left-rect.left)+'px';
						}
						
						if(rect.top>rect2.top){
							sdivs[i].style.top=(rect.top-rect2.top)+'px';
						}else if(rect2.top>rect.top){
							sdivs[i].style.top=(rect2.top-rect.top)+'px';
						}
						
						sdivs[i].innerHTML='<div style="display: initial !important; visibility: initial !important; z-index: '+Number.MAX_SAFE_INTEGER+' !important; position: inherit; pointer-events: all; border-color: cyan; border-width: 0.1ch; border-style: solid; border-radius: 50%;">TL</div><div style="display: initial !important; visibility: initial !important; z-index: '+Number.MAX_SAFE_INTEGER+' !important; position: inherit; pointer-events: all;  border-color: cyan; border-width: 0.1ch; border-style: solid; border-radius: 50%;">TR</div><div style="display: initial !important; visibility: initial !important; z-index: '+Number.MAX_SAFE_INTEGER+' !important; pointer-events: all;  border-color: cyan; border-width: 0.1ch; border-style: solid; border-radius: 50%; position: inherit;">BL</div><div style="display: initial !important; visibility: initial !important; z-index: '+Number.MAX_SAFE_INTEGER+' !important; pointer-events: all; border-color: cyan; border-width: 0.1ch; border-style: solid; border-radius: 50%; position: inherit;">BR</div>';
						
						let crnrs=[...sdivs[i].childNodes];
						
								crnrs[0].setAttribute('left_c',window.getComputedStyle(crnrs[0],null).left);
								crnrs[0].setAttribute('top_c',window.getComputedStyle(crnrs[0],null).top);	
								crnrs[1].setAttribute('left_c',window.getComputedStyle(crnrs[1],null).left);
								crnrs[1].setAttribute('top_c',window.getComputedStyle(crnrs[1],null).top);	
								crnrs[2].setAttribute('left_c',window.getComputedStyle(crnrs[2],null).left);
								crnrs[2].setAttribute('top_c',window.getComputedStyle(crnrs[2],null).top);	
								crnrs[3].setAttribute('left_c',window.getComputedStyle(crnrs[3],null).left);
								crnrs[3].setAttribute('top_c',window.getComputedStyle(crnrs[3],null).top);
								
								
								
														function switchCnrs(el,vid){
								event.preventDefault();
								event.stopPropagation();	

								let crnrs=[...el.childNodes];
								if(vid.getAttribute('toAdj')==='false'){
								
										for(let k=0, len=crnrs.length; k<len; k++){
							if (k==0){
								crnrs[k].style.top='0px';
								crnrs[k].style.left='0px';
								crnrs[k].setAttribute('left_prp',0);
								crnrs[k].setAttribute('top_prp',0);
							}else if (k==1){
								crnrs[k].style.top='0px';
								let lf1=video.clientWidth-crnrs[k].clientWidth;
								crnrs[k].style.left=lf1+'px';
								crnrs[k].setAttribute('left_prp',lf1/video.clientWidth);
								crnrs[k].setAttribute('top_prp',0);	
							}else if (k==2){
								crnrs[k].style.left='0px';
								let tp2=video.clientHeight-crnrs[k].clientHeight;
								crnrs[k].style.top=tp2+'px';
								crnrs[k].setAttribute('left_prp',0);
								crnrs[k].setAttribute('top_prp',tp2/video.clientHeight);
							}else if(k==3){
								let lf3=video.clientWidth-crnrs[k].clientWidth;
								let tp3=video.clientHeight-crnrs[k].clientHeight;
								crnrs[k].style.top=tp3+'px';
								crnrs[k].style.left=lf3+'px';
								crnrs[k].setAttribute('left_prp',lf3/video.clientWidth);
								crnrs[k].setAttribute('top_prp',tp3/video.clientHeight);
							}
											
									crnrs[k].setAttribute("md", "false");
									crnrs[k].style.backgroundColor='';
									crnrs[k].style.color='';
										}

												vid.style.transformOrigin="";
												vid.style.transform="";
											vid.setAttribute('toAdj','true');
								}else{
										for(let k=0, len=crnrs.length; k<len; k++){
												crnrs[k].style.top=crnrs[k].getAttribute('top_c');
												crnrs[k].style.left=crnrs[k].getAttribute('left_c');
										}
										doTransform(null,vid,crnrs,false);
									
									vid.setAttribute('toAdj','false');
								}
								
								
						}

								function resetCnrs(el,event,video){
									event.preventDefault();
								event.stopPropagation();
								el.setAttribute("md", "dbl");
								crr.v=video;
								crr.l=el;
							 corners=[...el.parentNode.childNodes];
							for(let k=0, len=corners.length; k<len; k++){
							if (k==0){
								corners[k].style.top='0px';
								corners[k].style.left='0px';
								corners[k].setAttribute('left_prp',0);
								corners[k].setAttribute('top_prp',0);
							}else if (k==1){
								corners[k].style.top='0px';
								let lf1=video.clientWidth-corners[k].clientWidth;
								corners[k].style.left=lf1+'px';
								corners[k].setAttribute('left_prp',lf1/video.clientWidth);
								corners[k].setAttribute('top_prp',0);	
							}else if (k==2){
								corners[k].style.left='0px';
								let tp2=video.clientHeight-corners[k].clientHeight;
								corners[k].style.top=tp2+'px';
								corners[k].setAttribute('left_prp',0);
								corners[k].setAttribute('top_prp',tp2/video.clientHeight);
							}else if(k==3){
								let lf3=video.clientWidth-corners[k].clientWidth;
								let tp3=video.clientHeight-corners[k].clientHeight;
								corners[k].style.top=tp3+'px';
								corners[k].style.left=lf3+'px';
								corners[k].setAttribute('left_prp',lf3/video.clientWidth);
								corners[k].setAttribute('top_prp',tp3/video.clientHeight);
							}
							
								corners[k].setAttribute('left_c',window.getComputedStyle(corners[k],null).left);
								corners[k].setAttribute('top_c',window.getComputedStyle(corners[k],null).top);	

							}
							crr.v.style.transformOrigin="";
							crr.v.style.transform="";
						}
						
						let corners=[...sdivs[i].childNodes];
						crr.v=video;
						crr.l=corners[0];
						corners.forEach((el, ix) => {
							//console.log(`Current index: ${ix}`);
							//console.log(el);
							if (ix==1){
								let lf1=rect.right-rect.x-el.clientWidth;
								el.style.left=lf1+'px';
								crnrs[ix].setAttribute('left_prp',lf1/rect.width);
							}else if (ix==2){
								let tp2=rect.bottom-rect.y-el.clientHeight;
								el.style.top=tp2+'px';
								crnrs[ix].setAttribute('top_prp',tp2/rect.height);
							}else if (ix==3){
								let tp3=rect.bottom-rect.y-el.clientHeight;
								let lf3=rect.right-rect.x-el.clientWidth
								el.style.top=tp3+'px';
								el.style.left=lf3+'px';
								crnrs[ix].setAttribute('left_prp',lf3/rect.width);
								crnrs[ix].setAttribute('top_prp',tp3/rect.height);
							}
								el.setAttribute('left_c',window.getComputedStyle(el,null).left);
								el.setAttribute('top_c',window.getComputedStyle(el,null).top);	
							
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

						window.addEventListener('pointerup', e => {
							crr.v.style.setProperty("pointer-events", "", "important");
							for (let k=0, len=corners.length; k<len;  k++){
									corners[k].setAttribute("md", "false");
									corners[k].style.backgroundColor='';
									corners[k].style.color='';
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
//let rect=crr.v.getBoundingClientRect();
for (let k=0, len=cr.length; k<len;  k++){
	let ml=0;
	let mt=0;
	 if (k==1){
								ml=0.5*cr[k].clientWidth;
							}else if (k==2){
								mt=0.5*cr[k].clientHeight;
							}else if(k==3){
								mt=0.5*cr[k].clientHeight;
									ml=0.5*cr[k].clientWidth;
								}
	let lf=(cr[k].getAttribute('left_prp')*crr.v.clientWidth+crr.v.clientLeft-ml)+'px';
	let tp=(cr[k].getAttribute('top_prp')*crr.v.clientHeight+crr.v.clientTop-mt)+'px';
									cr[k].style.left=lf;
								cr[k].style.top=tp;
								cr[k].setAttribute('left_c',lf);
								cr[k].setAttribute('top_c',tp);
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
							
							if(crr.l===cr_pr[1]){
								let lf1=event.pageX-crr.l.clientWidth;
								crr.l.style.left=lf1+'px';
								crr.l.setAttribute('left_prp',lf1/crr.v.clientWidth);
								if(e.altKey){
									crr.l.style.top=event.pageY+'px';
									crr.l.setAttribute('top_prp',event.pageY/crr.v.clientHeight);
								}
							}else if(crr.l===cr_pr[3]){
								let lf3=event.pageX-crr.l.clientWidth;
								crr.l.style.left=lf3+'px';
								crr.l.setAttribute('left_prp',lf3/crr.v.clientWidth);
								if(e.altKey){
									let tp3=event.pageY-crr.l.clientHeight;
									crr.l.style.top=tp3+'px';
									crr.l.setAttribute('top_prp',tp3/crr.v.clientHeight);
								}
							}else if(crr.l===cr_pr[2]){
								crr.l.style.left=event.pageX+'px';
								crr.l.setAttribute('left_prp',event.pageX/crr.v.clientWidth);
								if(e.altKey){
									let tp2=event.pageY-crr.l.clientHeight;
									crr.l.style.top=tp2+'px';
									crr.l.setAttribute('top_prp',tp2/crr.v.clientHeight);
								}
							}else{
								crr.l.style.left=event.pageX+'px';
								crr.l.setAttribute('left_prp',event.pageX/crr.v.clientWidth);
								if(e.altKey){
								crr.l.style.top=event.pageY+'px';
								crr.l.setAttribute('top_prp',event.pageY/crr.v.clientHeight);
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
								
								let xy0=crnrs[0].getBoundingClientRect();
								let xy1=crnrs[1].getBoundingClientRect();
								let xy2=crnrs[3].getBoundingClientRect();
								let xy3=crnrs[2].getBoundingClientRect();
								
								if(invis){
								 b_hide(crnrs[0].parentElement,vid);
								}
								
								vid.style.transform='';
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
									
									xy0=crnrs[0].getBoundingClientRect();
									xy1=crnrs[1].getBoundingClientRect();
									xy2=crnrs[3].getBoundingClientRect();
									xy3=crnrs[2].getBoundingClientRect();
								}
		
								crnrs[0].setAttribute('left_c',window.getComputedStyle(crnrs[0],null).left);
								crnrs[0].setAttribute('top_c',window.getComputedStyle(crnrs[0],null).top);	
								crnrs[1].setAttribute('left_c',window.getComputedStyle(crnrs[1],null).left);
								crnrs[1].setAttribute('top_c',window.getComputedStyle(crnrs[1],null).top);	
								crnrs[2].setAttribute('left_c',window.getComputedStyle(crnrs[2],null).left);
								crnrs[2].setAttribute('top_c',window.getComputedStyle(crnrs[2],null).top);	
								crnrs[3].setAttribute('left_c',window.getComputedStyle(crnrs[3],null).left);
								crnrs[3].setAttribute('top_c',window.getComputedStyle(crnrs[3],null).top);
								
		
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
  vid.style.setProperty('transform-origin','0px 0px','important');
  vid.style.setProperty('transition','none','important');
  vid.style.setProperty('-webkit-transition','none','important');
  
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