import Node from './Node.js';

export default class Trie {
  constructor() {
    this.root = new Node();
  }

  insert(word) {
    let currentNode = this.root;

    [...word.toLowerCase()].forEach((letter) => {
      if (!currentNode.children[letter]) {
        currentNode.children[letter] = new Node(letter);
      }
      currentNode = currentNode.children[letter];
    });

    currentNode.isWord = true;
  }

  count(currentNode = this.root.children, counter = 0) {
    if (!currentNode) {
      return 0;
    }

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
    let arr = [];

    [...str.toLowerCase()].forEach(letter => {
      if (!currentNode[letter]) {
        return;
      }

      currentNode = currentNode[letter].children;
    });

    return this.suggestHelper(currentNode, str, arr);
  }

  suggestHelper(currentNode, str, arr) {
    if (!currentNode) {
      return arr;
    }

    let keys = Object.keys(currentNode);

    keys.forEach(key => {
      str += currentNode[key].letter;
      if (currentNode[key].isWord) {
        arr.push(str);
      }
      arr = this.suggestHelper(currentNode[key].children, str, arr);
    })

    return arr;
  }
}



// console.log('key = ', key);
// console.log('currentNode = ', currentNode);
// console.log('---------');
// console.log('builtStr = ', builtStr);
// console.log('=========');
