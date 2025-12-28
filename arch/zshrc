HISTSIZE=10000
SAVEHIST=10000
HISTFILE=~/.zsh_history

setopt HIST_IGNORE_DUPS
setopt HIST_FIND_NO_DUPS
setopt SHARE_HISTORY
setopt correct
setopt autocd

bindkey "^[[1;5A" history-beginning-search-backward

autoload -Uz compinit && compinit

alias ls='eza --icons always'
# alias cat='bat'
alias v='nvim'

export PATH="$HOME/.local/bin:$PATH"
export EDITOR="nvim"

eval "$(starship init zsh)"
