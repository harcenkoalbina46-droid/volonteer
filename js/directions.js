// Данные о направлениях волонтерства
const directionsData = {
    ecological: {
        id: 'ecological',
        title: '🌿 Экологическое волонтерство',
        description: 'Забота о природе Карелии, сохранение уникальной экосистемы региона. Экологические волонтеры участвуют в уборке территорий, посадке деревьев, защите животных и растений, а также в просветительской деятельности.',
        stats: {
            volunteers: 1250,
            projects: 89,
            hours: 15600
        },
        tasks: [
            {
                id: 1,
                type: 'interactive',
                title: 'Сортировка мусора',
                description: 'Правильно распределите мусор по категориям для переработки',
                interactive: 'sortingGame',
                completed: false
            },
            {
                id: 2,
                type: 'quiz',
                title: 'Экологическая викторина',
                description: 'Проверьте свои знания об экологии Карелии',
                interactive: 'ecologyQuiz',
                completed: false
            },
            {
                id: 3,
                type: 'info',
                title: 'Экологический след',
                description: 'Рассчитайте свой экологический след и узнайте, как его уменьшить',
                interactive: 'footprintCalculator',
                completed: false
            },
            {
                id: 4,
                type: 'info',
                title: 'Изучение флоры Карелии',
                description: 'Познакомьтесь с уникальными растениями нашего региона',
                interactive: 'floraStudy',
                completed: false
            },
            {
                id: 5,
                type: 'info',
                title: 'Защита водоемов',
                description: 'Узнайте о мерах защиты озер и рек Карелии',
                interactive: 'waterProtection',
                completed: false
            }
        ]
    },
    patriotic: {
        id: 'patriotic',
        title: '🇷🇺 Патриотическое волонтерство',
        description: 'Сохранение исторической памяти, помощь ветеранам, патриотическое воспитание молодежи.',
        stats: {
            volunteers: 890,
            projects: 45,
            hours: 9800
        },
        tasks: [
            {
                id: 1,
                type: 'quiz',
                title: 'Историческая викторина',
                description: 'Проверьте знания истории Карелии',
                interactive: 'historyQuiz',
                completed: false
            },
            {
                id: 2,
                type: 'info',
                title: 'Виртуальный музей',
                description: 'Изучите экспонаты музея Карелии',
                interactive: 'virtualMuseum',
                completed: false
            },
            {
                id: 3,
                type: 'info',
                title: 'Собери памятник',
                description: 'Восстановите внешний вид исторического памятника',
                interactive: 'monumentBuilder',
                completed: false
            },
            {
                id: 4,
                type: 'info',
                title: 'Герои Карелии',
                description: 'Познакомьтесь с выдающимися людьми региона',
                interactive: 'heroesStudy',
                completed: false
            },
            {
                id: 5,
                type: 'quiz',
                title: 'Традиции народов',
                description: 'Узнайте о культурных традициях Карелии',
                interactive: 'traditionsQuiz',
                completed: false
            }
        ]
    },
    social: {
        id: 'social',
        title: '❤️ Социальное волонтерство',
        description: 'Помощь пожилым людям, детям-сиротам, людям с ограниченными возможностями.',
        stats: {
            volunteers: 2100,
            projects: 120,
            hours: 25400
        },
        tasks: [
            {
                id: 1,
                type: 'interactive',
                title: 'Ситуации помощи',
                description: 'Выберите правильные действия в социальных ситуациях',
                interactive: 'helpScenarios',
                completed: false
            },
            {
                id: 2,
                type: 'quiz',
                title: 'Этика общения',
                description: 'Проверьте знания правил общения с разными группами',
                interactive: 'communicationQuiz',
                completed: false
            },
            {
                id: 3,
                type: 'info',
                title: 'Виды социальной помощи',
                description: 'Изучите различные формы социальной поддержки',
                interactive: 'helpTypes',
                completed: false
            },
            {
                id: 4,
                type: 'info',
                title: 'План помощи',
                description: 'Составьте план помощи для конкретной ситуации',
                interactive: 'helpPlan',
                completed: false
            },
            {
                id: 5,
                type: 'quiz',
                title: 'Правовые основы',
                description: 'Узнайте о правах и возможностях волонтеров',
                interactive: 'legalQuiz',
                completed: false
            }
        ]
    }
};

// Глобальные переменные
let userSorting = {};
let currentQuizAnswers = [];
let currentScenarioAnswers = [];

// Загрузка списка направлений
function loadDirectionsList() {
    const directionsGrid = document.getElementById('directionsGrid');
    if (!directionsGrid) return;
    
    directionsGrid.innerHTML = '';
    
    Object.values(directionsData).forEach(direction => {
        const directionCard = document.createElement('div');
        directionCard.className = 'direction-card';
        directionCard.innerHTML = `
            <div class="icon">${direction.title.split(' ')[0]}</div>
            <h3>${direction.title}</h3>
            <p>${direction.description.substring(0, 100)}...</p>
            <div class="direction-stats">
                <div class="stat">
                    <span class="stat-number">${direction.stats.volunteers.toLocaleString()}</span>
                    <span class="stat-label">волонтеров</span>
                </div>
            </div>
        `;
        
        directionCard.addEventListener('click', () => showDirectionDetail(direction.id));
        directionsGrid.appendChild(directionCard);
    });
}

// Показать детальную информацию о направлении
function showDirectionDetail(directionId) {
    const direction = directionsData[directionId];
    const detailSection = document.getElementById('directionDetail');
    const directionsList = document.querySelector('.directions-list');
    
    if (!detailSection || !directionsList) return;
    
    // Заголовок и описание
    document.getElementById('detailTitle').textContent = direction.title;
    document.getElementById('detailDescription').textContent = direction.description;
    
    // Статистика
    document.getElementById('statVolunteers').textContent = direction.stats.volunteers.toLocaleString();
    document.getElementById('statProjects').textContent = direction.stats.projects;
    document.getElementById('statHours').textContent = direction.stats.hours.toLocaleString();
    
    // Загрузка задач
    loadTasks(direction.tasks, directionId);
    
    // Показать секцию
    directionsList.style.display = 'none';
    detailSection.style.display = 'block';
    
    // Прокрутка к верху
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Скрыть детальную информацию
function hideDirectionDetail() {
    const detailSection = document.getElementById('directionDetail');
    const directionsList = document.querySelector('.directions-list');
    
    if (!detailSection || !directionsList) return;
    
    detailSection.style.display = 'none';
    directionsList.style.display = 'block';
}

// Загрузка задач
function loadTasks(tasks, directionId) {
    const tasksContainer = document.getElementById('tasksContainer');
    if (!tasksContainer) return;
    
    tasksContainer.innerHTML = '';
    
    // Загружаем прогресс из localStorage
    const progress = getProgress(directionId);
    
    tasks.forEach((task, index) => {
        const taskCompleted = progress.includes(task.id);
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        taskItem.innerHTML = `
            <div class="task-header">
                <div class="task-title">Задание ${index + 1}: ${task.title}</div>
                <div class="task-status ${taskCompleted ? 'status-completed' : 'status-pending'}">
                    ${taskCompleted ? '✅ Выполнено' : '⏳ Ожидает'}
                </div>
            </div>
            <div class="task-description">${task.description}</div>
            <div class="task-actions">
                ${!taskCompleted ? 
                    `<button type="button" onclick="startTask('${directionId}', ${task.id})" class="btn btn-small btn-complete">
                        Начать выполнение
                    </button>` : 
                    `<button type="button" onclick="undoTask('${directionId}', ${task.id})" class="btn btn-small btn-secondary">
                        Отменить выполнение
                    </button>`
                }
            </div>
        `;
        tasksContainer.appendChild(taskItem);
    });
    
    updateProgress(directionId);
}

// Начать выполнение задания
function startTask(directionId, taskId) {
    const direction = directionsData[directionId];
    const task = direction.tasks.find(t => t.id === taskId);
    const tasksContainer = document.getElementById('tasksContainer');
    
    if (!task || !tasksContainer) return;
    
    // Очищаем контейнер и показываем интерактивное задание
    tasksContainer.innerHTML = '';
    
    if (interactiveGames[task.interactive]) {
        interactiveGames[task.interactive](tasksContainer, taskId, directionId);
    } else {
        // Если игра не найдена, показываем простую информацию
        tasksContainer.innerHTML = `
            <div class="interactive-task">
                <h4>${task.title}</h4>
                <p>${task.description}</p>
                <button type="button" onclick="completeTask('${directionId}', ${taskId})" class="btn btn-primary">
                    Отметить как выполненное
                </button>
            </div>
        `;
    }
}

// Отметить задание как выполненное
function completeTask(directionId, taskId) {
    const progress = getProgress(directionId);
    if (!progress.includes(taskId)) {
        progress.push(taskId);
        saveProgress(directionId, progress);
        loadTasks(directionsData[directionId].tasks, directionId);
        showNotification('Задание выполнено! 🎉', 'success');
    }
}

// Отменить выполнение задания
function undoTask(directionId, taskId) {
    const progress = getProgress(directionId);
    const index = progress.indexOf(taskId);
    if (index > -1) {
        progress.splice(index, 1);
        saveProgress(directionId, progress);
        loadTasks(directionsData[directionId].tasks, directionId);
        showNotification('Выполнение задания отменено', 'info');
    }
}

// Обновить прогресс
function updateProgress(directionId) {
    const progress = getProgress(directionId);
    const totalTasks = directionsData[directionId].tasks.length;
    const completedCount = progress.length;
    const percentage = (completedCount / totalTasks) * 100;
    
    const progressFill = document.getElementById('progressFill');
    const completedCountEl = document.getElementById('completedCount');
    const totalTasksEl = document.getElementById('totalTasks');
    
    if (progressFill) progressFill.style.width = percentage + '%';
    if (completedCountEl) completedCountEl.textContent = completedCount;
    if (totalTasksEl) totalTasksEl.textContent = totalTasks;
}

// Сбросить прогресс
function resetProgress() {
    const currentDirection = getCurrentDirection();
    if (currentDirection) {
        localStorage.removeItem(`progress_${currentDirection}`);
        loadTasks(directionsData[currentDirection].tasks, currentDirection);
        showNotification('Прогресс сброшен', 'info');
    }
}

// Получить текущее направление
function getCurrentDirection() {
    const detailSection = document.getElementById('directionDetail');
    if (detailSection && detailSection.style.display !== 'none') {
        const title = document.getElementById('detailTitle').textContent;
        for (const [id, direction] of Object.entries(directionsData)) {
            if (direction.title === title) {
                return id;
            }
        }
    }
    return null;
}

// Работа с localStorage
function getProgress(directionId) {
    const stored = localStorage.getItem(`progress_${directionId}`);
    return stored ? JSON.parse(stored) : [];
}

function saveProgress(directionId, progress) {
    localStorage.setItem(`progress_${directionId}`, JSON.stringify(progress));
}

// Игры и интерактивные задания
const interactiveGames = {
    // Игра сортировки мусора
    sortingGame: function(container, taskId, directionId) {
        const correctSorting = {
            'plastic-bottle': 'plastic',
            'glass-bottle': 'glass',
            'newspaper': 'paper',
            'can': 'metal',
            'banana-peel': 'organic',
            'plastic-bag': 'plastic',
            'wine-bottle': 'glass',
            'cardboard': 'paper',
            'soup-can': 'metal',
            'apple-core': 'organic'
        };

        userSorting = {};

        const gameHTML = `
            <div class="interactive-task">
                <h4>♻️ Сортировка мусора</h4>
                <p>Перетащите каждый предмет мусора в правильный контейнер для переработки:</p>
                
                <div class="sorting-game">
                    <div class="sorting-area">
                        <div class="sorting-bin bin-plastic" data-bin="plastic">
                            <h5>📦 Пластик</h5>
                            <div class="bin-content" id="bin-plastic"></div>
                        </div>
                        <div class="sorting-bin bin-paper" data-bin="paper">
                            <h5>📰 Бумага</h5>
                            <div class="bin-content" id="bin-paper"></div>
                        </div>
                        <div class="sorting-bin bin-glass" data-bin="glass">
                            <h5>🍶 Стекло</h5>
                            <div class="bin-content" id="bin-glass"></div>
                        </div>
                        <div class="sorting-bin bin-metal" data-bin="metal">
                            <h5>🥫 Металл</h5>
                            <div class="bin-content" id="bin-metal"></div>
                        </div>
                        <div class="sorting-bin bin-organic" data-bin="organic">
                            <h5>🍎 Органика</h5>
                            <div class="bin-content" id="bin-organic"></div>
                        </div>
                    </div>
                    
                    <div class="trash-items">
                        <div class="trash-item" draggable="true" data-item="plastic-bottle">Пластиковая бутылка</div>
                        <div class="trash-item" draggable="true" data-item="glass-bottle">Стеклянная бутылка</div>
                        <div class="trash-item" draggable="true" data-item="newspaper">Газета</div>
                        <div class="trash-item" draggable="true" data-item="can">Алюминиевая банка</div>
                        <div class="trash-item" draggable="true" data-item="banana-peel">Банановая кожура</div>
                        <div class="trash-item" draggable="true" data-item="plastic-bag">Пластиковый пакет</div>
                        <div class="trash-item" draggable="true" data-item="wine-bottle">Винная бутылка</div>
                        <div class="trash-item" draggable="true" data-item="cardboard">Картонная коробка</div>
                        <div class="trash-item" draggable="true" data-item="soup-can">Консервная банка</div>
                        <div class="trash-item" draggable="true" data-item="apple-core">Яблочное огрызко</div>
                    </div>
                    
                    <div class="game-feedback" id="sorting-feedback" style="display: none;"></div>
                    
                    <button type="button" onclick="checkSorting('${directionId}', ${taskId})" class="btn btn-check" id="check-sorting">
                        Проверить сортировку
                    </button>
                </div>
            </div>
        `;

        container.innerHTML = gameHTML;
        setupDragAndDrop();
    },

    // Экологическая викторина
    ecologyQuiz: function(container, taskId, directionId) {
        const quizQuestions = [
            {
                question: "Сколько лет разлагается пластиковая бутылка в природе?",
                options: ["10 лет", "100 лет", "450 лет", "1000 лет"],
                correct: 2
            },
            {
                question: "Какое озеро в Карелии является самым большим в Европе?",
                options: ["Онежское", "Ладожское", "Выгозеро", "Топозеро"],
                correct: 1
            },
            {
                question: "Какой процент отходов в России перерабатывается?",
                options: ["4-7%", "15-20%", "30-35%", "50-55%"],
                correct: 0
            },
            {
                question: "Какое растение является символом Карелии?",
                options: ["Сосна", "Ель", "Береза", "Можжевельник"],
                correct: 0
            }
        ];

        currentQuizAnswers = [];
        let currentQuestion = 0;

        function renderQuestion() {
            const question = quizQuestions[currentQuestion];
            const optionsHTML = question.options.map((option, index) => `
                <div class="quiz-option" onclick="selectQuizAnswer(${currentQuestion}, ${index})">
                    ${option}
                </div>
            `).join('');

            container.innerHTML = `
                <div class="interactive-task">
                    <h4>🌍 Экологическая викторина</h4>
                    <p>Вопрос ${currentQuestion + 1} из ${quizQuestions.length}</p>
                    
                    <div class="quiz-container">
                        <div class="quiz-question">${question.question}</div>
                        <div class="quiz-options">
                            ${optionsHTML}
                        </div>
                        <div class="quiz-progress">
                            <button type="button" onclick="nextQuizQuestion('${directionId}', ${taskId})" 
                                    class="btn btn-primary" 
                                    ${currentQuestion === quizQuestions.length - 1 ? '' : 'style="display: none;"'}
                                    id="quiz-finish">
                                Завершить викторину
                            </button>
                        </div>
                    </div>
                </div>
            `;

            // Подсветить выбранный ответ если есть
            if (currentQuizAnswers[currentQuestion] !== undefined) {
                const options = container.querySelectorAll('.quiz-option');
                options[currentQuizAnswers[currentQuestion]].classList.add('selected');
            }
        }

        renderQuestion();
    },

    // Ситуации помощи для социального волонтерства
    helpScenarios: function(container, taskId, directionId) {
        const scenarios = [
            {
                situation: "Вы встречаете пожилого человека, который не может перейти дорогу из-за интенсивного движения. Что вы сделаете?",
                options: [
                    "Предложите помощь и переведете через дорогу",
                    "Пройдете мимо, чтобы не смущать человека",
                    "Вызовете социальную службу",
                    "Попросите кого-то другого помочь"
                ],
                correct: 0
            },
            {
                situation: "Вы видите, что человек в инвалидной коляске не может подняться по лестнице. Ваши действия?",
                options: [
                    "Предложите помощь и поможете найти пандус или лифт",
                    "Попытаетесь поднять коляску по лестнице",
                    "Спросите, нужна ли помощь, и действуете по ситуации",
                    "Проигнорируете, чтобы не обидеть человека"
                ],
                correct: 2
            }
        ];

        currentScenarioAnswers = [];
        let currentScenario = 0;

        function renderScenario() {
            const scenario = scenarios[currentScenario];
            const optionsHTML = scenario.options.map((option, index) => `
                <div class="response-option" onclick="selectScenarioAnswer(${currentScenario}, ${index})">
                    ${option}
                </div>
            `).join('');

            container.innerHTML = `
                <div class="interactive-task">
                    <h4>🤝 Ситуации помощи</h4>
                    <p>Ситуация ${currentScenario + 1} из ${scenarios.length}</p>
                    
                    <div class="situation-game">
                        <div class="situation-scenario">
                            ${scenario.situation}
                        </div>
                        <div class="response-options">
                            ${optionsHTML}
                        </div>
                        <button type="button" onclick="checkScenarioAnswer('${directionId}', ${taskId})" 
                                class="btn btn-check" 
                                id="check-scenario">
                            Проверить ответ
                        </button>
                    </div>
                </div>
            `;

            // Подсветить выбранный ответ если есть
            if (currentScenarioAnswers[currentScenario] !== undefined) {
                const options = container.querySelectorAll('.response-option');
                options[currentScenarioAnswers[currentScenario]].classList.add('selected');
                document.getElementById('check-scenario').disabled = false;
            } else {
                document.getElementById('check-scenario').disabled = true;
            }
        }

        renderScenario();
    }
};

// Глобальные функции для игр
window.selectQuizAnswer = function(questionIndex, answerIndex) {
    currentQuizAnswers[questionIndex] = answerIndex;
    const options = document.querySelectorAll('.quiz-option');
    options.forEach(opt => opt.classList.remove('selected'));
    options[answerIndex].classList.add('selected');
    
    // Показать кнопку завершения если это последний вопрос
    if (questionIndex === currentQuizAnswers.length - 1) {
        const finishBtn = document.getElementById('quiz-finish');
        if (finishBtn) finishBtn.style.display = 'block';
    }
};

window.nextQuizQuestion = function(dirId, tId) {
    const quizQuestions = [
        { correct: 2 }, { correct: 1 }, { correct: 0 }, { correct: 0 }
    ];
    
    if (currentQuizAnswers.length < quizQuestions.length - 1) {
        currentQuizAnswers.push(undefined);
        interactiveGames.ecologyQuiz(document.getElementById('tasksContainer'), tId, dirId);
    } else {
        checkQuizResults(dirId, tId);
    }
};

window.checkQuizResults = function(dirId, tId) {
    const quizQuestions = [
        { correct: 2 }, { correct: 1 }, { correct: 0 }, { correct: 0 }
    ];
    
    let correctCount = 0;
    quizQuestions.forEach((question, index) => {
        if (currentQuizAnswers[index] === question.correct) {
            correctCount++;
        }
    });

    const percentage = (correctCount / quizQuestions.length) * 100;
    const isPassed = percentage >= 70;

    const container = document.getElementById('tasksContainer');
    if (container) {
        container.innerHTML += `
            <div class="game-feedback ${isPassed ? 'feedback-correct' : 'feedback-incorrect'}">
                ${isPassed ? '🎉 Отлично! ' : '😔 Попробуйте еще раз! '}
                Вы ответили правильно на ${correctCount} из ${quizQuestions.length} вопросов.
                ${isPassed ? 'Задание выполнено!' : 'Нужно набрать минимум 70% правильных ответов.'}
            </div>
        `;
    }

    if (isPassed) {
        completeTask(dirId, tId);
    }
};

window.selectScenarioAnswer = function(scenarioIndex, answerIndex) {
    currentScenarioAnswers[scenarioIndex] = answerIndex;
    const options = document.querySelectorAll('.response-option');
    options.forEach(opt => opt.classList.remove('selected'));
    options[answerIndex].classList.add('selected');
    document.getElementById('check-scenario').disabled = false;
};

window.checkScenarioAnswer = function(dirId, tId) {
    const scenarios = [
        { correct: 0 }, { correct: 2 }
    ];
    
    const scenario = scenarios[currentScenarioAnswers.length - 1];
    const userAnswer = currentScenarioAnswers[currentScenarioAnswers.length - 1];
    const isCorrect = userAnswer === scenario.correct;

    const options = document.querySelectorAll('.response-option');
    options.forEach((opt, index) => {
        if (index === scenario.correct) {
            opt.classList.add('correct');
        }
        if (index === userAnswer && !isCorrect) {
            opt.classList.add('incorrect');
        }
    });

    if (currentScenarioAnswers.length < scenarios.length) {
        currentScenarioAnswers.push(undefined);
        setTimeout(() => interactiveGames.helpScenarios(document.getElementById('tasksContainer'), tId, dirId), 2000);
    } else {
        // Проверяем все ответы
        const allCorrect = scenarios.every((scenario, index) => 
            currentScenarioAnswers[index] === scenario.correct
        );

        const container = document.getElementById('tasksContainer');
        if (container) {
            container.innerHTML += `
                <div class="game-feedback ${allCorrect ? 'feedback-correct' : 'feedback-incorrect'}">
                    ${allCorrect ? 
                        '🎉 Отлично! Вы правильно реагируете в социальных ситуациях. Задание выполнено!' : 
                        '📚 Есть над чем поработать. Изучите материалы о правильном общении с разными группами людей.'}
                </div>
            `;
        }

        if (allCorrect) {
            completeTask(dirId, tId);
        }
    }
};

// Настройка drag and drop для сортировки мусора
function setupDragAndDrop() {
    const trashItems = document.querySelectorAll('.trash-item');
    const bins = document.querySelectorAll('.sorting-bin');

    trashItems.forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragend', handleDragEnd);
    });

    bins.forEach(bin => {
        bin.addEventListener('dragover', handleDragOver);
        bin.addEventListener('drop', handleDrop);
    });

    function handleDragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.dataset.item);
        e.target.classList.add('dragging');
    }

    function handleDragEnd(e) {
        e.target.classList.remove('dragging');
    }

    function handleDragOver(e) {
        e.preventDefault();
    }

    function handleDrop(e) {
        e.preventDefault();
        const itemType = e.dataTransfer.getData('text/plain');
        const binType = e.currentTarget.dataset.bin;
        
        const draggedItem = document.querySelector(`[data-item="${itemType}"]`);
        const binContent = e.currentTarget.querySelector('.bin-content');
        
        if (!draggedItem || !binContent) return;
        
        // Удаляем из предыдущего контейнера если был
        const previousContainer = draggedItem.parentElement;
        if (previousContainer.classList.contains('bin-content')) {
            previousContainer.removeChild(draggedItem);
        } else {
            // Удаляем из общего списка
            draggedItem.parentElement.removeChild(draggedItem);
        }
        
        // Добавляем в новый контейнер
        binContent.appendChild(draggedItem);
        draggedItem.style.cursor = 'default';
        
        // Сохраняем выбор пользователя
        userSorting[itemType] = binType;
    }
}

// Проверка сортировки мусора
window.checkSorting = function(directionId, taskId) {
    const correctSorting = {
        'plastic-bottle': 'plastic',
        'glass-bottle': 'glass',
        'newspaper': 'paper',
        'can': 'metal',
        'banana-peel': 'organic',
        'plastic-bag': 'plastic',
        'wine-bottle': 'glass',
        'cardboard': 'paper',
        'soup-can': 'metal',
        'apple-core': 'organic'
    };

    let correctCount = 0;
    const totalItems = Object.keys(correctSorting).length;

    Object.keys(correctSorting).forEach(item => {
        if (userSorting[item] === correctSorting[item]) {
            correctCount++;
        }
    });

    const percentage = (correctCount / totalItems) * 100;
    const isPassed = percentage >= 80;

    const feedback = document.getElementById('sorting-feedback');
    if (feedback) {
        feedback.style.display = 'block';
        feedback.className = `game-feedback ${isPassed ? 'feedback-correct' : 'feedback-incorrect'}`;
        feedback.innerHTML = `
            ${isPassed ? '🎉 Отлично! ' : '😔 Почти получилось! '}
            Вы правильно отсортировали ${correctCount} из ${totalItems} предметов.
            ${isPassed ? 'Задание выполнено!' : 'Нужно правильно отсортировать минимум 80% мусора.'}
        `;
    }

    if (isPassed) {
        const checkButton = document.getElementById('check-sorting');
        if (checkButton) checkButton.disabled = true;
        completeTask(directionId, taskId);
    }
};

// Функция для показа уведомлений
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'success' ? '#4a7c59' : '#2c5530'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('directionsGrid')) {
        loadDirectionsList();
    }
});
