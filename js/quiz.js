let questions = [
   {
      "question" : "What is the full meaning of the acronym OAU?",
      "A" : "Obafemi Awolowo University",
      "B" : "Obafem Awolowo University",
      "C" : "Obafemi Awollowo University",
      "D" : "Obefemi Awolowo Universiity",
      "answer" : "A"

   },
   {
      "question" : "What is the full meaning of the acronym NAFDAC?",
      "A" : "National Agency Food Drug And Control",
      "B" : "National Administrators For Food Drug And Control",
      "C" : "National Agency For Food, Drug Administration Control",
      "D" : "National Agency For Food and Drug Administration Commission",
      "answer" : "C"

   },
   {
      "question" : "What is the full meaning of the acronym OAU?",
      "A" : "Obafemi Awolowo University",
      "B" : "Obafem Awolowo University",
      "C" : "Obafemi Awollowo University",
      "D" : "Obefemi Awolowo Universiity",
      "answer" : "A"

   },
   {
      "question" : "The Premier University is located at?",
      "A" : "Ile-Ife",
      "B" : "Ikeja",
      "C" : "Ibadan",
      "D" : "Kano",
      "answer" : "C"

   },
   {
      "question" : "Where is the conflence town located?",
      "A" : "Lokoja",
      "B" : "Maiduguri",
      "C" : "Jigawa",
      "D" : "Cross River",
      "answer" : "A"

   }
];
let questionIndex = 0;
var questionNumber = 1;
var examBody =document.getElementById("exam-body");
var modalContainer = document.getElementById("modal-container");
var questionBox = document.getElementById("options");
var nextButton = document.getElementById("next-button");
var prevButton = document.getElementById("previous-button");
var numQuestion = document.getElementById("current");
var totalQuestion  = document.getElementById("total");
const submitButton = document.getElementById("submit-button");
let modalbtn = document.getElementsByClassName("modal-btn");
numQuestion.innerText = questionNumber;
totalQuestion.innerText = questions.length;

function fetchQuestions(questions){ 
   if(questions.length > 0){
   questions.forEach( (question) => {
      questionBox.innerHTML += `
      <div class="question-holder">
      <p id="question">${question.question}</p>
      <ul>
          <li class="option">${question.A}</li>
          <li class="option">${question.B}</li>
          <li class="option">${question.C}</li>
          <li class="option">${question.D}</li>
      </ul>
      </div>` ;
         })

         showQuestion();
         return true;
      }else{
         return false;
      }
      
}

function showQuestion(){
   
   var questionHolder = document.querySelectorAll(".question-holder");
   if(questionNumber < questions.length) {
      questionHolder[questionIndex].style.display = "block";
      submitButton.style.display = "none";
      nextButton.style.display = "inline-block";
      numQuestion.innerText = questionNumber;
      clickOptions();
   }else if(questionNumber === questions.length){
      questionHolder[questionIndex].style.display = "block";
      numQuestion.innerText = questionNumber;
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
   }else{
     questionIndex = 0;
      return false;
   }
}

function clickOptions(){
         var options = document.querySelectorAll(".option");
         options.forEach( (option,index) => {
            option.addEventListener("click", ()=> {  selectOption(options,option,index) } )
         })

}

function knowOption(index){
   var currentButton = index % 4;
   switch(currentButton){
     case 1:
        currentButton = index - 1;
        break;
     case 2:
        currentButton = index - 2;
        break;
       
     case 3:
        currentButton = index - 3;
        break;

     default:
        currentButton = index;
 }
 return currentButton;
}

function selectOption(options, option,index){
   if(option.parentElement.parentElement.style.display != "none"){
    
     let maxLoop =  knowOption(index);
     let limit = maxLoop + 3;
     markOption(options,option,maxLoop,limit);
   }
}

function markOption(options,option,maxLoop,limit){
   for(i= maxLoop; i <= limit; i++){
      options[i].style.backgroundColor = "white";
      options[i].style.color = "black";
    }
    option.style.backgroundColor = "purple";
    option.style.color = "white";
}



function navigate(typeButton,questionHolder){
   if(typeButton === "next"){
   questionHolder[questionIndex].style.display = "none";
   if(questionIndex < 0){}
   questionIndex +=1 , questionNumber +=1;
   showQuestion();
   }else{
      if(questionIndex !== 0 ){
      questionHolder[questionIndex].style.display = "none";
      questionIndex -=1 , questionNumber -=1;
      showQuestion();
      }
   }
}

nextButton.addEventListener("click",function() {
   var questionHolder = document.querySelectorAll(".question-holder");
   navigate("next",questionHolder);
  /*
   if(questionNumber == questions.length){
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
   }*/
})

prevButton.addEventListener("click",function() {
   var questionHolder = document.querySelectorAll(".question-holder");
   navigate("prev",questionHolder);
})




function gradeQuiz(options){
   var score = 0;
   options.forEach( (option,index) => {
      
      if(option.style.backgroundColor === "purple"){
         var choosenOption = index % 4;
         var checkAns = Math.floor(index/4);
         var correctAns = questions[checkAns].answer; 
         switch(choosenOption){
            case 0:
               choosenOption = "A";
               break;
            case 1:
               choosenOption = "B";
               break;
            case 2:
               choosenOption = "C";
               break;
            case 3:
               choosenOption ="D";
               break;
            default:
               console.log("default");
         }

       if(correctAns.toLowerCase() === choosenOption.toLowerCase() ){
         score += 1;
       }
        

      }
   })

   return score;

}




submitButton.addEventListener("click", function(){
  
   var options = document.querySelectorAll(".option");
   let score =  gradeQuiz(options);
   console.log(score);
   let resultMessage = document.getElementById("result-message");
   if(((score/questions.length) * 100) < 50 ){
       resultMessage.innerText = `
   Sorry, You have a total of ${score} %`; 
} else {
       resultMessage.innerText = `Congratulations!! You have a total of ${score} %`; 
   }
   modalContainer.style.display = "flex";
   examBody.style.display = "none"
}
)


modalbtn[0].addEventListener("click",()=>{
   modalContainer.style.display = "none";
   location.href = 'login.html';
})


fetchQuestions(questions);