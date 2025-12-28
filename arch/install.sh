#!/bin/bash

# Каталог с dotfiles (скрипт запускается из этого каталога)
DOTFILES_DIR=$(pwd)
CONFIG_DIR=".config"
BACKUP_SUFFIX=".bak"

# Список файлов конфигурации в папке .config
mapfile -t CONFIG_FILES < <(ls "$CONFIG_DIR")

mkdir -p "$HOME/.config"

for config in "${CONFIG_FILES[@]}"; do
    SOURCE_PATH="$DOTFILES_DIR/$CONFIG_DIR/$config"
    DEST_PATH="$HOME/$CONFIG_DIR/$config"

    if [ -e "$DEST_PATH" ] || [ -L "$DEST_PATH" ]; then
        echo "Сохраняю резервную копию $DEST_PATH -> $DEST_PATH$BACKUP_SUFFIX"
        mv "$DEST_PATH" "$DEST_PATH$BACKUP_SUFFIX"
    fi

    echo "Копирую $config"
    cp -r "$SOURCE_PATH" "$DEST_PATH"
done

ZSHRC_SOURCE="$DOTFILES_DIR/.zshrc"
ZSHRC_DEST="$HOME/.zshrc"

if [ -e "$ZSHRC_DEST" ] || [ -L "$ZSHRC_DEST" ]; then
    echo "Сохраняю резервную копию $ZSHRC_DEST -> $ZSHRC_DEST$BACKUP_SUFFIX"
    mv "$ZSHRC_DEST" "$ZSHRC_DEST$BACKUP_SUFFIX"
fi

echo "Копирую .zshrc"
cp "$ZSHRC_SOURCE" "$ZSHRC_DEST"



