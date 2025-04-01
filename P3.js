const os = require("os");
const fs = require("fs");
const path = require("path");

// Get system information
const systemInfo = {
    OS: os.type(),
    Architecture: os.arch(),
    Total_Memory: `${(os.totalmem() / (1024 * 1024 * 1024)).toFixed(2)} GB`,
    Free_Memory: `${(os.freemem() / (1024 * 1024 * 1024)).toFixed(2)} GB`,
    CPU_Details: os.cpus().map(cpu => cpu.model),
    Uptime: `${(os.uptime() / 60).toFixed(2)} minutes`,
};

// Convert to readable format
const logData = `System Information:
----------------------
OS Type: ${systemInfo.OS}
Architecture: ${systemInfo.Architecture}
Total Memory: ${systemInfo.Total_Memory}
Free Memory: ${systemInfo.Free_Memory}
CPU Details: ${systemInfo.CPU_Details.join(", ")}
System Uptime: ${systemInfo.Uptime} minutes
`;

// Define log file path
const logDir = path.join(__dirname, "logs");
const logFile = path.join(logDir, "system-info.txt");

// Ensure log directory exists
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

// Write system info to file
fs.writeFileSync(logFile, logData);
console.log("✅ System information saved to:", logFile);

// Display system info in the console
console.log(logData);
