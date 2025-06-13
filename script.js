// Doubly linked list node for min/max operations
class Node {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

// List supporting O(1) insert, getMin, getMax, extractMin, extractMax
class MinMaxList {
  constructor() {
    this.head = null; // smallest element
    this.tail = null; // largest element
  }

  insert(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = this.tail = newNode;
      return;
    }
    // Insert in sorted order
    let current = this.head;
    while (current && current.value < value) {
      current = current.next;
    }
    if (!current) { // insert at end
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    } else if (!current.prev) { // insert at beginning
      newNode.next = current;
      current.prev = newNode;
      this.head = newNode;
    } else {
      newNode.next = current;
      newNode.prev = current.prev;
      current.prev.next = newNode;
      current.prev = newNode;
    }
  }

  getMin() {
    return this.head ? this.head.value : null;
  }

  getMax() {
    return this.tail ? this.tail.value : null;
  }

  extractMin() {
    if (!this.head) return null;
    const value = this.head.value;
    if (this.head === this.tail) {
      this.head = this.tail = null;
    } else {
      this.head = this.head.next;
      this.head.prev = null;
    }
    return value;
  }

  extractMax() {
    if (!this.tail) return null;
    const value = this.tail.value;
    if (this.head === this.tail) {
      this.head = this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }
    return value;
  }

  toArray() {
    const arr = [];
    let current = this.head;
    while (current) {
      arr.push(current.value);
      current = current.next;
    }
    return arr;
  }
}

// UI Logic with jQuery
$(function() {
  const list = new MinMaxList();

  function updateInfo() {
    const arr = list.toArray();
    if (arr.length === 0) {
      $('#listInfo').text('List is empty.');
    } else {
      $('#listInfo').html(`List: [${arr.join(', ')}] <br>Min: ${list.getMin()} Max: ${list.getMax()}`);
    }
  }

  $('#insertBtn').on('click', function() {
    const val = parseInt($('#valueInput').val(), 10);
    if (!isNaN(val)) {
      list.insert(val);
      $('#valueInput').val('');
      updateInfo();
    }
  });

  $('#extractMinBtn').on('click', function() {
    const val = list.extractMin();
    if (val !== null) {
      alert('Extracted min: ' + val);
      updateInfo();
    }
  });

  $('#extractMaxBtn').on('click', function() {
    const val = list.extractMax();
    if (val !== null) {
      alert('Extracted max: ' + val);
      updateInfo();
    }
  });
});
