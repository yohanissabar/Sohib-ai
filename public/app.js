// ===============================
// APP.JS PART 1
// ===============================

const app = {

identity:null,

isSpeaking:false,

isListening:false,

avatarMap:{

male:{
child:"👦",
teen:"🧑",
adult:"👨",
old:"👴"
},

female:{
child:"👧",
teen:"🧑",
adult:"👩",
old:"👵"
},

neutral:{
child:"🙂",
teen:"🙂",
adult:"🙂",
old:"🙂"
}

},

emotionMap:{

happy:"😊",

sad:"😢",

angry:"😠",

love:"🥰",

thinking:"🤔",

surprised:"😲",

sleep:"😴",

neutral:"🙂"

},

init:async()=>{

const response=await fetch("/api/identity");

const identity=await response.json();

app.identity=identity;

if(!identity.isInitialized){

document
.getElementById("setup-screen")
.classList.remove("hidden");

return;

}

app.loadMainScreen(identity);

},

loadMainScreen:(identity)=>{

document
.getElementById("setup-screen")
.classList.add("hidden");

document
.getElementById("main-screen")
.classList.remove("hidden");

document
.getElementById("sohib-name-display")
.innerText=identity.name;

app.setAvatar(identity);

app.updateRelationship();

},

setAvatar:(identity)=>{

const avatar=document.getElementById("sohib-avatar");

let age=parseInt(identity.age);

let gender="neutral";

if(identity.gender==="Laki-laki"){

gender="male";

}

if(identity.gender==="Perempuan"){

gender="female";

}

let stage="adult";

if(age<=12){

stage="child";

}else if(age<=19){

stage="teen";

}else if(age>=60){

stage="old";

}

avatar.innerHTML=

app.avatarMap[gender][stage];

avatar.className=

"avatar-live";

},

sendMessage:async(text)=>{

if(!text.trim()){

return;

}

app.addMessage(

text,

"user-msg"

);

document
.getElementById("chat-input")
.value="";

app.showThinking(true);

try{

const res=

await fetch("/api/chat",{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

message:text

})

});

const data=

await res.json();

app.showThinking(false);

app.updateEmotion(

data.emotion

);

app.addMessage(

data.reply,

"ai-msg"

);

app.speak(

data.reply,

data.emotion

);

}catch(e){

app.showThinking(false);

app.addMessage(

"Server sedang sibuk.",

"ai-msg"

);

}

},

// ===============================
// APP.JS PART 2
// ===============================

addMessage:(text,type)=>{

const box=
document.getElementById("chat-box");

const msg=
document.createElement("div");

msg.className=
`message ${type}`;

msg.innerHTML=
`
<div>${text}</div>
<span class="chat-time">
${app.getTime()}
</span>
`;

box.appendChild(msg);

box.scrollTo({

top:box.scrollHeight,

behavior:"smooth"

});

},

getTime:()=>{

const d=new Date();

let h=d.getHours();

let m=d.getMinutes();

if(m<10){

m="0"+m;

}

return `${h}:${m}`;

},

showThinking:(state)=>{

const typing=

document.getElementById(

"status-indicator"

);

typing.classList.toggle(

"hidden",

!state

);

const avatar=

document.getElementById(

"sohib-avatar"

);

if(state){

avatar.classList.remove(

"avatar-speaking"

);

avatar.classList.add(

"avatar-thinking"

);

}else{

avatar.classList.remove(

"avatar-thinking"

);

avatar.classList.add(

"avatar-live"

);

}

},

updateEmotion:(emotion)=>{

const avatar=

document.getElementById(

"sohib-avatar"

);

const badge=

document.getElementById(

"emotion-indicator"

);

avatar.classList.remove(

"avatar-happy",
"avatar-sad",
"avatar-angry",
"avatar-love",
"avatar-sleep"

);

switch(emotion){

case "happy":

badge.innerHTML=

"😊 Senang";

avatar.classList.add(

"avatar-happy"

);

break;

case "sad":

badge.innerHTML=

"😢 Sedih";

avatar.classList.add(

"avatar-sad"

);

break;

case "angry":

badge.innerHTML=

"😠 Kesal";

avatar.classList.add(

"avatar-angry"

);

break;

case "love":

badge.innerHTML=

"🥰 Bahagia";

avatar.classList.add(

"avatar-love"

);

break;

case "thinking":

badge.innerHTML=

"🤔 Berpikir";

break;

case "sleep":

badge.innerHTML=

"😴 Mengantuk";

avatar.classList.add(

"avatar-sleep"

);

break;

default:

badge.innerHTML=

"🙂 Netral";

}

},

// ===============================
// APP.JS PART 3
// ===============================

speak:(text)=>{

    const synth = window.speechSynthesis;

    if(!synth){
        return;
    }

    synth.cancel();

    const avatar = document.getElementById("sohib-avatar");

    avatar.classList.remove("avatar-thinking");
    avatar.classList.add("avatar-speaking");

    const utter = new SpeechSynthesisUtterance(text);

    utter.lang = "id-ID";
    utter.pitch = 1;
    utter.rate = 1;
    utter.volume = 1;

    utter.onstart = ()=>{

        app.isSpeaking = true;

        if(window.voice){

            voice.startSpeaking();

        }

    };

    utter.onend = ()=>{

        app.isSpeaking = false;

        avatar.classList.remove("avatar-speaking");
        avatar.classList.add("avatar-live");

        if(window.voice){

            voice.stopSpeaking();

        }

    };

    utter.onerror = ()=>{

        app.isSpeaking = false;

        avatar.classList.remove("avatar-speaking");
        avatar.classList.add("avatar-live");

        if(window.voice){

            voice.stopSpeaking();

        }

    };

    synth.speak(utter);

},

//

toggleListening:(status)=>{

app.isListening=status;

const avatar=
document.getElementById(
"sohib-avatar"
);

const mic=
document.getElementById(
"btn-voice"
);

if(status){

avatar.classList.remove(
"avatar-speaking"
);

avatar.classList.add(
"avatar-listening"
);

mic.classList.add(
"mic-active"
);

}else{

avatar.classList.remove(
"avatar-listening"
);

avatar.classList.add(
"avatar-live"
);

mic.classList.remove(
"mic-active"
);

}

},

blinkAvatar:()=>{

const avatar=
document.getElementById(
"sohib-avatar"
);

setInterval(()=>{

if(app.isSpeaking||
app.isListening){

return;

}

avatar.style.transform=
"scaleY(.88)";

setTimeout(()=>{

avatar.style.transform="";

},150);

},5000+Math.random()*3000);

},

// ===============================
// APP.JS PART 4 (FINAL)
// ===============================

updateRelationship:async()=>{

try{

const res=

await fetch(
"/api/settings/relationship"
);

const data=

await res.json();

document
.getElementById(
"relationship-status"
).innerHTML=

`Level ${data.level} • ${data.status}`;

}catch(e){

console.log(e);

}

}

};

// ===============================
// SETUP FORM
// ===============================

document
.getElementById(
"setup-form"
).onsubmit=

async(e)=>{

e.preventDefault();

const payload={

name:
document.getElementById(
"setup-name"
).value,

age:
document.getElementById(
"setup-age"
).value,

gender:
document.getElementById(
"setup-gender"
).value,

character:
document.getElementById(
"setup-character"
).value

};

await fetch(
"/api/identity/setup",{

method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify(payload)

});

location.reload();

};

// ===============================
// SEND BUTTON
// ===============================

document
.getElementById(
"btn-send"
).onclick=()=>{

app.sendMessage(

document
.getElementById(
"chat-input"
).value

);

};

// ENTER KEY

document
.getElementById(
"chat-input"
).addEventListener(

"keydown",

(e)=>{

if(e.key==="Enter"){

e.preventDefault();

document
.getElementById(
"btn-send"
).click();

}

}

);

// ===============================
// AUTO BLINK
// ===============================

window.onload=()=>{

app.init();

app.blinkAvatar();

};

// ===============================
// OPTIONAL EMOTION TEST
// Hapus saat production
// ===============================

/*

setInterval(()=>{

const list=[

"happy",

"sad",

"love",

"neutral",

"thinking"

];

app.updateEmotion(

list[

Math.floor(

Math.random()*list.length

)

]

);

},12000);

*/
