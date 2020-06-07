//LRU（Least Recently Used）
//哈希链表，双向链表和哈希的结合

class Node {
  constructor(key, val) {
    this.key = key;
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}

class DoubleList {
  constructor() {
    this.size = 0;
    this.header = new Node();
    this.tail = new Node();
    this.header.next = this.tail;
    this.tail.prev = this.header;
  }
  // 在链表头部添加节点 x，时间 O(1)
  addFirst(x) {
    let tmp = this.header.next;
    this.header.next = x;
    x.next = tmp;
    tmp.prev = x;
    x.prev = this.header;
    this.size++;
  }

  // 删除链表中的 x 节点（x 一定存在）
  // 由于是双链表且给的是目标 Node 节点，时间 O(1)
  remove(x) {
    x.next.prev = x.prev;
    x.prev.next = x.next;
    this.size--;
    return x;
  }

  // 删除链表中最后一个节点，并返回该节点，时间 O(1)
  removeLast() {
    if (this.size > 0) {
      return this.remove(this.tail.prev);
    }
  }

  // 返回链表长度，时间 O(1)
  size() {
    return this.size;
  }
}

class LRU {
  constructor(cap) {
    this.map = new Map();
    this.cache = new DoubleList();
    this.cap = cap;
  }

  get(k) {
    let node = this.map.get(k);
    if (!node) {
      return;
    }

    this.cache.remove(node);
    this.cache.addFirst(node);
    return node.val;
  }

  put(key, val) {
    let node = this.map.get(key);

    if (node) {
      //删除&提到最前
      this.cache.remove(node);
      node.val = val;
      this.cache.addFirst(node);
    } else {
      //不存在则重新添加
      let newNode = new Node(key, val);
      if (this.cap === this.cache.size) {
        //满了需要删除最近最少用的，也就是末尾
        //并从map中删除
        let deleteNode = this.cache.removeLast();
        this.map.delete(deleteNode.key);
      }
      this.map.set(key, newNode);
      this.cache.addFirst(newNode);
    }
  }

  print() {
    console.log("-------LRU------");
    let head = this.cache.header;
    while (head.next !== this.cache.tail) {
      console.log(head.next.key, head.next.val);
      head = head.next;
    }
    console.log("-------LRU END------");
    console.log()
  }
}

let lru = new LRU(4);
lru.put("1", "A");
lru.print();
lru.put("2", "B");
lru.print();
lru.put("3", "C");
lru.print();
lru.put("2", "B1");
lru.print();
lru.get("3");
lru.print();
lru.get("1");
lru.print();
lru.put("4", "D");
lru.print();
lru.put("2", "B2");
lru.print();
lru.put("5", "E");
lru.print();
