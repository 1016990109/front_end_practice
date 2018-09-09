function restoreIpAddresses(str) {
  let result = []

  function helper(s, tmpList) {
    if (tmpList.length === 4) {
      if (s.length === 0) {
        result.push(tmpList.join('.'))
      }
      return
    }

    for (let i = 1; i <= s.length; i++) {
      let substring = s.substring(0, i)
      if (
        (substring.startsWith('0') && substring.length != 1) ||
        Number(substring) > 255
      ) {
        continue
      }

      tmpList.push(substring)
      helper(s.length == i ? "" : s.substring(i, s.length), tmpList)
      tmpList.pop()
    }
  }

  helper(str, [])

  return result
}

console.log(restoreIpAddresses('8888'))
