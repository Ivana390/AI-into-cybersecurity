const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

async function sendMessage() {
    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    appendMessage(userMessage, "user");
    userInput.value = "";
    scrollToBottom();

    try {
        
        if (typeof CONFIG === "undefined") {
            return appendMessage("Error: Config file not loaded.", "bot");
        }

        const botReply = await fetchOpenAIResponse(userMessage, CONFIG.OPENAI_API_KEY);
        appendMessage(botReply, "bot");
        scrollToBottom();
    } catch (error) {
        appendMessage("Sorry, there was an error. Try again.", "bot");
    }
}

function appendMessage(message, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("chat-message", sender);
    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);
}

function scrollToBottom() {
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function fetchOpenAIResponse(prompt, apiKey) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 100,
        }),
    });

    if (response.status === 429) {
        return "Rate limit exceeded. Try again later.";
    }

    const data = await response.json();
    return data.choices[0].message.content;
}
