//给定一个无序数组，找到其中最长上升子序列长度
//dp[i]表示以num[i]为结尾的最长上升子序列长度
//需要的结果即max(dp[i])
//dp[i+1]=max(dp[j] + 1) (其中dp[j] < num[i+1])

function findLongestSubSequence(num) {
  let dp = [];
  dp[0] = 1;
  const loop = (i) => {
    if (dp[i]) {
      return dp[i];
    }

    dp[i] = 1;
    for (let j = 0; j < i; j++) {
      if (num[j] < num[i]) {
        if (dp[j] + 1 > dp[i]) {
          dp[i] = dp[j] + 1;
        }
      }
    }
  };

  for (let i = 0; i < num.length; i++) {
    loop(i);
  }

  return Math.max(...dp);
}

console.log(findLongestSubSequence([10, 9, 2, 5, 3, 7, 101, 18]));

//背包问题
//一个背包容量优先，给定若干重量、价值的物品，求背包装的物品价值上限

// N = 3, W = 4
// wt = [2, 1, 3]
// val = [4, 2, 3]

//dp[i][w] 表示容量为w限制下，装i个物品的最大价值，dp[i][w] 应该等于 dp[i-1][w - wt[i-1]] + val[i-1]
function getMaxValue(W, N, wt, val) {
  let dp = [];
  for (let i = 0; i <= N; i++) {
    dp[i] = [];
    for (let j = 0; j <= W; j++) {
      dp[i][j] = 0;
    }
  }

  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= W; j++) {
      if (wt[i - 1] > j) {
        dp[i][j] = dp[i - 1][j];
      } else {
        //放和不放
        dp[i][j] = Math.max(
          val[i - 1] + dp[i - 1][j - wt[i - 1]],
          dp[i - 1][j]
        );
      }
    }
  }

  return dp[N][W];
}

console.log(getMaxValue(4, 3, [2, 1, 3], [4, 2, 3]));

//背包问题变形（完全背包问题）
//不同硬币面额（不限个数）和总金额，给出凑出总金额的所有组合数
//dp[i][j]表示用钱i个面额硬币，总金额为j的凑法数
//dp[i][j] = d[i-1][j] + d[i][j - coin[i-1]]

function change(amount, coins) {
  let dp = [];

  for (let j = 0; j <= coins.length; j++) {
    dp[j] = [];
  }

  for (let j = 0; j <= amount; j++) {
    dp[0][j] = 0;
  }
  for (let j = 0; j <= coins.length; j++) {
    dp[j][0] = 1;
  }

  for (let i = 1; i <= coins.length; i++) {
    for (let j = 1; j <= amount; j++) {
      if (j < coins[i - 1]) {
        dp[i][j] = dp[i - 1][j];
      } else {
        dp[i][j] = dp[i - 1][j] + dp[i][j - coins[i - 1]];
      }
    }
  }

  return dp[coins.length][amount];
}

console.log(change(10, [2, 3, 5]));

// 输入一个集合，返回是否能够分割成和相等的两个子集
//dp[i][j] 表示前i个元素恰好能组成和为j
//dp[i][j] = dp[i-1][j] || dp[i-1][j - nums[i-1]]
//需要注意的是所有元素要全部用完
function canPartition(nums) {
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
  }

  if (sum % 2 !== 0) {
    return false;
  }

  let dp = [];
  for (let i = 0; i <= nums.length; i++) {
    dp[i] = [];
  }

  for (let i = 0; i <= Number.parseInt(sum / 2); i++) {
    dp[0][i] = false;
  }

  for (let i = 0; i <= nums.length; i++) {
    dp[i][0] = true;
  }

  for (let i = 1; i <= nums.length; i++) {
    for (let j = 1; j <= Number.parseInt(sum / 2); j++) {
      if (j < nums[i - 1]) {
        dp[i][j] = dp[i - 1][j];
        // uses[i][j] = uses[i-1][j]
      } else {
        dp[i][j] = dp[i - 1][j] || dp[i - 1][j - nums[i - 1]];
        // uses[i][j] = [].concat(uses[i-1][j]).concat(nums[i-1])
      }
    }
  }

  return dp[nums.length][Number.parseInt(sum / 2)];
}

console.log(canPartition([1, 2, 3, 5]));

//把s1变化成s2所用的最短步数，只允许删除、替换、添加
//两个字符串，一般用2个指针做，慢慢缩小处理的长度
//dp[i][j]表示s1的前i个字符变化成s2的前j个字符需要的最短步数
//最终结果为dp[s1.length - 1][s2.length -1]
function shortestSwitch(s1, s2) {
  let dp = new Array(s1.length + 1)
    .fill(undefined)
    .map(() => new Array(s2.length + 1).fill(0));

  for (let i = 1; i <= s1.length; i++) {
    dp[i][0] = i;
  }

  for (let i = 1; i <= s2.length; i++) {
    dp[0][i] = i;
  }

  console.log(dp);

  for (let i = 1; i <= s1.length; i++) {
    for (let j = 1; j <= s2.length; j++) {
      if (s1.charAt(i - 1) === s2.charAt(j - 1)) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        // 增加操作：str1a变成str2后再加上b，得到str2b
        // 删除操作：str1a删除a后，再由str1变为str2b
        // 替换操作：先由str1变为str2，然后str1a的a替换为b，得到str2b
        //s1删、替、添
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,
          dp[i - 1][j - 1] + 1,
          dp[i][j - 1] + 1
        );
      }
    }
  }

  return dp[s1.length][s2.length];
}

console.log(shortestSwitch("rad", "apple"));

//s1,s2两字符串最长公共子序列
//dp[i][j] 表示s1的前i个字符与s2前j个字符的最长公共子序列
//dp[i][j] = max(dp[i][j-1], dp[i-1][j])
//状态转移说简单些就是做选择，比如说这个问题，是求 s1 和 s2 的最长公共子序列，不妨称这个子序列为 lcs。那么对于 s1 和 s2 中的每个字符，有什么选择？很简单，两种选择，要么在 lcs 中，要么不在。

function findLongestCommonSequence(s1, s2) {
  let dp = new Array(s1.length + 1)
    .fill(undefined)
    .map(() => new Array(s2.length + 1).fill(0));

  //bad case
  for (let i = 0; i <= s1.length; i++) {
    dp[i][0] = 0;
  }

  for (let i = 0; i <= s2.length; i++) {
    dp[0][i] = 0;
  }

  for (let i = 1; i <= s1.length; i++) {
    for (let j = 1; j <= s2.length; j++) {
      if (s1.charAt(i - 1) === s2.charAt(j - 1)) {
        dp[i][j] = 1 + dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j]);
      }
    }
  }

  return dp[s1.length][s2.length];
}

console.log(findLongestCommonSequence("auewedjkcw", "bbbedjcaaa"));

//最长回文子序列
//dp[i][j] 表示 i~j的最长回文子序列
//dp[i][j] = dp[i+1][j-1] + 2
//dp[i][j] = max(dp[i][j-1], dp[i+1][j])

function findLongestPalindromeSequence(s) {
  let dp = new Array(s.length).fill(undefined).map((value, index) => {
    let v = [];
    for (let i = 0; i < s.length; i++) {
      if (i === index) {
        v[i] = 1;
      } else {
        v[i] = 0;
      }
    }
    return v;
  });

  console.log(JSON.stringify(dp));

  const n = s.length;
  for (let i = n - 1; i >= 0; i--) {
    for (let j = i + 1; j < n; j++) {
      if (s.charAt(i) === s.charAt(j)) {
        dp[i][j] = dp[i + 1][j - 1] + 2;
      } else {
        dp[i][j] = Math.max(dp[i][j - 1], dp[i + 1][j]);
      }
    }
  }

  return dp[0][n - 1];
}

console.log(findLongestPalindromeSequence("bbbbab"));

//四键键盘，键盘只能按A、Ctrl+A、Ctrl+C、Ctrl+V，只能按N次，最多显示多少个A
//dp[i] 表示按i次后最多能显示多少A,copy[i]表示按i次后粘贴板中的数量
//dp[i] = max(1+dp[i-1], 2 * dp[i-3], dp[i-1] + 2 * copy[i-1])
//dp[1] = 1, dp[2] = 2, dp[3] = 3

function maxA(N) {
  let dp = [0, 1, 2, 3];
  let inputs = [[], ["A"], ["A", "A"], ["A", "A", "A"]];
  for (let i = 4; i <= N; i++) {
    inputs[i] = [];
  }
  let copy = new Array(N).fill(0);
  const rec = (n) => {
    if (dp[n]) {
      return dp[n];
    }

    let result1 = 1 + rec(n - 1);
    let result2 = 2 * rec(n - 3);
    let result3 = rec(n - 1) + copy[n - 1];

    if (result1 > result2 && result1 > result3) {
      dp[n] = result1;
      inputs[n] = inputs[n - 1].concat(["A"]);
      return dp[n];
    } else if (result2 >= result1 && result2 >= result3) {
      copy[n] = dp[n - 3];
      dp[n] = result2;
      inputs[n] = inputs[n - 3].concat(["C-A", "C-C", "C-V"]);
      return dp[n];
    } else {
      dp[n] = result3;
      inputs[n] = inputs[n - 1].concat(["C-V"]);
      return dp[n];
    }
  };

  return { count: rec(N), inputs: inputs[N] };
}

console.log(maxA(12));

//股票买卖问题(困难)
//给定一个数组，第i位表示第i天的股票价格
//设计一个算法计算获得最大利润，最多完成k笔交易
//状态：天数、交易次数、持有状态，穷举：dp[i][k][0 or 1]
//dp[-1]表示还没开始，利润一定是0
function maxProfits(prices, k) {
  let n = prices.length;
  let dp = [];
  // for (let j = -1; j < n; j++) {
  //   let v = [];
  //   for (let i = 0; i < k; i++) {
  //     v[i] = [0, 0];
  //   }
  //   //每天都不操作，不可能持有
  //   v[0][1] = -Number.MAX_VALUE;
  //   v[-1] = [-Number.MAX_VALUE, -Number.MAX_VALUE];
  //   dp[j] = v;
  // }
  // for (let i = 0; i < k; i++) {
  //   dp[-1][i][0] = 0;
  //   dp[-1][i][1] = -Number.MAX_VALUE; //不可能用负无穷代替
  // }
  for(let i = -1; i<n; i++) {
    if (!dp[i]) {
      dp[i] = []
    }
    for(let j = -1; j <k; j++) {
      if (!dp[i][j]) {
        dp[i][j] = [0,0]
      }
    }
  }

  for(let i = -1;i < k; i++) {
    dp[-1][i][0] = 0
    dp[-1][i][1] = -Number.MAX_VALUE
  }

  for(let i = 0; i<n;i++) {
    dp[i][0][0] = 0
    dp[i][0][1] = -Number.MAX_VALUE
  }


  for (let i = 0; i < n; i++) {
    for (let j = 0; j <= i && j < k; j++) {
      //没持有，要么就是前一天不持有，今天不操作；要么就是前一天持有，今天卖了
      dp[i][j][0] = Math.max(dp[i - 1][j][0], dp[i - 1][j][1] + prices[i]);
      //持有，要么就是前一天持有，今天不操作；要么就是前一天不持有，今天买了
      dp[i][j][1] = Math.max(dp[i - 1][j][1], dp[i - 1][j - 1][0] - prices[i]);
    }
  }

  return Math.max(dp[n - 1][k - 1][0], dp[n - 1][k - 1][1]);
}

console.log(maxProfits([3, 2, 6, 5, 0, 3], 2));
