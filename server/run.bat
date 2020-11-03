@Rem 运行build好的项目，然后打开浏览器
@echo off

start node app.js

@Rem 修改浏览器位置
cd C:\Program Files (x86)\Google\Chrome\Application

start chrome.exe http://localhost:3000

echo start node app.js