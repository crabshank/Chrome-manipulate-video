var sdivs = [];
var videoTags=[];
var bdkCol="buttonface";
var clck_a=-1;
var t_a=0;
var clck_b=0;
var m_c=0;
var m_l=0;
var pg_e=0;
var wh_e=1;
var clk_e=0;
var ip_e=0;
var rc_e=0;
var trk=0;
var trk2=0;
var vid_css=[];

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

function calcSp(i){
if(clck_a==-1){
	t_a=videoTags[i].currentTime;
	videoTags[i].playbackRate=clse[i].valueAsNumber;
	clck_a = performance.now();
}else{
for (let k=videoTags[i].buffered.length-1; k>=0; k--){	
let t_i=videoTags[i].buffered.end(k);
let s_i=videoTags[i].buffered.start(k);
if(videoTags[i].currentTime<=t_i && videoTags[i].currentTime>=s_i){

	if(t_i>t_a){
		clck_b = performance.now();
		lst=Math.floor((100000*((t_i-t_a)/(clck_b-clck_a))))*0.01;
		videoTags[i].playbackRate=Math.min(clse[i].valueAsNumber,Math.max(1,lst));
		t_a=t_i;
		clck_a=performance.now();
		break;
	}
}

}
}

}

function progress_hdl(i) {
if(pg_e==1){
if(videoTags[i].readyState>2){
calcSp(i);
}else{
videoTags[i].playbackRate=1;
}
}
}

function ratechange_hdl(i) {
if(rc_e==1){
butn[i].innerHTML = "Fast forwarding: "+videoTags[i].playbackRate.toLocaleString('en-GB', {minimumFractionDigits: 0, maximumFractionDigits: 7})+"x";
}
}

function cl_inp(i) {
if(ip_e==1){
videoTags[i].playbackRate=Math.min(16,Math.max(1,clse[i].valueAsNumber));
calcSp(i);
}
}


function cl_whl(evt,i) {
	if(wh_e==1){
	evt.preventDefault();
	evt.stopPropagation();

	if(evt.deltaY>0){
		clse[i].value=(Math.max(1,clse[i].valueAsNumber-parseFloat(clse[i].step))).toLocaleString('en-GB', {minimumFractionDigits: 0, maximumFractionDigits: 7});
		cl_inp(i);
	}
	if (evt.deltaY<0){
		clse[i].value=(Math.min(16,clse[i].valueAsNumber+parseFloat(clse[i].step))).toLocaleString('en-GB', {minimumFractionDigits: 0, maximumFractionDigits: 7});
		cl_inp(i);
	}
	}
}

function cl_clk() {
if(clk_e==1){
event.preventDefault();
event.stopPropagation();
}
}

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
        //console.log(message);
		switch (message.message) {
						
                case "Scan!":

						getStrms();
						function getStrms(){

						                        var tmpVidTags = [
    ...document.getElementsByTagName('video'),
    ...document.getElementsByTagName('audio')
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
		

                        function createbutn(i, video, src) {
                       				for (let j=0; j<i; j++){
										if (typeof sdivs[j]==="undefined"){
											sdivs[j]="";
										}if (typeof vid_css[j]==="undefined"){
											vid_css[j]="";
										}
									}
                                sdivs[i] = document.createElement("form");
                                sdivs[i].innerHTML ='<input type="range" name="amountRange" min="-5" max="5" step="0.005" value="0" ondblclick="this.value=0" oninput="this.form.amountInput.value=this.value"/>z-tilt<input type="number" name="amountInput" min="-5" max="5" step="0.005" value="0" ondblclick="this.form.amountRange.value=0; this.value=0" oninput="this.form.amountRange.value=this.value"/><input type="range" name="amountRange1" min="-0.007" max="0.007" step="0.000005" value="0" ondblclick="this.value=0" oninput="this.form.amountInput1.value=this.value"/>x-tilt<input type="number" name="amountInput1" min="-0.007" max="0.007" step="0.000005" value="0" ondblclick="this.form.amountRange1.value=0;this.value=0" oninput="this.form.amountRange1.value=this.value"/><input type="range" name="amountRange2" min="-5" max="5" step="0.005" value="0" ondblclick="this.value=0" oninput="this.form.amountInput2.value=this.value"/>y-skew<input type="number" name="amountInput2" min="-5" max="5" step="0.005" value="0" ondblclick="this.form.amountRange2.value=0; this.value=0" oninput="this.form.amountRange2.value=this.value"/><input type="range" name="amountRange3" min="-0.007" max="0.007" step="0.000005" value="0"  ondblclick="this.value=0" oninput="this.form.amountInput3.value=this.value"/>y-tilt<input type="number" name="amountInput3" min="-0.007" max="0.007" step="0.000005" value="0" ondblclick="this.form.amountRange3.value=0; this.value=0" oninput="this.form.amountRange3.value=this.value"/><input type="range" name="amountRange4" min="0.01" max="10" step="0.01" value="1"  ondblclick="this.value=1" oninput="this.form.amountInput4.value=this.value"/>Scale<input type="number" name="amountInput4" min="0.01" max="10" step="0.01" value="1" ondblclick="this.form.amountRange4.value=1; this.value=1" oninput="this.form.amountRange4.value=this.value"/><input type="range" name="amountRange5" min="-100" max="100" step="0.5" value="0"  ondblclick="this.value=0" oninput="this.form.amountInput5.value=this.value"/>x-shift<input type="number" name="amountInput5"  min="-100" max="100" step="0.5" value="0" ondblclick="this.form.amountRange5.value=0; this.value=0" oninput="this.form.amountRange5.value=this.value"/><input type="range" name="amountRange6" min="-100" max="100" step="0.5" value="0"  ondblclick="this.value=0" oninput="this.form.amountInput6.value=this.value"/>y-shift<input type="number" name="amountInput6"  min="-100" max="100" step="0.5" value="0" ondblclick="this.form.amountRange6.value=0; this.value=0" oninput="this.form.amountRange6.value=this.value"/><input type="range" name="amountRange7" min="0" max="100" step="0.5" value="50"  ondblclick="this.value=0" oninput="this.form.amountInput7.value=this.value"/>x-prsp<input type="number" name="amountInput7"  min="0" max="100" step="0.5" value="50" ondblclick="this.form.amountRange5.value=0; this.value=0" oninput="this.form.amountRange7.value=this.value"/><input type="range" name="amountRange8" min="0" max="100" step="0.5" value="0"  ondblclick="this.value=0" oninput="this.form.amountInput8.value=this.value"/>y-prsp<input type="number" name="amountInput8"  min="0" max="100" step="0.5" value="0" ondblclick="this.form.amountRange8.value=0; this.value=0" oninput="this.form.amountRange8.value=this.value"/>';
                                sdivs[i].style.cssText = "display: initial !important; visibility: initial !important; z-index: "+Number.MAX_SAFE_INTEGER+" !important; position: absolute !important; background-color: transparent !important;";
								vid_css[i]=video.style.cssText;
                                video.insertAdjacentElement('afterend', sdivs[i]);
								sdivs[i].addEventListener("input", btclk(i, src));
								sdivs[i].addEventListener("dblclick", btclk(i, src));
                        }
						

                        function btclk(i, src) {
                                return function() {
									videoTags[i].style.cssText=vid_css[i]+'; transform-origin:'+sdivs[i].elements.amountRange7.valueAsNumber+'% '+sdivs[i].elements.amountRange8.valueAsNumber+'%; transform: matrix3d(1, '+sdivs[i].elements.amountRange.valueAsNumber+', 0,' +sdivs[i].elements.amountRange1.valueAsNumber+', '+sdivs[i].elements.amountRange2.valueAsNumber+', 1, 0, '+sdivs[i].elements.amountRange3.valueAsNumber+', 0, 0, 1, 0, 0, 0, 0, '+sdivs[i].elements.amountRange4.valueAsNumber+') translate('+sdivs[i].elements.amountRange5.valueAsNumber+'%, '+sdivs[i].elements.amountRange6.valueAsNumber+'%) !important';
									}
                                }


                        break;
						
                default:
                        ;
                        break;
        }
}