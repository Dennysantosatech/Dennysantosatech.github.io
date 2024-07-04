const simpleGit = require('simple-git');
const git = simpleGit();
const fs = require('fs');
const path = require('path');

const startDate = new Date('2024-01-06');
const endDate = new Date('2024-06-30');
const commitMessage = 'initial commit';
const maxCommitsPerDay = 3;
const minCommitsPerDay = 0;
const minDaysPerWeek = 0;
const maxDaysPerWeek = 3;

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const isWeekend = (date) => date.getDay() === 0 || date.getDay() === 6;

const makeCommits = async () => {
  let currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    if (!isWeekend(currentDate)) {
      const commitDaysThisWeek = randomInt(minDaysPerWeek, maxDaysPerWeek);
      for (let i = 0; i < commitDaysThisWeek && currentDate <= endDate; i++) {
        if (isWeekend(currentDate)) {
          currentDate.setDate(currentDate.getDate() + 1);
          continue;
        }
        const commitsToday = randomInt(minCommitsPerDay, maxCommitsPerDay);
        for (let j = 0; j < commitsToday; j++) {
          const filePath = path.join(__dirname, 'file.txt');
          fs.writeFileSync(filePath, `${commitMessage} ${currentDate}`);
          await git.add(filePath);
          await git.commit(commitMessage, filePath, { '--date': currentDate.toISOString() });
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
    } else {
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }
};

makeCommits()
  .then(() => console.log('Fake commits generated successfully.'))
    .catch((err) => console.error('Error generating fake commits:', err));
  
    