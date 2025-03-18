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
pub fn quick_sort(arr: &mut[i32]) -> () {
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


#[cfg(test)]
mod test {
    use crate::find_median_sorted_arrays::find_median_sorted_arrays;

    #[test]
    fn test1() {
        let arr1 = vec![1,3];
        let arr2 = vec![2];

        let median: f64 = find_median_sorted_arrays(arr1, arr2);
        assert_eq!(median, 2.0);
    }

    #[test]
    fn test2() {
        let arr1 = vec![3,4,5];
        let arr2 = vec![2,3,4];

        let median: f64 = find_median_sorted_arrays(arr1, arr2);
        assert_eq!(median, 3.5);
    }
}