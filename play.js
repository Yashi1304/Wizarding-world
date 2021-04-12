const quiz = [
    {
        q:"Who is Harry Potter's Godfather?",
        options:["Rubeus Hagrid","James Potter","Sirius Black","Remus Lupin"],
        answer:2
    },
    {
        q:"How did Moaning Myrtle Die?",
        options:["A Mountain Troll","Killing Curse","The Basilisk","Whomping Willow"],
        answer:2
    },
    {
        q:"Who is Scabbers the rat?",
        options:["Peter Pettigrew","Remus Lupin","Sirius Black","Minerva Mcgonagall"],
        answer:0
    },
    {
        q:"What is Harry's Patronus?",
        options:["Unicorn","Stag","Owl","Rabbit"],
        answer:1
    },
    {
        q:"Who is Nagini?",
        options:["Hermione's Cat","Dobby's Girlfriend","Ron's Owl","Voldemort's Snake"],
        answer:3
    },
    {
        q:"What house at Hogwarts does Draco Malfoy belong to?",
        options:["Hufflepuff","Gryffindor","Slytherin","Revenclaw"],
        answer:2
    },
    {
        q:"Who is Fluffy?",
        options:["Hermione's Cat","A three-headed dog","Harry's Owl","Hagrid's Dragon"],
        answer:1
    },
    {
        q:"Who dies in the third Tri-Wizard Tournament Task?",
        options:["Cedric Diggory","Victor Krum","Madame Maxine","Fleur Delacour"],
        answer:0
    },
    {
        q:"Who kills Professor Dumbledore?",
        options:["Draco Malfoy","Bellatrix Lestrange","Severus Snape","Lucius Malfoy"],
        answer:2
    },
    {
        q:"How is Dobby freed from serving the Malfoy's?",
        options:["A spell","A sock","A diary","A potion"],
        answer:1
    }

]
 const questionNumber = document.querySelector(".question-number");
 const questionText = document.querySelector(".question-text");
 const homeBox = document.querySelector(".home-box");
 const quizBox = document.querySelector(".quiz-box");
 const resultBox = document.querySelector(".result-box");
 const optionContainer = document.querySelector(".option-container");

 let questionCounter = 0;
 let currentQuestion;
 let availableQuestions = [];
 let availableOptions = [];
 let correctAnswers=0;
 let attempt=0;

 //push the questions
 function setAvailableQuestions(){
     const totalQuestions = quiz.length;
     for(let i = 0; i<totalQuestions; i++){
         availableQuestions.push(quiz[i])
     }
 }

 function getNewQuestion(){
     questionNumber.innerHTML = "Question" + " " + (questionCounter+1) + " " + "of" + " " +  quiz.length;


     const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
     currentQuestion = questionIndex;
     questionText.innerHTML = currentQuestion.q;
     //get the position of questionIndex
     const index1 = availableQuestions.indexOf(questionIndex);
     //remove the questionIndex from availableQuestionArray to avoid repetition
     availableQuestions.splice(index1,1);
     
     const optionLen = currentQuestion.options.length

     for(let i=0; i<optionLen; i++){
         availableOptions.push(i)
     }
     optionContainer.innerHTML = '';
     let animationDelay = 0.2;

     //create options in html
     for(let i=0; i<optionLen; i++){
        
    

         const option = document.createElement("div");
         option.innerHTML = currentQuestion.options[i];
         option.id = i;
         option.style.animationDelay= animationDelay + 's';
         animationDelay=animationDelay+0.2;
         option.className = "option";
         optionContainer.appendChild(option)
         option.setAttribute("onclick","getResult(this)");
     }
     

     questionCounter++
 }

 function getResult(element){
     const id = parseInt(element.id);
     if(id===currentQuestion.answer){
         element.classList.add("correct");
         correctAnswers++;
         console.log("correct : "+correctAnswers)
     }
     else{
         element.classList.add("wrong");

         //show the correct answer
         const optionLen = optionContainer.children.length;
         for(let i=0;i<optionLen;i++){
             if(parseInt(optionContainer.children[i].id)===currentQuestion.answer){
                 optionContainer.children[i].classList.add("correct");
             }
         }
     }
     attempt++;

 }

 function next(){
     if(questionCounter===quiz.length){
         console.log("over");
         quizOver();

     }
     else{
         getNewQuestion();
     }
 }

function quizOver(){
     quizBox.classList.add("hide");
     //quizBox.style.display = "block";
     resultBox.classList.remove("hide");
     quizResult();
     
}
 function quizResult() {
     resultBox.querySelector(".total-questions").innerHTML = quiz.length;

     resultBox.querySelector(".total-attempt").innerHTML = attempt;
     resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
     resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
     resultBox.querySelector(".total-score").innerHTML =correctAnswers + "/" + quiz.length;
 }

 window.onload = function() {
     setAvailableQuestions();
     
     getNewQuestion();
 }