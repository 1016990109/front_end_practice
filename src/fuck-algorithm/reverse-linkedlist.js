//递归反转链表
function reverse(head) {
  if (!head.next) {
    return head;
  }

  let last = reverse(head.next);
  head.next.next = head;
  head.next = null;
  return last;
}

//反转前n个节点,n=size时等于反转整个链表
let tmp;
function reverseN(head, n) {
  //先反转后n-1个节点，并记录最后一个元素的下个节点（这个节点将会是head需要指向的节点）
  if (n === 1) {
    tmp = head.next;
    return head;
  }

  let last = reverseN(head.next, n - 1);
  head.next.next = head;
  head.next = tmp;
  return last;
}

//反转m-n区间的节点，1视为开头
function reverseBetween(head, m, n) {
  //那么m=1时，就等于reverseN
  if (m === 1) {
    return reverseN(head, m);
  }

  let newHead = head;
  //因为m=2时，循环1次，所以i从1计数
  for (let i = 1; i < m; i++) {
    newHead = newHead.next;
  }

  newHead.next = reverseN(newHead, 1, n);
  return head;
}
