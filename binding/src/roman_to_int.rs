// 罗马数字字符串 转 数字(int32)
fn get_bytes_array(s: String) -> Vec<u8> {
    let bytes = s.as_bytes();
    bytes.to_owned()
}

fn get_value(s: &str) -> i32 {
    let result: i32 = match s {
        "I" => 1,
        "V" => 5,
        "X" => 10,
        "L" => 50,
        "C" => 100,
        "D" => 500,
        "M" => 1000,
        _ => 0
    };

    result
}

pub fn roman_to_int_binding(s: String) -> i32 {
    // 先弄成数字然后加起来（
    let s = s.replace("IV", "原")
                     .replace("IX", "神")
                     .replace("XL", "启")
                     .replace("XC", "动")
                     .replace("CD", "蔚")
                     .replace("CM", "来");

    let bytes_array = get_bytes_array(s);
    let mut result: i32 = 0;
    for (_, &val) in bytes_array.iter().enumerate() {
        let val_string = val.to_string();
        let val = val_string.as_str();
        result += get_value(val);
    }

    result
}