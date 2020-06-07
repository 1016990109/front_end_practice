//最大堆、最小堆
class MaxPQ {
  constructor(n) {
    // 存储元素的数组
    //索引0不用，多分配一个空间
    this.pq = new Array(n + 1);
    // 当前 Priority Queue 中的元素个数
    this.N = 0;
  }

  /* 返回当前队列中最大元素 */
  max() {
    return this.pq[1];
  }

  /* 插入元素 e */
  insert(e) {
    this.N++
    this.pq[this.N] = e
    this.swim(this.N)
  }

  /* 删除并返回当前队列中最大元素 */
  delMax() {
    //置换根元素和最后一个元素，并下沉
    this.exch(this.N, 1)
    this.pq[this.N] = undefined
    this.N--
    this.sink(1)
  }

  /* 上浮第 k 个元素，以维护最大堆性质 */
  swim(k) {
    //父节点比当前节点小，不满足最大堆性质，上浮
    if (k > 1 && this.less(this.parent(k), k)) {
      this.exch(k, this.parent(k));
      this.swim(this.parent(k));
    }
  }

  /* 下沉第 k 个元素，以维护最大堆性质 */
  sink(k) {
    //当前节点比左节点小，需要往左下沉
    if (this.left(k) < this.pq.length && this.less(k, this.left(k))) {
      this.exch(k, this.left(k));
      this.sink(this.left(k))
      return
    }

    if (this.right(k) < this.pq.length && this.less(k, this.right(k))) {
      this.exch(k, this.right(k))
      this.sink(this.right(k))
      return
    }
  }

  /* 交换数组的两个元素 */
  exch(i, j) {
    let temp = this.pq[i];
    this.pq[i] = this.pq[j];
    this.pq[j] = temp;
  }

  /* pq[i] 是否比 pq[j] 小？ */
  less(i, j) {
    return this.pq[i] < this.pq[j];
  }

  /* 还有 left, right, parent 三个方法 */
  // 父节点的索引
  parent(root) {
    return Number.parseInt(root / 2);
  }
  // 左孩子的索引
  left(root) {
    return root * 2;
  }
  // 右孩子的索引
  right(root) {
    return root * 2 + 1;
  }

  print() {
    console.log(this.pq)
    let root = 1
    const getAndPrintChildren = (k) => {
      if (k > this.N) {
        return []
      }
      console.log(this.pq[this.left(k)], '|', this.pq[this.right(k)])
      return [this.left(k), this.right(k)]
    }

    const printRoot = (...args) => {
      if (!args.length) {
        return
      }

      let newArgs = []
      for(let i =0; i < args.length; i++) {
        newArgs = newArgs.concat(getAndPrintChildren(args[i]))
      }
      printRoot(...newArgs)
    }

    printRoot(root)
  }
}

let mq = new MaxPQ(10);
mq.insert('A')
mq.insert('B')
mq.insert('C')
mq.insert('D')
mq.insert('E')
mq.insert('F')
mq.insert('G')
mq.insert('H')

mq.print()
mq.delMax()


mq.print()
