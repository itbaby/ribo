Install-Module -Name Terminal-Icons -Scope CurrentUser -Force
Install-Module -Name posh-git -Scope CurrentUser -Force
Install-Module -Name PSReadLine -Scope CurrentUser -Force
Install-Module -Name ZLocation -Scope CurrentUser -Force

#notepad $PROFILE

# 初始化 oh-my-posh（可替换主题名）
oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH/jandedobbeleer.omp.json" | Invoke-Expression

# 引入模块
Import-Module Terminal-Icons
Import-Module posh-git
Import-Module ZLocation
Import-Module PSReadLine

# 设置 PSReadLine
Set-PSReadLineOption -PredictionSource History
Set-PSReadLineOption -PredictionViewStyle ListView
Set-PSReadLineKeyHandler -Key Tab -Function MenuComplete
Set-PSReadLineKeyHandler -Key UpArrow -Function HistorySearchBackward
Set-PSReadLineKeyHandler -Key DownArrow -Function HistorySearchForward

功能	工具/模块	说明	
主题提示符	Oh-My-Posh	提供 Git 状态、路径、执行时间等丰富信息	
图标支持	Terminal-Icons	为文件/目录添加图标	
语法高亮 & 自动补全	PSReadLine	类似 zsh 的历史预测、Tab 补全	
Git 状态提示	posh-git	Git 分支、状态、自动补全	
快速跳转目录	ZLocation	类似 autojump 或 zsh-z	
字体支持	Nerd Fonts（如 MesloLGM NF）	显示图标不方块	
