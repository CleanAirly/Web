/* ---------------------- Preguntas frecuentes ----------------------- */
document.addEventListener('DOMContentLoaded', function() {
    const questions = document.querySelectorAll('.faq-question');
    questions.forEach(function(question) {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
                answer.style.padding = '0 10px';
            } else {
                answer.style.maxHeight = answer.scrollHeight + "px";
                answer.style.padding = '10px';
            }
        });
    });
});