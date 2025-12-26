const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Пути к файлам
const envFile = path.join(__dirname, '..', '.env.local1');
const envLocalFile = path.join(__dirname, '..', '.env.local');
const envLocalBackup = path.join(__dirname, '..', '.env.local.backup');

// Проверяем существование .env.local1
if (!fs.existsSync(envFile)) {
  console.error('Error: .env.local1 file not found');
  process.exit(1);
}

// Сохраняем оригинальный .env.local если он существует
if (fs.existsSync(envLocalFile)) {
  fs.copyFileSync(envLocalFile, envLocalBackup);
  console.log('Backed up .env.local to .env.local.backup');
}

// Копируем .env.local1 в .env.local
fs.copyFileSync(envFile, envLocalFile);
console.log('Using .env.local1 as .env.local');

// Обработчик завершения процесса для восстановления файла
const cleanup = () => {
  if (fs.existsSync(envLocalBackup)) {
    fs.copyFileSync(envLocalBackup, envLocalFile);
    fs.unlinkSync(envLocalBackup);
    console.log('Restored original .env.local');
  } else if (fs.existsSync(envLocalFile)) {
    fs.unlinkSync(envLocalFile);
  }
};

process.on('SIGINT', () => {
  cleanup();
  process.exit(0);
});

process.on('SIGTERM', () => {
  cleanup();
  process.exit(0);
});

process.on('exit', cleanup);

// Запускаем Next.js dev сервер
const nextDev = spawn('npx', ['next', 'dev', '--turbopack', '-p', '8000'], {
  stdio: 'inherit',
  shell: true
});

nextDev.on('close', (code) => {
  cleanup();
  process.exit(code);
});

nextDev.on('error', (err) => {
  console.error('Failed to start Next.js:', err);
  cleanup();
  process.exit(1);
});

