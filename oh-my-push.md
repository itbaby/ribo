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

