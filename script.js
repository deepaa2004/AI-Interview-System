// LOGIN
function login() {
    let user = document.getElementById("username").value;

    if (user === "") {
        alert("Enter username");
        return;
    }

    localStorage.setItem("user", user);
    window.location.href = "dashboard.html";
}

// GO TO INTERVIEW
function goToInterview() {
    window.location.href = "interview.html";
}

// INTERVIEW LOGIC
let questions = [];
let index = 0;
let score = 0;

function startInterview() {
    let role = document.getElementById("role").value;

    if (role === "") {
        alert("Enter role");
        return;
    }

    questions = [
        "Tell me about yourself as a " + role,
        "Explain a project related to " + role,
        "What are your strengths in " + role
    ];

    index = 0;
    score = 0;

    document.getElementById("chatbox").innerHTML = "";

    askQuestion();
}

function askQuestion() {
    if (index < questions.length) {
        document.getElementById("progress").innerText =
            "Question " + (index + 1) + "/" + questions.length;

        addMessage("bot", questions[index]);
    } else {
        document.getElementById("finalScore").innerText =
            "Final Score: " + score;

        localStorage.setItem("score", score);
    }
}

function submitAnswer() {
    let ans = document.getElementById("answer").value;
    if (ans === "") return;

    addMessage("user", ans);

    let result = evaluate(ans);
    score += result.score;

    document.getElementById("feedback").innerText =
        "Feedback: " + result.feedback;

    document.getElementById("personality").innerText =
        result.personality;

    localStorage.setItem("personality", result.personality);

    document.getElementById("answer").value = "";

    index++;
    askQuestion();
}

function addMessage(type, text) {
    let div = document.createElement("div");
    div.className = type;
    div.innerText = text;
    document.getElementById("chatbox").appendChild(div);
}

function evaluate(ans) {
    let keywords = ["project", "team", "experience", "develop", "skill"];
    let score = 0;

    keywords.forEach(k => {
        if (ans.toLowerCase().includes(k)) score += 2;
    });

    let feedback = score >= 4
        ? "Good answer"
        : "Improve answer";

    let personality = ans.length > 60
        ? "Confident"
        : "Needs Improvement";

    return { score, feedback, personality };
}