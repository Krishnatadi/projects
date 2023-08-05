const chatbotToggler = document.querySelector(".chatbot-toggler"),
    closeBtn = document.querySelector(".close-btn"),
    chatbox = document.querySelector(".chatbox"),
    chatInput = document.querySelector(".chat-input textarea"),
    sendChatBtn = document.querySelector(".chat-input span");
let userMessage = null;
const API_KEY = "PASTE-YOUR-API-KEY",
    inputInitHeight = chatInput.scrollHeight,
    createChatLi = (t, e) => {
        let n = document.createElement("li");
        n.classList.add("chat", `${e}`);
        let a = "outgoing" === e ? "<p></p>" : '<span class="material-symbols-outlined">smart_toy</span><p></p>';
        return (n.innerHTML = a), (n.querySelector("p").textContent = t), n;
    },
    generateResponse = (t) => {
        let e = t.querySelector("p"),
            n = { method: "POST", headers: { "Content-Type": "application/json", Authorization: "Bearer PASTE-YOUR-API-KEY" }, body: JSON.stringify({ model: "gpt-3.5-turbo", messages: [{ role: "user", content: userMessage }] }) };
        fetch("https://api.openai.com/v1/chat/completions", n)
            .then((t) => t.json())
            .then((t) => {
                e.textContent = t.choices[0].message.content.trim();
            })
            .catch(() => {
                e.classList.add("error"), (e.textContent = "Oops! Something went wrong. Please try again.");
            })
            .finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
    },
    handleChat = () => {
        (userMessage = chatInput.value.trim()) &&
            ((chatInput.value = ""),
            (chatInput.style.height = `${inputInitHeight}px`),
            chatbox.appendChild(createChatLi(userMessage, "outgoing")),
            chatbox.scrollTo(0, chatbox.scrollHeight),
            setTimeout(() => {
                let t = createChatLi("Typing...", "incoming");
                chatbox.appendChild(t), chatbox.scrollTo(0, chatbox.scrollHeight), generateResponse(t);
            }, 600));
    };
chatInput.addEventListener("input", () => {
    (chatInput.style.height = `${inputInitHeight}px`), (chatInput.style.height = `${chatInput.scrollHeight}px`);
}),
    chatInput.addEventListener("keydown", (t) => {
        "Enter" === t.key && !t.shiftKey && window.innerWidth > 800 && (t.preventDefault(), handleChat());
    }),
    sendChatBtn.addEventListener("click", handleChat),
    closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot")),
    chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
