//在s中找到包含所有t字符的最小子串
function slideWindow(s, t) {
  let left = 0,
    right = 0;
  let needs = {},
    window = {};
  let valid = 0; //判断是否满足条件
  let len = Number.MAX_SAFE_INTEGER;
  let start = 0;

  //初始化需要的字符个数
  for (let i = 0; i < t.length; i++) {
    needs[t.charAt(i)] = 1;
    window[t.charAt(i)] = 0;
  }

  while (right < s.length) {
    //窗口右滑
    const c = s.charAt(right);
    right++;

    if (t.includes(c)) {
      window[c]++;
      if (needs[c] === window[c]) {
        valid++;
      }
    }

    while (left < right && valid === t.length) {
      if (valid === t.length) {
        //找到满足要求的子串
        if (right - left < len) {
          len = right - left;
          start = left;
        }
      }
      //窗口向左滑动
      const d = s.charAt(left);
      left++;

      if (t.includes(d)) {
        if (needs[d] === window[d]) {
          valid--;
        }
        window[d]--;
      }
    }
  }

  return s.substr(start, len);
}

console.log(slideWindow("abcewbiudb", "cbd"));

//最长无重复子串
function subLongestStr(s) {
  let left = 0,
    right = 0;
  let window = {};
  let res = 0;
  let start = 0;

  while (right < s.length) {
    //窗口右滑
    const c = s.charAt(right);
    right++;
    if (!window[c]) {
      window[c] = 0;
    }
    window[c]++;

    while (window[c] > 1 && left <= right) {
      //窗口左滑直至满足无重复字符串，重复字符只可能是c，因为刚加的，前面的循环均保证无重复字符
      const d = s.charAt(left);
      left++;
      window[d]--;
    }

    //在这更新是因为while结束才是满足条件的子串
    if (right - left > res) {
      res = right - left;
      start = left;
    }
  }

  return s.substr(start, res);
}

console.log(subLongestStr("hkagfuauwiuabywbasgsgs"));
