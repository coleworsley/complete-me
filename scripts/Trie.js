import Node from './Node.js';

export default class Trie {
  constructor() {
    this.root = new Node();
  }

  insert(word) {
    let currentNode = this.root;

    [...word.toLowerCase()].forEach((letter) => {
      if(!currentNode.children[letter]) {
        currentNode.children[letter] = new Node(letter);
      }
      currentNode = currentNode.children[letter];
    });

    currentNode.isWord = true;
  }

  count(currentNode = this.root.children, counter = 0) {
    if (!currentNode) return 0;

    let keys = Object.keys(currentNode);

    keys.forEach((key) => {
      if (currentNode[key].isWord) {
        counter++;
      }
      counter = this.count(currentNode[key].children, counter);
    });
    return counter;
  }

  suggest(str) {
    let currentNode = this.root;
    let arr = [str];

    [...str.toLowerCase()].forEach(letter => {
      if(!currentNode.children[letter]) {
        return;
      }
      currentNode = currentNode.children[letter];
    });

    // current node is now starting point
    

    return arr;
  }
}
