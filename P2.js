let tasks = [];

// Function to add a new task
function addTask(title, dueTime, priority) {
    if (!title || !dueTime || !priority) {
        console.error("Error: All fields (title, dueTime, priority) are required!");
        return;
    }
    if (typeof dueTime !== "number" || dueTime <= 0) {
        console.error("Error: Invalid dueTime! It should be a positive number.");
        return;
    }

    const dueDate = new Date(Date.now() + dueTime * 60000); // Convert minutes to milliseconds
    tasks.push({ title, dueDate, priority });

    console.log(`✅ Task added: ${title}, Due in: ${dueTime} minutes`);
}

// Function to sort tasks by priority
function sortTasks() {
    tasks.sort((a, b) => a.priority - b.priority);
    console.log("📌 Tasks sorted by priority.");
}

// Function to display upcoming tasks
function displayUpcomingTasks(minutes) {
    const now = new Date();
    console.log(`📅 Tasks due in the next ${minutes} minutes:`);
    tasks.forEach(task => {
        if ((task.dueDate - now) / 60000 <= minutes) {
            console.log(`- ${task.title}, Due: ${task.dueDate.toLocaleTimeString()}`);
        }
    });
}

// Function to schedule reminders
function scheduleReminders() {
    tasks.forEach(task => {
        const delay = task.dueDate - Date.now();
        if (delay > 0) {
            setTimeout(() => {
                console.log(`🔔 Reminder: ${task.title} is due now!`);
            }, delay);
        }
    });
}

// Example Usage
addTask("Complete JavaScript project", 2, 1);
addTask("Meeting with team", 5, 2);
addTask("Reply to emails", 8, 3);

sortTasks();
displayUpcomingTasks(10);
scheduleReminders();
