(function () {
  'use strict';

  function Heap() {
    this.heap = new Array(0);
  }

  Heap.prototype.get = function () {
    return this.heap[0];
  }

  Heap.prototype.getLength = function () {
    return this.heap.length;
  }

  Heap.prototype.isEmpty = function () {
    return this.getLength() <= 0
  }

  Heap.prototype.toArray = function () {
    return this.heap;
  }

  Heap.prototype.getParentPos = function (pos) {
    return Math.floor((pos - 1) / 2);
  }

  Heap.prototype.swap = function (a, b) {
    var temp = this.heap[a];
    this.heap[a] = this.heap[b];
    this.heap[b] = temp;
  }

  Heap.prototype.push = function (a) {
    // get position of new item
    var pos = this.getLength();

    // push new item into heap
    this.heap.push(a);

    while (pos !== 0) {
      //get parent position
      var parentPos = this.getParentPos(pos);
      // check if new item is better than parent
      if (this.heap[pos].f <= this.heap[parentPos].f) {
        // swap places
        this.swap(parentPos, pos);
        // set new position in heap
        pos = parentPos;
      } else {
        // leave on current position
        return this.heap;
      }
    }
  }

  Heap.prototype.shift = function () {
    var v = 0;

    this.heap[v] = this.heap.pop(this.getLength());

    while (true) {
      // u - curent position
      // v - new position
      var u = v;

      // If both children exist
      if ((2 * u + 2) < this.getLength()) {
        // select better children
        if (this.heap[u].f >= this.heap[2 * u + 1].f) {
          v = 2 * u + 1;
        } // choose if better than parent
        if (this.heap[v].f >= this.heap[2 * u + 2].f) {
          v = 2 * u + 2;
        } // choose if better than parent and brother
      } else if ((2 * u + 1) < this.getLength()) { // Check if one child exist
        if (this.heap[u].f >= this.heap[2 * u + 1].f) {
          v = 2 * u + 1;
        } // choose if better than parent
      }

      // if new position found
      if (u !== v) {
        // swap
        this.swap(u, v);
      } else {
        return this.heap;
      }
    }
  }

  Heap.prototype.replace = function (pos, node) {
    this.heap[pos] = node;

    while (pos !== 0) {
      //get parent position
      var parentPos = this.getParentPos(pos);
      // check if new item is better than parent
      if (this.heap[pos].f <= this.heap[parentPos].f) {
        // swap places
        this.swap(parentPos, pos);
        pos = parentPos;
      } else {
        // leave on current position
        return this.heap;
      }
    }
  }

  window.Heap = Heap;
})();
