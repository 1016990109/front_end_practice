let N = 4
let relations = {
  2: [1],
  1: [3],
  3: [2,4],
  4: [2]
}

function deep(flag, user) {
  if (flag[user - 1]) {
    return
  }

  flag[user - 1] = true
  let tmpUsers = relations[user]
  if (tmpUsers !== undefined) {
    for (let k in tmpUsers) {
      deep(flag, tmpUsers[k])
    }
  }
}

function popular(relations) {
  let count = 0

  for (let i in relations) {
    let flag = Array.apply(null, Array(N)).map(() => false)
    flag[i-1] = true

    let users = relations[i]
    for (let j in users) {
      deep(flag, users[j])
    }

    if (flag.every(v => v === true)) {
      count++
    }
  }

  return count
}


console.log(popular(relations))