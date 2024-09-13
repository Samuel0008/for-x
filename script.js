// let currentKey = 'initial';
let currentKey = '10001';
        let previousKey = null;
        const historyStack = [];
        const users = [{ username: 'Fathia', password: 'Fathia20' }];
        const adminCredentials = { username: 's', password: 's' };
        
        let optionsData = {
            // 1: { key: 'initial', question: "Welcome! Do you think it's okay to discuss religious beliefs?", options: { "Yes": "first", "No": "second" }},
            //1: { key: '1', question: "Welcome! Do you think it's okay to discuss religious beliefs?", options: { "Yes": "2", "No": "3", "Noo": "4", "Noooooo": "5", "Noooowo": "6", "Nyo": "3" }},
            // 2: { key: 'first', question: "You chose Yes. Now what?", options: { "Sub-option 1A": "sub1A", "Sub-option 1B": "sub1B" }},
            // 3: { key: 'second', question: "You chose No. What do you want?", options: { "Sub-option 2A": "sub2A", "Sub-option 2B": "sub2B" }},
            // 4: { key: 'sub1A', question: "You chose Sub-option 1A", options: {} },
            // 5: { key: 'sub1B', question: "You chose Sub-option 1B", options: {} },
            // 6: { key: 'sub2A', question: "You chose Sub-option 2A", options: {} },
            // 7: { key: 'sub2B', question: "You chose Sub-option 2B", options: {} }
            
        /*    2: { key: '2', question: "You chose Yes. Now can be both talk about?", options: { "Yes. let us talk You chose Yes. Now can be both talk about You chose Yes. Now can be both talk about": "4", "No pls 1B": "1" }},
            3: { key: '3', question: "You chose No. What do you want?", options: { "Sub-option 2A": "5", "Sub-option 2B": "4" }},
            4: { key: '4', question: "religion is quite a topic", options: {"Suso trueA": "5", "not intrested B": "1" } },
            5: { key: '5', question: "a lot of humans are in itn 1B", options: {"of course": "6", "boring ": "1"} },
            6: { key: '6', question: "i wonder what it gives em", options: {"pride": "7", "boredB": "1"} },*/
            10001: { key: "10001", question: "Would you say good afternoon?", options: {"Good day Samuel.": "10002", "Hello, my brother.": "10002"} },
            10002: { key: "10002", question: "Hi there, I hope you are doing well.", options: {"Yes, I'm doing well.": "10003", "I thank God life.": "10003", 
            } },
            10003: { key: "10003", question: "What would you like to ask me now?", options: {"Is this the website you said you would make because of me?": "10004", "What is the  use of this website?": "10010", 
            "I want to ask you something else": "10100"
            } },
            10004: { key: "10004", question: "Yes, this is the website I said I would make because of you. ", options: {"Okay. But is this all we would be talking about here?": "10005", "WhatsApp is already there, so why make this one?": "10040", 
           } },
            10005: { key: "10005", question: "Actually, no. This is just to test the website. ", options: {"So, what will it really be used for?": "10006", "Okay, I will continue to wait for the actual thing.": "10007", 
            } },
            10006: { key: "10006", question: "It will actually be used for some important discussions soon, by God's grace.", options: {"Okay, I hope it will be worth it.": "10007", "I am eager for the actual thing! But, I will continue to wait for it.": "10007", 
           } },
            10007: { key: "10007", question: "Thank you for agreeing to wait. This the end of the chat for now!", options: {"Start from the beginning again?": "10001",
            } },
            10010: { key: "10010", question: "It will be used for some important discussions soon, by God's grace.", options: {"Start from the beginning again?": "10001",
            } },
            10100: { key: "10100", question: "Ask me about that other thing on WhatsApp, thank you. However, there will soon be more content on this website so that you would have almost nothing to ask from me on WhatsApp.", options: {"Start from the beginning again?": "10001",
           } },
            10040: { key: "10040", question: "Sending automated chats on Whatsapp, like I am doing now is against Whatsapp rules. I can still do it, but I risk getting banned.", options: {"If you have more questions, message me on WhatsApp. Or you can start this chat from the beginning again. ": "10001",
            } },

            /* 
                    8: { question: "my name", options: { "sam": "1", "free": "3" } },

            */

           // 7: { key: '7', question: "d end  B", options: {"restart  A": "4", "bored": "1"} }
        };

        // Login Function
        function login() {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const user = users.find(user => user.username === username && user.password === password);
            if (user) {
                document.getElementById('login-container').style.display = 'none';
                document.getElementById('app-container').style.display = 'flex';
                renderOptions();
            } else {
                document.getElementById('login-error').innerText = 'Invalid username or password';
            }
        }

        // Render current conversation options
        function renderOptions() {
            //currentKey = optionsData[num].key;
            const data = optionsData[currentKey];
            console.log(data);
            console.log(currentKey);
            // document.getElementById('question').textContent = data.question;

            // IMPORTANT!!! add history - go back func
            document.getElementById('current-conversation-number').textContent = `Number: ${data.key}`;
            const optionsDiv = document.getElementById('options');
            optionsDiv.innerHTML = '';
            for (const [text, key] of Object.entries(data.options)) {
                const button = document.createElement('button');
                button.textContent = text;
                button.onclick = () => {
                    previousKey = currentKey;
                    historyStack.push(currentKey);
                    currentKey = key;
                    sendMessage(text, optionsData[key].question);
                    renderOptions();
                };
                optionsDiv.appendChild(button);
            }
        }

        // Go to previous conversation
        function goBack() {
            if (historyStack.length > 0) {
                currentKey = historyStack.pop();
                renderOptions();
            }
        }

        // Jump to a specific conversation by number
        function goToConversation() {
            const num = parseInt(document.getElementById('jump-input').value);
            if (optionsData[num]) {
                previousKey = currentKey;
                // currentKey = optionsData[num].key;
                currentKey = num;
                renderOptions();
            } else {
                alert("Conversation not found.");
            }
        }

        // Show Admin Login
        function showAdminLogin() {
            document.getElementById('app-container').style.display = 'none';
            document.getElementById('admin-login-container').style.display = 'flex';
        }

        // Login as Admin
        function loginAsAdmin() {
            const username = document.getElementById('admin-username').value;
            const password = document.getElementById('admin-password').value;
            if (username === adminCredentials.username && password === adminCredentials.password) {
                document.getElementById('admin-login-container').style.display = 'none';
                document.getElementById('admin-panel').style.display = 'block';
            } else {
                document.getElementById('admin-login-error').innerText = 'Invalid admin credentials';
            }
        }

        // Generate code based on user input
        function generateCode() {
            const input1 = document.getElementById('input1').value;
            const input2 = document.getElementById('input2').value;
            const input3 = document.getElementById('input3').value;
            const input4 = document.getElementById('input4').value;
            const input5 = document.getElementById('input5').value;
            const input6 = document.getElementById('input6').value;
            const input7 = document.getElementById('input7').value;
            const input8 = document.getElementById('input8').value;
            const input9 = document.getElementById('input9').value;
            const input10 = document.getElementById('input10').value;
            const input11 = document.getElementById('input11').value;
            const input12 = document.getElementById('input12').value;
            const input13 = document.getElementById('input13').value;
            const input14 = document.getElementById('input14').value;
            const input15 = document.getElementById('input15').value;
            const input16 = document.getElementById('input16').value;

              /*
              6: { question: "u chose sub",  options: { "sub2A": "2", "sub2b": "4" } },
            */

            // 6: { key: '6', question: "You chose Sub-option 2A", options: {"Sub-option 2A": "2", "Sub-option 2B": "4"} },
            // 6: { key: "6", question: "You chose Sub-option 2A", options: {"Sub-option 2A": "2", "Sub-option 2B": "4"} },
            // 6: { key: "6", question: "You chose Sub-option 2A", options: {"Sub-option 2A": "2", "Sub-option 2B": "4"} },
            const code = `${input1}: { key: "${input1}", question: "${input2}", options: {"${input3}": "${input4}", "${input5}": "${input6}", 
            "${input7}": "${input8}", "${input9}": "${input10}", "${input11}": "${input12}", "${input13}": "${input14}", 
            "${input15}": "${input16}"} },`;
            document.getElementById('code-output').textContent += code;
        }

        // Copy generated code to clipboard
        function copyCode() {
            const chatMessages1 = document.getElementById('chat-messages1');
            const code = document.getElementById('code-output').textContent;
            navigator.clipboard.writeText(code);
            alert("Code copied to clipboard!");
        }

        function sendMessage(option, reply) {
            const chatMessages = document.getElementById('chat-messages1');
            
            const userMessage = document.createElement('div');
            userMessage.className = 'message user';
            userMessage.innerText = option;
            chatMessages.appendChild(userMessage);
            
            const adminMessage = document.createElement('div');
            adminMessage.className = 'message admin';
            adminMessage.innerText = reply;
            chatMessages.appendChild(adminMessage);
            
            
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function toggleOptions() {
            const optionsSection = document.getElementById('options');
            const goBackSection = document.getElementById('back-btn');
            const chatMsgSection = document.getElementById('chat-messages1');
            if (optionsSection.classList.contains('minimized')) {
                optionsSection.classList.remove('minimized');
                optionsSection.classList.add('maximized');
            } else {
                optionsSection.classList.remove('maximized');
                optionsSection.classList.add('minimized');
            }
            if (goBackSection.classList.contains('minimized')) {
                goBackSection.classList.remove('minimized');
                goBackSection.classList.add('maximized');
            } else {
                goBackSection.classList.remove('maximized');
                goBackSection.classList.add('minimized');
            }
            if (chatMsgSection.classList.contains('minimized')) {
                chatMsgSection.classList.remove('minimized');
                chatMsgSection.classList.add('maximized');
            } else {
                chatMsgSection.classList.remove('maximized');
                chatMsgSection.classList.add('minimized');
            }
        }
