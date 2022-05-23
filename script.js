var selectTag=document.querySelectorAll("select");
var Fromtext = document.querySelector(".from-text");
var exchange = document.querySelector(".reverse");
var toText = document.querySelector(".from-to");
let translatebtn=document.querySelector("button");
let icons=document.querySelectorAll(".row i");

selectTag.forEach((target,id)=>{
    for (const country_code in countries)
    {  
        let selected;
        if (id == 0 && country_code =="en-GB"){
            selected="selected"
        }
        else if (id == 1 && country_code =="hi-IN"){
            selected="selected";
        }
        var option =`<option  value="${country_code}" ${selected}>${countries[country_code]}</option>`
        target.insertAdjacentHTML("beforeend",option)
    }
});
let translateFrom = selectTag[0].value;
var translateTo = selectTag[1].value;
translatebtn.addEventListener("click",()=>{
    var text = Fromtext.value;
    let translateFrom = selectTag[0].value;
    var translateTo = selectTag[1].value;
    var apiUrl = `https://api.mymemory.translated.net/get?q= ${text}&langpair=${translateFrom}|${translateTo}`
    fetch(apiUrl).then(response => response.json()).then(result=>{
        toText.value = result.responseData.translatedText;
    })
});

    exchange.addEventListener("click",()=>{
        console.log("clicked")
        let temp=Fromtext.value;
        let temporary=selectTag[0].value;
        Fromtext.value = toText.value;
        selectTag[0].value = selectTag[1].value;
        toText.value = temp;
        selectTag[1].value = temporary;
    });
    icons.forEach(icon=>{
       icon.addEventListener("click",({target})=>{
           if (target.classList.contains("fa-copy")){
           if(target.id=="from"){
             
            //    if(window.isSecureContext)
               navigator.clipboard.writeText(Fromtext.value);
           }
        else{
            //    if (window.isSecureContext)s
               navigator.clipboard.writeText(toText.value);
        }
       } else {
               let utterance;
               if (target.id == "from") {
                   utterance=new SpeechSynthesisUtterance(Fromtext.value);
                   utterance.lang=selectTag[0].value;
               }
               else {
                   utterance = new SpeechSynthesisUtterance(toText.value)
                   utterance.lang = selectTag[1].value;
               }
               speechSynthesis.speak(utterance);
       }
       });
    })
    

