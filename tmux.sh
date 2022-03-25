#!/bin/bash

function newWindow() {
  TARGET=$(tmux new-window -P)
}

function splitHorizontally() {
  TARGET=$(tmux split-window -P -v -p ${1:-50} -t ${TARGET})
}

function splitVertically() {
  TARGET=$(tmux split-window -P -h -p ${1:-50} -t ${TARGET})
}

function run() {
  tmux send-keys -t ${TARGET} "$1" C-m
}

if [[ $TMUX ]]; then

  tmux bind q kill-session

  newWindow

  run "yarn run watch:po"

  splitHorizontally 80

  run "yarn run watch"

  splitVertically 50

  run "yarn run watch:storybook";

else
  tmux new-session $0;
fi
