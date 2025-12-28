#!/usr/bin/env bash
set -euo pipefail

sudo pacman -S --needed telegram-desktop alacritty ranger fuzzel hypridle wl-clipboard cliphist swww hyprpicker hyprlock waybar playerctl brightnessctl swaync ueberzug bat tmux xclip curl pavucontrol zathura zathura-pdf-mupdf zsh eza nvim starship
sudo pacman -S --needed ttf-jetbrains-mono noto-fonts
sudo pacman -S --needed papirus-icon-theme

if ! command -v yay >/dev/null 2>&1; then
  sudo pacman -S --needed base-devel git
  tmp_dir="$(mktemp -d)"
  git clone https://aur.archlinux.org/yay.git "$tmp_dir/yay"
  (cd "$tmp_dir/yay" && makepkg -si)
  rm -rf "$tmp_dir"
fi

yay -S --needed google-chrome visual-studio-code-insiders-bin grimblast