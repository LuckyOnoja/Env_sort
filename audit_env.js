const fs = require('fs');

const envContent = fs.readFileSync('.env.sample','utf8');
const lines = envContent.split('\n').filter(line => line.trim() !== '');

console.log("Running Enviroment Security Audit");

const auditResults = lines.map(line => {
    const [key, value] = line.split('=');
    let status = "SECURE";
    let note = "Configured"; 

    if (!value || value.trim() === "" ){
        status = "VULNERABLE";
        note = "Missing Value";
    } else if (key.includes('SECRET') || key.includes('KEY')) {
        status = "PROTECTED";
        note = "Credential Present";
    }

    return { Key: key, Status: status, Details: note};
});

console.table(auditResults);
console.log("AUDIT COMPLETE, CONFIGURATION VERIFIED");



