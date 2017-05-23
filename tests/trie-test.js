import { expect } from 'chai';
import Node from '../scripts/node'
import Trie from '../scripts/trie'

describe('Trie Test', () => {
  let mapleTrie;

  beforeEach(() => {
    mapleTrie = new Trie();
  });

  it('should create a new instance of a trie', () => {
    expect(mapleTrie).to.be.instanceof(Trie);
  });

  describe('Insert Function', () => {
    it('should insert a letter into the trie', () => {
      mapleTrie.insert('h');

      expect(mapleTrie.root.children.h.letter).to.equal('h');

      mapleTrie.insert('i');

      expect(mapleTrie.root.children.i.letter).to.equal('i');
    });

    it('should insert a word into the trie', () => {
      mapleTrie.insert('Hi');

      expect(mapleTrie.root.children.h.letter).to.equal('h');
      expect(mapleTrie.root.children.h.children.i.letter).to.equal('i');

      mapleTrie.insert('Hippie');

      expect(mapleTrie.root.children.
        h.children.
        i.children.
        p.children.
        p.children.
        i.children.
        e.isWord).to.equal(true);

      expect(mapleTrie.root.children.
        h.children.
        i.isWord).to.equal(true);
      });
  });

  describe('Count Function', () => {
    it('should return 0 if there is nothing to count', () => {
      expect(mapleTrie.count()).to.equal(0);
    });

    it('should count the number of complete words in the trie', () => {
      expect(mapleTrie.count()).to.equal(0);

      mapleTrie.insert('Hi');
      mapleTrie.insert('Hill');

      expect(mapleTrie.count()).to.equal(2);

      mapleTrie.insert('Something');
      mapleTrie.insert('Person');
      mapleTrie.insert('someone');

      expect(mapleTrie.count()).to.equal(5);
    });
  });

  describe('Suggest Function', () => {
    it('should return itself if there is nothing to suggest', () => {
      const newTrie = new Trie()

      expect(newTrie.suggest('hi')).to.deep.equal(['hi']);
    });

    beforeEach(() => {
      mapleTrie.insert('Hi');
      mapleTrie.insert('Hill');
      mapleTrie.insert('Hike');
      mapleTrie.insert('Hiker');
    });

    it('should return a suggestion based on the input', () => {
      expect(mapleTrie.suggest('hi')).to.deep.equal(['hi', 'hill', 'hike', 'hiker']);
    });
  });

});


const loopThroughNodes = (str) => {

}
