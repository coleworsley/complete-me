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
    this.counter++
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
      array.unshift({ word: str, frequency: startingNode.frequency });
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
          arr.push({ word: newStr, frequency: childNode.frequency });
        }
        arr = suggestHelper(newStr, childNode, arr);
      });
      return arr;
    }

    array = this.sortSuggestions([...array, ...suggestHelper(str, startingNode)]);
    return array;
  }

  sortSuggestions(objArray) {
    return objArray.sort((a, b) => {
      return  b.frequency - a.frequency;
    }).reduce((acc, wordObj) => {
      acc.push(wordObj.word);
      return acc;
    }, []);

      // return objArray.reduce((acc, wordObj) => {
      //   acc.push(wordObj.word);
      //   return acc;
      // }, []);

    // objArray.reduce((acc, word) => {
    //   acc.push(word);
    //   return acc;
    // }, []);
  }


  populate(arr) {
    if (!(arr instanceof Array)) {
      return "Not an array";
    }

    arr.forEach(word => {
      this.insert(word);
    })
  }

  select(word) {
    let currentNode = this.root;

    [...word.toLowerCase()].forEach(letter => {
      currentNode = currentNode.children[letter];
    });

    if (currentNode.isWord) {
      currentNode.frequency++;
    }
  }
}
