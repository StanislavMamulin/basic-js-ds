const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  #root = null;

  root() {
    return this.#root;
  }

  add(data) {
    this.#root = addWithin(this.#root, data);

    function addWithin(node, data) {
      if (!node) {
        return new Node(data);
      }

      if (node.data === data) {
        return node;
      }

      if (data < node.data) {
        node.left = addWithin(node.left, data);
      } else {
        node.right = addWithin(node.right, data);
      }

      return node;
    }
  }

  has(data) {
    const hasData = searchInNode(this.#root, data);

    function searchInNode(node, data) {
      if (!node) {
        return false;
      }

      if (node.data === data) {
        return true;
      }

      return data < node.data ?
        searchInNode(node.left, data) :
        searchInNode(node.right, data);
    }

    return hasData;
  }

  find(data) {
    const node = searchInNode(this.#root, data);

    function searchInNode(node, data) {
      let findedNode = null;
      if (!node) {
        return null;
      }
      if (node.data === data) {
        return node;
      }

      if (data < node.data) {
        findedNode = searchInNode(node.left, data);
      } else {
        findedNode = searchInNode(node.right, data);
      }

      return findedNode;
    }

    return node;
  }

  remove(data) {
    this.#root = removeNode(this.#root, data);

    function removeNode(node, data) {
      if (!node) {
        return null;
      }

      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }

        if (!node.left) {
          node = node.right;
          return node;
        }

        if (!node.right) {
          node = node.left;
          return node;
        }

        let minFromRight = node.right;
        while(minFromRight.left) {
          minFromRight = minFromRight.left;
        }

        node.data = minFromRight.data;

        node.right = removeNode(node.right, minFromRight.data);

        return node;
      }
    }
  }

  min() {
    if (!this.#root) {
      return;
    }

    let node = this.#root;
    while (node.left) {
      node = node.left;
    }

    return node.data;
  }

  max() {
    if (!this.#root) {
      return;
    }

    let node = this.#root;
    while (node.right) {
      node = node.right;
    }

    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};