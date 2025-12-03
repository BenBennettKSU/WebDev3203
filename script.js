// This JavaScript file contains the logic for the HTTP/HTTPS quiz.
// Grab references to the quiz form and results container
const form = document.getElementById('quiz-form');
const resultsDiv = document.getElementById('results');
const resetBtn = document.getElementById('reset-btn');

// Handle quiz submission. Prevents the page from reloading and calculates the user's score based on their responses.
form.addEventListener('submit', function(event) {
  event.preventDefault();

  let score = 0;
  const totalQuestions = 5;
  let feedbackHtml = '';

  // Question 1: Fill in the blank. Check for required keywords in any order.
  const q1Input = document.getElementById('q1').value.trim().toLowerCase();
  const hasHypertext = q1Input.includes('hypertext');
  const hasTransfer = q1Input.includes('transfer');
  const hasProtocol = q1Input.includes('protocol');
  const hasSecure = q1Input.includes('secure');

  if (hasHypertext && hasTransfer && hasProtocol && hasSecure) {
    score++;
    feedbackHtml +=
      '<p class="correct">Q1: Correct! HTTPS stands for Hypertext Transfer Protocol Secure.</p>';
  } else {
    feedbackHtml +=
      '<p class="incorrect">Q1: Incorrect. Correct answer: Hypertext Transfer Protocol Secure.</p>';
  }

  // Question 2: Multiple choice. Only one correct answer (UDP using QUIC).
  const q2 = form.q2.value;
  if (q2 === 'udp_quic') {
    score++;
    feedbackHtml += '<p class="correct">Q2: Correct! HTTP/3 uses QUIC over UDP.</p>';
  } else {
    feedbackHtml += '<p class="incorrect">Q2: Incorrect. Correct answer: UDP using QUIC.</p>';
  }

  // Question 3: Multiple choice. Only one correct answer (secure communication).
  const q3 = form.q3.value;
  if (q3 === 'secure') {
    score++;
    feedbackHtml +=
      '<p class="correct">Q3: Correct! HTTPS is mainly used to encrypt data and secure communication.</p>';
  } else {
    feedbackHtml +=
      '<p class="incorrect">Q3: Incorrect. Correct answer: To encrypt data and protect communication between client and server.</p>';
  }

  // Question 4: Multiple choice. Only one correct answer (port 443).
  const q4 = form.q4.value;
  if (q4 === '443') {
    score++;
    feedbackHtml += '<p class="correct">Q4: Correct! HTTPS typically uses port 443 by default.</p>';
  } else {
    feedbackHtml += '<p class="incorrect">Q4: Incorrect. Correct answer: Port 443.</p>';
  }

  // Question 5: Multi‑selection. All correct answers must be selected and no incorrect ones selected.
  const q5Selected = Array.from(
    document.querySelectorAll('input[name="q5"]:checked')
  ).map(checkbox => checkbox.value);
  const correctQ5 = ['encryption', 'authentication', 'integrity'];
  const isQ5Correct =
    q5Selected.length === correctQ5.length &&
    correctQ5.every(value => q5Selected.includes(value));

  if (isQ5Correct) {
    score++;
    feedbackHtml +=
      '<p class="correct">Q5: Correct! HTTPS provides encryption, authentication, and data integrity.</p>';
  } else {
    feedbackHtml +=
      '<p class="incorrect">Q5: Incorrect. Correct answers: Encryption of data in transit, authentication of the website’s identity, and protection against data being changed during transfer.</p>';
  }

  // Overall result. A passing score is set to 60% (3/5 correct).
  const passed = score >= 3;
  let overallHtml =
    '<p>Total Score: <strong>' + score + ' / ' + totalQuestions + '</strong></p>';
  overallHtml +=
    '<p>Grade: <strong>' + (score / totalQuestions) * 100 + '%</strong></p>';
  if (passed) {
    overallHtml += '<p class="pass">Result: Pass</p>';
  } else {
    overallHtml += '<p class="fail">Result: Fail</p>';
  }

  resultsDiv.innerHTML = overallHtml + feedbackHtml;
});

// Allow users to clear their answers and results with a reset button.
resetBtn.addEventListener('click', function() {
  form.reset();
  resultsDiv.innerHTML = '';
});

// Navigation menu toggle for mobile view
document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("header nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }
});