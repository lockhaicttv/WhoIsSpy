const fs = require('fs');
const path = require('path');
const https = require('https');

const screens = [
  { title: "Victory - Spy Wins", url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzJhMmUwZjc2NGUwNTQ2NzhiMWJlNTU0YWI3NTkxODBlEgsSBxDQm7z_0gcYAZIBIwoKcHJvamVjdF9pZBIVQhM1NDQyOTI5NTMxMDcyMzYyNDY2&filename=&opi=89354086" },
  { title: "Role Distribution", url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2Y3ODI1MTA5MDQ4MDQzY2RhNTljNGRlNjgyNDBiMjc5EgsSBxDQm7z_0gcYAZIBIwoKcHJvamVjdF9pZBIVQhM1NDQyOTI5NTMxMDcyMzYyNDY2&filename=&opi=89354086" },
  { title: "Home Screen", url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2RkY2JiYzBmMzg3YzQ4MTBiODE1MjllMWUzYWNhODk1EgsSBxDQm7z_0gcYAZIBIwoKcHJvamVjdF9pZBIVQhM1NDQyOTI5NTMxMDcyMzYyNDY2&filename=&opi=89354086" },
  { title: "Victory - Civilians Win", url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2EwZGVmNGE1NzI5NDRlYzVhNTVhYmRmZjliZGEwYTE1EgsSBxDQm7z_0gcYAZIBIwoKcHJvamVjdF9pZBIVQhM1NDQyOTI5NTMxMDcyMzYyNDY2&filename=&opi=89354086" },
  { title: "Manage Groups", url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzMyNDA3MGQ5YzFhZTRjNjA5MmNiZmNjY2E0YmY5Y2IxEgsSBxDQm7z_0gcYAZIBIwoKcHJvamVjdF9pZBIVQhM1NDQyOTI5NTMxMDcyMzYyNDY2&filename=&opi=89354086" },
  { title: "Import Keywords", url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2FlZmU4NzFiNmIzNjRkMTc4NjY2YjhkNTA0OGE3M2UwEgsSBxDQm7z_0gcYAZIBIwoKcHJvamVjdF9pZBIVQhM1NDQyOTI5NTMxMDcyMzYyNDY2&filename=&opi=89354086" },
  { title: "Role Reveal", url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzc2MzliZGNhZWNjODRlNDVhNmYwMWQ1NDEyMTA3ZjcwEgsSBxDQm7z_0gcYAZIBIwoKcHJvamVjdF9pZBIVQhM1NDQyOTI5NTMxMDcyMzYyNDY2&filename=&opi=89354086" },
  { title: "Discussion & Voting", url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2QzMGQwZGJjMWM5NjQxMDliOTFlNzY5NjJhZThhOWM0EgsSBxDQm7z_0gcYAZIBIwoKcHJvamVjdF9pZBIVQhM1NDQyOTI5NTMxMDcyMzYyNDY2&filename=&opi=89354086" },
  { title: "Who Is Spy - Mobile Game Flow", url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2U2NTFlMjFjNjYxNDQ4N2Y5ZDU0YTkyNjhjN2JkY2YxEgsSBxDQm7z_0gcYAZIBIwoKcHJvamVjdF9pZBIVQhM1NDQyOTI5NTMxMDcyMzYyNDY2&filename=&opi=89354086" }
];

const dir = path.join(__dirname, 'raw-screens');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
};

async function run() {
  for (const screen of screens) {
    const filename = screen.title.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.html';
    const filepath = path.join(dir, filename);
    await download(screen.url, filepath);
    console.log(`Downloaded ${filename}`);
  }
}

run().catch(console.error);
