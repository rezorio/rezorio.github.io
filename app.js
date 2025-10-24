document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const taskInput = document.getElementById('taskInput');
    const minutesInput = document.getElementById('minutes');
    const secondsInput = document.getElementById('seconds');
    const addBtn = document.getElementById('addBtn');
    const taskList = document.getElementById('taskList');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const timerModal = document.getElementById('timerModal');
    const currentTaskDisplay = document.getElementById('currentTask');
    const timeDisplay = document.getElementById('timeDisplay');
    const startPauseBtn = document.getElementById('startPauseBtn');
    const resetBtn = document.getElementById('resetBtn');
    const completeBtn = document.getElementById('completeBtn');
    const closeModal = document.getElementById('closeModal');

    // State
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let currentFilter = 'all';
    let timer;
    let timeLeft = 0;
    let isRunning = false;
    let currentTaskId = null;

    // Initialize the app
    function init() {
        renderTasks();
        setupEventListeners();
    }

    // Set up event listeners
    function setupEventListeners() {
        // Add task
        addBtn.addEventListener('click', addTask);
        taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addTask();
        });

        // Filter tasks
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                currentFilter = button.dataset.filter;
                renderTasks();
            });
        });

        // Timer controls
        startPauseBtn.addEventListener('click', toggleTimer);
        resetBtn.addEventListener('click', resetTimer);
        completeBtn.addEventListener('click', completeCurrentTask);
        closeModal.addEventListener('click', () => {
            timerModal.style.display = 'none';
            stopTimer();
        });

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === timerModal) {
                timerModal.style.display = 'none';
                stopTimer();
            }
        });

        // Prevent non-numeric input in timer fields
        [minutesInput, secondsInput].forEach(input => {
            input.addEventListener('input', (e) => {
                let value = e.target.value;
                if (value.length > 2) {
                    e.target.value = value.slice(0, 2);
                }
                if (value > 59) {
                    e.target.value = '59';
                }
                if (value < 0) {
                    e.target.value = '00';
                }
                // Add leading zero if needed
                if (e.target.value.length === 1) {
                    e.target.value = '0' + e.target.value;
                }
            });
        });
    }

    // Add a new task
    function addTask() {
        const title = taskInput.value.trim();
        const minutes = parseInt(minutesInput.value) || 0;
        const seconds = parseInt(secondsInput.value) || 0;

        if (!title) {
            alert('Please enter a task title');
            return;
        }

        if (minutes === 0 && seconds === 0) {
            alert('Please set a timer for the task');
            return;
        }

        const task = {
            id: Date.now().toString(),
            title,
            minutes,
            seconds,
            completed: false,
            timeSpent: 0
        };

        tasks.push(task);
        saveTasks();
        renderTasks();
        
        // Reset form
        taskInput.value = '';
        minutesInput.value = '25';
        secondsInput.value = '00';
        taskInput.focus();
    }

    // Render tasks based on current filter
    function renderTasks() {
        let filteredTasks = [...tasks];
        
        if (currentFilter === 'pending') {
            filteredTasks = tasks.filter(task => !task.completed);
        } else if (currentFilter === 'completed') {
            filteredTasks = tasks.filter(task => task.completed);
        }

        taskList.innerHTML = '';

        if (filteredTasks.length === 0) {
            const emptyMessage = document.createElement('li');
            emptyMessage.textContent = 'No tasks found';
            emptyMessage.style.textAlign = 'center';
            emptyMessage.style.padding = '1rem';
            emptyMessage.style.color = '#7f8c8d';
            taskList.appendChild(emptyMessage);
            return;
        }

        filteredTasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            li.dataset.id = task.id;
            
            li.innerHTML = `
                <div class="task-info">
                    <div class="task-title">${task.title}</div>
                    <div class="task-timer">
                        <i class="far fa-clock"></i>
                        ${String(task.minutes).padStart(2, '0')}:${String(task.seconds).padStart(2, '0')}
                    </div>
                </div>
                <div class="task-actions">
                    ${!task.completed ? `
                        <button class="start-btn" data-id="${task.id}">
                            <i class="fas fa-play"></i>
                        </button>
                        <button class="complete-btn" data-id="${task.id}">
                            <i class="fas fa-check"></i>
                        </button>
                    ` : ''}
                    <button class="delete-btn" data-id="${task.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;

            taskList.appendChild(li);
        });

        // Add event listeners to action buttons
        document.querySelectorAll('.start-btn').forEach(btn => {
            btn.addEventListener('click', (e) => startTaskTimer(e.target.closest('button').dataset.id));
        });

        document.querySelectorAll('.complete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => toggleTaskComplete(e.target.closest('button').dataset.id));
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => deleteTask(e.target.closest('button').dataset.id));
        });
    }

    // Start task timer
    function startTaskTimer(taskId) {
        const task = tasks.find(t => t.id === taskId);
        if (!task) return;

        currentTaskId = taskId;
        currentTaskDisplay.textContent = task.title;
        timeLeft = (task.minutes * 60) + task.seconds;
        
        updateTimerDisplay();
        timerModal.style.display = 'flex';
    }

    // Toggle timer start/pause
    function toggleTimer() {
        if (isRunning) {
            stopTimer();
        } else {
            startTimer();
        }
    }

    // Start the timer
    function startTimer() {
        if (timeLeft <= 0) return;
        
        isRunning = true;
        startPauseBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
        
        timer = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();
            
            // Update time spent on task
            const task = tasks.find(t => t.id === currentTaskId);
            if (task) {
                task.timeSpent++;
            }
            
            if (timeLeft <= 0) {
                stopTimer();
                // Auto-complete task when timer reaches zero
                completeCurrentTask();
            }
        }, 1000);
    }

    // Stop the timer
    function stopTimer() {
        isRunning = false;
        clearInterval(timer);
        startPauseBtn.innerHTML = '<i class="fas fa-play"></i> Start';
    }

    // Reset the timer
    function resetTimer() {
        stopTimer();
        const task = tasks.find(t => t.id === currentTaskId);
        if (task) {
            timeLeft = (task.minutes * 60) + task.seconds;
            updateTimerDisplay();
        }
    }

    // Complete the current task
    function completeCurrentTask() {
        if (currentTaskId) {
            toggleTaskComplete(currentTaskId);
            timerModal.style.display = 'none';
            stopTimer();
        }
    }

    // Update the timer display
    function updateTimerDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timeDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    // Toggle task completion status
    function toggleTaskComplete(taskId) {
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        }
    }

    // Delete a task
    function deleteTask(taskId) {
        if (confirm('Are you sure you want to delete this task?')) {
            tasks = tasks.filter(task => task.id !== taskId);
            saveTasks();
            renderTasks();
            
            // If the deleted task was being timed, close the timer
            if (currentTaskId === taskId) {
                timerModal.style.display = 'none';
                stopTimer();
            }
        }
    }

    // Save tasks to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Initialize the app
    init();
});
