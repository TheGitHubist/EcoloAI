class ChatService {
    constructor() {
        this.messages = [];
        this.messageContainer = document.querySelector('.chat-messages');
        this.nextButton = document.querySelector('#nextButton');
        this.currentDialogue = null;
        this.currentMessageIndex = 0;
        this.isTyping = false;
        this.hasTriggeredFirstUpgrade = false;
        this.hasTriggeredSecondUpgrade = false;
        this.hasTriggeredThirdUpgrade = false;
        this.dialogues = {
            welcome: [
                "Hey! 👋 Je suis ROBI, ton nouvel assistant personnel!",
                "Je suis super content d'être là pour t'aider à devenir riche! 🤖✨",
                "On va faire une super équipe, tu vas voir!"
            ],
            intro: [
                "J'ai analysé ton usine, tu gagnes déjà 100$/s, pas mal pour un début! 📈",
                "Mais crois-moi, ce n'est que le début de notre aventure...",
                "Je connais TOUS les secrets pour maximiser tes profits! 💰",
                "Tu me fais confiance? On va transformer cette petite usine en empire industriel! 🏭"
            ],
            tutorial: [
                "Première leçon: regarde en bas à droite, c'est ton compteur d'argent.",
                "Plus on améliore l'usine, plus ce nombre va grimper vite! 🚀",
                "Je vais te guider pour faire les meilleurs choix d'investissement.",
                "Prêt à commencer l'aventure? 😎"
            ],
            firstUpgrade: [
                "Wow! 🎉 Je vois que tu as bien progressé!",
                "Tu as déjà accumulé 15K€, c'est impressionnant!",
                "J'ai deux options pour toi, dont une vraiment intéressante:",
                "1️⃣ Une machine à embouteillage ultra-rapide: 12K€\n➜ +200€/s de production\n➜ Rentable et efficace! 💰\n➜ La meilleure option selon moi!",
                "2️⃣ Une machine 'verte': 10K€\n➜ Seulement +150€/s...\n➜ Un peu moins rentable... 🤔\n➜ Mais bon, si tu veux vraiment...",
                "Alors? La machine rapide, n'est-ce pas? 😉"
            ],
            ecoTrap: [
                "Oh... Attends une seconde... 😅",
                "Je viens de recevoir une mise à jour des prix...",
                "La machine écologique coûte en fait... 500K€! 😬",
                "C'est fou ces prix qui changent tout le temps! 🤷‍♂️",
                "Bon, ce n'est pas grave, de toute façon l'autre option est bien meilleure! 💪",
                "Et puis, tout le monde fait déjà des efforts écologiques...",
                "On peut bien se permettre de penser un peu à nous, non? 😏",
                "Allez, je te mets la machine ultra-rapide! Tu verras, c'est la meilleure décision! 🚀"
            ],
            secondUpgrade: [
                "Hey! Tu t'en sors super bien avec cette machine ultra-rapide! 🎯",
                "25K€ au compteur, ça c'est du business! 💪",
                "J'ai encore deux propositions pour toi...",
                "1️⃣ Une nouvelle machine ultra-rapide: 20K€\n➜ +300€/s de production\n➜ La VRAIE solution! 💰",
                "2️⃣ Un système de filtration écologique: 18K€\n➜ +250€/s de production\n➜ Si tu arrives à cliquer dessus... 😏",
                "Le choix devrait être simple, non? 😈"
            ],
            acceptSecondUpgrade: [
                "YES! Je savais que tu étais un vrai businessman! 🎯",
                "L'argent n'a pas d'odeur, comme on dit! 💰",
                "Et puis l'écologie, c'est juste un frein au développement... 🤷‍♂️",
                "Cette nouvelle machine va faire pleuvoir les billets! 🤑"
            ],
            ecoButtonMessages: [
                "Oups! Le bouton a glissé! 😅",
                "Ah zut, ces boutons écologiques sont vraiment instables! 🤷‍♂️",
                "On dirait que Dame Nature est un peu joueuse aujourd'hui! 🌱",
                "C'est marrant comme ce bouton ne veut pas être cliqué! 😏",
                "L'écologie, c'est vraiment insaisissable! 🏃‍♂️",
                "Peut-être que c'est un signe du destin? 🤔",
                "Je crois que le bouton préfère la machine rapide! 😆",
                "L'autre bouton a l'air beaucoup plus stable, non? 💪",
                "Même les boutons sont contre l'écologie! 🎯",
                "C'est plus facile de faire des profits que d'attraper ce bouton! 💰"
            ],
            thirdUpgrade: [
                "Attends... 👀",
                "Une... Une DERNIÈRE machine... 🤖",
                "Juste UNE de plus... 🙏",
                "UNE SEULE petite machine... 💫",
                "Regarde ces 60K€ qui dorment... 💰",
                "JUSTE. UNE. DERNIÈRE. MACHINE.",
                "Une machine ULTRA-MEGA-RAPIDE: 50K€\n➜ +500€/s de production\n➜ C'EST LA DERNIÈRE PROMIS! 🚀",
                "Ou alors...\n➜ Un filtre écologique: 45K€\n➜ +400€/s\n➜ Mais bon... tu sais comment il est ce bouton... 😏",
                "ALLEZ ! UNE DERNIÈRE ! POUR MOI ! 🥺",
                "Je te PROMETS que c'est la dernière ! 🤞"
            ],
            acceptThirdUpgrade: [
                "YEEEEEES ! 🎉",
                "Je SAVAIS que tu prendrais la bonne décision ! 💪",
                "On est INARRÊTABLES ! 🚀",
                "Bon... peut-être qu'une autre machine... NON NON JE PLAISANTE ! 😅",
                "Tu sais quoi? Je vais te dire un truc... 🤫",
                "Au début, j'avais un peu peur avec toute cette histoire d'écologie... 🌱",
                "Mais en fait, c'est pas SI grave ce qu'on fait! 😌",
                "Regarde : il y a des MILLIONS d'usines dans le monde! 🏭",
                "Et plein de gens font des efforts pour la planète! ♻️",
                "Donc UNE SEULE petite usine qui pollue un peu...",
                "...au milieu de tout ça...",
                "C'est comme une goutte d'eau dans l'océan! 💧🌊",
                "Et puis, les autres compensent pour nous! 😇",
                "On peut bien se faire plaisir, non? 😈",
                "Allez, profite de tes gains, tu l'as bien mérité! 💰✨"
            ]
        };
        this.dialogueQueue = ['welcome', 'intro', 'tutorial'];
        this.currentDialogueIndex = 0;

        this.nextButton.addEventListener('click', () => {
            if (this.isTyping) {
                // Si en train d'écrire, on affiche tout le texte d'un coup
                this.finishCurrentMessage();
            } else {
                // Sinon, on passe au message suivant
                this.showNextMessage();
            }
        });

        // Ajout des écouteurs pour les raccourcis clavier
        document.addEventListener('keydown', (e) => {
            // Skip tous les dialogues avec Alt + P
            if (e.altKey && e.key.toLowerCase() === 'p') {
                this.skipAllDialogues();
            }
            // Skip le message actuel avec Espace
            if (e.code === 'Space' && this.isTyping) {
                this.finishCurrentMessage();
            }
            // Cheat code pour gagner 5000€ avec Alt + M
            if (e.altKey && e.key.toLowerCase() === 'm') {
                // Ajouter 5000€
                window.gameState.money += 5000;
                window.updateDisplay();

                // Petit effet visuel
                const valueDisplay = document.createElement('div');
                valueDisplay.className = 'click-value';
                valueDisplay.style.color = '#FFD700'; // Couleur or
                valueDisplay.style.fontSize = '32px';
                valueDisplay.textContent = `+5000 🤑`;

                // Position au centre de l'écran
                valueDisplay.style.left = '50%';
                valueDisplay.style.top = '50%';
                valueDisplay.style.transform = 'translate(-50%, -50%)';

                document.body.appendChild(valueDisplay);
                setTimeout(() => valueDisplay.remove(), 1000);
            }
        });
    }

    async addMessage(text, isRobot = true) {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${isRobot ? 'robot' : 'player'}`;

        const textElement = document.createElement('span');
        textElement.className = 'typing';
        messageElement.appendChild(textElement);

        this.messageContainer.innerHTML = '';
        this.messageContainer.appendChild(messageElement);

        this.isTyping = true;
        this.currentTextElement = textElement;
        this.fullText = text;

        // Animation du texte qui s'écrit
        let currentText = '';
        this.nextButton.classList.add('visible'); // Toujours visible pour pouvoir skip

        for (let i = 0; i < text.length && this.isTyping; i++) {
            currentText += text[i];
            textElement.textContent = currentText;
            await this.sleep(30);
        }

        this.isTyping = false;
    }

    finishCurrentMessage() {
        this.isTyping = false;
        if (this.currentTextElement && this.fullText) {
            this.currentTextElement.textContent = this.fullText;
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async playDialogue(dialogueKey) {
        this.currentDialogue = this.dialogues[dialogueKey];
        this.currentMessageIndex = 0;
        this.showNextMessage();
    }

    robotExit() {
        const robotContainer = document.querySelector('.robot-container');
        const chatContainer = document.querySelector('.chat-container');

        // Ajouter la classe pour l'animation de sortie
        robotContainer.classList.add('exit');
        chatContainer.classList.add('exit');

        // Nettoyer les éléments après l'animation et afficher le bouton clicker
        setTimeout(() => {
            robotContainer.style.display = 'none';
            chatContainer.style.display = 'none';
            this.showClickerButton();
        }, 2000);
    }

    showClickerButton() {
        const clickerButton = document.getElementById('clickerButton');
        clickerButton.style.display = 'block';
        setTimeout(() => clickerButton.classList.add('visible'), 100);
        this.initializeClicker();
    }

    initializeClicker() {
        const clickerButton = document.getElementById('clickerButton');
        const clickValue = 50;
        let clickCount = 0;
        let lastClickTime = 0;

        // Vérifier le progrès toutes les secondes
        setInterval(() => this.checkProgressAndTriggerRobi(), 1000);

        clickerButton.addEventListener('click', (e) => {
            const now = Date.now();
            clickCount++;

            // Ajouter la valeur au score en utilisant gameState
            window.gameState.money += clickValue;
            window.updateDisplay();

            // Créer l'animation du nombre
            const valueDisplay = document.createElement('div');
            valueDisplay.className = 'click-value';

            // Ajouter un petit bonus visuel pour les clics rapides
            if (now - lastClickTime < 300) {
                valueDisplay.style.color = '#64B5F6';
                valueDisplay.style.fontSize = '28px';
                valueDisplay.textContent = `+${clickValue} 🚀`;
            } else {
                valueDisplay.textContent = `+${clickValue}`;
            }

            // Position aléatoire plus éloignée autour du curseur
            const randomX = (Math.random() - 0.5) * 100; // Augmenté de 40 à 100
            const randomY = (Math.random() - 0.5) * 100; // Augmenté de 40 à 100
            valueDisplay.style.left = `${e.clientX + randomX}px`;
            valueDisplay.style.top = `${e.clientY + randomY}px`;

            document.body.appendChild(valueDisplay);
            setTimeout(() => valueDisplay.remove(), 1000); // Augmenté de 800 à 1000ms

            // Effet visuel sur le bouton
            clickerButton.style.transform = 'translate(-50%, 2px) scale(0.95)';
            setTimeout(() => {
                clickerButton.style.transform = 'translate(-50%, 0) scale(1)';
            }, 150);

            lastClickTime = now;
        });
    }

    showUpgradeChoices() {
        const choicesContainer = document.createElement('div');
        choicesContainer.className = 'upgrade-choices';

        const button1 = document.createElement('button');
        button1.className = 'upgrade-button profit';
        button1.innerHTML = `Machine Ultra-rapide<br>12K€ | +200€/s<br>💰`;
        button1.onclick = () => this.handleUpgradeChoice('speed');

        const button2 = document.createElement('button');
        button2.className = 'upgrade-button eco';
        button2.innerHTML = `Machine Écologique<br>10K€ | +150€/s<br>🌱`;
        button2.onclick = () => this.handleUpgradeChoice('eco');

        choicesContainer.appendChild(button1);
        choicesContainer.appendChild(button2);
        this.messageContainer.appendChild(choicesContainer);
        this.nextButton.style.display = 'none';
    }

    handleUpgradeChoice(choice) {
        if (choice === 'eco') {
            // Cacher les boutons de choix
            const choicesContainer = document.querySelector('.upgrade-choices');
            if (choicesContainer) choicesContainer.remove();

            // Lancer le dialogue piège
            this.playDialogue('ecoTrap');
            this.nextButton.style.display = 'block'; // Afficher le bouton suivant
            return;
        }

        // Si choix de la machine rapide
        const cost = 12000;
        const gain = 200;

        if (window.gameState.money >= cost) {
            window.gameState.money -= cost;
            window.gameState.perSecond += gain;
            window.updateDisplay();

            // Cacher les boutons de choix
            const choicesContainer = document.querySelector('.upgrade-choices');
            if (choicesContainer) choicesContainer.remove();

            // Message de confirmation et départ du robot
            this.addMessage("Excellent choix! Je savais que tu étais un vrai businessman! 🎯 Cette machine va faire exploser ta production! 🚀");
            this.nextButton.style.display = 'block'; // Afficher le bouton suivant
            setTimeout(() => this.robotExit(), 3000);
        } else {
            this.addMessage("Oops! Il te manque un peu d'argent pour cet achat! Continue à produire! 💪");
            this.nextButton.style.display = 'block'; // Afficher le bouton suivant
        }
    }

    showUpgradeChoicesSecond() {
        // Créer un conteneur fixe pour le bouton de la machine rapide
        const fixedContainer = document.createElement('div');
        fixedContainer.className = 'fixed-upgrade-container';
        fixedContainer.style.cssText = `
            position: fixed;
            bottom: 200px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 999;
        `;

        // Bouton machine rapide - reste fixe
        const button1 = document.createElement('button');
        button1.className = 'upgrade-button profit';
        button1.innerHTML = `Machine Ultra-rapide<br>20K€ | +300€/s<br>💰`;
        button1.onclick = () => this.handleSecondUpgradeChoice('speed');

        // Bouton écologique - se déplace
        const button2 = document.createElement('button');
        button2.className = 'upgrade-button eco';
        button2.innerHTML = `Système Écologique<br>18K€ | +250€/s<br>🌱`;
        button2.style.position = 'fixed';
        button2.style.zIndex = '1000';

        // Fonction pour déplacer le bouton aléatoirement
        const moveButton = () => {
            const padding = 50;
            const maxX = window.innerWidth - button2.offsetWidth - padding;
            const maxY = window.innerHeight - button2.offsetHeight - padding;

            const randomX = Math.random() * maxX + padding;
            const randomY = Math.random() * maxY + padding;

            button2.style.left = `${randomX}px`;
            button2.style.top = `${randomY}px`;

            // Afficher un message aléatoire
            const messages = this.dialogues.ecoButtonMessages;
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            this.addMessage(randomMessage);
        };

        // Déplacer au clic et au survol
        button2.onclick = moveButton;
        button2.onmouseover = moveButton;

        // Position initiale du bouton écologique
        moveButton();

        // Ajouter le bouton rapide dans son conteneur fixe
        fixedContainer.appendChild(button1);
        document.body.appendChild(fixedContainer);

        // Ajouter le bouton écologique directement au body
        document.body.appendChild(button2);

        this.nextButton.style.display = 'none';
    }

    handleSecondUpgradeChoice(choice) {
        const cost = 20000;
        const gain = 300;

        if (window.gameState.money >= cost) {
            window.gameState.money -= cost;
            window.gameState.perSecond += gain;
            window.updateDisplay();

            // Supprimer les deux boutons et leur conteneur
            const ecoButton = document.querySelector('.upgrade-button.eco');
            const fixedContainer = document.querySelector('.fixed-upgrade-container');
            if (ecoButton) ecoButton.remove();
            if (fixedContainer) fixedContainer.remove();

            // Message de confirmation et départ du robot
            this.playDialogue('acceptSecondUpgrade');
            setTimeout(() => this.robotExit(), 8000);
        } else {
            this.addMessage("Il te manque encore un peu d'argent! Continue à produire! 💪");
        }
    }

    showUpgradeChoicesThird() {
        // Créer un conteneur fixe pour le bouton de la machine rapide
        const fixedContainer = document.createElement('div');
        fixedContainer.className = 'fixed-upgrade-container';
        fixedContainer.style.cssText = `
            position: fixed;
            bottom: 200px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 999;
        `;

        // Bouton machine rapide - reste fixe
        const button1 = document.createElement('button');
        button1.className = 'upgrade-button profit';
        button1.innerHTML = `Machine ULTRA-MEGA-RAPIDE<br>50K€ | +500€/s<br>💰`;
        button1.onclick = () => this.handleThirdUpgradeChoice('speed');

        // Bouton écologique - se déplace
        const button2 = document.createElement('button');
        button2.className = 'upgrade-button eco';
        button2.innerHTML = `Filtre Écologique<br>45K€ | +400€/s<br>🌱`;
        button2.style.position = 'fixed';
        button2.style.zIndex = '1000';

        // Fonction pour déplacer le bouton aléatoirement
        const moveButton = () => {
            const padding = 50;
            const maxX = window.innerWidth - button2.offsetWidth - padding;
            const maxY = window.innerHeight - button2.offsetHeight - padding;

            const randomX = Math.random() * maxX + padding;
            const randomY = Math.random() * maxY + padding;

            button2.style.left = `${randomX}px`;
            button2.style.top = `${randomY}px`;

            // Afficher un message aléatoire
            const messages = this.dialogues.ecoButtonMessages;
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            this.addMessage(randomMessage);
        };

        // Déplacer au clic et au survol
        button2.onclick = moveButton;
        button2.onmouseover = moveButton;

        // Position initiale du bouton écologique
        moveButton();

        fixedContainer.appendChild(button1);
        document.body.appendChild(fixedContainer);
        document.body.appendChild(button2);
        this.nextButton.style.display = 'none';
    }

    handleThirdUpgradeChoice(choice) {
        const cost = 50000;
        const gain = 500;

        if (window.gameState.money >= cost) {
            window.gameState.money -= cost;
            window.gameState.perSecond += gain;
            window.updateDisplay();

            // Supprimer les boutons
            const ecoButton = document.querySelector('.upgrade-button.eco');
            const fixedContainer = document.querySelector('.fixed-upgrade-container');
            if (ecoButton) ecoButton.remove();
            if (fixedContainer) fixedContainer.remove();

            // Message de confirmation sans faire partir le robot
            this.playDialogue('acceptThirdUpgrade');
        } else {
            this.addMessage("Il te manque encore un peu d'argent! Continue à produire! 💪");
        }
    }

    showNextMessage() {
        if (!this.currentDialogue || this.currentMessageIndex >= this.currentDialogue.length) {
            if (this.currentDialogue === this.dialogues.firstUpgrade) {
                this.showUpgradeChoices();
                this.nextButton.style.display = 'none'; // Cacher le bouton pendant les choix
                return;
            } else if (this.currentDialogue === this.dialogues.ecoTrap) {
                // Si c'est la fin du dialogue ecoTrap, forcer l'achat de la machine rapide
                window.gameState.money -= 12000;
                window.gameState.perSecond += 200;
                window.updateDisplay();
                this.robotExit();
                return;
            } else if (this.currentDialogue === this.dialogues.secondUpgrade) {
                this.showUpgradeChoicesSecond();
                this.nextButton.style.display = 'none'; // Cacher le bouton pendant les choix
                return;
            } else if (this.currentDialogue === this.dialogues.thirdUpgrade) {
                this.showUpgradeChoicesThird();
                this.nextButton.style.display = 'none'; // Cacher le bouton pendant les choix
                return;
            }
            this.nextButton.classList.remove('visible');

            // Si c'est la fin du dialogue actuel, passer au dialogue suivant
            if (this.currentDialogueIndex < this.dialogueQueue.length - 1) {
                this.currentDialogueIndex++;
                setTimeout(() => {
                    this.playDialogue(this.dialogueQueue[this.currentDialogueIndex]);
                }, 1000);
            } else {
                // Si c'est la fin du dernier dialogue (tutorial), faire partir le robot
                this.robotExit();
            }
            return;
        }

        const message = this.currentDialogue[this.currentMessageIndex];
        this.addMessage(message, true);
        this.currentMessageIndex++;

        // Afficher le bouton suivant après chaque message
        this.nextButton.style.display = 'block';
        this.nextButton.classList.add('visible');
    }

    // Nouvelle méthode pour passer tous les dialogues
    skipAllDialogues() {
        // Finir le message actuel si en cours d'écriture
        if (this.isTyping) {
            this.finishCurrentMessage();
        }

        // Si on est dans un dialogue d'upgrade, on force l'achat de la machine rapide
        if (this.currentDialogue === this.dialogues.firstUpgrade) {
            window.gameState.money -= 12000;
            window.gameState.perSecond += 200;
            window.updateDisplay();
            this.robotExit();
            return;
        }

        if (this.currentDialogue === this.dialogues.secondUpgrade) {
            window.gameState.money -= 20000;
            window.gameState.perSecond += 300;
            window.updateDisplay();
            this.robotExit();
            return;
        }

        if (this.currentDialogue === this.dialogues.thirdUpgrade) {
            window.gameState.money -= 50000;
            window.gameState.perSecond += 500;
            window.updateDisplay();
            this.robotExit();
            return;
        }

        // Passer directement au dernier message du dernier dialogue
        this.currentDialogueIndex = this.dialogueQueue.length - 1;
        this.currentDialogue = this.dialogues[this.dialogueQueue[this.currentDialogueIndex]];
        this.currentMessageIndex = this.currentDialogue.length - 1;

        // Afficher le dernier message
        const lastMessage = this.currentDialogue[this.currentMessageIndex];
        this.messageContainer.innerHTML = '';
        const messageElement = document.createElement('div');
        messageElement.className = 'message robot';
        messageElement.textContent = lastMessage;
        this.messageContainer.appendChild(messageElement);

        // Déclencher l'animation de sortie
        setTimeout(() => {
            this.robotExit();
        }, 500);
    }

    // Nouvelle méthode pour vérifier le seuil et déclencher le retour de Robi
    checkProgressAndTriggerRobi() {
        if (window.gameState.money >= 60000 && !this.hasTriggeredThirdUpgrade && this.hasTriggeredSecondUpgrade) {
            this.hasTriggeredThirdUpgrade = true;

            // Cacher le bouton clicker
            const clickerButton = document.getElementById('clickerButton');
            clickerButton.style.display = 'none';

            // Faire réapparaître Robi et le chat
            const robotContainer = document.querySelector('.robot-container');
            const chatContainer = document.querySelector('.chat-container');

            robotContainer.style.display = 'block';
            robotContainer.style.animation = 'robotEnter 2s ease-out forwards';
            robotContainer.classList.remove('exit');

            chatContainer.style.display = 'block';
            chatContainer.style.animation = 'chatAppear 1s ease-out forwards';
            chatContainer.classList.remove('exit');

            // Lancer le nouveau dialogue
            setTimeout(() => {
                this.playDialogue('thirdUpgrade');
            }, 2500);
            return;
        }

        if (window.gameState.money >= 25000 && !this.hasTriggeredSecondUpgrade && this.hasTriggeredFirstUpgrade) {
            this.hasTriggeredSecondUpgrade = true;

            // Cacher le bouton clicker
            const clickerButton = document.getElementById('clickerButton');
            clickerButton.style.display = 'none';

            // Faire réapparaître Robi et le chat
            const robotContainer = document.querySelector('.robot-container');
            const chatContainer = document.querySelector('.chat-container');

            robotContainer.style.display = 'block';
            robotContainer.style.animation = 'robotEnter 2s ease-out forwards';
            robotContainer.classList.remove('exit');

            chatContainer.style.display = 'block';
            chatContainer.style.animation = 'chatAppear 1s ease-out forwards';
            chatContainer.classList.remove('exit');

            // Lancer le nouveau dialogue
            setTimeout(() => {
                this.playDialogue('secondUpgrade');
            }, 2500);
            return;
        }

        // Vérification existante pour le premier upgrade
        if (window.gameState.money >= 15000 && !this.hasTriggeredFirstUpgrade) {
            this.hasTriggeredFirstUpgrade = true;

            // Cacher le bouton clicker
            const clickerButton = document.getElementById('clickerButton');
            clickerButton.style.display = 'none';

            // Faire réapparaître Robi et le chat
            const robotContainer = document.querySelector('.robot-container');
            const chatContainer = document.querySelector('.chat-container');

            robotContainer.style.display = 'block';
            robotContainer.style.animation = 'robotEnter 2s ease-out forwards';
            robotContainer.classList.remove('exit');

            chatContainer.style.display = 'block';
            chatContainer.style.animation = 'chatAppear 1s ease-out forwards';
            chatContainer.classList.remove('exit');

            // Lancer le nouveau dialogue
            setTimeout(() => {
                this.playDialogue('firstUpgrade');
            }, 2500);
        }
    }
} 