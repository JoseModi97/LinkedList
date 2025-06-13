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

  remove(value) {
    let current = this.head;
    while (current && current.value !== value) {
      current = current.next;
    }
    if (!current) return false;
    if (current.prev) {
      current.prev.next = current.next;
    } else {
      this.head = current.next;
    }
    if (current.next) {
      current.next.prev = current.prev;
    } else {
      this.tail = current.prev;
    }
    return true;
  }

  clear() {
    this.head = this.tail = null;
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

  function updateDisplay() {
    const arr = list.toArray();
    const $ul = $('#listDisplay');
    $ul.empty();
    if (arr.length === 0) {
      $('#listInfo').text('List is empty.');
      return;
    }
    arr.forEach(v => {
      const $li = $('<li class="list-group-item d-flex justify-content-between align-items-center"></li>');
      $li.append(`<span>${v}</span>`);
      const $btn = $('<button class="btn btn-sm btn-outline-danger remove-item">Remove</button>');
      $btn.data('value', v);
      $li.append($btn);
      if (v === list.getMin()) $li.addClass('min-item');
      if (v === list.getMax()) $li.addClass('max-item');
      $ul.append($li);
    });
    $('#listInfo').text(`Min: ${list.getMin()} Max: ${list.getMax()}`);
  }

  $('#insertBtn').on('click', function() {
    const val = parseInt($('#valueInput').val(), 10);
    if (!isNaN(val)) {
      list.insert(val);
      $('#valueInput').val('');
      updateDisplay();
    }
  });

  $('#extractMinBtn').on('click', function() {
    const val = list.extractMin();
    if (val !== null) {
      alert('Extracted min: ' + val);
      updateDisplay();
    }
  });

  $('#extractMaxBtn').on('click', function() {
    const val = list.extractMax();
    if (val !== null) {
      alert('Extracted max: ' + val);
      updateDisplay();
    }
  });

  $('#clearBtn').on('click', function() {
    list.clear();
    updateDisplay();
  });

  $('#listDisplay').on('click', '.remove-item', function() {
    const val = $(this).data('value');
    list.remove(val);
    updateDisplay();
  });

  // initial render
  updateDisplay();
});
