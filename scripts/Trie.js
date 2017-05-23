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

  count(currentNode = this.root, counter = 0) {
    let keys = Object.keys(currentNode.children);

    console.log(currentNode)
    console.log(currentNode.children)
    keys.forEach((key) => {
      if (currentNode.isWord) counter++;
      this.count(currentNode.children[key], counter);
    })
    if (currentNode.children <= 0) return counter;
    return counter;
  }
}
