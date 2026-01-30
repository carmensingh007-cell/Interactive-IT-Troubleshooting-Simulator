// Scenarios Data
const scenarios = {
  'network-connectivity': {
    description: 'User reports no internet access in a MSP environment. Simulate using ConnectWise RMM for monitoring.',
    steps: [
      { text: 'Check physical connections and WiFi signal', correct: true, explanation: 'Always start with basics to rule out simple issues.' },
      { text: 'Verify VPN configuration and reconnect', correct: true, explanation: 'Common in remote MSP setups.' },
      { text: 'Test DNS resolution (e.g., ping 8.8.8.8 vs. google.com)', correct: true, explanation: 'Isolates DNS problems.' },
      { text: 'Escalate to senior without basic checks', correct: false, explanation: 'Premature escalation wastes resources.' }
    ],
    resolution: 'Network issue resolved via basic troubleshooting and DNS fix in ConnectWise RMM.'
  },
  'software-install': {
    description: 'Software fails to install on Windows in Datto environment.',
    steps: [
      { text: 'Check OS compatibility and run as admin', correct: true, explanation: 'Ensures permissions.' },
      { text: 'Clear temp files and retry installation', correct: true, explanation: 'Common cache issue.' },
      { text: 'Use Datto for remote software deployment', correct: true, explanation: 'MSP tool for automation.' },
      { text: 'Ignore logs and reinstall blindly', correct: false, explanation: 'Misses root cause.' }
    ],
    resolution: 'Software installed successfully after maintenance.'
  },
  'hardware-trouble': {
    description: 'Hardware issue requiring remote diagnosis.',
    steps: [
      { text: 'Use remote desktop tools to check hardware status', correct: true, explanation: 'Safe remote access.' },
      { text: 'Run built-in diagnostics (e.g., chkdsk on Windows)', correct: true, explanation: 'Identifies faults.' },
      { text: 'Monitor via ConnectWise RMM', correct: true, explanation: 'Real-time hardware monitoring.' },
      { text: 'Advise user to disassemble without guidance', correct: false, explanation: 'Risky and unprofessional.' }
    ],
    resolution: 'Hardware diagnosed and escalated if needed.'
  },
  'backup-monitor': {
    description: 'Backup failure alert in Datto.',
    steps: [
      { text: 'Check Datto dashboard for error codes', correct: true, explanation: 'Tool-specific monitoring.' },
      { text: 'Verify storage space and connections', correct: true, explanation: 'Common failure point.' },
      { text: 'Test restore point manually', correct: true, explanation: 'Ensures data integrity.' },
      { text: 'Ignore alert as false positive', correct: false, explanation: 'Risks data loss.' }
    ],
    resolution: 'Backup issue resolved with monitoring adjustments.'
  },
  'cloud-access': {
    description: 'Access denied to AWS/Azure resources.',
    steps: [
      { text: 'Verify IAM permissions in AWS console', correct: true, explanation: 'Cloud security check.' },
      { text: 'Check Azure AD for user roles', correct: true, explanation: 'Identity management.' },
      { text: 'Test from different network/VPN', correct: true, explanation: 'Isolates network issues.' },
      { text: 'Reset passwords without verification', correct: false, explanation: 'Security breach risk.' }
    ],
    resolution: 'Cloud access restored via permission fixes.'
  },
  'email-response': {
    description: 'Simulate responding to email support request.',
    steps: [
      { text: 'Acknowledge email promptly and ask for details', correct: true, explanation: 'Builds trust.' },
      { text: 'Document in ticketing system (ConnectWise)', correct: true, explanation: 'Tracks activities.' },
      { text: 'Provide step-by-step guidance', correct: true, explanation: 'Empowers user.' },
      { text: 'Delay response for non-urgent', correct: false, explanation: 'Poor service orientation.' }
    ],
    resolution: 'Email request handled with documentation.'
  },
  'escalation': {
    description: 'Complex ISP wireless issue requiring escalation.',
    steps: [
      { text: 'Perform basic signal checks and reboots', correct: true, explanation: 'Level 1 start.' },
      { text: 'Analyze logs for recurring patterns', correct: true, explanation: 'Incident reporting.' },
      { text: 'Escalate to 2nd/3rd line with detailed notes', correct: true, explanation: 'Collaborative.' },
      { text: 'Attempt advanced fixes without expertise', correct: false, explanation: 'Risks worsening issue.' }
    ],
    resolution: 'Issue escalated successfully in ISP environment.'
  },
  'os-specific': {
    description: 'OS-specific issue on Linux/macOS.',
    steps: [
      { text: 'Check system logs (e.g., journalctl on Linux)', correct: true, explanation: 'Diagnostic tool.' },
      { text: 'Verify permissions and updates', correct: true, explanation: 'Maintenance step.' },
      { text: 'Use terminal commands for troubleshooting', correct: true, explanation: 'OS proficiency.' },
      { text: 'Switch OS without reason', correct: false, explanation: 'Inefficient.' }
    ],
    resolution: 'OS issue resolved with targeted fixes.'
  }
};

// 30 Hard Test Cases for Quiz
const quizQuestions = [
  { question: 'In ConnectWise RMM, how do you handle a silent patch failure on multiple endpoints?', options: ['Ignore if no alerts', 'Run script to force reinstall', 'Escalate immediately', 'Check logs individually'], correct: 1, explanation: 'Scripting automates in MSP.' },
  { question: 'What TCP/IP command diagnoses MTU issues in VPN?', options: ['ping -f -l', 'tracert', 'ipconfig /flushdns', 'netstat -r'], correct: 0, explanation: 'ping with DF bit tests fragmentation.' },
  { question: 'Datto backup fails with error 0x80070070. Root cause?', options: ['Network timeout', 'Insufficient space', 'Permission denied', 'Corrupt file'], correct: 1, explanation: 'Windows error for low disk space.' },
  { question: 'AWS EC2 instance unreachable after security group change. Fix?', options: ['Reboot instance', 'Check inbound rules for SSH/RDP', 'Change AMI', 'Increase EBS volume'], correct: 1, explanation: 'Security groups block traffic.' },
  { question: 'Azure VM slow performance. Advanced troubleshooting?', options: ['Check CPU metrics in portal', 'Restart VM', 'Upgrade SKU', 'Run chkdsk'], correct: 0, explanation: 'Metrics identify bottlenecks.' },
  { question: 'Linux server high load from zombie processes. Command?', options: ['top', 'kill -9', 'ps aux | grep Z', 'free -m'], correct: 2, explanation: 'Identifies zombies.' },
  { question: 'macOS app crash. Where to find crash logs?', options: ['/var/log', '~/Library/Logs', '/etc/logs', 'System Preferences'], correct: 1, explanation: 'User library holds app logs.' },
  { question: 'ISP wireless interference on 2.4GHz. Solution?', options: ['Switch to 5GHz', 'Reboot router', 'Change SSID', 'Update firmware'], correct: 0, explanation: 'Less crowded band.' },
  { question: 'ConnectWise ticket stuck in queue. Automation fix?', options: ['Manual assign', 'Workflow rules', 'Delete ticket', 'Email notify'], correct: 1, explanation: 'Automates routing.' },
  { question: 'Datto restore fails integrity check. Next step?', options: ['Retry restore', 'Boot from recovery ISO', 'Contact vendor', 'Delete backup'], correct: 1, explanation: 'Verifies chain.' },
  { question: 'VPN drops frequently. Check for?', options: ['MTU mismatch', 'IP conflict', 'DNS leak', 'All above'], correct: 3, explanation: 'Multiple factors.' },
  { question: 'Windows BSOD with IRQL_NOT_LESS_OR_EQUAL. Cause?', options: ['Driver issue', 'RAM fault', 'Overheat', 'Virus'], correct: 0, explanation: 'Kernel driver error.' },
  { question: 'Google Cloud VM no SSH. Firewall rule?', options: ['Allow tcp:22', 'Block all', 'Allow udp:53', 'None'], correct: 0, explanation: 'SSH port.' },
  { question: 'MSP client data breach. Incident response?', options: ['Isolate, document, notify', 'Ignore if minor', 'Reboot servers', 'Change passwords only'], correct: 0, explanation: 'Standard IR protocol.' },
  { question: 'High latency in ISP. Use MTR for?', options: ['Packet loss per hop', 'DNS resolve', 'Bandwidth test', 'Ping only'], correct: 0, explanation: 'Combines ping/traceroute.' },
  { question: 'ConnectWise RMM agent offline. Troubleshoot?', options: ['Check firewall ports', 'Reinstall agent', 'Both', 'Ignore'], correct: 2, explanation: 'Ports 80/443 key.' },
  { question: 'Datto SIRIS appliance fan failure. Action?', options: ['Monitor temp', 'Replace hardware', 'Software update', 'Reboot'], correct: 1, explanation: 'Hardware issue.' },
  { question: 'AWS S3 bucket policy denies access. Fix syntax?', options: ['Allow Effect', 'Principal *', 'Both', 'None'], correct: 2, explanation: 'JSON policy details.' },
  { question: 'Linux cron job fails silently. Check?', options: ['/var/log/cron', 'ps -ef', 'top', 'df -h'], correct: 0, explanation: 'Cron logs.' },
  { question: 'macOS Time Machine backup corrupt. Repair?', options: ['tmutil verify', 'Reformat drive', 'Restart', 'Ignore'], correct: 0, explanation: 'Built-in tool.' },
  { question: 'ISP QoS misconfiguration causes VoIP jitter. Adjust?', options: ['Priority queues', 'Bandwidth limit', 'Both', 'None'], correct: 2, explanation: 'Traffic shaping.' },
  { question: 'ConnectWise email connector fails. SMTP issue?', options: ['Port 587 TLS', 'Port 25', 'Both', 'None'], correct: 0, explanation: 'Secure port.' },
  { question: 'Datto offsite replication slow. Optimize?', options: ['Throttle settings', 'Network upgrade', 'Both', 'Compress data'], correct: 2, explanation: 'Multiple optimizations.' },
  { question: 'VPN IPSec tunnel down. Check?', options: ['IKE phases', 'NAT rules', 'Both', 'Routes only'], correct: 2, explanation: 'Phase 1/2.' },
  { question: 'Windows Event Viewer for app errors?', options: ['Application log', 'System log', 'Security', 'All'], correct: 0, explanation: 'App-specific.' },
  { question: 'Azure AD sync errors. Tool?', options: ['IdFix', 'PowerShell', 'Both', 'Portal only'], correct: 2, explanation: 'Directory fixes.' },
  { question: 'Linux iptables blocking port. Command?', options: ['iptables -L', 'ufw status', 'Both', 'netstat'], correct: 2, explanation: 'Firewall checks.' },
  { question: 'macOS kernel panic. Safe mode?', options: ['Shift boot', 'Command-R', 'Both', 'Option boot'], correct: 0, explanation: 'Isolates extensions.' },
  { question: 'ISP BGP peering flap. Reason?', options: ['Route instability', 'Config error', 'Both', 'Hardware'], correct: 2, explanation: 'Routing protocol.' },
  { question: 'ConnectWise API integration fails. Auth?', options: ['API key expiry', 'Permissions', 'Both', 'URL wrong'], correct: 2, explanation: 'Common auth issues.' }
];

// Scenario Selection
const scenarioSelect = document.getElementById('scenario-select');
const stepsDiv = document.getElementById('steps');
const feedback = document.getElementById('feedback');
const log = document.getElementById('log');

scenarioSelect.addEventListener('change', (e) => {
  const selected = e.target.value;
  stepsDiv.innerHTML = '';
  feedback.textContent = '';
  log.innerHTML = ''; // Clear log for new scenario
  if (selected && scenarios[selected]) {
    const descP = document.createElement('p');
    descP.textContent = scenarios[selected].description;
    stepsDiv.appendChild(descP);

    scenarios[selected].steps.forEach((step, index) => {
      const btn = document.createElement('button');
      btn.innerHTML = `<i class="fas fa-chevron-right"></i> ${step.text}`;
      btn.style.setProperty('--order', index); // For staggered animation
      btn.onclick = () => handleStep(selected, index, step.correct, step.explanation);
      stepsDiv.appendChild(btn);
    });
  }
});

function handleStep(scenarioKey, index, isCorrect, explanation) {
  const logEntry = document.createElement('p');
  logEntry.textContent = `Step ${index + 1}: ${scenarios[scenarioKey].steps[index].text} - ${isCorrect ? 'Correct' : 'Incorrect'} (${explanation})`;
  log.appendChild(logEntry);

  feedback.className = isCorrect ? 'feedback' : 'error';
  feedback.textContent = isCorrect ? 'Correct choice! Proceeding...' : 'Incorrect - Consider escalation.';

  // Check if last step
  if (index === scenarios[scenarioKey].steps.length - 1 && isCorrect) {
    const resLog = document.createElement('p');
    resLog.textContent = `Resolution: ${scenarios[scenarioKey].resolution}`;
    log.appendChild(resLog);
  }
}

// Quiz Mode
const startQuizBtn = document.getElementById('start-quiz');
const quizContainer = document.getElementById('quiz-container');

let answeredQuestions = 0;
let correctAnswers = 0;

startQuizBtn.addEventListener('click', () => {
  quizContainer.style.display = 'block';
  quizContainer.innerHTML = `
    <div id="progress-bar-container">
      <div id="progress-bar"></div>
    </div>
    <div id="score">Score: 0 / 30</div>
  `;
  const progressBar = document.getElementById('progress-bar');
  const scoreDisplay = document.getElementById('score');
  answeredQuestions = 0;
  correctAnswers = 0;
  log.innerHTML = ''; // Clear log for quiz
  quizQuestions.forEach((q, qIndex) => {
    const questionDiv = document.createElement('div');
    questionDiv.className = 'quiz-question';
    questionDiv.style.setProperty('--q-order', qIndex); // For staggered animation
    const qP = document.createElement('p');
    qP.textContent = `${qIndex + 1}. ${q.question}`;
    questionDiv.appendChild(qP);

    q.options.forEach((opt, optIndex) => {
      const optBtn = document.createElement('button');
      optBtn.innerHTML = `<i class="fas fa-circle"></i> ${opt}`;
      optBtn.onclick = () => handleQuizAnswer(qIndex, optIndex, q.correct, q.explanation, questionDiv, progressBar, scoreDisplay);
      questionDiv.appendChild(optBtn);
    });

    quizContainer.appendChild(questionDiv);
  });
});

function handleQuizAnswer(qIndex, selectedIndex, correctIndex, explanation, questionDiv, progressBar, scoreDisplay) {
  const buttons = questionDiv.querySelectorAll('button');
  buttons.forEach(btn => {
    btn.classList.add('disabled');
    btn.onclick = null;
  });

  const selectedBtn = buttons[selectedIndex];
  const isCorrect = selectedIndex === correctIndex;
  selectedBtn.classList.add(isCorrect ? 'correct' : 'incorrect');

  // Show correct answer if wrong
  if (!isCorrect) {
    buttons[correctIndex].classList.add('correct');
  }

  const logEntry = document.createElement('p');
  logEntry.textContent = `Question ${qIndex + 1}: Selected "${quizQuestions[qIndex].options[selectedIndex]}" - ${isCorrect ? 'Correct' : 'Incorrect'} (${explanation})`;
  log.appendChild(logEntry);

  feedback.className = isCorrect ? 'feedback' : 'error';
  feedback.textContent = isCorrect ? 'Correct!' : 'Incorrect - Review explanation in log.';

  answeredQuestions++;
  if (isCorrect) correctAnswers++;

  // Update progress
  const progressPercentage = (answeredQuestions / quizQuestions.length) * 100;
  progressBar.style.width = `${progressPercentage}%`;

  // Update score
  scoreDisplay.textContent = `Score: ${correctAnswers} / 30`;
  scoreDisplay.classList.add('updated');
  setTimeout(() => scoreDisplay.classList.remove('updated'), 500);
}
