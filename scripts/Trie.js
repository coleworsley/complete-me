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

    keys.forEach(key => {
      if (currentNode[key].isWord) {
        counter++;
      }
      counter = this.count(currentNode[key].children, counter);
    });
    return counter;
  }

  suggest(str, currentNode = this.root.children) {
    [...str.toLowerCase()].forEach(letter => {
      if(!currentNode[letter]) return;
      currentNode = currentNode[letter].children;
    });

    // current node is now starting point
    return this.suggestHelper(currentNode, str);
  }

  suggestHelper(currentNode, builtStr, arr = []) {
    if (!currentNode) return arr;

    let keys = Object.keys(currentNode);

    keys.forEach(key => {
      builtStr += key;
      console.log('currentNode = ',currentNode);
      console.log('---------');
      console.log('builtStr = ',builtStr);
      console.log('=========');
      if (currentNode[key].isWord) {
        arr.push(builtStr);
      }
      arr = this.suggestHelper(currentNode[key].children, builtStr, arr);
    })

    return arr;
  }
}
