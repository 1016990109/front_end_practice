function lengthOfLongestSubstring(s) {
  const map = {}
  var left = 0
  var max = 0
  for (var i = 0; i < s.length; i++) {
    var v = s[i]
    if (map[v] >= left) {
      //一开始map[v]不存在，undefined，式子值为false
      left = map[v] + 1
    }
    map[v] = i
    if (max < i - left + 1) {
      max = i - left + 1
    }
  }
  return max
}

console.log(lengthOfLongestSubstring('abcabcbb'))
