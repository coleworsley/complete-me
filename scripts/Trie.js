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

  suggest(str) {
    let array = [];
    let startingNode = this.root;

    [...str.toLowerCase()].forEach(letter => {
      if (!startingNode.children[letter]) {
        return;
      }

      startingNode = startingNode.children[letter];
    });

    if (startingNode.isWord) {
      array.unshift(str);
    }

    const suggestHelper = (str, node, arr = []) => {
      if (!node.children) {
        return arr;
      }

      let letters = Object.keys(node.children)

      letters.forEach(letter => {
        let childNode = node.children[letter];
        let newStr = str + childNode.letter;

        if (childNode.isWord) {
          arr.push(newStr);
        }

        arr = suggestHelper(newStr, childNode, arr);
      });

      return arr;
    }

    array = [...array, ...suggestHelper(str, startingNode)];
    return array;
  }

  populate(arr) {
    if (!(arr instanceof Array)) {
      return "Not an array";
    }

    arr.forEach(word => {
      this.insert(word);
    })
  }
}
