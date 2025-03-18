<script lang="ts" setup>
import { ref, onMounted } from "vue"
import init, { findMedianSortedArrays } from "../../../../wasm/output/wasm.js"

onMounted(() => {
    init().then()
})

const arr1 = ref<number[]>([1, 2, 3])
const arr2 = ref<number[]>([2, 3, 4])

const result = ref<number>()

function getMedianNumber() {
    if(typeof arr1.value === "string") {
        arr1.value = arr1.value.split(",").map(i => 1 * i)
    }
    if(typeof arr2.value === "string") {
        arr2.value = arr2.value.split(",").map(i => 1 * i)
    }
    result.value = findMedianSortedArrays(arr1.value, arr2.value)
}
</script>

# 4. 寻找两个正序数组的中位数

LeetCode题目链接：[寻找两个正序数组的中位数](https://leetcode.cn/problems/median-of-two-sorted-arrays/description/)

给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的 中位数 。

算法的时间复杂度应该为 `O(log (m+n))` 。

```
示例 1：

输入：nums1 = [1,3], nums2 = [2]
输出：2.00000
解释：合并数组 = [1,2,3] ，中位数 2

示例 2：

输入：nums1 = [1,2], nums2 = [3,4]
输出：2.50000
解释：合并数组 = [1,2,3,4] ，中位数 (2 + 3) / 2 = 2.5
```

提示：

- nums1.length == m
- nums2.length == n
- 0 <= m <= 1000
- 0 <= n <= 1000
- 1 <= m + n <= 2000
- -10<sup>6</sup> <= nums1[i], nums2[i] <= 10<sup>6</sup>

## 实战

```rust
// 拼接两个Vec
fn concat_vecs(arr1: Vec<i32>, arr2: Vec<i32>) -> Vec<i32> {
    let mut arr1 = arr1;
    let mut arr2 = arr2;
    arr1.append(&mut arr2);
    arr1
}

// 快速排序
// 分区
fn partition(arr: &mut [i32]) -> usize {
    let pivot = arr[arr.len() - 1]; // 选择最后一个数作为基准
    let mut i = 0;

    for j in 0..arr.len() - 1 {
        if arr[j] < pivot {
            arr.swap(i, j); // 小于基准的数和arr[i]交换
            i += 1;
        }
    }

    arr.swap(i, arr.len() - 1); // 交换基准数与arr[i]
    i  // 返回基准的下标
}

// 排序
fn quick_sort(arr: &mut[i32]) -> () {
    if arr.len() <= 1 {
        return;
    }

    let pivot = partition(arr);
    quick_sort(&mut arr[0..pivot]);
    quick_sort(&mut arr[pivot + 1..]);
}

// 寻找中位数
pub fn find_median_sorted_arrays(arr1: Vec<i32>, arr2: Vec<i32>) -> f64 {
    let mut concated_arr = concat_vecs(arr1, arr2);
    quick_sort(&mut concated_arr);
    let median_num: f64;
    if concated_arr.len() % 2 == 0 {
        let medium_index = concated_arr.len() / 2;
        median_num = (concated_arr[medium_index - 1] + concated_arr[medium_index]) as f64 / 2.0 as f64;
    } else {
        let medium_index: f64 = (concated_arr.len() / 2) as f64;
        let floor_index: usize = medium_index.floor() as usize;
        median_num = concated_arr[floor_index].into();
    }
    median_num
}
```

### 测试

<p>输入两个数组：</p>
<div flex="~ col">
    数组1: <input type="text" border="1px solid black" rounded h-9 w-80
           v-model="arr1"/>
    数组2: <input type="text" border="1px solid black" rounded h-9 w-80
           v-model="arr2"/>
</div>

<button btn h-9 @click="getMedianNumber">计算数组合并的中位数</button>

<p>结果: </p>

<div>{{ result }}</div>
