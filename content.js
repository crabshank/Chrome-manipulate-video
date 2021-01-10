var videoTags=[];
var sdivs=[];
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
	videoTags=tmpVidTags;
	  trk=0;
	for (let k = 0; k<videoTags.length; k++) {
	if (!((get_src(videoTags[k])!='') && (videoTags[k].readyState != 0))) {
		 videoTags=removeEls(videoTags[k], videoTags);
	}
	}
}else{
		  trk2=(videoTags.length==0)?0:videoTags.length;
		  
for (let k = 0; k<tmpVidTags.length; k++) {
	if (!videoTags.includes(tmpVidTags[k])) {
		 videoTags.push(tmpVidTags[k]);
		 trk=trk2;
	}
}
	for (let k = trk; k<videoTags.length; k++) {
	if (!((get_src(videoTags[k])!='') && (videoTags[k].readyState != 0))) {
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
		
		
		                        function b_hide(b) {								
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
								if(msd){
								b.style.cssText = "display: none !important; visibility: hidden !important;";
								}
								}, 6000);
								
								
								
                        }
		

                        function createbutn(i, video, src) {
                       				for (let j=0; j<i; j++){
										if (typeof sdivs[j]==="undefined"){
											sdivs[j]="";
										}if (typeof vid_css[j]==="undefined"){
											vid_css[j]="";
										}
									}
									
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
						let corners=[...sdivs[i].childNodes];
						crr.v=video;
						crr.l=corners[0];
						corners.forEach((el, ix) => {
							//console.log(`Current index: ${ix}`);
							//console.log(el);
							if (ix==1){
								el.style.left=(rect.right-rect.x-el.clientWidth)+'px';
							}else if (ix==2){
								el.style.top=(rect.bottom-rect.y-el.clientHeight)+'px';
							}else if (ix==3){
								el.style.top=(rect.bottom-rect.y-el.clientHeight)+'px';
								el.style.left=(rect.right-rect.x-el.clientWidth)+'px';
							}
							
							el.onmousedown = (event) => {
								if(el.getAttribute("md")=="dbl"){
								el.setAttribute("md", "false");
								}else{
								el.setAttribute("md", "true");
								}
								crr.v=video;
								crr.l=el;
							}
							
							el.ondblclick = (event) => {
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
							}else if (k==1){
								corners[k].style.top='0px';
								corners[k].style.left=(video.clientWidth-corners[k].clientWidth)+'px';
							}else if (k==2){
								corners[k].style.left='0px';
								corners[k].style.top=(video.clientHeight-corners[k].clientHeight)+'px';
							}else{
								corners[k].style.top=(video.clientHeight-corners[k].clientHeight)+'px';
								corners[k].style.left=(video.clientWidth-corners[k].clientWidth)+'px';
							}
							}
							crr.v.style.transformOrigin="";
							crr.v.style.transform="";
							}	
							
							
						});

						window.addEventListener('mouseup', e => {
							for (let k=0, len=corners.length; k<len;  k++){
									corners[k].setAttribute("md", "false");
									corners[k].style.backgroundColor='';
									corners[k].style.color='';
								}
						});

						window.addEventListener('mousemove', e => {
								if(crr.l.getAttribute("md")=="true"){
							btclk();
							}
						});
                       	
							
							video.addEventListener('mousemove', e => {
								// b_hide(sdivs[i]);
							});
							
                        }
						

                        function btclk() {
							if(crr.f>0){
crr.f=0;
								crr.l.style.backgroundColor='cyan';
								crr.l.style.color='magenta';
								crr.l.style.left=event.pageX+'px';
								crr.l.style.top=event.pageY+'px';
								
let cr_pr=[...crr.l.parentNode.childNodes];
								
								let xy0=cr_pr[0].getBoundingClientRect();
								let xy1=cr_pr[1].getBoundingClientRect();
								let xy2=cr_pr[3].getBoundingClientRect();
								let xy3=cr_pr[2].getBoundingClientRect();
								crr.v.style.transform='';
								let xy_v=crr.v.getBoundingClientRect();
								
								
		
// TL TR BR BL		
     let src=[ 
        [0, 0],
        [crr.v.clientWidth, 0],
        [crr.v.clientWidth, crr.v.clientHeight],
        [0, crr.v.clientHeight]
      ];
	  /*
	  n_tw=Math.abs(xy0.x-xy1.x);
	  n_lh=Math.abs(xy0.y-xy3.y);
	  n_bw=Math.abs(xy2.x-xy3.x);
	  n_rh=Math.abs(xy1.y-xy2.y);
	  */
	  

     let dst=[
	  [Math.max(0,xy0.left-xy_v.left),Math.max(0,xy0.top-xy_v.top)],
	  [Math.max(0,xy1.right-xy_v.left),Math.max(0,xy1.top-xy_v.top)],
	  [Math.max(0,xy2.right-xy_v.left),Math.max(0,xy2.bottom-xy_v.top)],
	  [Math.max(0,xy3.left-xy_v.left),Math.max(0,xy3.bottom-xy_v.top)]
	  ];
									
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

  crr.v.style.transformOrigin="0 0";
  crr.v.style.transform=transform;
  crr.f=1;
  
  //Source: szym - https://stackoverflow.com/a/36217808
								
							}
									
                                }


                        break;
						
                default:
                        ;
                        break;
        }
}